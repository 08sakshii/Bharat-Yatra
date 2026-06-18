const Route = require("../models/Route");
const RouteInteraction = require("../models/RouteInteraction");
const Place = require("../models/Place");
const { calculateDistance } = require("../utils/helpers");

const optimizeRouteNearestNeighbor = (places, startLocation) => {
  if (!places || places.length === 0) return { places: [], metrics: {} };

  const unvisited = [...places];
  const optimizedRoute = [];
  let current = startLocation;
  let totalDistance = 0;
  let totalTime = 0;

  while (unvisited.length > 0) {
    let nearestIndex = 0;
    let minDistance = Infinity;

    unvisited.forEach((place, index) => {
      const distance = calculateDistance(
        current.lat,
        current.lng,
        place.location.coordinates[1],
        place.location.coordinates[0],
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });

    const nearest = unvisited.splice(nearestIndex, 1)[0];
    const estimatedTime = Math.round((minDistance / 50) * 60);

    optimizedRoute.push({
      place: nearest._id,
      order: optimizedRoute.length + 1,
      distanceFromPrevious: Math.round(minDistance * 10) / 10,
      estimatedTime,
      placeData: nearest,
    });

    totalDistance += minDistance;
    totalTime += estimatedTime;

    current = {
      lat: nearest.location.coordinates[1],
      lng: nearest.location.coordinates[0],
    };
  }

  return {
    places: optimizedRoute,
    metrics: {
      totalDistance: Math.round(totalDistance * 10) / 10,
      totalDuration: totalTime,
      numberOfPlaces: optimizedRoute.length,
      estimatedDays: Math.ceil(Math.max(totalDistance / 200, totalTime / 360)),
    },
  };
};

exports.optimizeRoute = async (req, res) => {
  try {
    const { placeIds, startLocation } = req.body;

    if (!placeIds || !Array.isArray(placeIds) || placeIds.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Place IDs array is required" });
    }

    if (!startLocation || !startLocation.lat || !startLocation.lng) {
      return res
        .status(400)
        .json({ success: false, message: "Start location is required" });
    }

    const places = await Place.find({ _id: { $in: placeIds } });
    if (places.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No places found" });
    }

    let originalDistance = 0;
    let originalTime = 0;
    let current = startLocation;

    const originalRoute = places.map((place, index) => {
      const distance = calculateDistance(
        current.lat,
        current.lng,
        place.location.coordinates[1],
        place.location.coordinates[0],
      );
      const time = Math.round((distance / 50) * 60);

      originalDistance += distance;
      originalTime += time;

      current = {
        lat: place.location.coordinates[1],
        lng: place.location.coordinates[0],
      };

      return {
        place: place._id,
        order: index + 1,
        distanceFromPrevious: Math.round(distance * 10) / 10,
        estimatedTime: time,
        placeData: place,
      };
    });

    const optimized = optimizeRouteNearestNeighbor(places, startLocation);

    const distanceSaved = originalDistance - optimized.metrics.totalDistance;
    const timeSaved = originalTime - optimized.metrics.totalDuration;

    res.status(200).json({
      success: true,
      data: {
        original: {
          places: originalRoute,
          metrics: {
            totalDistance: Math.round(originalDistance * 10) / 10,
            totalDuration: originalTime,
            numberOfPlaces: places.length,
          },
        },
        optimized: {
          places: optimized.places,
          metrics: optimized.metrics,
        },
        savings: {
          distance: Math.round(distanceSaved * 10) / 10,
          time: timeSaved,
          percentage: Math.round((distanceSaved / originalDistance) * 100),
        },
      },
    });
  } catch (error) {
    console.error("Optimize route error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

exports.createRoute = async (req, res) => {
  try {
    const {
      name,
      description,
      places,
      startLocation,
      routePolyline,
      costEstimates,
    } = req.body;

    if (!name || !places || places.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Name and places are required" });
    }

    let totalDistance = 0;
    let totalTime = 0;
    let current = startLocation;
    const enrichedPlaces = [];

    for (let i = 0; i < places.length; i++) {
      const p = places[i];
      const placeDoc = await Place.findById(p.place?._id || p.place || p._id);
      if (!placeDoc) continue;

      const prevLat =
        current?.lat || current?.latitude || current?.coordinates?.[1];
      const prevLng =
        current?.lng || current?.longitude || current?.coordinates?.[0];
      const nextLat = placeDoc.location.coordinates[1];
      const nextLng = placeDoc.location.coordinates[0];

      let distance = p.distanceFromPrevious;
      let time = p.estimatedTime;

      if (!distance || !time) {
        const dist = calculateDistance(prevLat, prevLng, nextLat, nextLng);
        distance = Math.round(dist * 10) / 10;
        time = Math.round((dist / 50) * 60);
      }

      totalDistance += distance;
      totalTime += time;

      enrichedPlaces.push({
        place: placeDoc._id,
        order: i + 1,
        distanceFromPrevious: distance,
        estimatedTime: time,
      });

      current = { lat: nextLat, lng: nextLng };
    }

    const routeMetrics = {
      totalDistance: Math.round(totalDistance * 10) / 10,
      totalDuration: totalTime,
      numberOfPlaces: enrichedPlaces.length,
      estimatedDays: Math.ceil(Math.max(totalDistance / 200, totalTime / 360)),
    };

    const route = await Route.create({
      user: req.user.id,
      name,
      description,
      places: enrichedPlaces,
      startLocation,
      routePolyline,
      routeMetrics,
      costEstimates: costEstimates || {},
      optimization: {
        algorithm: "nearest-neighbor",
        optimizedAt: new Date(),
      },
    });

    await RouteInteraction.create({
      route: route._id,
    });

    const populatedRoute = await Route.findById(route._id).populate(
      "places.place",
    );

    res.status(201).json({
      success: true,
      message: "Route created successfully",
      data: populatedRoute,
    });
  } catch (error) {
    console.error("Create route error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

exports.getUserRoutes = async (req, res) => {
  try {
    const routes = await Route.find({ user: req.user.id })
      .populate("places.place")
      .sort("-createdAt");

    res.status(200).json({ success: true, count: routes.length, data: routes });
  } catch (error) {
    console.error("Get user routes error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

exports.getPopularRoutes = async (req, res) => {
  try {
    const { limit = 20, sortBy = "popularity" } = req.query;

    const routes = await Route.find({ isPublic: true })
      .populate("places.place")
      .populate("user", "name email")
      .lean();

    const routesWithStats = await Promise.all(
      routes.map(async (route) => {
        const interaction = await RouteInteraction.findOne({
          route: route._id,
        });
        return {
          ...route,
          interactions: interaction
            ? interaction.stats
            : {
                upvoteCount: 0,
                downvoteCount: 0,
                netVotes: 0,
                cloneCount: 0,
                viewCount: 0,
                popularityScore: 0,
              },
        };
      }),
    );

    let sortedRoutes = routesWithStats;
    if (sortBy === "popularity") {
      sortedRoutes.sort(
        (a, b) =>
          b.interactions.popularityScore - a.interactions.popularityScore,
      );
    } else if (sortBy === "newest") {
      sortedRoutes.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    } else if (sortBy === "clones") {
      sortedRoutes.sort(
        (a, b) => b.interactions.cloneCount - a.interactions.cloneCount,
      );
    } else if (sortBy === "votes") {
      sortedRoutes.sort(
        (a, b) => b.interactions.netVotes - a.interactions.netVotes,
      );
    }

    res.status(200).json({
      success: true,
      count: sortedRoutes.length,
      data: sortedRoutes.slice(0, parseInt(limit)),
    });
  } catch (error) {
    console.error("Get popular routes error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id)
      .populate("places.place")
      .populate("user", "name email")
      .populate("interactions");

    if (!route) {
      return res
        .status(404)
        .json({ success: false, message: "Route not found" });
    }

    const isOwner = req.user && route.user._id.toString() === req.user.id;
    if (!route.isPublic && !isOwner) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to access this route",
        });
    }

    if (req.user && !isOwner) {
      let interaction = await RouteInteraction.findOne({ route: route._id });
      if (!interaction) {
        interaction = await RouteInteraction.create({ route: route._id });
      }

      const alreadyViewed = interaction.views.some(
        (v) => v.user.toString() === req.user.id,
      );
      if (!alreadyViewed) {
        interaction.views.push({ user: req.user.id });
        await interaction.save();
      }
    }

    res.status(200).json({ success: true, data: route });
  } catch (error) {
    console.error("Get route by ID error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

exports.updateRoute = async (req, res) => {
  try {
    let route = await Route.findById(req.params.id);
    if (!route) {
      return res
        .status(404)
        .json({ success: false, message: "Route not found" });
    }

    if (route.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to update this route",
        });
    }

    route = await Route.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("places.place");

    res
      .status(200)
      .json({
        success: true,
        message: "Route updated successfully",
        data: route,
      });
  } catch (error) {
    console.error("Update route error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

exports.deleteRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res
        .status(404)
        .json({ success: false, message: "Route not found" });
    }

    if (route.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to delete this route",
        });
    }

    await RouteInteraction.deleteOne({ route: route._id });

    await route.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Route deleted successfully" });
  } catch (error) {
    console.error("Delete route error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res
        .status(404)
        .json({ success: false, message: "Route not found" });
    }

    if (route.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    route.isFavorite = !route.isFavorite;
    await route.save();

    res.status(200).json({
      success: true,
      message: route.isFavorite
        ? "Added to favorites"
        : "Removed from favorites",
      isFavorite: route.isFavorite,
    });
  } catch (error) {
    console.error("Toggle favorite error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

exports.exportRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id).populate("places.place");

    if (!route) {
      return res
        .status(404)
        .json({ success: false, message: "Route not found" });
    }

    if (route.user.toString() !== req.user.id && !route.isPublic) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    const exportData = {
      name: route.name,
      description: route.description,
      places: route.places.map((p) => ({
        name: p.place.name,
        location: p.place.location,
        order: p.order,
        distance: p.distanceFromPrevious,
        time: p.estimatedTime,
      })),
      metrics: route.routeMetrics,
      costEstimates: route.costEstimates,
      exportedAt: new Date(),
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${route.name.replace(/\s+/g, "_")}_route.json"`,
    );

    res.status(200).send(JSON.stringify(exportData, null, 2));
  } catch (error) {
    console.error("Export route error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["planned", "in-progress", "completed"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const route = await Route.findById(req.params.id);
    if (!route) {
      return res
        .status(404)
        .json({ success: false, message: "Route not found" });
    }

    if (route.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    route.status = status;
    await route.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Status updated successfully",
        data: route,
      });
  } catch (error) {
    console.error("Update status error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

exports.updateVisibility = async (req, res) => {
  try {
    const { isPublic } = req.body;

    const route = await Route.findById(req.params.id);
    if (!route) {
      return res
        .status(404)
        .json({ success: false, message: "Route not found" });
    }

    const routeUserId = route.user._id
      ? route.user._id.toString()
      : route.user.toString();

    if (routeUserId !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    route.isPublic = isPublic;
    await route.save();

    res.status(200).json({
      success: true,
      message: isPublic ? "Route is now public" : "Route is now private",
      data: route,
    });
  } catch (error) {
    console.error("Update visibility error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

exports.cloneRoute = async (req, res) => {
  try {
    const originalRoute = await Route.findById(req.params.id)
      .populate("places.place")
      .populate("user", "name email");

    if (!originalRoute) {
      return res
        .status(404)
        .json({ success: false, message: "Route not found" });
    }

    if (!originalRoute.isPublic) {
      return res
        .status(403)
        .json({ success: false, message: "This route is not public" });
    }

    const existingClone = await Route.findOne({
      user: req.user.id,
      originalRoute: originalRoute._id,
    });

    if (existingClone) {
      return res.status(400).json({
        success: false,
        message: "You have already saved this route",
        data: existingClone,
      });
    }

    const clonedRoute = await originalRoute.createClone(
      req.user.id,
      originalRoute.user.name || originalRoute.user.email,
    );

    let interaction = await RouteInteraction.findOne({
      route: originalRoute._id,
    });
    if (!interaction) {
      interaction = await RouteInteraction.create({ route: originalRoute._id });
    }

    interaction.clones.push({ user: req.user.id });
    await interaction.save();

    const populatedClone = await Route.findById(clonedRoute._id).populate(
      "places.place",
    );

    res.status(201).json({
      success: true,
      message: "Route saved to your collection!",
      data: populatedClone,
    });
  } catch (error) {
    console.error("Clone route error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

exports.upvoteRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res
        .status(404)
        .json({ success: false, message: "Route not found" });
    }

    if (!route.isPublic) {
      return res
        .status(403)
        .json({ success: false, message: "Can only vote on public routes" });
    }

    let interaction = await RouteInteraction.findOne({ route: route._id });
    if (!interaction) {
      interaction = await RouteInteraction.create({ route: route._id });
    }

    interaction.downvotes = interaction.downvotes.filter(
      (v) => v.user.toString() !== req.user.id,
    );

    const alreadyUpvoted = interaction.upvotes.some(
      (v) => v.user.toString() === req.user.id,
    );

    if (alreadyUpvoted) {
      interaction.upvotes = interaction.upvotes.filter(
        (v) => v.user.toString() !== req.user.id,
      );
    } else {
      interaction.upvotes.push({ user: req.user.id });
    }

    await interaction.save();

    res.status(200).json({
      success: true,
      message: alreadyUpvoted ? "Upvote removed" : "Route upvoted",
      data: {
        upvoted: !alreadyUpvoted,
        stats: interaction.stats,
      },
    });
  } catch (error) {
    console.error("Upvote route error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

exports.downvoteRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res
        .status(404)
        .json({ success: false, message: "Route not found" });
    }

    if (!route.isPublic) {
      return res
        .status(403)
        .json({ success: false, message: "Can only vote on public routes" });
    }

    let interaction = await RouteInteraction.findOne({ route: route._id });
    if (!interaction) {
      interaction = await RouteInteraction.create({ route: route._id });
    }

    interaction.upvotes = interaction.upvotes.filter(
      (v) => v.user.toString() !== req.user.id,
    );

    const alreadyDownvoted = interaction.downvotes.some(
      (v) => v.user.toString() === req.user.id,
    );

    if (alreadyDownvoted) {
      interaction.downvotes = interaction.downvotes.filter(
        (v) => v.user.toString() !== req.user.id,
      );
    } else {
      interaction.downvotes.push({ user: req.user.id });
    }

    await interaction.save();

    res.status(200).json({
      success: true,
      message: alreadyDownvoted ? "Downvote removed" : "Route downvoted",
      data: {
        downvoted: !alreadyDownvoted,
        stats: interaction.stats,
      },
    });
  } catch (error) {
    console.error("Downvote route error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

exports.getVoteStatus = async (req, res) => {
  try {
    const interaction = await RouteInteraction.findOne({
      route: req.params.id,
    });

    if (!interaction) {
      return res.status(200).json({
        success: true,
        data: {
          upvoted: false,
          downvoted: false,
          stats: {
            upvoteCount: 0,
            downvoteCount: 0,
            netVotes: 0,
            cloneCount: 0,
            viewCount: 0,
          },
        },
      });
    }

    const upvoted = interaction.upvotes.some(
      (v) => v.user.toString() === req.user.id,
    );
    const downvoted = interaction.downvotes.some(
      (v) => v.user.toString() === req.user.id,
    );

    res.status(200).json({
      success: true,
      data: {
        upvoted,
        downvoted,
        stats: interaction.stats,
      },
    });
  } catch (error) {
    console.error("Get vote status error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};
