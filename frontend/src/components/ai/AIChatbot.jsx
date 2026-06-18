
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader, MapPin, Sparkles, Bot, Zap, Star, Compass, Info, HelpCircle } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import { useAuth } from '../../context/AuthContext';
import { placesAPI, routesAPI } from '../../services/api';

const AIChatbot = ({ onRouteSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Hey there! I\'m your travel buddy! Think of me as that friend who loves planning trips and knows all the cool spots in India.\n\nJust tell me your budget, how many days you have, and where you want to go - I\'ll sort everything out! Want to know about a place? Just ask! 😊'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastRouteData, setLastRouteData] = useState(null);
  const [lastSearchResults, setLastSearchResults] = useState(null);
  const messagesEndRef = useRef(null);
  const { location, requestLocation, hasLocation } = useLocation();
  const { isAuthenticated } = useAuth();

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCJ_CHAV-U8669udp0iQ6qUNLefMzcvtY0';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "Budget ₹10000, 3 days near Mumbai",
    "Plan a trip to Rajasthan in 5 days",
    "Why should I visit Red Fort?",
    "Show me detailed cost breakdown",
    "Best beaches in Goa",
    "History of Qutub Minar",
    "Budget-friendly places to visit",
    "I have 4 days, suggest a route"
  ];

  const geocodeLocation = async (locationName) => {
    try {
      console.log(`Geocoding location: ${locationName}`);
      
      const cleanName = locationName.trim().replace(/\s+/g, ' ');
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cleanName)},India&format=json&limit=1`,
        {
          headers: {
            'User-Agent': 'TravelBuddyApp/1.0'
          }
        }
      );

      const data = await response.json();
      
      if (data && data.length > 0) {
        const coords = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
        console.log(`Geocoded ${locationName} to:`, coords);
        return coords;
      }
      
      console.log(`Could not geocode: ${locationName}`);
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  const fetchNearbyPlaces = async (userLocation, filters = {}) => {
    try {
      const response = await placesAPI.getNearby(
        userLocation.lat,
        userLocation.lng,
        filters.radius || 50000,
        filters.category
      );
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Error fetching places:', error);
      return [];
    }
  };

  const calculateTripBudget = (places, days) => {
    let breakdown = {
      accommodation: 0,
      food: 0,
      transport: 0,
      entries: 0,
      miscellaneous: 0,
      total: 0
    };

    breakdown.accommodation = (days - 1) * 1500;
    breakdown.food = days * 800;

    places.forEach(place => {
      if (place.details?.entryFee?.indian) {
        const fee = place.details.entryFee.indian.toLowerCase();
        const feeMatch = fee.match(/(\d+)/);
        if (feeMatch) {
          breakdown.entries += parseInt(feeMatch[1]);
        }
      }
    });

    breakdown.transport = days * 600;
    breakdown.miscellaneous = days * 300;
    breakdown.total = breakdown.accommodation + breakdown.food + breakdown.transport + breakdown.entries + breakdown.miscellaneous;

    return breakdown;
  };

  const formatBudgetBreakdown = (breakdown, detailed = false) => {
    if (!detailed) {
      return `💰 Quick Cost Estimate: ₹${breakdown.total}\n` +
             `(Accommodation, food, transport & entries included)\n\n` +
             `💡 Type "show cost breakdown" for detailed expenses`;
    }

    return `💰 Detailed Cost Breakdown:\n\n` +
           `🏨 Accommodation: ₹${breakdown.accommodation}\n` +
           `   (Budget hotels, ₹1500/night)\n\n` +
           `🍽️ Food & Drinks: ₹${breakdown.food}\n` +
           `   (₹800/day - breakfast, lunch, dinner + snacks)\n\n` +
           `🚗 Transport: ₹${breakdown.transport}\n` +
           `   (Local travel + inter-city)\n\n` +
           `🎫 Entry Fees: ₹${breakdown.entries}\n` +
           `   (Based on selected attractions)\n\n` +
           `🎁 Miscellaneous: ₹${breakdown.miscellaneous}\n` +
           `   (Shopping, tips, emergencies)\n\n` +
           `Total Estimated Cost: ₹${breakdown.total} 💵`;
  };

  const generateComprehensivePlan = async (days, budget, preferredLocation, userLocation) => {
    let searchLocation = userLocation;
    let searchRadius = 50000; 
    let locationUsed = "your current location";

    
    if (preferredLocation) {
      console.log(`User requested location: ${preferredLocation}`);
      const geocoded = await geocodeLocation(preferredLocation);
      if (geocoded) {
        searchLocation = geocoded;
        searchRadius = 100000; 
        locationUsed = preferredLocation;
        console.log(`Using geocoded location for ${preferredLocation}:`, searchLocation);
      } else {
        console.log(`Failed to geocode ${preferredLocation}, using user location`);
      }
    }

    console.log(`Searching for places near ${locationUsed} with radius ${searchRadius}m`);
    let places = await fetchNearbyPlaces(searchLocation, { radius: searchRadius });

    console.log(`Found ${places.length} places total`);

    if (places.length === 0) {
      return null;
    }

    
    places.sort((a, b) => {
      const ratingA = a.ratings?.average || 0;
      const ratingB = b.ratings?.average || 0;
      const distanceA = a.distance || 0;
      const distanceB = b.distance || 0;
      
      
      if (Math.abs(ratingB - ratingA) > 0.5) {
        return ratingB - ratingA;
      }
      return distanceA - distanceB;
    });

    const placesPerDay = 3;
    const totalPlaces = Math.min(days * placesPerDay, Math.min(places.length, 10));
    let selectedPlaces = places.slice(0, totalPlaces);

    console.log(`Selected ${selectedPlaces.length} places for the trip`);

    if (selectedPlaces.length === 0) {
      return null;
    }

    const budgetBreakdown = calculateTripBudget(selectedPlaces, days);
    
    if (budget && budgetBreakdown.total > budget) {
      console.log(`Budget exceeded (${budgetBreakdown.total} > ${budget}), trying to optimize...`);
      
      selectedPlaces = selectedPlaces.filter(p => {
        const entryFee = p.details?.entryFee?.indian;
        if (!entryFee || entryFee.toLowerCase().includes('free')) return true;
        const feeMatch = entryFee.match(/(\d+)/);
        return !feeMatch || parseInt(feeMatch[1]) <= 200;
      }).slice(0, totalPlaces);
      
      if (selectedPlaces.length > 0) {
        const newBudget = calculateTripBudget(selectedPlaces, days);
        console.log(`Optimized budget: ${newBudget.total}`);
      }
    }

    if (selectedPlaces.length === 0) {
      return null;
    }

    try {
      const placeIds = selectedPlaces.map(p => p._id);
      const optimizeResponse = await routesAPI.optimize(placeIds, searchLocation);
      
      if (optimizeResponse.success && optimizeResponse.data) {
        const optimized = optimizeResponse.data.optimized;
        const finalBudget = calculateTripBudget(optimized.places.map(p => p.placeData || p), days);
        
        console.log(`Route optimized successfully with ${optimized.places.length} places`);
        
        return {
          ...optimized,
          budgetBreakdown: finalBudget,
          withinBudget: !budget || finalBudget.total <= budget,
          days,
          budget,
          searchLocation: locationUsed
        };
      }
    } catch (error) {
      console.error('Optimization error:', error);
    }

    const finalBudget = calculateTripBudget(selectedPlaces, days);
    return { 
      places: selectedPlaces, 
      budgetBreakdown: finalBudget,
      withinBudget: !budget || finalBudget.total <= budget,
      days,
      budget,
      searchLocation: locationUsed
    };
  };

  const formatComprehensiveResponse = (routeData, query) => {
    const { places, budgetBreakdown, withinBudget, days, budget } = routeData;
    const actualPlaces = places.map(p => p.placeData || p);
    
    let response = `🎉 Awesome! I've planned a ${days}-day adventure for you!\n\n`;
    
    if (budget) {
      if (withinBudget) {
        const savings = budget - budgetBreakdown.total;
        response += `💚 Great news! This fits perfectly in your ₹${budget} budget!\n`;
        response += `You'll even save ₹${savings} for some extra fun! 🎊\n\n`;
      } else {
        const extra = budgetBreakdown.total - budget;
        response += `💛 Heads up! This plan costs ₹${budgetBreakdown.total}, which is ₹${extra} over your ₹${budget} budget.\n`;
        response += `But don't worry - it includes everything! Want me to find cheaper options? Just ask! 😊\n\n`;
      }
    }
    
    response += formatBudgetBreakdown(budgetBreakdown, false) + '\n\n';
    
    response += `📅 Here's Your Day-by-Day Plan:\n\n`;
    const placesPerDay = Math.ceil(actualPlaces.length / days);
    
    for (let day = 0; day < days; day++) {
      const dayPlaces = actualPlaces.slice(day * placesPerDay, (day + 1) * placesPerDay);
      if (dayPlaces.length === 0) continue;
      
      response += `Day ${day + 1} ${day === 0 ? '🌅' : day === days - 1 ? '🌆' : '☀️'}\n`;
      dayPlaces.forEach((place, idx) => {
        response += `${idx + 1}. ${place.name}\n`;
        response += `   📍 ${place.location.city}`;
        if (place.details?.duration) {
          response += ` • ⏱️ ${place.details.duration}`;
        }
        response += '\n';
        if (place.famousFor && place.famousFor.length > 0) {
          response += `   ✨ ${place.famousFor[0]}\n`;
        }
      });
      response += '\n';
    }
    
    const categories = [...new Set(actualPlaces.map(p => p.category))];
    response += `🎯 Why I Picked This Route:\n\n`;
    response += `✅ Optimized path - Less travel, more fun!\n`;
    response += `✅ Diverse experiences - ${categories.join(', ')}\n`;
    response += `✅ Highly rated spots - All 4+ star places!\n`;
    
    const foodPlaces = actualPlaces.filter(p => p.localFood && p.localFood.length > 0);
    if (foodPlaces.length > 0) {
      response += `✅ Foodie heaven - Try local delicacies!\n`;
    }
    
    response += `\n✨ I've loaded this route in your planner! You can tweak it anytime.\n\n`;
    response += `💬 Want to know more about any place? Just ask "Tell me about [place name]"!`;
    
    return response;
  };

  const analyzeUserQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if ((lowerQuery.includes('plan a trip') || lowerQuery.includes('create route') || 
         lowerQuery.includes('make route') || lowerQuery === 'create route' ||
         lowerQuery.includes('plan these') || lowerQuery.includes('route for these')) && 
        lastSearchResults) {
      return { type: 'create_route_from_search' };
    }
    
    if (lowerQuery.includes('cost breakdown') || lowerQuery.includes('detailed cost') || 
        lowerQuery.includes('show cost') || lowerQuery.includes('expense breakdown')) {
      return { type: 'cost_breakdown' };
    }
    
    const budgetMatch = lowerQuery.match(/budget\s*(?:is|of|:|-)?\s*(?:rs\.?|₹)?\s*(\d+)/i) || 
                       lowerQuery.match(/₹\s*(\d+)/i) ||
                       lowerQuery.match(/(\d+)\s*(?:rupees|rs)/i) ||
                       lowerQuery.match(/under\s*(?:rs\.?|₹)?\s*(\d+)/i);
    const budget = budgetMatch ? parseInt(budgetMatch[1]) : null;
    
    const daysMatch = lowerQuery.match(/(\d+)\s*(?:day|days)/i);
    const days = daysMatch ? parseInt(daysMatch[1]) : null;
    
    let preferredLocation = null;
    const locationPatterns = [
      /(?:near|around|in|from|at|to)\s+([a-z\s]+?)(?:\s+and\s+nearby|\s+area|\s|$|,|\?|under)/i,
      /trip\s+to\s+([a-z\s]+?)(?:\s+and\s+nearby|\s+area|\s|$|,|\?|under)/i,
      /places\s+in\s+([a-z\s]+?)(?:\s+and\s+nearby|\s+area|\s|$|,|\?|under)/i
    ];
    
    for (const pattern of locationPatterns) {
      const match = lowerQuery.match(pattern);
      if (match) {
        preferredLocation = match[1].trim();
        break;
      }
    }
    
    const detailKeywords = ['tell me about', 'history of', 'why visit', 'why should i visit', 
                           'information about', 'details of', 'what is special', 'significance of',
                           'famous for', 'known for', 'story of', 'legend of', 'describe'];
    
    const hasDetailKeyword = detailKeywords.some(keyword => lowerQuery.includes(keyword));
    
    if (hasDetailKeyword && !budget && !days) {
      return { type: 'place_details', query: query };
    }

    if (budget || days || preferredLocation) {
      return { 
        type: 'comprehensive_planning', 
        budget, 
        days: days || 2, 
        preferredLocation,
        query: query 
      };
    }

    const categories = ['temple', 'fort', 'palace', 'monument', 'beach', 'hill-station', 
                       'wildlife', 'museum', 'lake', 'waterfall', 'heritage', 'park'];
    const matchedCategory = categories.find(cat => lowerQuery.includes(cat));
    
    if (matchedCategory && !hasDetailKeyword) {
      return { type: 'category_query', category: matchedCategory, preferredLocation };
    }

    if (lowerQuery.includes('near me') || lowerQuery.includes('nearby') || 
        lowerQuery.includes('around me')) {
      return { type: 'nearby_query' };
    }

    return { type: 'general', query: query };
  };

  const fetchOnlineInfo = async (placeName) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Provide detailed tourist information about "${placeName}" in India. Include: 1) Brief description and history 2) Location (city, state) 3) What makes it special/famous 4) Best time to visit 5) Entry fees if any 6) Timings if available 7) How much time to spend 8) Local food recommendations nearby. Format the response in a friendly, conversational tone with emojis. Keep it under 300 words. DO NOT use markdown bold (**text**) or any markdown formatting.`
              }]
            }]
          })
        }
      );

      const data = await response.json();
      if (data.candidates && data.candidates[0]) {
        return data.candidates[0].content.parts[0].text;
      }
      return null;
    } catch (error) {
      console.error('Error fetching online info:', error);
      return null;
    }
  };

  const handlePlaceDetailsQuery = async (query) => {
    const detailKeywords = ['tell me about', 'history of', 'why visit', 'why should i visit', 
                           'information about', 'details of', 'what is special', 'significance of',
                           'famous for', 'known for', 'story of', 'legend of', 'about', 'describe'];
    
    let placeName = query.toLowerCase();
    
    detailKeywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      placeName = placeName.replace(regex, '');
    });
    
    placeName = placeName.replace(/\b(the|a|an|of|in|at|to|for)\b/gi, '').trim();
    placeName = placeName.replace(/[?!.]/g, '').trim();

    const places = await fetchNearbyPlaces(location, { radius: 100000 });
    const matchedPlace = places.find(p => 
      p.name.toLowerCase().includes(placeName.toLowerCase()) ||
      placeName.toLowerCase().includes(p.name.toLowerCase())
    );

    if (matchedPlace) {
      let response = `✨ ${matchedPlace.name}\n\n`;
      response += `Hey! Let me tell you about this amazing place! 😊\n\n`;
      response += `📍 Where: ${matchedPlace.location.city}, ${matchedPlace.location.state}\n\n`;
      response += `${matchedPlace.description}\n\n`;
      
      if (matchedPlace.details?.historicalSignificance) {
        response += `📜 Cool History:\n${matchedPlace.details.historicalSignificance}\n\n`;
      }
      
      if (matchedPlace.famousFor && matchedPlace.famousFor.length > 0) {
        response += `🌟 What's Special:\n${matchedPlace.famousFor.map(f => `• ${f}`).join('\n')}\n\n`;
      }
      
      if (matchedPlace.details?.bestTimeToVisit) {
        response += `🌤️ Best Time: ${matchedPlace.details.bestTimeToVisit}\n\n`;
      }
      
      if (matchedPlace.details?.timings) {
        response += `🕐 Timings: ${matchedPlace.details.timings.opening} - ${matchedPlace.details.timings.closing}\n`;
        if (matchedPlace.details.timings.weeklyOff) {
          response += `   Closed on ${matchedPlace.details.timings.weeklyOff}\n`;
        }
        response += '\n';
      }
      
      if (matchedPlace.details?.entryFee) {
        response += `🎫 Entry Fee:\n`;
        response += `• Indians: ${matchedPlace.details.entryFee.indian}\n`;
        if (matchedPlace.details.entryFee.foreign) {
          response += `• Foreigners: ${matchedPlace.details.entryFee.foreign}\n`;
        }
        response += '\n';
      }
      
      if (matchedPlace.details?.duration) {
        response += `⏱️ Time Needed: ${matchedPlace.details.duration}\n\n`;
      }
      
      if (matchedPlace.localFood && matchedPlace.localFood.length > 0) {
        response += `🍽️ Must-Try Food:\n${matchedPlace.localFood.map(f => `• ${f}`).join('\n')}\n\n`;
      }
      
      response += `⭐ Rating: ${matchedPlace.ratings?.average || 'Not rated yet'}/5`;
      if (matchedPlace.ratings?.count) {
        response += ` (${matchedPlace.ratings.count} people loved it!)`;
      }
      
      response += `\n\n💡 Want to add this to your trip? Just say "Plan a trip including ${matchedPlace.name}"!`;
      
      return response;
    }
    
    console.log(`Place "${placeName}" not found in database. Fetching from online sources...`);
    
    const onlineInfo = await fetchOnlineInfo(placeName);
    
    if (onlineInfo) {
      return `🌐 Found information online about ${placeName}:\n\n${onlineInfo}\n\n💡 Note: This info is from online sources. This place isn't in our booking database yet, but I can still help you plan around it!\n\n📝 Want to explore places we can book? Ask me for "Best places near [city]"!`;
    }
    
    return `Hmm, I couldn't find detailed information about "${placeName}" even from online sources. 🤔\n\nThis could be because:\n• The spelling might be slightly different\n• It might be a very local attraction\n• It might have an alternative name\n\nCould you:\n✓ Double-check the spelling?\n✓ Provide the full name?\n✓ Tell me which city/state it's in?\n\nI'm here to help! 😊`;
  };

  const callGeminiAPI = async (prompt, context) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `${context}\n\nUser Query: ${prompt}\n\nRespond in a friendly, conversational tone like you're chatting with a friend about travel. DO NOT use markdown bold (**text**) or any markdown formatting.`
              }]
            }]
          })
        }
      );

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API error:', error);
      return null;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const queryAnalysis = analyzeUserQuery(input);

      if (queryAnalysis.type === 'create_route_from_search') {
        if (!lastSearchResults || lastSearchResults.length === 0) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: '🤔 Hmm, I don\'t have any places saved from your last search.\n\nTry searching first with something like:\n• "Best temples near me"\n• "Show me forts in Rajasthan"\n\nThen I can create a route! 😊'
          }]);
          setLoading(false);
          return;
        }

        if (!isAuthenticated) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: '🔐 Please login to create optimized routes! Takes just a moment! ✨'
          }]);
          setLoading(false);
          return;
        }

        const estimatedDays = Math.ceil(lastSearchResults.length / 3);
        
        const routeData = {
          places: lastSearchResults,
          budgetBreakdown: calculateTripBudget(lastSearchResults, estimatedDays),
          days: estimatedDays,
          withinBudget: true
        };

        setLastRouteData(routeData);
        
        const placeNames = lastSearchResults.map((p, i) => 
          `${i + 1}. ${p.name}\n   📍 ${p.location.city}${p.distance ? ` • ${p.distance.toFixed(1)} km away` : ''}`
        ).join('\n\n');

        const response = `🎉 Awesome! I've created a ${estimatedDays}-day route for you!\n\n` +
          `${formatBudgetBreakdown(routeData.budgetBreakdown, false)}\n\n` +
          `📅 Places in Your Route:\n\n${placeNames}\n\n` +
          `🎯 Why This Route:\n` +
          `✅ Covers all the places you searched for\n` +
          `✅ Optimized for minimal travel\n` +
          `✅ ${estimatedDays} days is perfect for this journey\n\n` +
          `✨ Route loaded in your planner! You can customize it further.\n\n` +
          `💬 Want to know about any place? Just ask "Tell me about [name]"`;

        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response,
          action: 'load_route',
          routeData: routeData
        }]);

        if (onRouteSelect) {
          setTimeout(() => {
            onRouteSelect(lastSearchResults);
          }, 1000);
        }

        setLoading(false);
        return;
      }

      if (queryAnalysis.type === 'cost_breakdown') {
        if (!lastRouteData || !lastRouteData.budgetBreakdown) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: '🤔 Oops! I don\'t have a route planned yet.\n\nFirst, let me plan a trip for you! Just tell me:\n• Your budget\n• Number of days\n• Where you want to go\n\nExample: "Budget ₹5000, 2 days near Pune"'
          }]);
          setLoading(false);
          return;
        }

        const detailedBreakdown = formatBudgetBreakdown(lastRouteData.budgetBreakdown, true);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Sure thing! Here's the complete breakdown:\n\n${detailedBreakdown}\n\n💡 Pro tip: These are estimates. Actual costs may vary based on your choices!`
        }]);
        setLoading(false);
        return;
      }

      if (queryAnalysis.type === 'place_details') {
        const response = await handlePlaceDetailsQuery(input);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response
        }]);
        setLoading(false);
        return;
      }

      if (queryAnalysis.type === 'comprehensive_planning') {
        if (!hasLocation && !queryAnalysis.preferredLocation) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: '📍 Hey! I need to know where you are to plan the perfect trip.\n\nPlease enable location access in your browser, and I\'ll find awesome places nearby! 🌟'
          }]);
          await requestLocation();
          setLoading(false);
          return;
        }

        if (!isAuthenticated) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: '🔐 Quick heads up! You need to login to get:\n\n✨ Personalized route optimization\n✨ Save your favorite trips\n✨ Booking features\n\nWant to login? It takes just a second! 😊'
          }]);
          setLoading(false);
          return;
        }

        const routeData = await generateComprehensivePlan(
          queryAnalysis.days, 
          queryAnalysis.budget, 
          queryAnalysis.preferredLocation,
          location
        );

        if (routeData && routeData.places && routeData.places.length > 0) {
          setLastRouteData(routeData);
          const response = formatComprehensiveResponse(routeData, input);
          
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: response,
            action: 'load_route',
            routeData: routeData
          }]);

          if (onRouteSelect) {
            setTimeout(() => {
              onRouteSelect(routeData.places.map(p => p.placeData || p));
            }, 1000);
          }
        } else {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: '😅 Hmm, I couldn\'t find enough places for that specific request.\n\nLet\'s try:\n• A different nearby city\n• Expanding the area\n• Adding more days to explore further\n\nWhat do you think? 🤔'
          }]);
        }
        setLoading(false);
        return;
      }

      if (queryAnalysis.type === 'category_query' || queryAnalysis.type === 'nearby_query') {
        if (!hasLocation && !queryAnalysis.preferredLocation) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: '📍 I need your location to show nearby places. Enable location access and I\'ll help! 😊'
          }]);
          await requestLocation();
          setLoading(false);
          return;
        }

        let searchLocation = location;
        if (queryAnalysis.preferredLocation) {
          const geocoded = await geocodeLocation(queryAnalysis.preferredLocation);
          if (geocoded) {
            searchLocation = geocoded;
          }
        }

        const places = await fetchNearbyPlaces(searchLocation, { 
          category: queryAnalysis.category,
          radius: 50000
        });

        if (places.length > 0) {
          setLastSearchResults(places.slice(0, 5));
          
          const placesList = places.slice(0, 5).map((p, i) => 
            `${i + 1}. ${p.name}\n   📍 ${p.location.city}${p.distance ? ` • ${p.distance.toFixed(1)} km away` : ''}\n   ${p.famousFor && p.famousFor[0] ? `✨ ${p.famousFor[0]}` : ''}`
          ).join('\n\n');

          setMessages(prev => [...prev, {
            role: 'assistant',
            content: `Cool! Found some ${queryAnalysis.category || 'awesome'} places${queryAnalysis.preferredLocation ? ` in ${queryAnalysis.preferredLocation}` : ' near you'}:\n\n${placesList}\n\n💬 Want details about any of these? Just ask!\n🗺️ Or say "Create route" and I'll plan a trip to these places!`
          }]);
        } else {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: '🔍 Hmm, couldn\'t find any places matching that nearby. Want to:\n• Expand the search area?\n• Try a different category?\n• Tell me a specific city?\n\nI\'m here to help! 😊'
          }]);
        }
        setLoading(false);
        return;
      }

      const travelKeywords = ['travel', 'trip', 'visit', 'tour', 'place', 'destination', 
                             'tourism', 'holiday', 'vacation', 'india', 'route', 'plan',
                             'budget', 'day', 'days', 'temple', 'fort', 'beach'];
      
      const isTravelRelated = travelKeywords.some(keyword => 
        input.toLowerCase().includes(keyword)
      );
      
      if (!isTravelRelated) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Hey! I'm your travel buddy for India trips, so I focus on helping you explore amazing places! 😊\n\n` +
            `🎯 I can help you with:\n` +
            `• Planning trips with your budget & days\n` +
            `• Finding cool places by category\n` +
            `• Learning about destinations\n` +
            `• Discovering nearby attractions\n` +
            `• Getting cost breakdowns\n\n` +
            `Try asking:\n` +
            `"Tell me about Taj Mahal"\n` +
            `"Budget ₹5000, 2 days near Pune"\n` +
            `"Best temples to visit"\n\n` +
            `What would you like to explore? 🗺️`
        }]);
        setLoading(false);
        return;
      }

      console.log('Calling Gemini API for general travel query...');
      const context = `You are a friendly travel buddy chatting with a friend about Indian tourism. Be enthusiastic, use emojis naturally, keep it under 150 words, and maintain a casual, helpful tone. DO NOT use markdown bold or any markdown formatting.`;
      
      try {
        const geminiResponse = await callGeminiAPI(input, context);
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: geminiResponse || '⚠️ Oops! I couldn\'t get a response. Could you try asking in a different way? 😅'
        }]);
      } catch (error) {
        console.error('Gemini API call failed:', error);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '⚠️ Hmm, I\'m having trouble understanding that. Could you try:\n\n' +
            '• "Budget ₹5000, 2 days near [city]"\n' +
            '• "Best [temples/forts/beaches] to visit"\n' +
            '• "Tell me about [place name]"\n\n' +
            'I\'m here to help plan your trip! 😊'
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Oh no! I hit a snag. Can you try asking that again? Sorry about that! 😅'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const GuideModal = () => (
    <AnimatePresence>
      {showGuide && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={() => setShowGuide(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border-2 border-purple-500/30"
            style={{ boxShadow: '0 0 60px rgba(168, 85, 247, 0.4)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">How to Use Your Travel Buddy</h2>
                  <p className="text-purple-300 text-sm">Let's plan some amazing trips together! 🎉</p>
                </div>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6 text-white">
              <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  What I Can Do For You
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Plan complete trips with budget, days & preferred locations</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Provide detailed cost breakdowns (accommodation, food, transport, etc.)</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Share fascinating stories & history about places</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Find places by category (temples, forts, beaches, etc.)</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Suggest nearby attractions based on your location</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Create optimized routes to save travel time</span>
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-cyan-400" />
                  Sample Conversations
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-purple-300 font-semibold mb-1">💰 Planning with Budget:</p>
                    <div className="bg-purple-900/30 rounded-lg p-3 text-sm">
                      <p className="text-gray-300 mb-2">You: <span className="text-white">"My budget is ₹5000, I have 2 days, suggest places near Pune"</span></p>
                      <p className="text-cyan-300">Me: I'll create a complete 2-day itinerary with cost breakdown, day-wise plan, and load it in your planner! ✨</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-purple-300 font-semibold mb-1">📚 Learning About Places:</p>
                    <div className="bg-purple-900/30 rounded-lg p-3 text-sm">
                      <p className="text-gray-300 mb-2">You: <span className="text-white">"Tell me about Taj Mahal"</span></p>
                      <p className="text-cyan-300">Me: I'll share its history, significance, timings, entry fees, best time to visit, and local food! 🏛️</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-purple-300 font-semibold mb-1">💵 Getting Cost Details:</p>
                    <div className="bg-purple-900/30 rounded-lg p-3 text-sm">
                      <p className="text-gray-300 mb-2">You: <span className="text-white">"Show cost breakdown"</span></p>
                      <p className="text-cyan-300">Me: I'll show detailed expenses: accommodation, food, transport, entries, and miscellaneous! 📊</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-purple-300 font-semibold mb-1">🔍 Finding Places:</p>
                    <div className="bg-purple-900/30 rounded-lg p-3 text-sm">
                      <p className="text-gray-300 mb-2">You: <span className="text-white">"Best temples near me"</span></p>
                      <p className="text-cyan-300">Me: I'll find top-rated temples nearby with distances and what makes them special! 🕉️</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Questions You Can Ask
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="bg-purple-900/20 rounded-lg p-2">
                    "Budget ₹10000, 3 days near Mumbai"
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-2">
                    "Plan a trip to Rajasthan in 5 days"
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-2">
                    "Why should I visit Red Fort?"
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-2">
                    "Show me detailed cost breakdown"
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-2">
                    "Best beaches in Goa"
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-2">
                    "History of Qutub Minar"
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-2">
                    "Budget-friendly places to visit"
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-2">
                    "I have 4 days, suggest a route"
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-4 border border-purple-500/30">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Pro Tips
                </h3>
                <div className="space-y-2 text-sm">
                  <p>💡 Be specific: Mention budget, days, and location for best results</p>
                  <p>💡 Ask follow-ups: Request cost breakdowns or place details anytime</p>
                  <p>💡 Enable location: Get personalized nearby suggestions</p>
                  <p>💡 Login for more: Save routes, optimize paths, and get bookings with relevant info</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowGuide(false)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Got it! Let's Start Planning 🚀
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <GuideModal />

      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-50 overflow-hidden group"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          boxShadow: '0 0 30px rgba(102, 126, 234, 0.6), 0 0 60px rgba(118, 75, 162, 0.4)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        
        {isOpen ? (
          <X className="w-7 h-7 text-white relative z-10" />
        ) : (
          <div className="relative z-10">
            <Bot className="w-7 h-7 text-white" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </motion.div>
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              border: '2px solid',
              borderImage: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb) 1',
              boxShadow: '0 0 40px rgba(102, 126, 234, 0.5), 0 0 80px rgba(118, 75, 162, 0.3)'
            }}
          >
            <div className="relative p-4 border-b border-purple-500/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 rounded-full flex items-center justify-center relative"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 0 20px rgba(102, 126, 234, 0.8)'
                    }}
                  >
                    <Bot className="w-6 h-6 text-white" />
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border-2 border-cyan-400"
                    ></motion.div>
                  </motion.div>
                  
                  <div>
                    <h3 className="font-bold text-white text-lg">Your Travel Buddy</h3>
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-green-400"
                        style={{ boxShadow: '0 0 10px rgba(74, 222, 128, 0.8)' }}
                      ></motion.div>
                      <p className="text-xs text-cyan-300 font-medium">Online & Ready!</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowGuide(true)}
                  className="text-purple-300 hover:text-white transition-colors"
                  title="How to use"
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-black/20">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 ${
                      msg.role === 'user'
                        ? 'text-white relative overflow-hidden'
                        : 'bg-white/10 backdrop-blur-md text-white border border-purple-500/30'
                    }`}
                    style={msg.role === 'user' ? {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                    } : {
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)'
                    }}
                  >
                    {msg.role === 'assistant' && (
                      <Sparkles className="w-4 h-4 text-cyan-400 inline-block mr-2" />
                    )}
                    <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-purple-500/30">
                    <motion.div className="flex items-center gap-2">
                      <Loader className="w-5 h-5 text-cyan-400 animate-spin" />
                      <span className="text-white text-sm">Planning something awesome...</span>
                    </motion.div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-cyan-400 mb-2 font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Try these:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.slice(0, 3).map((q, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setInput(q.replace(/[🗺️🏛️🕉️📍📚⛰️💰🎒💸📊]/g, '').trim())}
                      className="text-xs px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/40 hover:to-pink-500/40 text-white rounded-full border border-purple-500/30 transition backdrop-blur-sm"
                      style={{ boxShadow: '0 2px 10px rgba(102, 126, 234, 0.3)' }}
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-t border-purple-500/30 bg-black/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything! Budget, places, history..."
                  className="flex-1 px-4 py-3 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 backdrop-blur-sm transition-all text-sm"
                  style={{ boxShadow: '0 2px 15px rgba(102, 126, 234, 0.2)' }}
                  disabled={loading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="px-4 py-3 rounded-xl text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.5)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Send className="w-5 h-5 relative z-10" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;