const Notebook = require('../models/Notebook');
const Place = require('../models/Place');
const Route = require('../models/Route');

exports.createEntry = async (req, res) => {
  try {
    const {
      title,
      content,
      formattedContent,
      place,
      route,
      visitDate,
      mood,
      weather,
      companions,
      highlights,
      tips,
      rating,
      tags,
      images,
      isPrivate
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const entryData = {
      user: req.user.id,
      title,
      content,
      formattedContent: formattedContent || content,
      visitDate: visitDate || Date.now(),
      mood: mood || 'happy',
      companions: companions || [],
      highlights: highlights || [],
      rating: rating || 0,
      tags: tags || [],
      images: images || [],
      isPrivate: isPrivate !== undefined ? isPrivate : true
    };

    if (weather) entryData.weather = weather;
    if (tips) entryData.tips = tips;

    if (place) {
      const placeExists = await Place.findById(place);
      if (placeExists) entryData.place = place;
    }

    if (route) {
      const routeExists = await Route.findOne({ _id: route, user: req.user.id });
      if (routeExists) entryData.route = route;
    }

    const entry = await Notebook.create(entryData);

    const populatedEntry = await Notebook.findById(entry._id)
      .populate('place', 'name location.address location.city location.state category images')
      .populate('route', 'name description routeMetrics');

    res.status(201).json({
      success: true,
      message: 'Journal entry created successfully',
      data: populatedEntry
    });
  } catch (error) {
    console.error('Create entry error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

exports.getAllEntries = async (req, res) => {
  try {
    const { place, route, mood, search, sortBy = '-createdAt', limit = 50, visibility } = req.query;

    const query = { user: req.user.id };

    if (place) query.place = place;
    if (route) query.route = route;
    if (mood) query.mood = mood;
    if (visibility === 'public') query.isPrivate = false;
    if (visibility === 'private') query.isPrivate = true;
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    const entries = await Notebook.find(query)
      .populate('place', 'name location.address location.city location.state category images')
      .populate('route', 'name description routeMetrics places')
      .sort(sortBy)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries
    });
  } catch (error) {
    console.error('Get entries error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

exports.getPublicEntries = async (req, res) => {
  try {
    const { mood, search, sortBy = '-createdAt', limit = 20, page = 1 } = req.query;

    const query = { isPrivate: false };

    if (mood) query.mood = mood;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const entries = await Notebook.find(query)
      .populate('user', 'name profilePicture')
      .populate('place', 'name location.city location.state category images')
      .populate('route', 'name description')
      .sort(sortBy)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Notebook.countDocuments(query);

    res.status(200).json({
      success: true,
      count: entries.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: entries
    });
  } catch (error) {
    console.error('Get public entries error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

exports.togglePrivacy = async (req, res) => {
  try {
    const entry = await Notebook.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found'
      });
    }

    if (entry.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    entry.isPrivate = !entry.isPrivate;
    await entry.save();

    res.status(200).json({
      success: true,
      message: entry.isPrivate ? 'Entry is now private' : 'Entry is now public',
      isPrivate: entry.isPrivate,
      data: entry
    });
  } catch (error) {
    console.error('Toggle privacy error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    let entry = await Notebook.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found'
      });
    }

    if (entry.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this entry'
      });
    }

    entry = await Notebook.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('place', 'name location category images')
      .populate('route', 'name description routeMetrics');

    res.status(200).json({
      success: true,
      message: 'Entry updated successfully',
      data: entry
    });
  } catch (error) {
    console.error('Update entry error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};


exports.deleteEntry = async (req, res) => {
  try {
    const entry = await Notebook.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found'
      });
    }

    if (entry.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this entry'
      });
    }

    await entry.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Entry deleted successfully'
    });
  } catch (error) {
    console.error('Delete entry error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};


exports.toggleFavorite = async (req, res) => {
  try {
    const entry = await Notebook.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found'
      });
    }

    if (entry.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    entry.isFavorite = !entry.isFavorite;
    await entry.save();

    res.status(200).json({
      success: true,
      message: entry.isFavorite ? 'Added to favorites' : 'Removed from favorites',
      isFavorite: entry.isFavorite
    });
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};


exports.likeEntry = async (req, res) => {
  try {
    const entry = await Notebook.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found'
      });
    }

    if (entry.isPrivate) {
      return res.status(403).json({
        success: false,
        message: 'Cannot like private entries'
      });
    }

    const alreadyLiked = entry.likes.find(
      like => like.user.toString() === req.user.id
    );

    if (alreadyLiked) {
      entry.likes = entry.likes.filter(
        like => like.user.toString() !== req.user.id
      );
    } else {
      entry.likes.push({ user: req.user.id });
    }

    await entry.save();

    res.status(200).json({
      success: true,
      message: alreadyLiked ? 'Like removed' : 'Entry liked',
      likes: entry.likes.length
    });
  } catch (error) {
    console.error('Like entry error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};


exports.addComment = async (req, res) => {
  try {
    const { comment } = req.body;

    if (!comment || comment.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Comment is required'
      });
    }

    const entry = await Notebook.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found'
      });
    }

    if (entry.isPrivate) {
      return res.status(403).json({
        success: false,
        message: 'Cannot comment on private entries'
      });
    }

    entry.comments.push({
      user: req.user.id,
      comment: comment.trim()
    });

    await entry.save();

    const populatedEntry = await Notebook.findById(entry._id)
      .populate('comments.user', 'name profilePicture');

    res.status(200).json({
      success: true,
      message: 'Comment added',
      data: populatedEntry
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};


exports.getStats = async (req, res) => {
  try {
    const totalEntries = await Notebook.countDocuments({ user: req.user.id });
    const favoriteEntries = await Notebook.countDocuments({ 
      user: req.user.id, 
      isFavorite: true 
    });
    const publicEntries = await Notebook.countDocuments({ 
      user: req.user.id, 
      isPrivate: false 
    });

    const entries = await Notebook.find({ user: req.user.id }).select('place route');
    
    const uniquePlaces = new Set();
    const uniqueRoutes = new Set();
    
    entries.forEach(entry => {
      if (entry.place) uniquePlaces.add(entry.place.toString());
      if (entry.route) uniqueRoutes.add(entry.route.toString());
    });

    res.status(200).json({
      success: true,
      data: {
        totalEntries,
        favoriteEntries,
        publicEntries,
        privateEntries: totalEntries - publicEntries,
        placesVisited: uniquePlaces.size,
        routesCompleted: uniqueRoutes.size
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};






exports.createEntry = async (req, res) => {
  try {
    const {
      title,
      content,
      formattedContent,
      place,
      route,
      visitDate,
      mood,
      weather,
      companions,
      highlights,
      tips,
      rating,
      tags,
      images,
      isPrivate
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    
    const entryData = {
      user: req.user.id,
      title,
      content,
      formattedContent: formattedContent || content,
      visitDate: visitDate || Date.now(),
      mood: mood || 'happy',
      companions: companions || [],
      highlights: highlights || [],
      rating: rating || 0,
      tags: tags || [],
      images: images || [],
      
      isPrivate: isPrivate === false ? false : true
    };

    
    if (weather) entryData.weather = weather;
    if (tips) entryData.tips = tips;

    
    if (place) {
      const placeExists = await Place.findById(place);
      if (placeExists) {
        entryData.place = place;
      }
    }

    
    if (route) {
      const routeExists = await Route.findOne({ _id: route, user: req.user.id });
      if (routeExists) {
        entryData.route = route;
      }
    }

    console.log('Creating entry with isPrivate:', entryData.isPrivate); 

    const entry = await Notebook.create(entryData);

    const populatedEntry = await Notebook.findById(entry._id)
      .populate('place', 'name location.address location.city location.state category images')
      .populate('route', 'name description routeMetrics');

    res.status(201).json({
      success: true,
      message: 'Journal entry created successfully',
      data: populatedEntry
    });
  } catch (error) {
    console.error('Create entry error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.getAllEntries = async (req, res) => {
  try {
    const { place, route, mood, search, sortBy = '-createdAt', limit = 50 } = req.query;

    const query = { user: req.user.id };

    if (place) query.place = place;
    if (route) query.route = route;
    if (mood) query.mood = mood;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    const entries = await Notebook.find(query)
      .populate('place', 'name location.address location.city location.state category images')
      .populate('route', 'name description routeMetrics places')
      .sort(sortBy)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries
    });
  } catch (error) {
    console.error('Get entries error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.getEntryById = async (req, res) => {
  try {
    const entry = await Notebook.findById(req.params.id)
      .populate('place', 'name location category images details')
      .populate({
        path: 'route',
        populate: {
          path: 'places.place',
          select: 'name location category images'
        }
      });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found'
      });
    }

    if (entry.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this entry'
      });
    }

    res.status(200).json({
      success: true,
      data: entry
    });
  } catch (error) {
    console.error('Get entry by ID error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.updateEntry = async (req, res) => {
  try {
    let entry = await Notebook.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found'
      });
    }

    if (entry.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this entry'
      });
    }

    entry = await Notebook.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('place', 'name location category images')
      .populate('route', 'name description routeMetrics');

    res.status(200).json({
      success: true,
      message: 'Entry updated successfully',
      data: entry
    });
  } catch (error) {
    console.error('Update entry error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.deleteEntry = async (req, res) => {
  try {
    const entry = await Notebook.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found'
      });
    }

    if (entry.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this entry'
      });
    }

    await entry.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Entry deleted successfully'
    });
  } catch (error) {
    console.error('Delete entry error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.toggleFavorite = async (req, res) => {
  try {
    const entry = await Notebook.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found'
      });
    }

    if (entry.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    entry.isFavorite = !entry.isFavorite;
    await entry.save();

    res.status(200).json({
      success: true,
      message: entry.isFavorite ? 'Added to favorites' : 'Removed from favorites',
      isFavorite: entry.isFavorite
    });
  } catch (error) {
    console.error('Toggle favorite error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.getEntriesByPlace = async (req, res) => {
  try {
    const entries = await Notebook.find({
      user: req.user.id,
      place: req.params.placeId
    })
      .populate('place', 'name location category images')
      .populate('route', 'name description')
      .sort('-visitDate');

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries
    });
  } catch (error) {
    console.error('Get entries by place error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.getEntriesByRoute = async (req, res) => {
  try {
    const entries = await Notebook.find({
      user: req.user.id,
      route: req.params.routeId
    })
      .populate('place', 'name location category images')
      .populate('route', 'name description routeMetrics')
      .sort('-visitDate');

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries
    });
  } catch (error) {
    console.error('Get entries by route error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.getFavoriteEntries = async (req, res) => {
  try {
    const entries = await Notebook.find({
      user: req.user.id,
      isFavorite: true
    })
      .populate('place', 'name location category images')
      .populate('route', 'name description')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries
    });
  } catch (error) {
    console.error('Get favorite entries error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.getStats = async (req, res) => {
  try {
    const totalEntries = await Notebook.countDocuments({ user: req.user.id });
    const favoriteEntries = await Notebook.countDocuments({ 
      user: req.user.id, 
      isFavorite: true 
    });

    
    const entries = await Notebook.find({ user: req.user.id }).select('place route');
    
    const uniquePlaces = new Set();
    const uniqueRoutes = new Set();
    
    entries.forEach(entry => {
      if (entry.place) uniquePlaces.add(entry.place.toString());
      if (entry.route) uniqueRoutes.add(entry.route.toString());
    });

    res.status(200).json({
      success: true,
      data: {
        totalEntries,
        favoriteEntries,
        placesVisited: uniquePlaces.size,
        routesCompleted: uniqueRoutes.size
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.uploadImage = async (req, res) => {
  try {
    const { image, caption } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Image data is required'
      });
    }

    const imageData = {
      url: image,
      caption: caption || '',
      uploadedAt: new Date()
    };

    res.status(200).json({
      success: true,
      data: imageData
    });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};




exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['planned', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    if (route.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    route.status = status;
    await route.save();

    const populatedRoute = await Route.findById(route._id)
      .populate('places.place');

    res.status(200).json({
      success: true,
      message: `Route status updated to ${status}`,
      data: populatedRoute
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};