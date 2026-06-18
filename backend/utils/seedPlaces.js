

const Place = require('../models/Place');

const samplePlaces = [
  {
    name: 'Virupaksha Temple, Hampi',
    description: 'Ancient temple complex in Hampi, part of the Vijayanagara empire ruins.',
    location: {
      type: 'Point',
      coordinates: [76.4620, 15.2867],
      address: 'Hampi, Ballari district, Karnataka',
      city: 'Hampi',
      state: 'Karnataka',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://https://karnatakatourism.org/wp-content/uploads/2020/11/virupaksha-temple-hampi.jpg',
        caption: 'Virupaksha Temple, Hampi',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Temple dating back to 7th century; part of UNESCO heritage ruins in Hampi.',
      bestTimeToVisit: 'October to February',
      entryFee: { indian: 'Free', foreign: '₹40' },
      timings: { opening: '6:00 AM', closing: '6:30 PM', weeklyOff: 'false' },
      duration: '1-2 hours',
      accessibility: 'Ancient pathways'
    },
    amenities: {
      parking: true,
      restrooms: false,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Ruins', 'Architecture', 'Stone carving'],
    localFood: ['Local Karnataka cuisine nearby'],
    ratings: { average: 4.6, count: 9500 },
    isVerified: true
  },
  {
    name: 'Amber Fort',
    description: 'Historic fort known for its artistic style elements, blending both Hindu and Rajput styles.',
    location: {
      type: 'Point',
      coordinates: [75.8513, 26.9855],
      address: 'Devisinghpura, Amer, Jaipur, Rajasthan 302001',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India'
    },
    category: 'fort',
    images: [
      {
        url: 'https://t3.ftcdn.net/jpg/04/64/52/12/360_F_464521213_d2Lv91E4sGDeuchIjBiE0MLsqwAWabRS.jpg',
        caption: 'Amber Fort, Jaipur',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built in 1592 by Raja Man Singh I.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹100', foreign: '₹500' },
      timings: { opening: '8:00 AM', closing: '5:30 PM', weeklyOff: 'false' },
      duration: '2-3 hours',
      accessibility: 'Mixed, with some staircases'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Architecture', 'History', 'Sheesh Mahal'],
    localFood: ['Rajasthani thali', 'Dal Baati Churma nearby'],
    ratings: { average: 4.5, count: 18300 },
    isVerified: true
  },
  {
    name: 'Calangute Beach',
    description: 'Popular stretch of sand on the Arabian Sea, known as the "Queen of Beaches".',
    location: {
      type: 'Point',
      coordinates: [73.7530, 15.5439],
      address: 'Calangute, North Goa, Goa 403516',
      city: 'Calangute',
      state: 'Goa',
      country: 'India'
    },
    category: 'beach',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAXi9IESvt0-Z0w0g4xJvh8jlMlKdq_Zm3Qg&s',
        caption: 'Calangute Beach, Goa',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'One of the largest beaches in North Goa; major tourist hub.',
      bestTimeToVisit: 'November to February',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
      duration: '2-4 hours',
      accessibility: 'Well-connected, easily accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Water sports', 'Nightlife', 'Seafood'],
    localFood: ['Goan seafood', 'Beach shacks'],
    ratings: { average: 4.2, count: 21750 },
    isVerified: true
  },
  {
    name: 'Kaziranga National Park',
    description: 'World famous for hosting two-thirds of the world\'s one-horned rhinoceroses.',
    location: {
      type: 'Point',
      coordinates: [93.3636, 26.5775],
      address: 'Kanchanjuri, Assam 784177',
      city: 'Kanchanjuri',
      state: 'Assam',
      country: 'India'
    },
    category: 'wildlife sancturary',
    images: [
      {
        url: 'https://www.savaari.com/blog/wp-content/uploads/2024/08/Kaziranga-National-Park.webp',
        caption: 'Kaziranga National Park',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'UNESCO World Heritage Site, established in 1905.',
      bestTimeToVisit: 'November to April',
      entryFee: { indian: '₹100', foreign: '₹650' },
      timings: { opening: '7:00 AM', closing: '4:00 PM', weeklyOff: 'false' },
      duration: '2-5 hours',
      accessibility: 'Accessible by road'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Rhinoceros', 'Wildlife safari'],
    localFood: ['Assamese thali nearby'],
    ratings: { average: 4.6, count: 12400 },
    isVerified: true
  },
  {
    name: 'Sanchi Stupa',
    description: 'Buddhist complex, famous for its Great Stupa and Ashoka Pillar.',
    location: {
      type: 'Point',
      coordinates: [77.7369, 23.4802],
      address: 'Sanchi Town, Raisen district, Madhya Pradesh',
      city: 'Sanchi',
      state: 'Madhya Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      {
        url: 'https://i0.wp.com/www.tusktravel.com/blog/wp-content/uploads/2022/11/Sanchi-Stupa-Madhya-Pradesh-picsc-1.jpg?fit=2048%2C1365&ssl=1',
        caption: 'Sanchi Stupa, Madhya Pradesh',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Commissioned by Emperor Ashoka in 3rd century BCE.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹30', foreign: '₹500' },
      timings: { opening: '8:30 AM', closing: '5:30 PM', weeklyOff: 'false' },
      duration: '1-2 hours',
      accessibility: 'Pathway and ramps'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Buddhist history', 'Architecture'],
    localFood: ['Madhya Pradesh snacks nearby'],
    ratings: { average: 4.5, count: 4200 },
    isVerified: true
  },
  {
    name: 'City Palace Jaipur',
    description: 'Lavish palace complex with museums, courtyards, and gardens in the heart of Jaipur.',
    location: {
      type: 'Point',
      coordinates: [75.8267, 26.9256],
      address: 'Jaleb Chowk, Jaipur, Rajasthan 302002',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India'
    },
    category: 'palace',
    images: [
      {
        url: 'https://rajasthancab.b-cdn.net/uploads/blog/1744708683-blog-image.webp',
        caption: 'City Palace, Jaipur',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built between 1729-1732 by Maharaja Sawai Jai Singh II.',
      bestTimeToVisit: 'November to March',
      entryFee: { indian: '₹200', foreign: '₹700' },
      timings: { opening: '9:30 AM', closing: '5:00 PM', weeklyOff: 'false' },
      duration: '2-3 hours',
      accessibility: 'truely accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Museums', 'Royal heritage'],
    localFood: ['Rajasthani cuisine nearby'],
    ratings: { average: 4.4, count: 8800 },
    isVerified: true
  },
  {
    name: 'Marine Drive Mumbai',
    description: '3.6 km long boulevard in South Mumbai, along the coast of Arabian Sea.',
    location: {
      type: 'Point',
      coordinates: [72.8194, 18.9432],
      address: 'Marine Drive, Chowpatty, Mumbai, Maharashtra',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'other',
    images: [
      {
        url: 'https://visitplacesindia.com/wp-content/uploads/2024/11/marine-drive-mumbai.jpg',
        caption: 'Marine Drive, Mumbai',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Famous for its art deco buildings and beach promenade.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
      duration: '1-2 hours',
      accessibility: 'Easily accessible'
    },
    amenities: {
      parking: false,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Sunset view', 'Promenade'],
    localFood: ['Street food', 'Bhel puri'],
    ratings: { average: 4.5, count: 21000 },
    isVerified: true
  },
  {
    name: 'Chitrakote Falls',
    description: 'Known as the "Niagara Falls of India", located on Indravati River.',
    location: {
      type: 'Point',
      coordinates: [81.7107, 18.9633],
      address: 'Chitrakote, Bastar, Chhattisgarh',
      city: 'Chitrakote',
      state: 'Chhattisgarh',
      country: 'India'
    },
    category: 'waterfall',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoIyW-C10XgDkeerbvt7V112JigIQDBmaGSw&s',
        caption: 'Chitrakote Falls, Chhattisgarh',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Largest waterfall in India by width.',
      bestTimeToVisit: 'July to October',
      entryFee: { indian: '₹30', foreign: '₹100' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
      duration: '1-2 hours',
      accessibility: 'Requires local transport'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Waterfall', 'Scenic beauty'],
    localFood: ['Chhattisgarhi snacks'],
    ratings: { average: 4.3, count: 3800 },
    isVerified: true
  },
  {
    name: 'Kanha Tiger Reserve',
    description: 'One of India’s largest tiger reserves, home to Bengal tigers and barasingha.',
    location: {
      type: 'Point',
      coordinates: [80.6115, 22.3344],
      address: 'Kanha, Mandla, Madhya Pradesh 481768',
      city: 'Mandla',
      state: 'Madhya Pradesh',
      country: 'India'
    },
    category: 'wildlife',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtzMXEO0o1erQMnrsSaDnJgSpEnTar6-KeOQ&s',
        caption: 'Kanha Tiger Reserve, Madhya Pradesh',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Inspiration for “The Jungle Book”, Project Tiger reserve.',
      bestTimeToVisit: 'November to June',
      entryFee: { indian: '₹100', foreign: '₹650' },
      timings: { opening: '6:30 AM', closing: '6:00 PM', weeklyOff: 'Wednesday afternoon' },
      duration: '3-6 hours',
      accessibility: 'Mostly forest tracks'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Tiger safari', 'Wildlife'],
    localFood: ['Local tribal cuisine nearby'],
    ratings: { average: 4.6, count: 5200 },
    isVerified: true
  },
  {
    name: 'Dal Lake',
    description: 'Picturesque lake known for houseboats, shikaras, and Mughal gardens.',
    location: {
      type: 'Point',
      coordinates: [74.8619, 34.0701],
      address: 'Boulevard Road, Srinagar, Jammu & Kashmir',
      city: 'Srinagar',
      state: 'Jammu & Kashmir',
      country: 'India'
    },
    category: 'lake',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_hWhgBcXFND9DNjQeHK8Eb31d1W1T8KTm7g&s',
        caption: 'Dal Lake, Srinagar',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Second largest lake in J&K, center of Kashmiri culture.',
      bestTimeToVisit: 'May to November',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
      duration: '1-3 hours',
      accessibility: 'Easily accessible'
    },
    amenities: {
      parking: false,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Houseboats', 'Shikara rides', 'Scenery'],
    localFood: ['Kashmiri wazwan'],
    ratings: { average: 4.7, count: 15800 },
    isVerified: true
  },
  {
    name: 'Meenakshi Amman Temple',
    description: 'Historic Hindu temple located on the southern bank of the Vaigai River.',
    location: {
      type: 'Point',
      coordinates: [78.1196, 9.9195],
      address: 'Madurai Main, Madurai, Tamil Nadu 625001',
      city: 'Madurai',
      state: 'Tamil Nadu',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://i.natgeofe.com/n/b9e9b8d1-fa08-4b90-96bb-310cace03847/meenakshi-amman-temple-india.jpg',
        caption: 'Meenakshi Amman Temple, Madurai',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built in 12-13th centuries, one of the oldest in India.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '5:00 AM', closing: '12:30 PM', weeklyOff: 'false' },
      duration: '1-2 hours',
      accessibility: 'truely accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Architecture', 'Gopurams'],
    localFood: ['South Indian meals'],
    ratings: { average: 4.7, count: 23200 },
    isVerified: true
  },
  {
    name: 'Indian Museum Kolkata',
    description: 'The largest and oldest museum in India, housing rare collections.',
    location: {
      type: 'Point',
      coordinates: [88.3500, 22.5646],
      address: '1, Park Street, Kolkata, West Bengal 700016',
      city: 'Kolkata',
      state: 'West Bengal',
      country: 'India'
    },
    category: 'museum',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIYvFJp4N2MxtxvKV8vYwuesdOd7ywn4cpPw&s',
        caption: 'Indian Museum, Kolkata',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Established in 1814, largest museum in India.',
      bestTimeToVisit: 'November to February',
      entryFee: { indian: '₹50', foreign: '₹500' },
      timings: { opening: '10:00 AM', closing: '6:30 PM', weeklyOff: 'Monday' },
      duration: '2-3 hours',
      accessibility: 'Fully accessible'
    },
    amenities: {
      parking: false,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Artifacts', 'Egyptian mummy'],
    localFood: ['Kolkata street food'],
    ratings: { average: 4.4, count: 8700 },
    isVerified: true
  },
  {
    name: 'Shimla',
    description: 'Famous hill station, also the capital city of Himachal Pradesh.',
    location: {
      type: 'Point',
      coordinates: [77.1734, 31.1048],
      address: 'Shimla, Himachal Pradesh',
      city: 'Shimla',
      state: 'Himachal Pradesh',
      country: 'India'
    },
    category: 'hill-station',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj2--RATIhrUuUPUxNMWZBWlshwhsiwftqnA&s',
        caption: 'The Ridge, Shimla',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Summer capital of British India.',
      bestTimeToVisit: 'March to June',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
      duration: '1-3 days',
      accessibility: 'Accessible by rail, road'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Climate', 'Colonial buildings'],
    localFood: ['Himachali dham', 'Tudkiya Bhat'],
    ratings: { average: 4.5, count: 6000 },
    isVerified: true
  },
  {
    name: 'Charminar',
    description: 'Iconic 16th-century mosque and landmark with four grand arches.',
    location: {
      type: 'Point',
      coordinates: [78.4747, 17.3616],
      address: 'Charminar Rd, Hyderabad, Telangana 500002',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India'
    },
    category: 'monument',
    images: [
      {
        url: 'https://indiainfrahub.com/wp-content/uploads/2020/08/Charminar.jpg',
        caption: 'Charminar, Hyderabad',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built in 1591 by Muhammad Quli Qutb Shah.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹20', foreign: '₹250' },
      timings: { opening: '9:30 AM', closing: '5:30 PM', weeklyOff: 'Friday' },
      duration: '1-2 hours',
      accessibility: 'Stairs, true accessibility'
    },
    amenities: {
      parking: false,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Architecture', 'Market'],
    localFood: ['Hyderabadi biryani', 'Haleem'],
    ratings: { average: 4.4, count: 18900 },
    isVerified: true
  },
  {
  name: 'Qutub Minar',
  description: 'Tallest brick minaret in the world and a UNESCO World Heritage site.',
  location: {
    type: 'Point',
    coordinates: [77.1855, 28.5245],
    address: 'Seth Sarai, Mehrauli, New Delhi, Delhi 110030',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India'
  },
  category: 'monument',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAQZOOEdjtpVEzI3JQSxMk7kVSArtB4uD3Pg&s',
      caption: 'Qutub Minar, Delhi',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Built in 1193 by Qutb-ud-din Aibak.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹40', foreign: '₹600' },
    timings: { opening: '7:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'truely accessible'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Architecture', 'UNESCO Site'],
  localFood: ['Delhi street food', 'Chaat'],
  ratings: { average: 4.6, count: 19400 },
  isVerified: true
},
{
  name: 'Bandhavgarh National Park',
  description: 'Famous wildlife sanctuary with the highest density of tigers in India.',
  location: {
    type: 'Point',
    coordinates: [81.0369, 23.6867],
    address: 'Bandhavgarh, Umaria, Madhya Pradesh',
    city: 'Umaria',
    state: 'Madhya Pradesh',
    country: 'India'
  },
  category: 'wildlife sancturary',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaMpb20RvosBmtO34Gd2uN8iO1MjJ9Y9u6fg&s',
      caption: 'Bandhavgarh National Park',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Declared a national park in 1968.',
    bestTimeToVisit: 'October to June',
    entryFee: { indian: '₹150', foreign: '₹1500' },
    timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'Wednesday afternoon' },
    duration: '3-6 hours',
    accessibility: 'Forest trails'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Tiger spotting', 'Wildlife safaris'],
  localFood: ['Local MP cuisine'],
  ratings: { average: 4.7, count: 4200 },
  isVerified: true
},
{
  name: 'Gateway of India',
  description: 'Historic stone arch built to commemorate the landing of King George V and Queen Mary.',
  location: {
    type: 'Point',
    coordinates: [72.8347, 18.9218],
    address: 'Apollo Bandar, Colaba, Mumbai, Maharashtra 400001',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India'
  },
  category: 'monument',
  images: [
    {
      url: 'https://s7ap1.scene7.com/is/image/incredibleindia/gateway-of-india-mumbai-maharashtra-2-attr-hero?qlt=82&ts=1742162842869',
      caption: 'Gateway of India, Mumbai',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Completed in 1924; symbol of Mumbai.',
    bestTimeToVisit: 'November to February',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Easily accessible'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: true,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Historic landmark', 'Sea view'],
  localFood: ['Mumbai street food'],
  ratings: { average: 4.5, count: 27400 },
  isVerified: true
},
{
  name: 'Padmanabhaswamy Temple',
  description: 'Famed Hindu temple dedicated to Vishnu, renowned for its wealth and architecture.',
  location: {
    type: 'Point',
    coordinates: [76.9471, 8.4822],
    address: 'East Fort, Thiruvananthapuram, Kerala 695023',
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    country: 'India'
  },
  category: 'temple',
  images: [
    {
      url: 'https://www.templepurohit.com/wp-content/uploads/2016/02/Sree-Padmanabhaswamy-Temple-Thiruvananthapuram.jpg',
      caption: 'Padmanabhaswamy Temple',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Ancient temple believed to date from the 8th century.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: '3:30 AM', closing: '7:20 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Traditional pathways'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Wealth', 'Architecture'],
  localFood: ['Kerala sadya'],
  ratings: { average: 4.7, count: 12200 },
  isVerified: true
},
{
  name: 'Dudhsagar Falls',
  description: 'One of India\'s tallest waterfalls located on the Mandovi River.',
  location: {
    type: 'Point',
    coordinates: [74.3148, 15.3145],
    address: 'Sonaulim, Goa 403410',
    city: 'Sonaulim',
    state: 'Goa',
    country: 'India'
  },
  category: 'waterfall',
  images: [
    {
      url: 'https://imgmediagumlet.lbb.in/media/2021/10/6165b8de6a9fc04e3f38c58c_1634056414914.jpg',
      caption: 'Dudhsagar Falls, Goa',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Popular spot on the Goa-Karnataka border, known for its milky streams.',
    bestTimeToVisit: 'July to September',
    entryFee: { indian: '₹50', foreign: '₹300' },
    timings: { opening: '8:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
    duration: '2-3 hours',
    accessibility: 'Trails, true seasonal access'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: false,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Scenic beauty', 'Railway bridge view'],
  localFood: ['Goan snacks'],
  ratings: { average: 4.4, count: 6900 },
  isVerified: true
},
{
  name: 'Umaid Bhawan Palace',
  description: 'Spectacular palace, now a luxury hotel and museum.',
  location: {
    type: 'Point',
    coordinates: [73.0118, 26.2787],
    address: 'Circuit House Rd, Cantt Area, Jodhpur, Rajasthan 342006',
    city: 'Jodhpur',
    state: 'Rajasthan',
    country: 'India'
  },
  category: 'palace',
  images: [
    {
      url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/756523266.jpg?k=4c1c5d82e53cad6c6159a354663f9b44b9738602c58b9dda9ddd7f116cb0c85f&o=',
      caption: 'Umaid Bhawan Palace, Jodhpur',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Completed in 1943, one of the world\'s largest private residences.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹30', foreign: '₹100' },
    timings: { opening: '10:00 AM', closing: '4:30 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Wheelchair accessible'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Architecture', 'Royal history'],
  localFood: ['Rajasthani cuisine'],
  ratings: { average: 4.6, count: 6700 },
  isVerified: true
},
{
  name: 'Vagamon',
  description: 'Scenic, serene hill station in the Western Ghats ideal for eco-tourism.',
  location: {
    type: 'Point',
    coordinates: [76.8978, 9.6845],
    address: 'Vagamon, Idukki, Kerala 685503',
    city: 'Vagamon',
    state: 'Kerala',
    country: 'India'
  },
  category: 'hill-station',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8TTs1KuRLGF0Aa4vUAs2c6CVlZg1X2biepA&s',
      caption: 'Vagamon, Kerala',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Known for tea plantations and pine forests.',
    bestTimeToVisit: 'September to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '1-2 days',
    accessibility: 'Mountain roads'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: true,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Nature', 'Eco-tourism'],
  localFood: ['Kerala cuisine'],
  ratings: { average: 4.5, count: 4100 },
  isVerified: true
},
{
  name: 'Bhagwan Mahavir Wildlife Sanctuary',
  description: 'Goa’s largest wildlife sanctuary, rich in flora and fauna.',
  location: {
    type: 'Point',
    coordinates: [74.3148, 15.4133],
    address: 'Mollem, Sonaulim, Goa 403410',
    city: 'Sonaulim',
    state: 'Goa',
    country: 'India'
  },
  category: 'wildlife sancturary',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQQxPbJYX3cjXq3Q13LmKBpY1jM4oSZY-C9w&s',
      caption: 'Bhagwan Mahavir Wildlife Sanctuary',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Home to Dudhsagar Falls and several rare species.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹20', foreign: '₹100' },
    timings: { opening: '8:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
    duration: '2-4 hours',
    accessibility: 'Forest tracks'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Wildlife', 'Natural beauty'],
  localFood: ['Goan snacks nearby'],
  ratings: { average: 4.2, count: 2300 },
  isVerified: true
},
{
  name: 'Nainital Lake',
  description: 'Renowned crescent-shaped lake in the Kumaon region.',
  location: {
    type: 'Point',
    coordinates: [79.4532, 29.3922],
    address: 'Nainital, Uttarakhand 263002',
    city: 'Nainital',
    state: 'Uttarakhand',
    country: 'India'
  },
  category: 'lake',
  images: [
    {
      url: 'https://assets.simplotel.com/simplotel/image/upload/x_0,y_71,w_1024,h_618,r_0,c_crop,q_80,fl_progressive/w_500,f_auto,c_fit/heritage-hotels-of-nainital/naini_lake_heritage_hotels_of_nainital._hotel_in_nainital_wovees',
      caption: 'Nainital Lake, Uttarakhand',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Famous hill station with settler history and boating.',
    bestTimeToVisit: 'March to June',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '2-3 hours',
    accessibility: 'Walkways and jetties'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Boating', 'Scenic beauty'],
  localFood: ['Kumaoni food'],
  ratings: { average: 4.7, count: 9100 },
  isVerified: true
},
{
  name: 'Mahabodhi Temple',
  description: 'UNESCO World Heritage Site and one of Buddhism’s holiest shrines.',
  location: {
    type: 'Point',
    coordinates: [84.9916, 24.6950],
    address: 'Bodh Gaya, Bihar 824231',
    city: 'Bodh Gaya',
    state: 'Bihar',
    country: 'India'
  },
  category: 'temple',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe4QdnQN1snxG2BGJbRoA3gdoSz67G9QDcWw&s',
      caption: 'Mahabodhi Temple, Bodh Gaya',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Site of Buddha\'s enlightenment.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: '5:00 AM', closing: '9:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Good with pathways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Pilgrimage', 'Heritage'],
  localFood: ['Bihari thali'],
  ratings: { average: 4.8, count: 16500 },
  isVerified: true
},
{
  name: 'Jog Falls',
  description: 'Spectacular segmented waterfall created by the Sharavathi River.',
  location: {
    type: 'Point',
    coordinates: [74.8056, 14.2297],
    address: 'Sagar Taluk, Shimoga, Karnataka 577435',
    city: 'Sagar',
    state: 'Karnataka',
    country: 'India'
  },
  category: 'waterfall',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoFhhgboinTdB2P6SRZUeYk2abLVrFiRPdOQ&s',
      caption: 'Jog Falls, Karnataka',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'One of the highest plunge waterfalls in India.',
    bestTimeToVisit: 'August to December',
    entryFee: { indian: '₹30', foreign: '₹100' },
    timings: { opening: '8:00 AM', closing: '7:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Viewpoints, some steps'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Falls', 'Monsoon view'],
  localFood: ['Karnataka cuisine'],
  ratings: { average: 4.5, count: 8100 },
  isVerified: true
},
{
  name: 'Manali',
  description: 'Charming hill-station nestled in the Himalayas, famed for its adventure sports.',
  location: {
    type: 'Point',
    coordinates: [77.1892, 32.2396],
    address: 'Manali, Kullu district, Himachal Pradesh',
    city: 'Manali',
    state: 'Himachal Pradesh',
    country: 'India'
  },
  category: 'hill-station',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPIbnIXVsPGKfxLM3WmTd0sLjErQdVM-61Dg&s',
      caption: 'Manali, Himachal Pradesh',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Popular base for Solang Valley and Rohtang Pass.',
    bestTimeToVisit: 'April to June, September to October',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '1-3 days',
    accessibility: 'Accessible via road'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Scenery', 'Adventure sports'],
  localFood: ['Himachali cuisine'],
  ratings: { average: 4.6, count: 12500 },
  isVerified: true
},
{
  name: 'Ranthambore Fort',
  description: 'Majestic fort located within Ranthambore National Park.',
  location: {
    type: 'Point',
    coordinates: [76.4566, 26.0232],
    address: 'Sawai Madhopur, Rajasthan 322001',
    city: 'Sawai Madhopur',
    state: 'Rajasthan',
    country: 'India'
  },
  category: 'fort',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMCI6px86sd2HPmQ8-zVVxQYRovwFRudA7bg&s',
      caption: 'Ranthambore Fort, Rajasthan',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Built in 10th century, UNESCO World Heritage Hill Fort.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹15', foreign: '₹200' },
    timings: { opening: '6:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
    duration: '2-3 hours',
    accessibility: 'Steep climb'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['History', 'Views', 'Wildlife nearby'],
  localFood: ['Rajasthani snacks'],
  ratings: { average: 4.4, count: 5400 },
  isVerified: true
},
{
  name: 'Hampi Ruins',
  description: 'Extensive historical ruins of the Vijayanagara Empire, UNESCO World Heritage site.',
  location: {
    type: 'Point',
    coordinates: [76.4710, 15.3350],
    address: 'Hampi, Ballari district, Karnataka',
    city: 'Hampi',
    state: 'Karnataka',
    country: 'India'
  },
  category: 'heritage',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToV2zEry4C0RXlq5rW_f9Odi19vuaV6eER-g&s',
      caption: 'Hampi Ruins',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Capitol of Vijayanagara empire; site of temples, bazaars, and ancient architecture.',
    bestTimeToVisit: 'October to February',
    entryFee: { indian: '₹40', foreign: '₹600' },
    timings: { opening: '6:00 AM', closing: '6:30 PM', weeklyOff: 'false' },
    duration: '4-8 hours',
    accessibility: 'Ancient pathways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Historical ruins', 'Architecture'],
  localFood: ['Karnataka cuisine'],
  ratings: { average: 4.7, count: 13100 },
  isVerified: true
},
{
  name: 'Ajanta Caves',
  description: 'Rock-cut Buddhist cave monuments dating back to the 2nd century BCE.',
  location: {
    type: 'Point',
    coordinates: [75.7000, 20.5520],
    address: 'Ajanta, Maharashtra 431001',
    city: 'Ajanta',
    state: 'Maharashtra',
    country: 'India'
  },
  category: 'heritage',
  images: [
    {
      url: 'https://breathedreamgo.com/wp-content/uploads/2010/03/India-for-Beginners-custom-tours-5.jpg',
      caption: 'Ajanta Caves',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'UNESCO World Heritage site, famed for its frescoes and sculptures.',
    bestTimeToVisit: 'November to February',
    entryFee: { indian: '₹40', foreign: '₹600' },
    timings: { opening: '9:00 AM', closing: '5:30 PM', weeklyOff: 'Monday' },
    duration: '2-3 hours',
    accessibility: 'Inclined pathways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Paintings', 'Cave art'],
  localFood: ['Maharashtrian snacks'],
  ratings: { average: 4.6, count: 11200 },
  isVerified: true
},
{
  name: 'Baga Beach',
  description: 'Popular beach, famous for nightlife and water sports.',
  location: {
    type: 'Point',
    coordinates: [73.7555, 15.5524],
    address: 'Baga, North Goa, Goa 403516',
    city: 'Baga',
    state: 'Goa',
    country: 'India'
  },
  category: 'beach',
  images: [
    {
      url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/3e/36/95/baga-sea-beach.jpg?w=800&h=-1&s=1',
      caption: 'Baga Beach, Goa',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'One of Goa’s busiest beaches for tourism and party culture.',
    bestTimeToVisit: 'November to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '2-5 hours',
    accessibility: 'Well-connected'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: false,
    wheelchairAccessible: true
  },
  famousFor: ['Nightlife', 'Water sports'],
  localFood: ['Seafood', 'Beach shacks'],
  ratings: { average: 4.3, count: 22000 },
  isVerified: true
},
{
  name: 'Periyar Wildlife Sanctuary',
  description: 'Well-known wildlife reserve famous for elephants and lake cruises.',
  location: {
    type: 'Point',
    coordinates: [77.1687, 9.4663],
    address: 'Thekkady, Idukki, Kerala 685536',
    city: 'Thekkady',
    state: 'Kerala',
    country: 'India'
  },
  category: 'wildlife sancturary',
  images: [
    {
      url: 'https://www.periyarnationalparkonline.in/images/wildlife-wonders-periyar.jpg',
      caption: 'Periyar Wildlife Sanctuary',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Established in 1950, part of Project Tiger.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹50', foreign: '₹500' },
    timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '2-4 hours',
    accessibility: 'Forest pathways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Elephants', 'Lake boat ride'],
  localFood: ['Kerala cuisine'],
  ratings: { average: 4.4, count: 8700 },
  isVerified: true
},
{
  name: 'Victoria Memorial',
  description: 'Grand marble monument dedicated to Queen Victoria.',
  location: {
    type: 'Point',
    coordinates: [88.3420, 22.5446],
    address: 'Queen’s Way, Kolkata, West Bengal 700071',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India'
  },
  category: 'monument',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr9iSZRI2OkfchiObtFNUihWtvIM-emEqBrQ&s',
      caption: 'Victoria Memorial, Kolkata',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Opened in 1921, serves as a museum and gallery.',
    bestTimeToVisit: 'November to February',
    entryFee: { indian: '₹30', foreign: '₹500' },
    timings: { opening: '10:00 AM', closing: '6:00 PM', weeklyOff: 'Monday' },
    duration: '1-2 hours',
    accessibility: 'Accessible walkways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Historic gallery', 'Gardens'],
  localFood: ['Bengali sweets'],
  ratings: { average: 4.6, count: 14500 },
  isVerified: true
},
{
  name: 'Amer Palace',
  description: 'Magnificent palace complex inside Amber Fort.',
  location: {
    type: 'Point',
    coordinates: [75.8500, 26.9850],
    address: 'Amer, Jaipur, Rajasthan 302028',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India'
  },
  category: 'palace',
  images: [
    {
      url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/d3/a8/57/images-30-largejpg.jpg?w=700&h=400&s=1',
      caption: 'Amer Palace, Jaipur',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Sheesh Mahal is a highlight of this palace.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹100', foreign: '₹500' },
    timings: { opening: '8:00 AM', closing: '5:30 PM', weeklyOff: 'false' },
    duration: '2-3 hours',
    accessibility: 'Historic staircases'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Mirror Palace', 'History'],
  localFood: ['Rajasthani thali'],
  ratings: { average: 4.5, count: 10400 },
  isVerified: true
},
{
  name: 'Morni Hills',
  description: 'Lovely hill-station, famous for trekking and nature walks.',
  location: {
    type: 'Point',
    coordinates: [76.0250, 30.7152],
    address: 'Morni Hills, Panchkula, Haryana 134205',
    city: 'Morni',
    state: 'Haryana',
    country: 'India'
  },
  category: 'hill-station',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGdjxdOlZcqBVe3OXkuFYQkT3q7h1PrlCDRA&s',
      caption: 'Morni Hills, Haryana',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Scenic spot for family picnics, bird watching.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '1-2 days',
    accessibility: 'Mountain roads'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: true,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Trekking', 'Nature walks'],
  localFood: ['North Indian food'],
  ratings: { average: 4.2, count: 2900 },
  isVerified: true
},
{
  name: 'Sundarbans National Park',
  description: 'Home to the Royal Bengal Tiger and largest mangrove forest in the world.',
  location: {
    type: 'Point',
    coordinates: [88.7773, 21.9497],
    address: 'Sundarbans, South 24 Parganas, West Bengal 743370',
    city: 'Sundarbans',
    state: 'West Bengal',
    country: 'India'
  },
  category: 'wildlife sancturary',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7p-hpVGVhexb0b5Hfz3LaKW4WurmJeldDg&s',
      caption: 'Sundarbans National Park',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'UNESCO World Heritage Site, known for mangrove biodiversity.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹100', foreign: '₹1000' },
    timings: { opening: '7:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
    duration: '2-6 hours',
    accessibility: 'River boats'
  },
  amenities: {
    parking: false,
    restrooms: false,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Tiger reserve', 'Mangroves'],
  localFood: ['Bengali seafood'],
  ratings: { average: 4.5, count: 7300 },
  isVerified: true
},
{
  name: 'Shivanasamudra Falls',
  description: 'Segmented waterfall on the Kaveri River, known for hydroelectric power station.',
  location: {
    type: 'Point',
    coordinates: [77.6194, 12.3077],
    address: 'Mandya district, Karnataka 571430',
    city: 'Shivanasamudra',
    state: 'Karnataka',
    country: 'India'
  },
  category: 'waterfall',
  images: [
    {
      url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/86/89/75/img-20180630-110602218.jpg?w=900&h=500&s=1',
      caption: 'Shivanasamudra Falls',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'First hydroelectric power station in Asia (1902).',
    bestTimeToVisit: 'July to October',
    entryFee: { indian: '₹30', foreign: '₹100' },
    timings: { opening: '8:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Viewpoints, stairs'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Waterfall', 'Views'],
  localFood: ['Karnataka snacks'],
  ratings: { average: 4.4, count: 4300 },
  isVerified: true
},
{
  name: 'Shaniwar Wada',
  description: 'Historical fortification in Pune, Maharashtra, built in 1732.',
  location: {
    type: 'Point',
    coordinates: [73.8567, 18.5167],
    address: 'Shaniwar Peth, Pune, Maharashtra 411030',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India'
  },
  category: 'fort',
  images: [
    {
      url: 'https://punetourism.co.in/images/places-to-visit/headers/shaniwar-wada-pune-tourism-entry-fee-timings-holidays-reviews-header.jpg',
      caption: 'Shaniwar Wada, Pune',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Seat of the Peshwas of the Maratha Empire.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹25', foreign: '₹200' },
    timings: { opening: '8:00 AM', closing: '6:30 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Pathways and gardens'
  },
  amenities: {
    parking: false,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Historical architecture', 'Haunted stories'],
  localFood: ['Pune snacks', 'Misal pav'],
  ratings: { average: 4.1, count: 4900 },
  isVerified: true
},
{
  name: 'Golconda Fort',
  description: '11th-century fort famous for acoustics and the Fateh Rahben cannon.',
  location: {
    type: 'Point',
    coordinates: [78.4011, 17.3833],
    address: 'Ibrahim Bagh, Hyderabad, Telangana 500008',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India'
  },
  category: 'fort',
  images: [
    {
      url: 'https://s7ap1.scene7.com/is/image/incredibleindia/golconda-fort-hyderabad-secunderabad-telangana-1-musthead-hero?qlt=82&ts=1742170130583',
      caption: 'Golconda Fort, Hyderabad',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Ruled by Qutb Shahi dynasty; famed for diamonds.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹15', foreign: '₹200' },
    timings: { opening: '9:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
    duration: '2-3 hours',
    accessibility: 'Stone paths, stairs'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Acoustics', 'History'],
  localFood: ['Hyderabadi snacks'],
  ratings: { average: 4.3, count: 9100 },
  isVerified: true
},
{
  name: 'Raja Rajeshwara Temple',
  description: 'Ancient Chola dynasty temple famous for its architecture.',
  location: {
    type: 'Point',
    coordinates: [79.1365, 10.7826],
    address: 'Thanjavur, Tamil Nadu 613007',
    city: 'Thanjavur',
    state: 'Tamil Nadu',
    country: 'India'
  },
  category: 'temple',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE2mqmFObvyH6nKq9ao3blbir_jUekHo9bRA&s',
      caption: 'Raja Rajeshwara Temple',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Brihadeeswarar Temple, UNESCO World Heritage site, built in 1010 AD.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: '6:00 AM', closing: '8:30 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Stone walkway'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Chola architecture', 'UNESCO site'],
  localFood: ['Thanjavur cuisine'],
  ratings: { average: 4.8, count: 15300 },
  isVerified: true
},
{
  name: 'Kumarakom Lake',
  description: 'Peaceful lake destination famed for houseboats and bird sanctuary.',
  location: {
    type: 'Point',
    coordinates: [76.4289, 9.6170],
    address: 'Kumarakom, Kottayam, Kerala 686563',
    city: 'Kumarakom',
    state: 'Kerala',
    country: 'India'
  },
  category: 'lake',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlK1rkY-EtBGD_49dcZ8CQ10Mp86_l8XU-Yw&s',
      caption: 'Kumarakom Lake, Kerala',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Tourism hub in Kerala with rich aquatic biodiversity.',
    bestTimeToVisit: 'September to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '1-2 days',
    accessibility: 'Boats, walkways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Houseboats', 'Birdwatching'],
  localFood: ['Kerala cuisine'],
  ratings: { average: 4.6, count: 5500 },
  isVerified: true
},
{
  name: 'Ananthagiri Hills',
  description: 'Lush green hills, famous for trekking and coffee plantations.',
  location: {
    type: 'Point',
    coordinates: [78.3384, 17.3368],
    address: 'Ananthagiri, Vikarabad, Telangana 501101',
    city: 'Vikarabad',
    state: 'Telangana',
    country: 'India'
  },
  category: 'hill-station',
  images: [
    {
      url: 'https://www.shutterstock.com/image-photo/this-image-taken-hill-top-600nw-1458093974.jpg',
      caption: 'Ananthagiri Hills, Telangana',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Popular for coffee estates and Anantha Padmanabha Swamy temple.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '1-2 days',
    accessibility: 'Mountain trails'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: true,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Trekking', 'Nature'],
  localFood: ['Telangana dishes'],
  ratings: { average: 4.2, count: 3700 },
  isVerified: true
},
{
  name: 'Museum of Goa',
  description: 'Contemporary art museum featuring ateliers and exhibitions.',
  location: {
    type: 'Point',
    coordinates: [73.8042, 15.4664],
    address: 'Pilerne, Bardez, Goa 403511',
    city: 'Pilerne',
    state: 'Goa',
    country: 'India'
  },
  category: 'museum',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj7VGgnEPciARdhln6N7LgDnQbcgtu3st5dg&s',
      caption: 'Museum of Goa',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Established in 2015 to promote contemporary art.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹100', foreign: '₹300' },
    timings: { opening: '10:00 AM', closing: '6:00 PM', weeklyOff: 'Monday' },
    duration: '1-2 hours',
    accessibility: 'Urban roads'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Contemporary art', 'Exhibitions'],
  localFood: ['Goan snacks'],
  ratings: { average: 4.4, count: 1400 },
  isVerified: true
},
{
  name: 'Lakhota Lake',
  description: 'Historic man-made lake and palace in Jamnagar.',
  location: {
    type: 'Point',
    coordinates: [70.0687, 22.4728],
    address: 'Jamnagar, Gujarat 361005',
    city: 'Jamnagar',
    state: 'Gujarat',
    country: 'India'
  },
  category: 'lake',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHQYlQrlaNyo50dXeQLncG9ZYMVOy0pEb7XQ&s',
      caption: 'Lakhota Lake, Jamnagar',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Lake palace and birdwatching hub.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Paved paths'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: false,
    wheelchairAccessible: true
  },
  famousFor: ['Birdwatching', 'Lake palace'],
  localFood: ['Gujarati snacks'],
  ratings: { average: 4.2, count: 2100 },
  isVerified: true
},
{
  name: 'Ranganathaswamy Temple, Srirangam',
  description: 'Largest functioning Hindu temple complex in the world, dedicated to Lord Ranganatha.',
  location: {
    type: 'Point',
    coordinates: [78.6824, 10.8682],
    address: 'Srirangam Island, Tiruchirappalli, Tamil Nadu 620006',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    country: 'India'
  },
  category: 'temple',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq_M0smaOj1QyCXHQB5h7KMrCqcHaqahxcXA&s',
      caption: 'Ranganathaswamy Temple, Srirangam',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Significant Dravidian style temple dating back to the 9th century.',
    bestTimeToVisit: 'September to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: '5:30 AM', closing: '10:00 PM', weeklyOff: 'false' },
    duration: '2-3 hours',
    accessibility: 'Wheelchair accessible pathways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Architecture', 'Religious significance'],
  localFood: ['Traditional Tamil cuisine'],
  ratings: { average: 4.7, count: 10100 },
  isVerified: true
},
{
  name: 'Mysore Palace',
  description: 'Historical royal residence in Mysore with stunning Indo-Saracenic architecture.',
  location: {
    type: 'Point',
    coordinates: [76.5741, 12.3051],
    address: 'Amba Vilas Palace, Mysore, Karnataka 570001',
    city: 'Mysore',
    state: 'Karnataka',
    country: 'India'
  },
  category: 'palace',
  images: [
    {
      url: 'https://karnatakatourism.org/wp-content/uploads/2020/06/Mysuru-Palace-banner-1920_1100.jpg',
      caption: 'Mysore Palace at night',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Built in early 20th century as the seat of Wodeyar dynasty.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹70', foreign: '₹200' },
    timings: { opening: '10:00 AM', closing: '5:30 PM', weeklyOff: 'false' },
    duration: '2-3 hours',
    accessibility: 'Wheelchair accessible'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Palatial architecture', 'Illumination nights'],
  localFood: ['Mysore Pak', 'South Indian delicacies'],
  ratings: { average: 4.8, count: 24600 },
  isVerified: true
},
{
  name: 'Kedarnath Temple',
  description: 'One of the twelve Jyotirlingas, located in the Himalayas.',
  location: {
    type: 'Point',
    coordinates: [79.0662, 30.7352],
    address: 'Kedarnath, Uttarakhand 246446',
    city: 'Kedarnath',
    state: 'Uttarakhand',
    country: 'India'
  },
  category: 'temple',
  images: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Kedarnath_Temple_in_Rainy_season.jpg',
      caption: 'Kedarnath Temple',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Ancient Himalayan shrine, pilgrimage site.',
    bestTimeToVisit: 'May to October',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: '6:00 AM', closing: '8:00 PM', weeklyOff: 'false' },
    duration: '2-4 hours',
    accessibility: 'Difficult terrain, pilgrimage trek'
  },
  amenities: {
    parking: false,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Religious pilgrimage', 'Mountain views'],
  localFood: ['Local vegetarian meals'],
  ratings: { average: 4.9, count: 7800 },
  isVerified: true
},
{
  name: 'Jaisalmer Fort',
  description: 'Golden sandstone fort known as the "Golden Fort".',
  location: {
    type: 'Point',
    coordinates: [70.9154, 26.9157],
    address: 'Jaisalmer, Rajasthan 345001',
    city: 'Jaisalmer',
    state: 'Rajasthan',
    country: 'India'
  },
  category: 'fort',
  images: [
    {
      url: 'https://res.cloudinary.com/kmadmin/image/upload/v1725880849/kiomoi/jaislamer_fort_night_view_1914.jpg',
      caption: 'Jaisalmer Fort',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Built in 1156 AD, still inhabited.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹50', foreign: '₹100' },
    timings: { opening: '9:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '2-3 hours',
    accessibility: 'Narrow stairs and pathways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Architecture', 'Desert vibes'],
  localFood: ['Rajasthani snacks'],
  ratings: { average: 4.5, count: 9400 },
  isVerified: true
},
{
  name: 'Varkala Beach',
  description: 'Cliff-backed beach on the Arabian Sea coast, known for natural springs.',
  location: {
    type: 'Point',
    coordinates: [76.7131, 8.7333],
    address: 'Varkala, Thiruvananthapuram, Kerala 695141',
    city: 'Varkala',
    state: 'Kerala',
    country: 'India'
  },
  category: 'beach',
  images: [
    {
      url: 'https://media.istockphoto.com/id/480488320/photo/varkala-beach.jpg?s=612x612&w=0&k=20&c=5SYA2c16CxBsFo_DHEM0nF21n3ZeUpImpYkqnGzHTUU=',
      caption: 'Varkala Beach, Kerala',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Famous for beaches and Janardana Swami Temple.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '2-4 hours',
    accessibility: 'Cliff stairs, beach access'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Cliffs', 'Water springs'],
  localFood: ['Kerala seafood'],
  ratings: { average: 4.6, count: 7700 },
  isVerified: true
},
{
  name: 'Nagarjuna Sagar Dam',
  description: 'One of the world’s largest masonry dams.',
  location: {
    type: 'Point',
    coordinates: [79.4500, 16.5400],
    address: 'Nagarjuna Sagar, Nalgonda, Telangana 508254',
    city: 'Nagarjuna Sagar',
    state: 'Telangana',
    country: 'India'
  },
  category: 'other',
  images: [
    {
      url: 'https://s7ap1.scene7.com/is/image/incredibleindia/nagarjuna-sagar-dam-hyderabad-telangana-3-musthead-hero?qlt=82&ts=1742173736647',
      caption: 'Nagarjuna Sagar Dam',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Built between 1955-1967 for irrigation and hydropower.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: '8:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Easily accessible'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Engineering marvel', 'Reservoir'],
  localFood: ['Telangana regional cuisine'],
  ratings: { average: 4.3, count: 2100 },
  isVerified: true
},
{
  name: 'Kanha National Park',
  description: 'Tiger reserve with rich biodiversity and picturesque landscapes.',
  location: {
    type: 'Point',
    coordinates: [80.5700, 22.3300],
    address: 'Kanha, Mandla, Madhya Pradesh',
    city: 'Mandla',
    state: 'Madhya Pradesh',
    country: 'India'
  },
  category: 'wildlife',
  images: [
    {
      url: 'https://media.istockphoto.com/id/1088382834/photo/tiger-in-its-habitat.jpg?s=612x612&w=0&k=20&c=7-40MIsM0rJWQXIceF7ZqZEYBTUXEtGmjCfh8dClLBQ=',
      caption: 'Kanha National Park',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Wildlife sanctuary known for tiger conservation.',
    bestTimeToVisit: 'October to June',
    entryFee: { indian: '₹100', foreign: '₹650' },
    timings: { opening: '6:30 AM', closing: '6:00 PM', weeklyOff: 'Wednesday afternoon' },
    duration: '3-6 hours',
    accessibility: 'Forest pathways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Tiger safaris', 'Flora and fauna'],
  localFood: ['Local cuisine'],
  ratings: { average: 4.7, count: 5300 },
  isVerified: true
},
{
  name: 'Gulmarg',
  description: 'Hill station in Jammu and Kashmir, renowned for skiing and natural beauty.',
  location: {
    type: 'Point',
    coordinates: [74.3815, 34.0486],
    address: 'Gulmarg, Baramulla, Jammu & Kashmir 193403',
    city: 'Gulmarg',
    state: 'Jammu & Kashmir',
    country: 'India'
  },
  category: 'hill-station',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTybCYtRpbczbEzZMYYXevQc8-xX8If8QrlgA&s',
      caption: 'Gulmarg Ski Slopes',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Popular winter sports destination.',
    bestTimeToVisit: 'December to February',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '2-4 days',
    accessibility: 'Mountain roads'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Skiing', 'Snow'],
  localFood: ['Kashmiri cuisine'],
  ratings: { average: 4.6, count: 10500 },
  isVerified: true
},
{
  name: 'Jantar Mantar Jaipur',
  description: 'Astronomical observatory built in the 18th century.',
  location: {
    type: 'Point',
    coordinates: [75.8239, 26.9245],
    address: 'Jawahar Lal Nehru Marg, Jaipur, Rajasthan 302005',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India'
  },
  category: 'monument',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpDMYkr-uK26UhZFhHisJ1gU-cChzR4wD4mw&s',
      caption: 'Jantar Mantar, Jaipur',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'UNESCO World Heritage site with large scale astronomical instruments.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹50', foreign: '₹200' },
    timings: { opening: '9:00 AM', closing: '4:30 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Accessible pathways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Astronomy', 'Heritage'],
  localFood: ['Rajasthani snacks'],
  ratings: { average: 4.5, count: 8500 },
  isVerified: true
},
{
  name: 'Mahabalipuram',
  description: 'UNESCO World Heritage site noted for its rock-cut temples and sculptures.',
  location: {
    type: 'Point',
    coordinates: [80.1900, 12.6190],
    address: 'Mahabalipuram, Tamil Nadu 603104',
    city: 'Mahabalipuram',
    state: 'Tamil Nadu',
    country: 'India'
  },
  category: 'heritage',
  images: [
    {
      url: 'https://images.unsplash.com/photo-1717480103667-fc55675a9ae4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFoYWJhbGlwdXJhbXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000',
      caption: 'Mahabalipuram Shore Temple',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Famous 7th-century Pallava architecture.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹40', foreign: '₹600' },
    timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '2-3 hours',
    accessibility: 'Accessible for most visitors'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Temples', 'Rock art'],
  localFood: ['Coastal Tamil cuisine'],
  ratings: { average: 4.7, count: 11400 },
  isVerified: true
},
{
  name: 'Kamakhya Temple',
  description: 'Ancient Hindu temple dedicated to Goddess Kamakhya atop Nilachal Hill.',
  location: {
    type: 'Point',
    coordinates: [91.6868, 26.1684],
    address: 'Kamakhya, Guwahati, Assam 781010',
    city: 'Guwahati',
    state: 'Assam',
    country: 'India'
  },
  category: 'temple',
  images: [
    {
      url: 'https://s7ap1.scene7.com/is/image/incredibleindia/kamakhya-temple-dispur-assam-2-attr-hero?qlt=82&ts=1742179171313',
      caption: 'Kamakhya Temple, Guwahati',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Important Shakti Peeth; ancient temple architecture.',
    bestTimeToVisit: 'October to April',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: '5:30 AM', closing: '8:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Hillside stairways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Spiritual energy', 'Ambubachi Mela'],
  localFood: ['Assamese thali'],
  ratings: { average: 4.7, count: 12000 },
  isVerified: true
},

{
  name: 'Borra Caves',
  description: 'Deep limestone caves with fascinating stalactites and stalagmites.',
  location: {
    type: 'Point',
    coordinates: [83.0420, 18.3275],
    address: 'Ananthagiri Hills, Araku Valley, Andhra Pradesh 531149',
    city: 'Araku Valley',
    state: 'Andhra Pradesh',
    country: 'India'
  },
  category: 'other',
  images: [
    {
      url: 'https://wanderingtalestraveldreams.com/wp-content/uploads/2019/01/entrance-to-borra-caves.jpg?w=1120',
      caption: 'Borra Caves, Andhra Pradesh',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Discovered in 1807; natural wonder with tribal legends.',
    bestTimeToVisit: 'November to February',
    entryFee: { indian: '₹60', foreign: '₹450' },
    timings: { opening: '10:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Stone pathways, some steps'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Cave formations', 'Photography'],
  localFood: ['Andhra snacks'],
  ratings: { average: 4.6, count: 3200 },
  isVerified: true
},
{
  name: 'Loktak Lake',
  description: 'Largest freshwater lake in Northeast India, known for floating phumdis.',
  location: {
    type: 'Point',
    coordinates: [93.8321, 24.4985],
    address: 'Moibul, Bishnupur, Manipur 795126',
    city: 'Moibul',
    state: 'Manipur',
    country: 'India'
  },
  category: 'lake',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRID2jmn5DBLxxYGilMzZe1_baA0MbWKLe6kQ&s',
      caption: 'Loktak Lake, Manipur',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Unique for its circling biomass islands called "phumdis."',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Lake view bridges, boat rides'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Boating', 'Scenic lakescape'],
  localFood: ['Manipuri fish curry'],
  ratings: { average: 4.7, count: 4300 },
  isVerified: true
},
{
  name: 'Dhanaulti',
  description: 'Serene hill station known for tranquil environment and Eco Park.',
  location: {
    type: 'Point',
    coordinates: [78.2316, 30.4112],
    address: 'Dhanaulti, Tehri Garhwal, Uttarakhand 249180',
    city: 'Dhanaulti',
    state: 'Uttarakhand',
    country: 'India'
  },
  category: 'hill-station',
  images: [
    {
      url: 'https://www.holidify.com/images/bgImages/DHANAULTI.jpg',
      caption: 'Eco Park, Dhanaulti',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Emerging tourist destination, gateway to Himalayan treks.',
    bestTimeToVisit: 'March to June',
    entryFee: { indian: '₹20', foreign: '₹50' },
    timings: { opening: '9:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '2-3 days',
    accessibility: 'Mountain road'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Eco Park', 'Quiet retreats'],
  localFood: ['Kumaoni meals'],
  ratings: { average: 4.4, count: 2200 },
  isVerified: true
},
{
  name: 'Nehru Zoological Park',
  description: 'Expansive zoo and animal conservation area in Hyderabad.',
  location: {
    type: 'Point',
    coordinates: [78.4512, 17.3507],
    address: 'NH 44, Bahadurpura, Hyderabad, Telangana 500064',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India'
  },
  category: 'wildlife',
  images: [
    {
      url: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2025/06/10104801/Nehru-Zoological-Park-Hyderabad-1600x900.jpg',
      caption: 'Nehru Zoological Park, Hyderabad',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Established in 1959; home to 1,500+ species.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹60', foreign: '₹300' },
    timings: { opening: '8:00 AM', closing: '5:30 PM', weeklyOff: 'Monday' },
    duration: '2-4 hours',
    accessibility: 'Garden paths'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Biodiversity', 'Safari ride'],
  localFood: ['Hyderabadi snacks'],
  ratings: { average: 4.5, count: 7800 },
  isVerified: true
},
{
  name: 'Lalbagh Botanical Garden',
  description: 'Famous botanical garden with a glasshouse and over 1,000 plant species.',
  location: {
    type: 'Point',
    coordinates: [77.5848, 12.9507],
    address: 'Lalbagh, Mavalli, Bengaluru, Karnataka 560004',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India'
  },
  category: 'other',
  images: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Glasshouse_and_fountain_at_lalbagh.jpg',
      caption: 'Lalbagh Botanical Garden, Bengaluru',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Commissioned by Hyder Ali in 1760.',
    bestTimeToVisit: 'December to February',
    entryFee: { indian: '₹25', foreign: '₹100' },
    timings: { opening: '6:00 AM', closing: '7:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Flat, paved walkways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Floral shows', 'Glasshouse'],
  localFood: ['Bangalore street food'],
  ratings: { average: 4.5, count: 17200 },
  isVerified: true
},
{
  name: 'Anthargange',
  description: 'Popular destination for volcanic rock formations and cave exploration.',
  location: {
    type: 'Point',
    coordinates: [78.1187, 13.1384],
    address: 'Anthargange, Kolar, Karnataka 563101',
    city: 'Kolar',
    state: 'Karnataka',
    country: 'India'
  },
  category: 'other',
  images: [
    {
      url: 'https://imgcld.yatra.com/ytimages/image/upload/v1517483523/AdvNation/ANN_TRP613/Anthargange_Trek_1470914765_cUAKeL.jpg',
      caption: 'Anthargange Caves',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Known for ancient volcanic activity.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹30', foreign: '₹100' },
    timings: { opening: '7:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Trekking pathway, stone steps'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Trekking', 'Cave exploration'],
  localFood: ['South Indian snacks'],
  ratings: { average: 4.4, count: 2900 },
  isVerified: true
},
{
  name: 'Chikmagalur',
  description: 'Hill station famous for coffee plantations and lush greenery.',
  location: {
    type: 'Point',
    coordinates: [75.7954, 13.3161],
    address: 'Chikmagalur, Karnataka 577101',
    city: 'Chikmagalur',
    state: 'Karnataka',
    country: 'India'
  },
  category: 'hill-station',
  images: [
    {
      url: 'https://www.shutterstock.com/image-photo/beautiful-hills-cape-chikmagalur-baba-600nw-2392517341.jpg',
      caption: 'Coffee plantations, Chikmagalur',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Known as India’s coffee land.',
    bestTimeToVisit: 'September to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '2-4 days',
    accessibility: 'Mountain roads'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Coffee', 'Trekking'],
  localFood: ['Malnad cuisine'],
  ratings: { average: 4.7, count: 5200 },
  isVerified: true
},
{
  name: 'Nalanda',
  description: 'Ruins of the ancient Buddhist university, UNESCO World Heritage site.',
  location: {
    type: 'Point',
    coordinates: [85.4434, 25.1368],
    address: 'Nalanda, Bihar 803111',
    city: 'Nalanda',
    state: 'Bihar',
    country: 'India'
  },
  category: 'heritage',
  images: [
    {
      url: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2024/06/18131552/nalanda-2.jpg?tr=w-1200,q-60',
      caption: 'Nalanda Mahavihara',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Famed ancient learning center.',
    bestTimeToVisit: 'November to February',
    entryFee: { indian: '₹40', foreign: '₹600' },
    timings: { opening: '9:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
    duration: '2-3 hours',
    accessibility: 'Flat pathways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Buddhist history', 'Archaeology'],
  localFood: ['Bihari snacks'],
  ratings: { average: 4.5, count: 4300 },
  isVerified: true
},
{
  name: 'Hussain Sagar Lake',
  description: 'Large artificial lake in Hyderabad, with a massive Buddha statue.',
  location: {
    type: 'Point',
    coordinates: [78.4745, 17.4239],
    address: 'Necklace Road, Hyderabad, Telangana 500003',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India'
  },
  category: 'lake',
  images: [
    {
      url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/3d/73/8b/straight-view-of-the.jpg?w=1200&h=-1&s=1',
      caption: 'Hussain Sagar Lake, Hyderabad',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Constructed in 1563 during the rule of Ibrahim Quli Qutb Shah.',
    bestTimeToVisit: 'November to February',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Promenades, boating'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: false,
    wheelchairAccessible: true
  },
  famousFor: ['Buddha statue', 'Boating'],
  localFood: ['Hyderabadi chaat'],
  ratings: { average: 4.3, count: 6900 },
  isVerified: true
},
{
  name: 'Salim Ali Bird Sanctuary',
  description: 'Prominent mangrove habitat in Goa for birdwatchers.',
  location: {
    type: 'Point',
    coordinates: [73.8351, 15.5169],
    address: 'Chorao Island, North Goa, Goa 403102',
    city: 'Chorao',
    state: 'Goa',
    country: 'India'
  },
  category: 'wildlife sancturary',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQauMokeBoYhHgQbVrOL3cf14RcDL3tzgB6cg&s',
      caption: 'Salim Ali Bird Sanctuary',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Named after the Indian ornithologist, prime spot for migratory birds.',
    bestTimeToVisit: 'November to February',
    entryFee: { indian: '₹20', foreign: '₹100' },
    timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Boats, walkways'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Birdwatching', 'Ecology'],
  localFood: ['Goan seafood'],
  ratings: { average: 4.2, count: 1100 },
  isVerified: true
},
{
  name: 'Kingdom of Dreams',
  description: 'India’s first live entertainment and leisure destination.',
  location: {
    type: 'Point',
    coordinates: [77.0700, 28.4687],
    address: 'Sector 29, Gurugram, Haryana 122001',
    city: 'Gurugram',
    state: 'Haryana',
    country: 'India'
  },
  category: 'other',
  images: [
    {
      url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/88/0f/9e/the-open-area.jpg?w=1200&h=1200&s=1',
      caption: 'Kingdom of Dreams, Gurugram',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Hosts Bollywood-style shows and cultural exhibitions.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹600', foreign: '₹1500' },
    timings: { opening: '12:30 PM', closing: '12:00 AM', weeklyOff: 'Monday' },
    duration: '3-4 hours',
    accessibility: 'Fully accessible'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Theatrical shows', 'Cultural events'],
  localFood: ['Multi-cuisine food court'],
  ratings: { average: 4.5, count: 3900 },
  isVerified: true
},
{
  name: 'Tso Moriri Lake',
  description: 'High-altitude lake known for incredible scenery and wildlife.',
  location: {
    type: 'Point',
    coordinates: [78.2656, 32.9957],
    address: 'Korzok, Leh district, Ladakh 194404',
    city: 'Korzok',
    state: 'Ladakh',
    country: 'India'
  },
  category: 'lake',
  images: [
    {
      url: 'https://discoverlehladakh.in/wp-content/uploads/2020/06/Tso-Moriri-Lake.jpg',
      caption: 'Tso Moriri Lake, Ladakh',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Designated as a Wetland of International Importance.',
    bestTimeToVisit: 'May to September',
    entryFee: { indian: 'ILP required', foreign: 'ILP required' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '1-2 days',
    accessibility: 'Remote, high mountain roads'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Scenery', 'Birdwatching'],
  localFood: ['Ladakhi cuisine'],
  ratings: { average: 4.9, count: 1300 },
  isVerified: true
},
{
  name: 'Cellular Jail',
  description: 'Colonial-era prison now a national memorial and museum.',
  location: {
    type: 'Point',
    coordinates: [92.7511, 11.6779],
    address: 'Atlanta Point, Port Blair, Andaman & Nicobar Islands 744104',
    city: 'Port Blair',
    state: 'Andaman & Nicobar Islands',
    country: 'India'
  },
  category: 'heritage',
  images: [
    {
      url: 'https://nomadicweekends.com/blog/wp-content/uploads/2019/12/Cellular-Jail-.jpg',
      caption: 'Cellular Jail, Port Blair',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Site of political imprisonment during British Raj.',
    bestTimeToVisit: 'November to March',
    entryFee: { indian: '₹30', foreign: '₹100' },
    timings: { opening: '9:00 AM', closing: '5:00 PM', weeklyOff: 'Monday' },
    duration: '1-2 hours',
    accessibility: 'Flat walkways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['History', 'Light and sound show'],
  localFood: ['Island seafood'],
  ratings: { average: 4.7, count: 5800 },
  isVerified: true
},
{
  name: 'Belum Caves',
  description: 'Longest caves open to the public on the Indian subcontinent.',
  location: {
    type: 'Point',
    coordinates: [78.1225, 15.1251],
    address: 'Belum Caves, Kolimigundla, Andhra Pradesh 518123',
    city: 'Kolimigundla',
    state: 'Andhra Pradesh',
    country: 'India'
  },
  category: 'other',
  images: [
    {
      url: 'hhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRWcvVcA_afz9OXvf8mlGW5DquZRZEeEw42A&s',
      caption: 'Belum Caves, Andhra Pradesh',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Formed by river action over thousands of years.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹50', foreign: '₹300' },
    timings: { opening: '10:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Cave passages, stairs'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Cave formations', 'Mystery'],
  localFood: ['Regional Andhra cuisine'],
  ratings: { average: 4.5, count: 2100 },
  isVerified: true
},
{
  name: 'Raja’s Seat',
  description: 'Popular viewpoint in Coorg offering panoramic valley vistas.',
  location: {
    type: 'Point',
    coordinates: [75.7339, 12.4185],
    address: 'Stuart Hill, Madikeri, Karnataka 571201',
    city: 'Madikeri',
    state: 'Karnataka',
    country: 'India'
  },
  category: 'other',
  images: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Raja%27s_Seat_View_Point.jpg/250px-Raja%27s_Seat_View_Point.jpg',
      caption: 'Raja’s Seat, Coorg',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Once a favorite recreational spot for kings.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹20', foreign: '₹50' },
    timings: { opening: '6:00 AM', closing: '7:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Garden pathways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: false,
    wheelchairAccessible: true
  },
  famousFor: ['Sunset view', 'Gardens'],
  localFood: ['Coorgi snacks'],
  ratings: { average: 4.4, count: 4200 },
  isVerified: true
},
{
  name: 'Diu Fort',
  description: 'Imposing Portuguese fort overlooking the Arabian Sea.',
  location: {
    type: 'Point',
    coordinates: [70.9213, 20.7147],
    address: 'Fort Road, Diu, Daman and Diu 362520',
    city: 'Diu',
    state: 'Daman and Diu',
    country: 'India'
  },
  category: 'fort',
  images: [
    {
      url: 'https://www.nriol.com/images/nani-fort-img.jpg',
      caption: 'Diu Fort',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Built by Portuguese in the 16th century.',
    bestTimeToVisit: 'November to February',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: '8:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Coastal paths, steps'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Sea views', 'Architecture'],
  localFood: ['Fish dishes'],
  ratings: { average: 4.6, count: 3900 },
  isVerified: true
},
{
  name: 'Hazaribagh Wildlife Sanctuary',
  description: 'Sanctuary in Jharkhand, known for dense forests and rare species.',
  location: {
    type: 'Point',
    coordinates: [85.4421, 23.9972],
    address: 'Hazaribagh, Jharkhand 825301',
    city: 'Hazaribagh',
    state: 'Jharkhand',
    country: 'India'
  },
  category: 'wildlife sancturary',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4fZszW93VE1dYRtGzLyjXGbzAFUgW9xJXYQ&s',
      caption: 'Hazaribagh Wildlife Sanctuary',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Established in 1955, covers over 184 sq.km.',
    bestTimeToVisit: 'November to March',
    entryFee: { indian: '₹40', foreign: '₹100' },
    timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '2-4 hours',
    accessibility: 'Forest trails'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Wildlife sightings', 'Birdwatching'],
  localFood: ['Jharkhandi snacks'],
  ratings: { average: 4.2, count: 1100 },
  isVerified: true
},
{
  name: 'Kovalam Beach',
  description: 'Internationally renowned beach town with crescent-shaped shores.',
  location: {
    type: 'Point',
    coordinates: [76.9781, 8.3844],
    address: 'Kovalam, Thiruvananthapuram, Kerala 695527',
    city: 'Kovalam',
    state: 'Kerala',
    country: 'India'
  },
  category: 'beach',
  images: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Kovalam_beach_trivandrum_kerala.jpg/1200px-Kovalam_beach_trivandrum_kerala.jpg',
      caption: 'Kovalam Beach, Kerala',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Tourist destination popular since the 1930s.',
    bestTimeToVisit: 'October to February',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '2-5 hours',
    accessibility: 'Paved paths'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: false,
    wheelchairAccessible: true
  },
  famousFor: ['Sunbathing', 'Surfing'],
  localFood: ['Kerala seafood'],
  ratings: { average: 4.6, count: 12100 },
  isVerified: true
},
{
  name: 'Bharatpur Bird Sanctuary',
  description: 'Premier avifauna sanctuary and Ramsar Wetland site.',
  location: {
    type: 'Point',
    coordinates: [77.5212, 27.1576],
    address: 'Keoladeo National Park, Bharatpur, Rajasthan 321001',
    city: 'Bharatpur',
    state: 'Rajasthan',
    country: 'India'
  },
  category: 'wildlife sancturary',
  images: [
    {
      url: 'https://www.ranthamborenationalpark.in/images/bharatpur_sanctuary.jpg',
      caption: 'Bharatpur Bird Sanctuary',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'UNESCO World Heritage Site, established 1971.',
    bestTimeToVisit: 'November to March',
    entryFee: { indian: '₹75', foreign: '₹500' },
    timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '2-4 hours',
    accessibility: 'Flat paths, cycle rickshaws'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Birdwatching', 'Wetland ecosystem'],
  localFood: ['Rajasthani snacks'],
  ratings: { average: 4.7, count: 4200 },
  isVerified: true
},
{
  name: 'Pichola Lake',
  description: 'Scenic artificial lake of Udaipur surrounded by palaces.',
  location: {
    type: 'Point',
    coordinates: [73.6832, 24.5711],
    address: 'Udaipur, Rajasthan 313001',
    city: 'Udaipur',
    state: 'Rajasthan',
    country: 'India'
  },
  category: 'lake',
  images: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Udaipur_Lake_India.JPG',
      caption: 'Lake Pichola, Udaipur',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Constructed in 1362; features Lake Palace.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '2-3 hours',
    accessibility: 'Boat rides, promenades'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Lake Palace', 'Boating'],
  localFood: ['Mewari cuisine'],
  ratings: { average: 4.8, count: 6400 },
  isVerified: true
},
{
  name: 'Kibber Wildlife Sanctuary',
  description: 'High-altitude nature reserve in Spiti Valley, Himachal Pradesh.',
  location: {
    type: 'Point',
    coordinates: [78.0004, 32.3247],
    address: 'Kibber, Spiti, Himachal Pradesh 172114',
    city: 'Kibber',
    state: 'Himachal Pradesh',
    country: 'India'
  },
  category: 'wildlife sancturary',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ32KoAeE4jWFVt382CXFo-mYGJefmfBE8K3g&s',
      caption: 'Kibber, Spiti Valley',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Known for snow leopard sightings and Himalayan fauna.',
    bestTimeToVisit: 'May to October',
    entryFee: { indian: '₹150', foreign: '₹500' },
    timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '4-6 hours',
    accessibility: 'Mountainous terrain'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Wildlife trekking', 'Himalayan scenery'],
  localFood: ['Spitian cuisine'],
  ratings: { average: 4.8, count: 900 },
  isVerified: true
},
{
  name: 'Salar Jung Museum',
  description: 'Renowned museum with one of the largest collections of antiques in the world.',
  location: {
    type: 'Point',
    coordinates: [78.4742, 17.3713],
    address: 'Salar Jung Road, Hyderabad, Telangana 500002',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India'
  },
  category: 'museum',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVDleS3mhqjcgZmRb6BTkF1CJyjlkWSFtl5Q&s',
      caption: 'Salar Jung Museum',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Houses the personal collection of Salar Jung family.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹50', foreign: '₹500' },
    timings: { opening: '10:00 AM', closing: '5:00 PM', weeklyOff: 'Friday' },
    duration: '2-4 hours',
    accessibility: 'Urban roads, accessible'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Art collection', 'Rare antiques'],
  localFood: ['Hyderabadi snacks'],
  ratings: { average: 4.7, count: 6100 },
  isVerified: true
},
{
  name: 'Ooty Lake',
  description: 'Man-made lake popular for boating amidst scenic Nilgiris.',
  location: {
    type: 'Point',
    coordinates: [76.6950, 11.4086],
    address: 'Ooty, Tamil Nadu 643001',
    city: 'Ooty',
    state: 'Tamil Nadu',
    country: 'India'
  },
  category: 'lake',
  images: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Ooty_Lake_in_Tamil_Nadu_04.jpg',
      caption: 'Ooty Lake',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Built in 1824 by John Sullivan.',
    bestTimeToVisit: 'March to June',
    entryFee: { indian: '₹15', foreign: '₹50' },
    timings: { opening: '9:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '2-3 hours',
    accessibility: 'Accessible for most visitors'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Boating', 'Scenery'],
  localFood: ['South Indian snacks'],
  ratings: { average: 4.6, count: 5300 },
  isVerified: true
},
{
  name: 'Jaldapara National Park',
  description: 'Sanctuary in West Bengal famous for Indian one-horned rhinoceros.',
  location: {
    type: 'Point',
    coordinates: [89.4167, 26.6878],
    address: 'Jaldapara, Alipurduar, West Bengal 735220',
    city: 'Alipurduar',
    state: 'West Bengal',
    country: 'India'
  },
  category: 'wildlife sancturary',
  images: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Elephant_safari.jpg',
      caption: 'Jaldapara National Park',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Established as wildlife sanctuary in 1941.',
    bestTimeToVisit: 'October to May',
    entryFee: { indian: '₹100', foreign: '₹200' },
    timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '2-5 hours',
    accessibility: 'Forest trails'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Rhinos', 'Elephant safari'],
  localFood: ['Bengali snacks'],
  ratings: { average: 4.7, count: 1200 },
  isVerified: true
},
{
  name: 'Rock Garden, Chandigarh',
  description: 'Famed sculpture garden built entirely from industrial & home waste.',
  location: {
    type: 'Point',
    coordinates: [76.8100, 30.7522],
    address: 'Sector 1, Chandigarh 160001',
    city: 'Chandigarh',
    state: 'Chandigarh',
    country: 'India'
  },
  category: 'other',
  images: [
    {
      url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/4c/43/64/the-rock-garden-of-chandigarh.jpg?w=900&h=500&s=1',
      caption: 'Rock Garden, Chandigarh',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Created by Nek Chand, unique folk art site.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹40', foreign: '₹100' },
    timings: { opening: '9:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '2-3 hours',
    accessibility: 'Stone pathways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Art', 'Upcycling'],
  localFood: ['Punjabi snacks'],
  ratings: { average: 4.6, count: 11300 },
  isVerified: true
},
{
  name: 'Gangaikonda Cholapuram',
  description: 'Magnificent Chola Dynasty temple famed for its stone sculptures.',
  location: {
    type: 'Point',
    coordinates: [79.4501, 11.2015],
    address: 'Jayankondam, Ariyalur, Tamil Nadu 621802',
    city: 'Jayankondam',
    state: 'Tamil Nadu',
    country: 'India'
  },
  category: 'temple',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1ojAo9CPvbgAEuztdZZZgcqlyUVjRzAbFSQ&s',
      caption: 'Gangaikonda Cholapuram',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Built by Rajendra Chola I in 11th century.',
    bestTimeToVisit: 'November to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: '6:00 AM', closing: '8:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Stone walkways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['UNESCO site', 'Stone carvings'],
  localFood: ['Tamil Nadu cuisine'],
  ratings: { average: 4.8, count: 2300 },
  isVerified: true
},
{
  name: 'Tipu Sultan\'s Summer Palace',
  description: 'Ornate palace made of teakwood, historic seat of the Mysorean ruler.',
  location: {
    type: 'Point',
    coordinates: [77.5732, 12.9597],
    address: 'KR Road, Chamarajpet, Bengaluru, Karnataka 560018',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India'
  },
  category: 'palace',
  images: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Tippu_Sultan%27s_Summer_palace.jpg',
      caption: 'Tipu Sultan\'s Summer Palace',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Completed in 1791, showing Indo-Islamic architecture.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹20', foreign: '₹200' },
    timings: { opening: '8:30 AM', closing: '5:30 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Accessible pathways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Architecture', 'History'],
  localFood: ['Bangalore snacks'],
  ratings: { average: 4.5, count: 3700 },
  isVerified: true
},
{
  name: 'Bhimbetka Rock Shelters',
  description: 'Prehistoric cave shelters with ancient petroglyphs and paintings.',
  location: {
    type: 'Point',
    coordinates: [77.6110, 22.9384],
    address: 'Bhimbetka, Raisen, Madhya Pradesh',
    city: 'Bhimbetka',
    state: 'Madhya Pradesh',
    country: 'India'
  },
  category: 'heritage',
  images: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Rock_Shelter_8%2C_Bhimbetka_02.jpg/1200px-Rock_Shelter_8%2C_Bhimbetka_02.jpg',
      caption: 'Bhimbetka Rock Shelters',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'UNESCO World Heritage rock art site.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹50', foreign: '₹250' },
    timings: { opening: '8:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Forest paths, some steps'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Rock paintings', 'Archaeology'],
  localFood: ['Madhya Pradesh snacks'],
  ratings: { average: 4.7, count: 2900 },
  isVerified: true
},
{
  name: 'Hazratbal Shrine',
  description: 'Important Muslim religious site by Dal Lake, known for the holy relic.',
  location: {
    type: 'Point',
    coordinates: [74.8689, 34.1341],
    address: 'Hazratbal, Srinagar, Jammu & Kashmir',
    city: 'Srinagar',
    state: 'Jammu & Kashmir',
    country: 'India'
  },
  category: 'other',
  images: [
    {
      url: 'https://s7ap1.scene7.com/is/image/incredibleindia/hazratbal-mosque-srinagar-jammu--kashmir-5-musthead-hero?qlt=82&ts=1726728866101',
      caption: 'Hazratbal Shrine, Srinagar',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Houses the believed hair of Prophet Muhammad.',
    bestTimeToVisit: 'March to October',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: '8:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '1 hour',
    accessibility: 'Urban streets'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: false,
    wheelchairAccessible: true
  },
  famousFor: ['Religious relic', 'Peaceful views'],
  localFood: ['Kashmiri snacks'],
  ratings: { average: 4.8, count: 2200 },
  isVerified: true
},
{
  name: 'Jampui Hills',
  description: 'Scenic hills in Tripura offering orange orchards and trekking trails.',
  location: {
    type: 'Point',
    coordinates: [92.0068, 24.0608],
    address: 'Jampui Hills, North Tripura, Tripura',
    city: 'North Tripura',
    state: 'Tripura',
    country: 'India'
  },
  category: 'hill-station',
  images: [
    {
      url: 'https://tripuratourism.gov.in/images/tour/1661756901/71.jpg',
      caption: 'Jampui Hills, Tripura',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Known for indigenous cultural tribes and scenic beauty.',
    bestTimeToVisit: 'November to February',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '1-2 days',
    accessibility: 'Hill roads'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: false,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Orchards', 'Trekking'],
  localFood: ['Tripuri cuisine'],
  ratings: { average: 4.3, count: 650 },
  isVerified: true
},
{
  name: 'Vishnuprayag',
  description: 'Sacred confluence of Alaknanda and Dhauliganga rivers, a hindu pilgrimage site.',
  location: {
    type: 'Point',
    coordinates: [79.2877, 30.3008],
    address: 'Chamoli, Uttarakhand',
    city: 'Chamoli',
    state: 'Uttarakhand',
    country: 'India'
  },
  category: 'heritage',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcqAVkge2xjlW_5a7BpW86_h0KdM5tppAVfg&s',
      caption: 'Vishnuprayag, Uttarakhand',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'One of the Panch Prayag (five sacred river confluences).',
    bestTimeToVisit: 'April to June',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Accessible by road'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: false,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['River confluence', 'Pilgrimage'],
  localFood: ['Local Uttarakhandi cuisine'],
  ratings: { average: 4.5, count: 1300 },
  isVerified: true
},
{
  name: 'Chitrakoot',
  description: 'Town sacred in Hindu mythology, known for Ramghat and waterfalls.',
  location: {
    type: 'Point',
    coordinates: [80.7515, 25.2103],
    address: 'Chitrakoot, Uttar Pradesh',
    city: 'Chitrakoot',
    state: 'Uttar Pradesh',
    country: 'India'
  },
  category: 'heritage',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcNnx4Og_x01bTWCoN7Sd6h3tbHJrdkniQiA&s',
      caption: 'Ramghat, Chitrakoot',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Important site in Ramayana, pilgrimage destination.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: '5:00 AM', closing: '8:00 PM', weeklyOff: 'false' },
    duration: '1-2 days',
    accessibility: 'Accessible by road'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Spiritual sites', 'Waterfalls'],
  localFood: ['Uttar Pradesh cuisine'],
  ratings: { average: 4.4, count: 2900 },
  isVerified: true
},
{
  name: 'Chapora Fort',
  description: 'Historic fort overlooking the Arabian Sea in Goa.',
  location: {
    type: 'Point',
    coordinates: [73.7214, 15.6080],
    address: 'Chapora, Bardez, Goa',
    city: 'Chapora',
    state: 'Goa',
    country: 'India'
  },
  category: 'fort',
  images: [
    {
      url: 'https://www.tourmyindia.com/socialimg/chapora-fort-goa.jpg',
      caption: 'Chapora Fort, Goa',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Portuguese fort with picturesque views of the sea.',
    bestTimeToVisit: 'November to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Hiking trails'
  },
  amenities: {
    parking: false,
    restrooms: false,
    restaurant: false,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Sunset views', 'Photography'],
  localFood: ['Goan seafood'],
  ratings: { average: 4.3, count: 3200 },
  isVerified: true
},
{
  name: 'Bhutanata Temple',
  description: 'Terracotta temple famous for intricate art in Bishnupur, West Bengal.',
  location: {
    type: 'Point',
    coordinates: [87.3063, 23.0425],
    address: 'Bishnupur, West Bengal 722122',
    city: 'Bishnupur',
    state: 'West Bengal',
    country: 'India'
  },
  category: 'temple',
  images: [
    {
      url: 'https://s7ap1.scene7.com/is/image/incredibleindia/bhutanatha-temple-badami-karnataka-2-attr-hero?qlt=82&ts=1726717552241',
      caption: 'Bhutanata Temple',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Built by Malla kings, noted for terracotta work.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹20', foreign: '₹50' },
    timings: { opening: '9:00 AM', closing: '5:00 PM', weeklyOff: 'Monday' },
    duration: '1-2 hours',
    accessibility: 'Accessible'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Terracotta art', 'Architecture'],
  localFood: ['Bengali sweets'],
  ratings: { average: 4.4, count: 1200 },
  isVerified: true
},
{
  name: 'Chandraprabha Wildlife Sanctuary',
  description: 'Sanctuary famous for waterfalls and rich biodiversity in Uttar Pradesh.',
  location: {
    type: 'Point',
    coordinates: [83.4500, 24.2750],
    address: 'Chandraprabha, Uttar Pradesh 231302',
    city: 'Chandraprabha',
    state: 'Uttar Pradesh',
    country: 'India'
  },
  category: 'wildlife sancturary',
  images: [
    {
      url: 'https://s7ap1.scene7.com/is/image/incredibleindia/chandra-prabha-wildlife-sanctuary-varanasi-uttar-pradesh-3-attr-hero?qlt=82&ts=1727353304757',
      caption: 'Chandraprabha Wildlife Sanctuary',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Established in 1957 known for waterfalls & forest wildlife.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹30', foreign: '₹100' },
    timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '2-4 hours',
    accessibility: 'Forest roads'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Waterfalls', 'Wildlife'],
  localFood: ['Local snacks'],
  ratings: { average: 4.3, count: 900 },
  isVerified: true
},
{
  name: 'Chongansar Wildlife Sanctuary',
  description: 'Protected area in Tripura, known for diverse flora and fauna.',
  location: {
    type: 'Point',
    coordinates: [91.6861, 23.9350],
    address: 'Chongansar, Tripura',
    city: 'Chongansar',
    state: 'Tripura',
    country: 'India'
  },
  category: 'wildlife sancturary',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA_TSz0MdHBTB9YYB3DaNskgnA01j3Opv6Ig&s',
      caption: 'Chongansar Wildlife Sanctuary',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Wildlife habitat since 1988, part of Tripura forest reserve.',
    bestTimeToVisit: 'October to April',
    entryFee: { indian: '₹20', foreign: '₹50' },
    timings: { opening: '6:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
    duration: '3-5 hours',
    accessibility: 'Forest trails'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Birds', 'Mammals'],
  localFood: ['Tripura traditional dishes'],
  ratings: { average: 4.1, count: 400 },
  isVerified: true
},
{
  name: 'Sariska Tiger Reserve',
  description: 'Popular tiger reserve near Jaipur, Rajasthan.',
  location: {
    type: 'Point',
    coordinates: [76.4116, 27.2865],
    address: 'Sariska, Alwar, Rajasthan 301404',
    city: 'Alwar',
    state: 'Rajasthan',
    country: 'India'
  },
  category: 'wildlife',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQbGJz_8S9mXf-PEfhGZ0kc2zz0v0fx6QZw&s',
      caption: 'Sariska Tiger Reserve',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Declared Tiger reserve in 1979, large forested area.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹100', foreign: '₹650' },
    timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'Tuesday' },
    duration: '3-5 hours',
    accessibility: 'Forest roads'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Tiger sightings', 'Wildlife safari'],
  localFood: ['Rajasthani cuisine'],
  ratings: { average: 4.5, count: 7200 },
  isVerified: true
},
{
  name: 'Digha Beach',
  description: 'Popular seaside resort town in West Bengal.',
  location: {
    type: 'Point',
    coordinates: [87.5311, 21.6207],
    address: 'Digha, Purba Medinipur, West Bengal 721428',
    city: 'Digha',
    state: 'West Bengal',
    country: 'India'
  },
  category: 'beach',
  images: [
    {
      url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/00/60/71/digha-beach.jpg?w=1200&h=-1&s=1',
      caption: 'Digha Beach',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Popular weekend getaway and beach attraction.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '2-3 hours',
    accessibility: 'Good road connectivity'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Beach', 'Sunset'],
  localFood: ['Bengali seafood'],
  ratings: { average: 4.3, count: 5800 },
  isVerified: true
},
{
  name: 'Mandore Gardens',
  description: 'Ancient garden complex with cenotaphs of Rajput rulers.',
  location: {
    type: 'Point',
    coordinates: [73.3207, 26.3048],
    address: 'Mandore, Jodhpur, Rajasthan 342006',
    city: 'Jodhpur',
    state: 'Rajasthan',
    country: 'India'
  },
  category: 'heritage',
  images: [
    {
      url: 'https://static.toiimg.com/photo/54324634.cms',
      caption: 'Mandore Gardens',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Former capital of Marwar kingdom, gardens with historic cenotaphs.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹20', foreign: '₹100' },
    timings: { opening: '9:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '2-3 hours',
    accessibility: 'Paved paths'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Gardens', 'Historical monuments'],
  localFood: ['Rajasthani snacks'],
  ratings: { average: 4.4, count: 2600 },
  isVerified: true
},
{
  name: 'Khajuraho Group of Monuments',
  description: 'Famous for stunning medieval Hindu and Jain temples with intricate sculptures.',
  location: {
    type: 'Point',
    coordinates: [79.9192, 24.8322],
    address: 'Khajuraho, Madhya Pradesh 471606',
    city: 'Khajuraho',
    state: 'Madhya Pradesh',
    country: 'India'
  },
  category: 'heritage',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZKG8WjpbjoOpnFoM87CiUlAg_x24oHGs3Tg&s',
      caption: 'Khajuraho Temples',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'UNESCO World Heritage Site dating to 950–1050 AD.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹40', foreign: '₹600' },
    timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '2-4 hours',
    accessibility: 'Good walkways, some steps'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Sculpture', 'Architecture'],
  localFood: ['Madhya Pradesh cuisine'],
  ratings: { average: 4.7, count: 13900 },
  isVerified: true
},
{
  name: 'Sanchi Stupa',
  description: 'Ancient Buddhist complex famous for its Great Stupa built by Emperor Ashoka.',
  location: {
    type: 'Point',
    coordinates: [77.7350, 23.4856],
    address: 'Sanchi, Madhya Pradesh 464661',
    city: 'Sanchi',
    state: 'Madhya Pradesh',
    country: 'India'
  },
  category: 'heritage',
  images: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/East_Gateway_-_Stupa_1_-_Sanchi_Hill_2013-02-21_4398.JPG/330px-East_Gateway_-_Stupa_1_-_Sanchi_Hill_2013-02-21_4398.JPG',
      caption: 'Sanchi Stupa',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'UNESCO World Heritage Site associated with Ashoka’s reign.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹30', foreign: '₹500' },
    timings: { opening: '8:30 AM', closing: '5:30 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Good walkways and ramps'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Buddhist architecture', 'Relief sculptures'],
  localFood: ['Madhya Pradesh snacks'],
  ratings: { average: 4.6, count: 5100 },
  isVerified: true
},
{
  name: 'Sundarban National Park',
  description: 'Largest mangrove forest in the world, home to Royal Bengal Tigers.',
  location: {
    type: 'Point',
    coordinates: [88.7500, 21.9497],
    address: 'Sundarbans, Sundarbans, West Bengal 743611',
    city: 'Sundarbans',
    state: 'West Bengal',
    country: 'India'
  },
  category: 'wildlife sancturary',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvBK8ulL5mspPb4PRwFU68PAC64RD4Hb4TkQ&s',
      caption: 'Sundarban National Park',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'UNESCO World Heritage mangrove forest and tiger reserve.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹100', foreign: '₹1000' },
    timings: { opening: '7:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
    duration: '3-5 hours',
    accessibility: 'Boat tours'
  },
  amenities: {
    parking: false,
    restrooms: false,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Tigers', 'Mangrove ecosystem'],
  localFood: ['Bengali cuisine'],
  ratings: { average: 4.5, count: 7500 },
  isVerified: true
},
{
  name: 'Golden Temple',
  description: 'Holy Sikh shrine in Amritsar, famous for its golden architecture.',
  location: {
    type: 'Point',
    coordinates: [74.8670, 31.6200],
    address: 'Harmandir Sahib, Amritsar, Punjab 143006',
    city: 'Amritsar',
    state: 'Punjab',
    country: 'India'
  },
  category: 'temple',
  images: [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV-DQSJ5jITZg5wChL1qhV2I8o9A7akR5wWw&s',
      caption: 'Golden Temple, Amritsar',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Founded in 1577, spiritual center of Sikhism.',
    bestTimeToVisit: 'November to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: '4:00 AM', closing: '10:00 PM', weeklyOff: 'false' },
    duration: '1-3 hours',
    accessibility: 'Fully accessible'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Spirituality', 'Langar service'],
  localFood: ['Punjabi cuisine'],
  ratings: { average: 4.9, count: 56000 },
  isVerified: true
},
{
  name: 'Athirappilly Waterfalls',
  description: 'Largest waterfall in Kerala, known as the “Niagara of India”.',
  location: {
    type: 'Point',
    coordinates: [76.5947, 10.2817],
    address: 'Athirappilly, Thrissur, Kerala 680721',
    city: 'Athirappilly',
    state: 'Kerala',
    country: 'India'
  },
  category: 'waterfall',
  images: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/The_View_of_the_Athirapally_Falls_during_the_onset_of_Monsoon.jpg',
      caption: 'Athirappilly Waterfalls',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Popular location for films and nature lovers.',
    bestTimeToVisit: 'June to September',
    entryFee: { indian: '₹50', foreign: '₹100' },
    timings: { opening: '8:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Pathways with some steps'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Waterfall', 'Wildlife'],
  localFood: ['Kerala snacks'],
  ratings: { average: 4.6, count: 4800 },
  isVerified: true
},
{
  name: 'Konark Sun Temple',
  description: '13th-century sun temple known for its chariot-shaped architecture.',
  location: {
    type: 'Point',
    coordinates: [86.0958, 19.8876],
    address: 'Konark, Odisha 752111',
    city: 'Konark',
    state: 'Odisha',
    country: 'India'
  },
  category: 'heritage',
  images: [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/The_View_of_the_Athirapally_Falls_during_the_onset_of_Monsoon.jpg',
      caption: 'Konark Sun Temple',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'UNESCO World Heritage Site famous for its architectural grandeur.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹40', foreign: '₹600' },
    timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '2-3 hours',
    accessibility: 'Good pathways'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Architecture', 'Sculpture'],
  localFood: ['Odisha cuisine'],
  ratings: { average: 4.7, count: 7400 },
  isVerified: true
},
{
  name: 'Maravanthe Beach',
  description: 'Unique beach where the Arabian Sea and river run parallel.',
  location: {
    type: 'Point',
    coordinates: [74.5304, 13.9005],
    address: 'Maravanthe, Karnataka 576115',
    city: 'Maravanthe',
    state: 'Karnataka',
    country: 'India'
  },
  category: 'beach',
  images: [
    {
      url: 'https://s7ap1.scene7.com/is/image/incredibleindia/maravanthe-beach-gokarna-karnataka-1-attr-hero?qlt=82&ts=1726720759688',
      caption: 'Maravanthe Beach',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Famous natural phenomenon of beach and river side by side.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
    duration: '1-2 hours',
    accessibility: 'Good road access'
  },
  amenities: {
    parking: true,
    restrooms: false,
    restaurant: true,
    guide: false,
    wheelchairAccessible: false
  },
  famousFor: ['Scenic beauty', 'Unique geography'],
  localFood: ['Coastal Karnataka cuisine'],
  ratings: { average: 4.4, count: 3900 },
  isVerified: true
},
{
  name: 'Kanha Tiger Reserve',
  description: 'One of India’s largest tiger reserves located in Madhya Pradesh.',
  location: {
    type: 'Point',
    coordinates: [80.7115, 22.3344],
    address: 'Kanha, Mandla, Madhya Pradesh 481768',
    city: 'Mandla',
    state: 'Madhya Pradesh',
    country: 'India'
  },
  category: 'wildlife',
  images: [
    {
      url: 'https://www.kanhaearthlodge.com/blog/wp-content/uploads/2024/02/DSC01856-1-scaled.jpg',
      caption: 'Kanha Tiger Reserve',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Natural habitat for Bengal tigers and barasingha deer.',
    bestTimeToVisit: 'November to June',
    entryFee: { indian: '₹100', foreign: '₹650' },
    timings: { opening: '6:30 AM', closing: '6:00 PM', weeklyOff: 'Wednesday afternoon' },
    duration: '3-6 hours',
    accessibility: 'Forest trails'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Tiger safari', 'Wildlife'],
  localFood: ['Local tribal cuisine nearby'],
  ratings: { average: 4.6, count: 5460 },
  isVerified: true
},
{
  name: 'Guwahati Kamakhya Temple',
  description: 'Ancient and revered temple dedicated to Goddess Kamakhya.',
  location: {
    type: 'Point',
    coordinates: [91.6921, 26.1662],
    address: 'Kamakhya, Guwahati, Assam 781010',
    city: 'Guwahati',
    state: 'Assam',
    country: 'India'
  },
  category: 'temple',
  images: [
    {
      url: 'https://s7ap1.scene7.com/is/image/incredibleindia/kamakhya-temple-dispur-assam-2-attr-hero?qlt=82&ts=1742179171313',
      caption: 'Kamakhya Temple',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Shaktipeeth rich in tantric worship and pilgrim destination.',
    bestTimeToVisit: 'October to April',
    entryFee: { indian: 'Free', foreign: 'Free' },
    timings: { opening: '5:30 AM', closing: '8:00 PM', weeklyOff: 'false' },
    duration: '2 hours',
    accessibility: 'Hill steps'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: false,
    guide: true,
    wheelchairAccessible: false
  },
  famousFor: ['Tantric rituals', 'Architecture'],
  localFood: ['Assamese cuisine'],
  ratings: { average: 4.7, count: 12600 },
  isVerified: true
},
{
  name: 'Bheemeshwari',
  description: 'Popular fishing and trekking spot on the banks of Cauvery River.',
  location: {
    type: 'Point',
    coordinates: [77.2027, 12.4478],
    address: 'Bheemeshwari, Karnataka 577138',
    city: 'Bheemeshwari',
    state: 'Karnataka',
    country: 'India'
  },
  category: 'other',
  images: [
    {
      url: 'https://i.ytimg.com/vi/LjuMAAbujn8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBkqnKg2lqmI20uAxlUKv7w38qi-A',
      caption: 'Bheemeshwari Cauvery River',
      source: 'Wikimedia'
    }
  ],
  details: {
    historicalSignificance: 'Known for angling, nature trails and forest camps.',
    bestTimeToVisit: 'October to March',
    entryFee: { indian: '₹150', foreign: '₹500' },
    timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
    duration: '1-2 days',
    accessibility: 'Accessible by road'
  },
  amenities: {
    parking: true,
    restrooms: true,
    restaurant: true,
    guide: true,
    wheelchairAccessible: true
  },
  famousFor: ['Fishing', 'Trekking'],
  localFood: ['Karnataka snacks'],
  ratings: { average: 4.5, count: 1700 },
  isVerified: true
},
  {
    name: 'Bidar Fort',
    description: 'Historic fort complex with Persian and Hindu architectural influences.',
    location: {
      type: 'Point',
      coordinates: [77.5266, 17.9243],
      address: 'Bidar, Karnataka 585403',
      city: 'Bidar',
      state: 'Karnataka',
      country: 'India'
    },
    category: 'fort',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/bidar-fort-bidar-1-attr-hero?qlt=82&ts=1726719091243',
        caption: 'Bidar Fort',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built by the Bahmani rulers in the 15th century.',
      bestTimeToVisit: 'October to February',
      entryFee: { indian: '₹50', foreign: '₹100' },
      timings: { opening: '9:00 AM', closing: '5:30 PM', weeklyOff: 'false' },
      duration: '2-3 hours',
      accessibility: 'Mixed terrain with some stairs'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Architecture', 'History'],
    localFood: ['Bidriware crafts from local markets'],
    ratings: { average: 4.3, count: 3200 },
    isVerified: true
  },
  {
    name: 'Sundararaja Perumal Temple',
    description: 'A famous Vishnu temple located in Uthiramerur with fine Dravidian architecture.',
    location: {
      type: 'Point',
      coordinates: [79.7533, 12.3421],
      address: 'Uthiramerur, Kanchipuram, Tamil Nadu 603403',
      city: 'Kanchipuram',
      state: 'Tamil Nadu',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Tiruanbil4.jpg',
        caption: 'Sundararaja Perumal Temple',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Dating back to Chola dynasty, noted for inscriptions.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '7:00 PM', weeklyOff: 'false' },
      duration: '1-2 hours',
      accessibility: 'Accessible with steps'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Ancient architecture', 'Sculptures'],
    localFood: ['Traditional Tamil cuisine'],
    ratings: { average: 4.5, count: 1500 },
    isVerified: true
  },
  {
    name: 'Lumbini Gardens',
    description: 'Recreational park located on Hussain Sagar Lake in Hyderabad.',
    location: {
      type: 'Point',
      coordinates: [78.4667, 17.4075],
      address: 'Santh Nagar, Hyderabad, Telangana 500082',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India'
    },
    category: 'other',
    images: [
      {
        url: 'https://static.toiimg.com/photo/imgsize-2509471,msid-72323145/72323145.jpg',
        caption: 'Lumbini Gardens',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Popular lakeside park for boating and relaxation.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹30', foreign: '₹50' },
      timings: { opening: '9:00 AM', closing: '9:00 PM', weeklyOff: 'Monday' },
      duration: '2-3 hours',
      accessibility: 'Wheelchair accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Boating', 'Picnic spot'],
    localFood: ['Local street foods nearby'],
    ratings: { average: 4.2, count: 1200 },
    isVerified: true
  },
  {
    name: 'Hemis Monastery',
    description: 'Largest Himalayan monastery located in Ladakh.',
    location: {
      type: 'Point',
      coordinates: [77.6459, 34.1211],
      address: 'Hemis, Ladakh, Jammu & Kashmir 194201',
      city: 'Hemis',
      state: 'Jammu & Kashmir',
      country: 'India'
    },
    category: 'heritage',
    images: [
      {
        url: 'https://discoverlehladakh.in/wp-content/uploads/2020/06/Hemis-monastery-1022x530.jpeg',
        caption: 'Hemis Monastery',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Famous for its annual festival and unique architecture.',
      bestTimeToVisit: 'June to September',
      entryFee: { indian: '₹50', foreign: '₹100' },
      timings: { opening: '7:00 AM', closing: '5:30 PM', weeklyOff: 'false' },
      duration: '2-3 hours',
      accessibility: 'Mountain roads and steps'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Festival', 'Buddhist culture'],
    localFood: ['Traditional Ladakhi food'],
    ratings: { average: 4.7, count: 1100 },
    isVerified: true
  },
  {
    name: 'Thol Bird Sanctuary',
    description: 'Important migratory bird habitat near Ahmedabad.',
    location: {
      type: 'Point',
      coordinates: [72.4524, 23.0738],
      address: 'Thol, Ahmedabad, Gujarat 382305',
      city: 'Ahmedabad',
      state: 'Gujarat',
      country: 'India'
    },
    category: 'wildlife sancturary',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl6oAh_G6GI8B5Lawxn3NVO7K7NNm4fTItvQ&s',
        caption: 'Thol Bird Sanctuary',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'One of the important bird areas, established in 1988.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹25', foreign: '₹50' },
      timings: { opening: '7:00 AM', closing: '5:00 PM', weeklyOff: 'Monday' },
      duration: '2-3 hours',
      accessibility: 'Accessible via road'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Birdwatching', 'Wetlands'],
    localFood: ['Gujarati snacks'],
    ratings: { average: 4.3, count: 900 },
    isVerified: true
  },  
  {
    name: 'Chilika Lake',
    description: 'Asia’s largest brackish water lagoon, famous for migratory birds.',
    location: {
      type: 'Point',
      coordinates: [85.3047, 19.6366],
      address: 'Chilika, Odisha 752002',
      city: 'Chilika',
      state: 'Odisha',
      country: 'India'
    },
    category: 'lake',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Birds_eyeview_of_Chilika_Lake.jpg',
        caption: 'Chilika Lake',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Ramsar Wetland of International Importance.',
      bestTimeToVisit: 'November to February',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
      duration: '3-5 hours',
      accessibility: 'Boat tours from designated points'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Bird sanctuary', 'Scenic boat rides'],
    localFood: ['Odisha seafood'],
    ratings: { average: 4.6, count: 7200 },
    isVerified: true
  },
  {
    name: 'Dibru-Saikhowa National Park',
    description: 'Biosphere reserve in Assam rich in biodiversity.',
    location: {
      type: 'Point',
      coordinates: [95.0967, 27.1290],
      address: 'Tinsukia, Assam 786125',
      city: 'Tinsukia',
      state: 'Assam',
      country: 'India'
    },
    category: 'wildlife sancturary',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Dibru_Saikhuwa_National_Park.jpg',
        caption: 'Dibru-Saikhowa National Park',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Recognized for unique feral horses and diverse wildlife ecology.',
      bestTimeToVisit: 'October to April',
      entryFee: { indian: '₹50', foreign: '₹300' },
      timings: { opening: '6:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
      duration: '3-5 hours',
      accessibility: 'Forest pathways'
    },
    amenities: {
      parking: true,
      restrooms: false,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Feral horses', 'Birds'],
    localFood: ['Assamese food'],
    ratings: { average: 4.3, count: 900 },
    isVerified: true
  },
  {
    name: 'Kasimedu Beach',
    description: 'Fishing beach and port area near Chennai with vibrant local markets.',
    location: {
      type: 'Point',
      coordinates: [80.2971, 13.1085],
      address: 'Kasimedu, Chennai, Tamil Nadu 600028',
      city: 'Chennai',
      state: 'Tamil Nadu',
      country: 'India'
    },
    category: 'beach',
    images: [
      {
        url: 'https://th-i.thgim.com/public/migration_catalog/article11905201.ece/alternates/LANDSCAPE_1200/TH-KASIMEDU',
        caption: 'Kasimedu Beach',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Active fishing harbor with busy fish markets.',
      bestTimeToVisit: 'November to February',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '5:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
      duration: '1-2 hours',
      accessibility: 'Road accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Fishing', 'Seafood markets'],
    localFood: ['Fresh seafood'],
    ratings: { average: 4.0, count: 1800 },
    isVerified: true
  },
  {
    name: 'Gir National Park',
    description: 'Last refuge of the Asiatic lions, located in Gujarat.',
    location: {
      type: 'Point',
      coordinates: [70.8307, 21.1215],
      address: 'Sasan Gir, Gujarat 362260',
      city: 'Sasan Gir',
      state: 'Gujarat',
      country: 'India'
    },
    category: 'wildlife sancturary',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwN2R3HETPUViMZgdS_zZMg2E7IO_hAEIlyg&s',
        caption: 'Asiatic Lion in Gir National Park',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Declared a sanctuary in 1965 to protect lions.',
      bestTimeToVisit: 'December to April',
      entryFee: { indian: '₹150', foreign: '₹1300' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
      duration: '3-5 hours',
      accessibility: 'Safari vehicles available'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Asiatic lions', 'Wildlife safari'],
    localFood: ['Gujarati snacks'],
    ratings: { average: 4.7, count: 6500 },
    isVerified: true
  },
  {
    name: 'Jagannath Temple, Puri',
    description: 'One of the Char Dham pilgrimage sites, famous for Rath Yatra.',
    location: {
      type: 'Point',
      coordinates: [85.8225, 19.8135],
      address: 'Puri, Odisha 752001',
      city: 'Puri',
      state: 'Odisha',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf6P5Bnv1teh62bLFX98UQ-u4HI-8CvAPXHA&s',
        caption: 'Jagannath Temple, Puri',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Ancient temple built in 12th century, major pilgrimage site.',
      bestTimeToVisit: 'October to February',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '9:00 PM', weeklyOff: 'false' },
      duration: '2-3 hours',
      accessibility: 'Accessible for most visitors'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Rath Yatra', 'Architecture'],
    localFood: ['Odisha cuisine'],
    ratings: { average: 4.8, count: 21500 },
    isVerified: true
  },
  {
    name: 'Pangong Lake',
    description: 'Famous saltwater lake located at high altitude in Ladakh.',
    location: {
      type: 'Point',
      coordinates: [78.2589, 33.9850],
      address: 'Pangong Leh, Ladakh 194101',
      city: 'Leh',
      state: 'Ladakh',
      country: 'India'
    },
    category: 'lake',
    images: [
      {
        url: 'https://www.lehladakhindia.com/wp-content/uploads/2024/07/pangong-tso-lake.jpeg',
        caption: 'Pangong Lake',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Picturesque lake famous from several movies.',
      bestTimeToVisit: 'May to September',
      entryFee: { indian: 'ILP required', foreign: 'ILP required' },
      timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
      duration: '1-2 days',
      accessibility: 'Remote mountain roads'
    },
    amenities: {
      parking: true,
      restrooms: false,
      restaurant: true,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Scenic beauty', 'Blue waters'],
    localFood: ['Ladakhi cuisine'],
    ratings: { average: 4.9, count: 8600 },
    isVerified: true
  },
  {
    name: 'Shivpuri',
    description: 'Hill resort town in Madhya Pradesh located in the foothills of Satpura range.',
    location: {
      type: 'Point',
      coordinates: [77.6012, 23.7155],
      address: 'Shivpuri, Madhya Pradesh 473551',
      city: 'Shivpuri',
      state: 'Madhya Pradesh',
      country: 'India'
    },
    category: 'hill-station',
    images: [
      {
        url: 'https://static.toiimg.com/photo/msid-65579178,width-96,height-65.cms',
        caption: 'Shivpuri',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Popular for its waterfalls and nature camps.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
      duration: '1-3 days',
      accessibility: 'Road accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Waterfalls', 'Camping'],
    localFood: ['Madhya Pradesh cuisine'],
    ratings: { average: 4.4, count: 3400 },
    isVerified: true
  },
  {
    name: 'Murud-Janjira Fort',
    description: 'Sea fort on an island, known for its unconquered history.',
    location: {
      type: 'Point',
      coordinates: [72.9832, 18.2851],
      address: 'Murud, Raigad, Maharashtra 402401',
      city: 'Murud',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'fort',
    images: [
      {
        url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjdHmZ26nb_KgE7JJBVIJxoSOGd12Gj9DvZ_Uu1BQUEeQfpmaC8FhzrsS06BxgS5W0PfCcGjRzpfoOMn0442ZCYFNF1Djm1ji2FUatZYuu3VDwNUiGDRXDPROkeAY-LNQ7f8iIQsMiQ7IFN/w1200-h630-p-k-no-nu/?imgmax=800',
        caption: 'Murud-Janjira Fort',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Noted for its architectural strength and maritime control.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹30', foreign: '₹100' },
      timings: { opening: '7:00 AM', closing: '6:30 PM', weeklyOff: 'false' },
      duration: '1-2 hours',
      accessibility: 'Boat access and steps'
    },
    amenities: {
      parking: true,
      restrooms: false,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Maritime history', 'Island fort'],
    localFood: ['Malvani cuisine'],
    ratings: { average: 4.5, count: 3700 },
    isVerified: true
  },
  {
    name: 'Igatpuri',
    description: 'Hill station in Maharashtra famous for scenic beauty and Vipassana center.',
    location: {
      type: 'Point',
      coordinates: [73.5965, 19.7672],
      address: 'Igatpuri, Nashik, Maharashtra 422403',
      city: 'Igatpuri',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'hill-station',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/igatpuri-waterfall-igatpuri-maharashtra-attr-hero-1?qlt=82&ts=1727351945189',
        caption: 'Igatpuri, Maharashtra',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Popular for meditation retreats and natural surroundings.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
      duration: '1-2 days',
      accessibility: 'Good road access'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Meditation', 'Scenic landscape'],
    localFood: ['Maharashtrian food'],
    ratings: { average: 4.4, count: 3600 },
    isVerified: true
  },
  {
    name: 'Hampi Bazaar',
    description: 'Historic marketplace street near Virupaksha Temple in Hampi.',
    location: {
      type: 'Point',
      coordinates: [76.4625, 15.2875],
      address: 'Hampi Bazaar, Hampi, Karnataka 583239',
      city: 'Hampi',
      state: 'Karnataka',
      country: 'India'
    },
    category: 'heritage',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/hampi-bazaar-hampi-karnataka-3-attr-hero?qlt=82&ts=1726721330306',
        caption: 'Hampi Bazaar',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Active archaeological site, once a bustling trade area.',
      bestTimeToVisit: 'October to February',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '7:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
      duration: '1-2 hours',
      accessibility: 'Uneven terrain'
    },
    amenities: {
      parking: false,
      restrooms: false,
      restaurant: true,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Ruins', 'Historical atmosphere'],
    localFood: ['Local Karnataka cuisine'],
    ratings: { average: 4.6, count: 8500 },
    isVerified: true
  },
  {
    name: 'Valley of Flowers',
    description: 'UNESCO World Heritage Himalayan valley famous for endemic alpine flowers.',
    location: {
      type: 'Point',
      coordinates: [79.5972, 30.7289],
      address: 'Chamoli, Uttarakhand 246401',
      city: 'Chamoli',
      state: 'Uttarakhand',
      country: 'India'
    },
    category: 'heritage',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0mfV2hklINDkuN98u2CSDQL7pKWfnr93IA&s',
        caption: 'Valley of Flowers',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Protected national park with rich biodiversity.',
      bestTimeToVisit: 'July to September',
      entryFee: { indian: '₹100', foreign: '₹500' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
      duration: '1-2 days',
      accessibility: 'Trekking required'
    },
    amenities: {
      parking: false,
      restrooms: true,
      restaurant:false,
      guide:true,
      wheelchairAccessible: false
    },
    famousFor: ['Floral biodiversity', 'Trekking'],
    localFood: ['Locally sourced meals'],
    ratings: { average: 4.9, count: 4300 },
    isVerified: true
  },
  {
    name: 'Elephant Village',
    description: 'Village near Kaziranga offering elephant rides into the wildlife sanctuary.',
    location: {
      type: 'Point',
      coordinates: [93.6273, 26.5777],
      address: 'Kaziranga, Assam 785614',
      city: 'Kaziranga',
      state: 'Assam',
      country: 'India'
    },
    category: 'wildlife',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaIMJfDswM_CRVT3l6AmV8ACbOj8fAZiYV4A&s',
        caption: 'Elephant Safari at Kaziranga',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Key gateway to Kaziranga National Park.',
      bestTimeToVisit: 'November to April',
      entryFee: { indian: '₹100', foreign: '₹500' },
      timings: { opening: '6:00 AM', closing: '10:00 AM', weeklyOff: 'false' },
      duration: '2-3 hours',
      accessibility: 'Elephant ride required'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant:false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Elephant safaris', 'Wildlife viewing'],
    localFood: ['Assamese cuisine'],
    ratings: { average: 4.7, count: 2400 },
    isVerified: true
  },
  {
    name: 'Jal Mahal',
    description: 'Beautiful water palace located in the middle of Man Sagar Lake.',
    location: {
      type: 'Point',
      coordinates: [75.8190, 26.9390],
      address: 'Man Sagar Lake, Jaipur, Rajasthan 302002',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India'
    },
    category: 'palace',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Jaipur_03-2016_39_Jal_Mahal_-_Water_Palace.jpg/1200px-Jaipur_03-2016_39_Jal_Mahal_-_Water_Palace.jpg',
        caption: 'Jal Mahal, Jaipur',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: '18th-century palace known for unique lake location.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'Open daylight hours', closing: 'Sunset', weeklyOff: 'false' },
      duration: '1-2 hours (viewing from shore)',
      accessibility: 'Accessible by road'
    },
    amenities: {
      parking: true,
      restrooms: false,
      restaurant: true,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Architecture', 'Photographs'],
    localFood: ['Rajasthani cuisine nearby'],
    ratings: { average: 4.6, count: 6500 },
    isVerified: true
  },
  {
    name: 'Ranganathittu Bird Sanctuary',
    description: 'Sanctuary famous for migratory birds and riverine island habitats.',
    location: {
      type: 'Point',
      coordinates: [76.4442, 12.3092],
      address: 'Ranganathittu, Mandya, Karnataka 571401',
      city: 'Mandya',
      state: 'Karnataka',
      country: 'India'
    },
    category: 'wildlife sancturary',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSqTsjLS5De4xI8SKhFHBq7sHr5mVYwGIz7Q&s',
        caption: 'Ranganathittu Bird Sanctuary',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Probable oldest bird sanctuary in India.',
      bestTimeToVisit: 'November to February',
      entryFee: { indian: '₹50', foreign: '₹200' },
      timings: { opening: '7:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
      duration: '2-3 hours',
      accessibility: 'Boat rides and walking trails'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant:false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Bird watching', 'Boating'],
    localFood: ['Karnataka cuisine'],
    ratings: { average: 4.7, count: 5300 },
    isVerified: true
  },
  {
    name: 'Bundi Palace',
    description: 'Colorful palace with frescoes and ornate architecture in Rajasthan.',
    location: {
      type: 'Point',
      coordinates: [75.6453, 25.4315],
      address: 'Bundi, Rajasthan 323001',
      city: 'Bundi',
      state: 'Rajasthan',
      country: 'India'
    },
    category: 'palace',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/bundi-palace-bundi-rajasthan-1-attr-hero?qlt=82&ts=1726660854247',
        caption: 'Bundi Palace',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Famous for its murals and stepwells.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹100', foreign: '₹300' },
      timings: { opening: '9:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
      duration: '2-3 hours',
      accessibility: 'Some stairs and ramps'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant:false,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Murals', 'Architecture'],
    localFood: ['Rajasthani dishes'],
    ratings: { average: 4.4, count: 3700 },
    isVerified: true
  },
  {
    name: 'Silent Valley National Park',
    description: 'Pristine tropical rainforest with rich biodiversity in Kerala.',
    location: {
      type: 'Point',
      coordinates: [76.4640, 11.1207],
      address: 'Silent Valley, Palakkad, Kerala 678593',
      city: 'Palakkad',
      state: 'Kerala',
      country: 'India'
    },
    category: 'wildlife sancturary',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/1-silent-valley-national-park-palakkad-kerala-attr-hero?qlt=82&ts=1726672830992',
        caption: 'Silent Valley National Park',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Declared a national park in 1984, biodiversity hotspot.',
      bestTimeToVisit: 'November to February',
      entryFee: { indian: '₹100', foreign: '₹300' },
      timings: { opening: '7:00 AM', closing: '5:00 PM', weeklyOff: 'false' },
      duration: '2-4 hours',
      accessibility: 'Trekking paths'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant:false,
      guide:true,
      wheelchairAccessible: false
    },
    famousFor: ['Rainforest', 'Wildlife'],
    localFood: ['Kerala cuisine'],
    ratings: { average: 4.8, count: 2400 },
    isVerified: true
  },
  {
    name: 'Nakki Lake',
    description: 'Popular lake with boating and scenic surroundings in Mount Abu.',
    location: {
      type: 'Point',
      coordinates: [72.7167, 24.5933],
      address: 'Mount Abu, Rajasthan 307501',
      city: 'Mount Abu',
      state: 'Rajasthan',
      country: 'India'
    },
    category: 'lake',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO3_iNJoCXK9Oxt9NmUx10iJWXqSeMAh8wtQ&s',
        caption: 'Nakki Lake, Mount Abu',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Integral part of Mount Abu hill station.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹25', foreign: '₹50' },
      timings: { opening: '6:00 AM', closing: '7:00 PM', weeklyOff: 'false' },
      duration: '1-2 hours',
      accessibility: 'Paved walkways'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Boating', 'Sunset views'],
    localFood: ['Rajasthani snacks'],
    ratings: { average: 4.5, count: 6000 },
    isVerified: true
  },
  {
    name: 'Nandi Hills',
    description: 'Popular hill station near Bengaluru known for sunrise views.',
    location: {
      type: 'Point',
      coordinates: [77.6833, 13.3700],
      address: 'Nandi Hills, Bangalore Rural, Karnataka 561205',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India'
    },
    category: 'hill-station',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/nandi-hills-bangalore-karnataka-1-attr-hero?qlt=82&ts=1742171255239',
        caption: 'Nandi Hills',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Ancient hill fortress popular for trekking and nature walks.',
      bestTimeToVisit: 'September to February',
      entryFee: { indian: '₹10', foreign: '₹25' },
      timings: { opening: '5:30 AM', closing: '6:30 PM', weeklyOff: 'false' },
      duration: 'Half-day',
      accessibility: 'Winding hill roads'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Sunrise', 'Trekking'],
    localFood: ['South Indian snacks'],
    ratings: { average: 4.6, count: 11700 },
    isVerified: true
  },
  {
    name: 'Sariska National Park',
    description: 'Tiger reserve in Rajasthan known for diverse wildlife and historic ruins.',
    location: {
      type: 'Point',
      coordinates: [76.4086, 27.2926],
      address: 'Alwar, Rajasthan 301001',
      city: 'Alwar',
      state: 'Rajasthan',
      country: 'India'
    },
    category: 'wildlife',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Sariska_Tiger_Reserve%2C_Alwar.jpg',
        caption: 'Sariska National Park',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Tiger reserve declared in 1979; rich in fauna.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹100', foreign: '₹650' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'Tuesday' },
      duration: '3-5 hours',
      accessibility: 'Jungle tracks and vehicle safari'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Tigers', 'Wildlife Safari'],
    localFood: ['Rajasthani cuisine'],
    ratings: { average: 4.5, count: 6700 },
    isVerified: true
  },
  {
    name: 'Har Ki Pauri',
    description: 'Famous ghat on the banks of River Ganges in Haridwar.',
    location: {
      type: 'Point',
      coordinates: [78.1635, 29.9457],
      address: 'Har Ki Pauri, Haridwar, Uttarakhand 249401',
      city: 'Haridwar',
      state: 'Uttarakhand',
      country: 'India'
    },
    category: 'heritage',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/har-ki-pauri-haridwar-uttarakhand-1-attr-hero?qlt=82&ts=1726645951242',
        caption: 'Har Ki Pauri Ganga Aarti',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Site of Ganga Aarti and religious significance in Hinduism.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '4:00 AM', closing: '9:30 PM', weeklyOff: 'false' },
      duration: '1-2 hours',
      accessibility: 'Accessible by steps and ramps'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Ganga Aarti', 'Pilgrimage'],
    localFood: ['North Indian food'],
    ratings: { average: 4.7, count: 12500 },
    isVerified: true
  },
  {
    name: 'Anantagiri Hills',
    description: 'Hill station rich in forests and coffee plantations near Hyderabad.',
    location: {
      type: 'Point',
      coordinates: [78.3483, 17.3355],
      address: 'Vikarabad, Telangana 501101',
      city: 'Vikarabad',
      state: 'Telangana',
      country: 'India'
    },
    category: 'hill-station',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIH2Ct19qd1Q4gTmVhbHkPM1cAF1TF3biQbA&s',
        caption: 'Anantagiri Hills',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Known for trekking, wildlife and coffee estates.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
      duration: '1-2 days',
      accessibility: 'Mountain roads'
    },
    amenities: {
      parking: true,
      restrooms: false,
      restaurant: true,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Nature', 'Trekking'],
    localFood: ['Telangana cuisine'],
    ratings: { average: 4.4, count: 4000 },
    isVerified: true
  },
  {
    name: 'Kanha National Park',
    description: 'World-famous tiger reserve in Madhya Pradesh.',
    location: {
      type: 'Point',
      coordinates: [80.7000, 22.3333],
      address: 'Kanha, Mandla, Madhya Pradesh 481776',
      city: 'Mandla',
      state: 'Madhya Pradesh',
      country: 'India'
    },
    category: 'wildlife',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRliNsDYDpopjn6hDEDVT8-Rpc4baz2zYnYMA&s',
        caption: 'Kanha National Park',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Inspiration for Rudyard Kipling’s “The Jungle Book”.',
      bestTimeToVisit: 'October to June',
      entryFee: { indian: '₹100', foreign: '₹650' },
      timings: { opening: '6:30 AM', closing: '6:00 PM', weeklyOff: 'Wednesday afternoon' },
      duration: '3-6 hours',
      accessibility: 'Jungle safaris'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Tiger sighting', 'Wildlife'],
    localFood: ['Local cuisine'],
    ratings: { average: 4.7, count: 5200 },
    isVerified: true
  },
  {
    name: 'Majuli Island',
    description: 'World’s largest river island located in Brahmaputra River, Assam.',
    location: {
      type: 'Point',
      coordinates: [94.1314, 26.9561],
      address: 'Majuli, Assam',
      city: 'Majuli',
      state: 'Assam',
      country: 'India'
    },
    category: 'heritage',
    images: [
      {
        url: 'https://www.tourmyindia.com/states/assam/images/Majuli-Island-1.jpg',
        caption: 'Majuli Island',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Cultural center of Assamese neo-Vaishnavite movement.',
      bestTimeToVisit: 'October to April',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
      duration: '2-3 days',
      accessibility: 'Boat access'
    },
    amenities: {
      parking: false,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Culture', 'River island'],
    localFood: ['Assamese cuisine'],
    ratings: { average: 4.6, count: 2100 },
    isVerified: true
  },
  {
    name: 'Malshej Ghat',
    description: 'Mountain pass and popular tourist spot in Western Ghats of Maharashtra.',
    location: {
      type: 'Point',
      coordinates: [73.6201, 19.3580],
      address: 'Malshej Ghat, Maharashtra',
      city: 'Malshej',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'hill-station',
    images: [
      {
        url: 'https://tourdefarm.in/wp-content/uploads/2021/01/Malshej-Ghat-1.jpg',
        caption: 'Malshej Ghat',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Known for spectacular monsoon views and migratory flamingos.',
      bestTimeToVisit: 'July to September',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
      duration: '1-2 days',
      accessibility: 'Mountain roads'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Monsoon scenery', 'Birdwatching'],
    localFood: ['Maharashtrian snacks'],
    ratings: { average: 4.4, count: 3100 },
    isVerified: true
  },
  {
    name: 'Nanda Devi National Park',
    description: 'High-altitude national park with rich Himalayan biodiversity.',
    location: {
      type: 'Point',
      coordinates: [79.6053, 30.3796],
      address: 'Chamoli, Uttarakhand 246401',
      city: 'Chamoli',
      state: 'Uttarakhand',
      country: 'India'
    },
    category: 'wildlife sancturary',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/nanda-devi-national-park-badrinath-uttarakhand-1-attr-hero?qlt=82&ts=1727352353405',
        caption: 'Nanda Devi National Park',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Home to Nanda Devi peak; a UNESCO World Heritage Site.',
      bestTimeToVisit: 'May to October',
      entryFee: { indian: '₹100', foreign: '₹500' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
      duration: '2-5 days',
      accessibility: 'Mountain trekking required'
    },
    amenities: {
      parking: false,
      restrooms: false,
      restaurant: false,
      guide:true,
      wheelchairAccessible: false
    },
    famousFor: ['Trekking', 'Biodiversity'],
    localFood: ['Locally sourced meals'],
    ratings: { average: 4.8, count: 1800 },
    isVerified: true
  },
  {
    name: 'Hawa Mahal',
    description: 'Palace of Winds in Jaipur, known for its unique honeycomb facade.',
    location: {
      type: 'Point',
      coordinates: [75.8577, 26.9239],
      address: 'Pink City, Jaipur, Rajasthan 302002',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India'
    },
    category: 'palace',
    images: [
      {
        url: 'https://static.toiimg.com/img/101335068/Master.jpg',
        caption: 'Hawa Mahal, Jaipur',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built in 1799 for royal ladies to watch city streets.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹50', foreign: '₹200' },
      timings: { opening: '9:00 AM', closing: '4:30 PM', weeklyOff: 'false' },
      duration: '1-2 hours',
      accessibility: 'Stairs, some narrow passages'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant:false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Architecture', 'History'],
    localFood: ['Rajasthani delicacies'],
    ratings: { average: 4.5, count: 15000 },
    isVerified: true
  },
  {
    name: 'Ujjain Mahakaleshwar Temple',
    description: 'One of the twelve Jyotirlingas dedicated to Lord Shiva.',
    location: {
      type: 'Point',
      coordinates: [75.7900, 23.1733],
      address: 'Ujjain, Madhya Pradesh 456006',
      city: 'Ujjain',
      state: 'Madhya Pradesh',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://static.toiimg.com/photo/94055833.cms',
        caption: 'Mahakaleshwar Temple',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Dating back to ancient times, revered pilgrimage site.',
      bestTimeToVisit: 'February to April',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '5:00 AM', closing: '10:00 PM', weeklyOff: 'false' },
      duration: '2 hours',
      accessibility: 'Accessible pathways'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Religious significance', 'Festivals'],
    localFood: ['Madhya Pradesh cuisine'],
    ratings: { average: 4.7, count: 8700 },
    isVerified: true
  },
  {
    name: 'Tso Kar Lake',
    description: 'High altitude saltwater lake in Ladakh, known for birdlife.',
    location: {
      type: 'Point',
      coordinates: [78.2612, 33.3812],
      address: 'Ladakh, Jammu & Kashmir 194101',
      city: 'Ladakh',
      state: 'Jammu & Kashmir',
      country: 'India'
    },
    category: 'lake',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtv2qcmicnmieQLCBCEtN2-ys8Q4xRcgZAPQ&s',
        caption: 'Tso Kar Lake, Ladakh',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Important breeding ground for migratory birds.',
      bestTimeToVisit: 'May to September',
      entryFee: { indian: 'ILP required', foreign: 'ILP required' },
      timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
      duration: '1-2 days',
      accessibility: 'Mountain roads'
    },
    amenities: {
      parking: false,
      restrooms: false,
      restaurant:false,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Birdwatching', 'Scenic beauty'],
    localFood: ['Ladakhi cuisine'],
    ratings: { average: 4.8, count: 1100 },
    isVerified: true
  },
  {
    name: 'Valparai',
    description: 'Hill station in Tamil Nadu famous for tea plantations and wildlife.',
    location: {
      type: 'Point',
      coordinates: [76.9815, 10.2940],
      address: 'Valparai, Coimbatore, Tamil Nadu 642127',
      city: 'Valparai',
      state: 'Tamil Nadu',
      country: 'India'
    },
    category: 'hill-station',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRye0U6HhnBKDvWPvrKsSk31m9EmZyldoQP0g&s',
        caption: 'Valparai Tea Plantations',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Known for rich flora, fauna, and tribal culture.',
      bestTimeToVisit: 'October to February',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'false' },
      duration: '2-3 days',
      accessibility: 'Hilly terrain'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Tea gardens', 'Wildlife sanctuaries'],
    localFood: ['Tamil Nadu cuisine'],
    ratings: { average: 4.6, count: 2300 },
    isVerified: true
  },
  {
    name: 'Kadri Manjunath Temple',
    description: 'Ancient temple dedicated to Lord Shiva with historical significance.',
    location: {
      type: 'Point',
      coordinates: [75.7711, 13.0008],
      address: 'Kadri, Mangalore, Karnataka 575003',
      city: 'Mangalore',
      state: 'Karnataka',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqWsTk7QGZ3DOX-jyzuujqlwsuzcdAeV2MQw&s',
        caption: 'Kadri Manjunath Temple',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Dating back to 10th century, known for carvings.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '8:00 PM', weeklyOff: 'false' },
      duration: '1-2 hours',
      accessibility: 'Accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Sculpture', 'History'],
    localFood: ['Coastal Karnataka food'],
    ratings: { average: 4.5, count: 2700 },
    isVerified: true
  },
  {
    name: 'Bhujodi',
    description: 'Small town famous for handloom weaving and crafts in Gujarat.',
    location: {
      type: 'Point',
      coordinates: [70.7414, 23.2490],
      address: 'Bhujodi, Kutch, Gujarat 370020',
      city: 'Bhujodi',
      state: 'Gujarat',
      country: 'India'
    },
    category: 'other',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdGM1EJm0NIZohZ3YR5mrWmzPuV1DElsHYmg&s',
        caption: 'Bhujodi Weaver Village',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Known for traditional weaving and crafts.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '9:00 AM', closing: '6:00 PM', weeklyOff: 'false' },
      duration: '2-3 hours',
      accessibility: 'Accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant:false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Handloom crafts', 'Traditional arts'],
    localFood: ['Gujarati snacks'],
    ratings: { average: 4.3, count: 700 },
    isVerified: true
  },
  {
    name: 'Kedarnath Temple',
    description: 'Ancient Himalayan temple dedicated to Lord Shiva, part of the Char Dham pilgrimage.',
    location: {
      type: 'Point',
      coordinates: [79.0662, 30.7352],
      address: 'Kedarnath, Uttarakhand 246446',
      city: 'Kedarnath',
      state: 'Uttarakhand',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kedarnath_Temple_in_Rainy_season.jpg/1200px-Kedarnath_Temple_in_Rainy_season.jpg',
        caption: 'Kedarnath Temple',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built in the 8th century, sacred for Hindus, with snow-capped Himalayan backdrop.',
      bestTimeToVisit: 'May to October',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '8:00 PM', weeklyOff: 'None' },
      duration: '2-4 hours',
      accessibility: 'Trek required, steps and rough terrain'
    },
    amenities: {
      parking: false,
      restrooms: false,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Pilgrimage', 'Spectacular mountain views'],
    localFood: ['Local Vegetarian dishes'],
    ratings: { average: 4.8, count: 8700 },
    isVerified: true
  },
  {
    name: 'Chittorgarh Fort',
    description: 'Majestic hilltop fort, known for its history of Rajput valor and architecture.',
    location: {
      type: 'Point',
      coordinates: [74.6262, 24.8885],
      address: 'Chittorgarh, Rajasthan 312001',
      city: 'Chittorgarh',
      state: 'Rajasthan',
      country: 'India'
    },
    category: 'fort',
    images: [
      {
        url: 'https://static.toiimg.com/photo/50900339.cms',
        caption: 'Chittorgarh Fort',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Seat of Maharana Pratap, site of famous sieges and battles.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹40', foreign: '₹250' },
      timings: { opening: '8:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '3-4 hours',
      accessibility: 'Steps, ramps'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Architecture', 'History', 'Rajput culture'],
    localFood: ['Rajasthani cuisine'],
    ratings: { average: 4.6, count: 9500 },
    isVerified: true
  },
  {
    name: 'Lohagad Fort',
    description: 'Popular hilltop fort in Maharashtra with a scenic trek route.',
    location: {
      type: 'Point',
      coordinates: [73.4022, 18.4453],
      address: 'Lohagad, Lonavala, Maharashtra',
      city: 'Lonavala',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'fort',
    images: [
      {
        url: 'https://media1.thrillophilia.com/filestore/a3t43c93tgypkeoz6s5n0rfvuggf_1524424251_Lohagad-Fort.jpg?w=400&dpr=2',
        caption: 'Lohagad Fort',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built in 16th century, connected to Shivaji Maharaj.',
      bestTimeToVisit: 'October to February',
      entryFee: { indian: '₹15', foreign: '₹50' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '2-3 hours',
      accessibility: 'Hiking trail'
    },
    amenities: {
      parking: true,
      restrooms: false,
      restaurant: false,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Adventure', 'Scenic views', 'Historical ruins'],
    localFood: ['Maharashtrian snacks'],
    ratings: { average: 4.7, count: 4200 },
    isVerified: true
  },
  {
    name: 'Sanchi Stupa',
    description: 'Ancient Buddhist stupa with exquisite gateways, UNESCO World Heritage.',
    location: {
      type: 'Point',
      coordinates: [77.7350, 23.4856],
      address: 'Sanchi, Madhya Pradesh 464661',
      city: 'Sanchi',
      state: 'Madhya Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      {
        url: 'https://cdn.britannica.com/36/155836-050-89E7AA9E/Great-Stupa-Sanchi-India.jpg',
        caption: 'Sanchi Stupa',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built by Emperor Ashoka in 3rd century BC.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹30', foreign: '₹500' },
      timings: { opening: '8:30 AM', closing: '5:30 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Good walkways, ramps'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Buddhist architecture', 'Ancient sculptures'],
    localFood: ['Madhya Pradesh cuisine'],
    ratings: { average: 4.6, count: 4700 },
    isVerified: true
  },
  {
    name: 'Meenakshi Amman Temple',
    description: 'Massive Hindu temple with intricate carvings and towering gopurams.',
    location: {
      type: 'Point',
      coordinates: [78.1196, 9.9195],
      address: 'Main Rd, Madurai, Tamil Nadu 625001',
      city: 'Madurai',
      state: 'Tamil Nadu',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://www.poojn.in/wp-content/uploads/2025/03/Meenakshi-Amman-Temple-Visit-Planning-Timings-Dress-Code-and-Darshan-Guide.jpeg.jpg',
        caption: 'Meenakshi Temple, Madurai',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built between 16th and 18th centuries.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '5:00 AM', closing: '12:00 AM', weeklyOff: 'None' },
      duration: '2-3 hours',
      accessibility: 'Accessible pathways for pilgrims and tourists'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Architectural grandeur', 'Carvings and sculptures'],
    localFood: ['South Indian food', 'Tiffin foods'],
    ratings: { average: 4.8, count: 26000 },
    isVerified: true
  },
  {
    name: 'Mahabalipuram Shore Temples',
    description: 'Ancient rock-cut temples and sculptures by the sea, UNESCO site.',
    location: {
      type: 'Point',
      coordinates: [80.1992, 12.6225],
      address: 'Mahabalipuram, Tamil Nadu 603104',
      city: 'Mahabalipuram',
      state: 'Tamil Nadu',
      country: 'India'
    },
    category: 'heritage',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/1-shore-temple-mamallapuram-2-attr-hero?qlt=82&ts=1726654555333',
        caption: 'Shore Temples, Mahabalipuram',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built in 7th century AD by the Pallavas.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹40', foreign: '₹600' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Flat terrain, some steps'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Rock-cut sculptures', 'Architectural splendor'],
    localFood: ['Tamil Nadu coastal cuisine'],
    ratings: { average: 4.7, count: 12000 },
    isVerified: true
  },
  {
    name: 'Ranakpur Jain Temple',
    description: 'Beautiful marble temple famous for intricate carvings, Rajasthan.',
    location: {
      type: 'Point',
      coordinates: [76.4813, 26.5919],
      address: 'Ranakpur, Pali, Rajasthan 306702',
      city: 'Ranakpur',
      state: 'Rajasthan',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Jain_Temple_Ranakpur.jpg',
        caption: 'Ranakpur Jain Temple',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Constructed in 15th century, renowned for craftsmanship.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹50', foreign: '₹150' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Easy access, ramps available'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Marble carvings', 'Religious significance'],
    localFood: ['Rajasthani delicacies'],
    ratings: { average: 4.8, count: 6700 },
    isVerified: true
  },
  {
    name: 'Vembanad Lake',
    description: 'Largest lake in Kerala, renowned for houseboat cruises and scenic beauty.',
    location: {
      type: 'Point',
      coordinates: [76.2254, 9.6767],
      address: 'Alappuzha, Kerala 688001',
      city: 'Alappuzha',
      state: 'Kerala',
      country: 'India'
    },
    category: 'lake',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Kumarkom.jpg',
        caption: 'Vembanad Lake',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Known for backwaters and ecotourism.',
      bestTimeToVisit: 'August to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'Open 24 hours', closing: 'Open 24 hours', weeklyOff: 'None' },
      duration: '2-3 hours',
      accessibility: 'Boat cruises, lakeside walkways'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Backwater cruises', 'Bird watching'],
    localFood: ['Kerala seafood'],
    ratings: { average: 4.8, count: 7800 },
    isVerified: true
  },
  {
    name: 'Siddheshwar Temple, Solapur',
    description: 'Historic temple dedicated to Lord Siddheshwar, central religious site in Solapur.',
    location: {
      type: 'Point',
      coordinates: [75.9065, 17.6599],
      address: 'Siddheshwar Temple Rd, Solapur, Maharashtra 413001',
      city: 'Solapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOO6HYVeuWdhTTeIJn8z0vc4SNf2ChG2UwtQ&s',
        caption: 'Siddheshwar Temple, Solapur',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Important religious place with large annual fairs.',
      bestTimeToVisit: 'October to February',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '8:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Easily accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Religious significance', 'Festivals'],
    localFood: ['Local Maharashtrian cuisine'],
    ratings: { average: 4.5, count: 3000 },
    isVerified: true
  },
  {
    name: 'Bhuikot Fort, Solapur',
    description: 'Medieval fort constructed in the 14th century with historical significance.',
    location: {
      type: 'Point',
      coordinates: [75.9040, 17.6634],
      address: 'Bhuikot Fort, Solapur, Maharashtra 413002',
      city: 'Solapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'fort',
    images: [
      {
        url: 'https://www.trawell.in/admin/images/upload/499589473Solapur-fort.jpg',
        caption: 'Bhuikot Fort, Solapur',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built during Bahmani rule, site of historical battles.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹20', foreign: '₹50' },
      timings: { opening: '9:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '2-3 hours',
      accessibility: 'Steep ramps and stairs'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Architecture', 'History'],
    localFood: ['Solapur traditional snacks'],
    ratings: { average: 4.3, count: 1400 },
    isVerified: true
  },
  {
    name: 'Moti Baug Lake',
    description: 'Popular lake and bird sanctuary known for migratory birds in winter.',
    location: {
      type: 'Point',
      coordinates: [75.9070, 17.6678],
      address: 'Moti Baug Lake, Solapur, Maharashtra 413004',
      city: 'Solapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'lake',
    images: [
      {
        url: 'https://im.hunt.in/cg/Solapur/City-Guide/lakes-solapur2.jpg',
        caption: 'Moti Baug Lake, Solapur',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Favored spot for birdwatchers and picnickers.',
      bestTimeToVisit: 'November to February',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Well maintained walking paths'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Bird watching', 'Tranquil environment'],
    localFood: ['Local snacks'],
    ratings: { average: 4.4, count: 900 },
    isVerified: true
  },
  {
    name: 'Great Indian Bustard Sanctuary, Nannaj',
    description: 'Dedicated wildlife sanctuary to protect the Great Indian Bustard bird species.',
    location: {
      type: 'Point',
      coordinates: [75.7833, 17.7167],
      address: 'Nannaj, Solapur district, Maharashtra',
      city: 'Nannaj',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'wildlife sancturary',
    images: [
      {
        url: 'https://www.tourmyindia.com/states/maharashtra/images/great-indian-bustard-sanctuary1.jpg',
        caption: '[translate:Great Indian Bustard Sanctuary]',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'One of the premier bird sanctuaries for an endangered species.',
      bestTimeToVisit: 'November to March',
      entryFee: { indian: '₹50', foreign: '₹100' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '2-3 hours',
      accessibility: 'Reserved area, guided tours only'
    },
    amenities: {
      parking: true,
      restrooms: false,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Endangered bird', 'Wildlife preservation'],
    localFood: ['Local cuisine'],
    ratings: { average: 4.2, count: 500 },
    isVerified: true
  },
  {
    name: 'Akkalkot Swami Samarth Temple',
    description: 'Famous spiritual site dedicated to [translate:Swami Samarth Maharaj] who inspired many devotees.',
    location: {
      type: 'Point',
      coordinates: [76.5914, 17.0542],
      address: 'Akkalkot, Solapur district, Maharashtra 413216',
      city: 'Akkalkot',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://d3sftlgbtusmnv.cloudfront.net/blog/wp-content/uploads/2024/11/Akkalkot-Temple-Cover-Photo--840x425.jpg',
        caption: 'Akkalkot Swami Samarth Temple',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Spiritual and pilgrimage center with rich cultural heritage.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '5:00 AM', closing: '9:00 PM', weeklyOff: 'None' },
      duration: '2-3 hours',
      accessibility: 'Accessible for pilgrims'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Spirituality', 'Festivals'],
    localFood: ['Maharashtrian snacks'],
    ratings: { average: 4.6, count: 1700 },
    isVerified: true
  },
  {
    name: 'Phaltan',
    description: '[translate:Phaltan] city with [translate:Mahalakshmi] temple and beautiful hills nearby.',
    location: {
      type: 'Point',
      coordinates: [74.4659, 17.9756],
      address: 'Phaltan, Solapur district, Maharashtra',
      city: 'Phaltan',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://d3sftlgbtusmnv.cloudfront.net/blog/wp-content/uploads/2024/11/Akkalkot-Temple-Cover-Photo--840x425.jpg',
        caption: 'Mahalakshmi Temple, Phaltan',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Ancient religious temple attracting devotees from nearby regions.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '8:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Accessible'
    },
    amenities: {
      parking: true,
      restrooms: false,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Religious significance'],
    localFood: ['Local snacks'],
    ratings: { average: 4.1, count: 800 },
    isVerified: true
  },
  {
    name: 'Sambhaji Lake, Solapur',
    description: 'Popular natural lake offering peaceful surroundings and weekend picnics.',
    location: {
      type: 'Point',
      coordinates: [75.9307, 17.6650],
      address: 'Sambhaji Lake, Solapur, Maharashtra',
      city: 'Solapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'lake',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Sambhaji_Lake_Solapur.jpg',
        caption: 'Sambhaji Lake',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Natural habitat for migratory birds and a preferred picnic spot.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹10', foreign: '₹20' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '1-3 hours',
      accessibility: 'Accessible pathways'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Nature', 'Bird watching'],
    localFood: ['Local food stalls'],
    ratings: { average: 4.3, count: 700 },
    isVerified: true
  },
  {
    name: 'Tuljapur',
    description: '[translate:Tuljapur] is home to one of Maharashtra\'s most revered temples - [translate:Tulja Bhavani Temple].',
    location: {
      type: 'Point',
      coordinates: [76.2108, 17.7066],
      address: 'Tuljapur, Solapur district, Maharashtra 413601',
      city: 'Tuljapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Tulja_Bhavani_Temple_Tuljapur.jpg',
        caption: 'Tulja Bhavani Temple',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'One of the 51 Shakti Peeths and important pilgrimage center.',
      bestTimeToVisit: 'September to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '5:00 AM', closing: '9:00 PM', weeklyOff: 'None' },
      duration: '2-3 hours',
      accessibility: 'Accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Religious festivals', 'Historic architecture'],
    localFood: ['Maharashtrian meals'],
    ratings: { average: 4.7, count: 3600 },
    isVerified: true
  },  
  {
    name: 'Hazrat Shah Zahur Dargah, Solapur',
    description: 'Important Sufi shrine attracting devotees for centuries.',
    location: {
      type: 'Point',
      coordinates: [75.9004, 17.6611],
      address: 'Solapur city, Maharashtra',
      city: 'Solapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'other',
    images: [
      {
        url: 'https://www.hlimg.com/images/things2do/738X538/dargah_1512210533t.jpg',
        caption: 'Hazrat Shah Zahur Dargah',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Spiritual center for interfaith devotees.',
      bestTimeToVisit: 'Year-round',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '9:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Spirituality and Peace'],
    localFood: ['Local cuisine nearby'],
    ratings: { average: 4.5, count: 2300 },
    isVerified: true
  },
  {
    name: 'Hutatma Garden, Solapur',
    description: 'Public park and memorial dedicated to martyrs.',
    location: {
      type: 'Point',
      coordinates: [75.9037, 17.6652],
      address: 'Jawaharlal Nehru Rd, Solapur, Maharashtra',
      city: 'Solapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'other',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9GdeA7kmZUkLXeDR4eqIhswi_tV1tOHXZPw&s',
        caption: 'Hutatma Garden Solapur',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Site dedicated to those sacrificed in freedom struggle.',
      bestTimeToVisit: 'Morning and evenings',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '8:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Wheelchair accessible paths'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Peaceful ambiance', 'Local gatherings'],
    localFood: ['Street food nearby'],
    ratings: { average: 4.4, count: 900 },
    isVerified: true
  },
  {
    name: 'Naldurg Fort',
    description: 'Ancient fort near Solapur offering panoramic views and hiking opportunities.',
    location: {
      type: 'Point',
      coordinates: [75.0495, 17.2522],
      address: 'Naldurg, Solapur district, Maharashtra 413701',
      city: 'Naldurg',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'fort',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnrHIe3wwYtuGFlBzXpXF4NDjx5qm8rYZizg&s',
        caption: 'Naldurg Fort',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Medieval fort with strategic location.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹10', foreign: '₹20' },
      timings: { opening: '9:00 AM', closing: '5:00 PM', weeklyOff: 'None' },
      duration: '2-3 hours',
      accessibility: 'Hill climbing involved'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['History', 'Hiking'],
    localFood: ['Local Maharashtrian food'],
    ratings: { average: 4.2, count: 1100 },
    isVerified: true
  },
  {
    name: 'Hipparga Lake',
    description: 'Calm lake spot around Solapur ideal for picnics and bird watching.',
    location: {
      type: 'Point',
      coordinates: [75.8629, 17.5461],
      address: 'Hipparga Village, Solapur district, Maharashtra',
      city: 'Hipparga',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'lake',
    images: [
      {
        url: 'https://d1msew97rp2nin.cloudfront.net/prodin/tntravel/blogthumbnail/faqs-about-hipparga-lake-solapur-your-travel-guide-bf77f083-a613-442e-a4ff-bdc7d6966da7.jpeg',
        caption: 'Hipparga Lake',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Popular local picnic spot with greenery and birds.',
      bestTimeToVisit: 'November to February',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '1-3 hours',
      accessibility: 'Flat terrain'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Bird watching', 'Peaceful environment'],
    localFood: ['Village cuisine'],
    ratings: { average: 4.1, count: 400 },
    isVerified: true
  },
  {
    name: 'Pandharpur',
    description: '[translate:Pandharpur] is a famous pilgrimage city, renowned for the [translate:Vitthal Rakhumai Temple].',
    location: {
      type: 'Point',
      coordinates: [75.3200, 17.6800],
      address: 'Pandharpur, Solapur district, Maharashtra',
      city: 'Pandharpur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB7Ae61-7bYS7RPXs7JTrIW_0oMFmAdfI1-A&s',
        caption: 'Vitthal Rakhumai Temple, Pandharpur',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Important pilgrimage place for Lord Vitthal devotees.',
      bestTimeToVisit: 'June to September (Ashadhi Ekadashi festival)',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '5:00 AM', closing: '10:00 PM', weeklyOff: 'None' },
      duration: '1-3 days',
      accessibility: 'Easily accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Religious festival', 'Pilgrimage'],
    localFood: ['Maharashtrian thali'],
    ratings: { average: 4.8, count: 50000 },
    isVerified: true
  },
  {
    name: 'Kudal Sangam',
    description: 'Confluence of rivers with an ancient Hemadpanthi-style temple.',
    location: {
      type: 'Point',
      coordinates: [75.9200, 17.6910],
      address: 'Kudal Sangam, Solapur district, Maharashtra',
      city: 'Solapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'heritage',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/1-kudala-sangama-bijapur-karnataka-attr-hero?qlt=82&ts=1727415004780',
        caption: 'Kudal Sangam Temple',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Historical temple dedicated to Lord Shiva.',
      bestTimeToVisit: 'September to February',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '8:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Architecture', 'Religious importance'],
    localFood: ['Local snacks'],
    ratings: { average: 4.2, count: 900 },
    isVerified: true
  },
  {
    name: 'Sultanpur Bird Sanctuary',
    description: '[translate:Sultanpur Bird Sanctuary] is a premier birdwatching park located near Gurgaon, Haryana.',
    location: {
      type: 'Point',
      coordinates: [77.0450, 28.5041],
      address: 'NH 248A, Sultanpur, Haryana 122018',
      city: 'Gurgaon',
      state: 'Haryana',
      country: 'India'
    },
    category: 'wildlife sancturary',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVyTzGOlhZpqidYRXboaI6w9A9BhcTjbouBQ&s',
        caption: 'Sultanpur Bird Sanctuary',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Important protected area for migratory and resident birds.',
      bestTimeToVisit: 'November to February',
      entryFee: { indian: '₹50', foreign: '₹200' },
      timings: { opening: '6:00 AM', closing: '5:00 PM', weeklyOff: 'Wednesday' },
      duration: '2-3 hours',
      accessibility: 'Nature trails and bird hides'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Birdwatching', 'Migratory birds'],
    localFood: ['Local snacks around'],
    ratings: { average: 4.7, count: 8400 },
    isVerified: true
  },
  {
    name: 'Qutub Minar',
    description: 'Historic 73m high minaret in Delhi, a UNESCO World Heritage Site.',
    location: {
      type: 'Point',
      coordinates: [77.1855, 28.5245],
      address: 'Mehrauli, New Delhi, Delhi 110030',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'monument',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOjwfB2KNbo8AR3KR000IFUE5uekirt33gQQ&s',
        caption: 'Qutub Minar',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built in 1193 by Qutb-ud-din Aibak, symbolizing Indo-Islamic architecture.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹40', foreign: '₹600' },
      timings: { opening: '7:00 AM', closing: '5:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Partial wheelchair accessibility'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Architecture', 'History'],
    localFood: ['Delhi street food nearby'],
    ratings: { average: 4.6, count: 20000 },
    isVerified: true
  },
  {
    name: 'Kingdom of Dreams',
    description: 'Live entertainment and cultural venue in Gurugram.',
    location: {
      type: 'Point',
      coordinates: [77.0700, 28.4687],
      address: 'Sector 29, Gurugram, Haryana 122001',
      city: 'Gurugram',
      state: 'Haryana',
      country: 'India'
    },
    category: 'other',
    images: [
      {
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/88/0f/9e/the-open-area.jpg?w=900&h=500&s=1',
        caption: 'Kingdom of Dreams, Gurugram',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Hub for Bollywood-themed live shows & cultural experiences.',
      bestTimeToVisit: 'Year-round',
      entryFee: { indian: '₹600', foreign: '₹1500' },
      timings: { opening: '12:30 PM', closing: '11:00 PM', weeklyOff: 'Monday' },
      duration: '3-4 hours',
      accessibility: 'Fully accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Live performances', 'Cuisine'],
    localFood: ['Multi-cuisine food court'],
    ratings: { average: 4.5, count: 4000 },
    isVerified: true
  },
  {
    name: 'DamDama Lake',
    description: 'Scenic lake in Haryana popular for boating and picnics.',
    location: {
      type: 'Point',
      coordinates: [77.1471, 28.8943],
      address: 'DamDama Lake, Sohna, Haryana 122103',
      city: 'Gurgaon',
      state: 'Haryana',
      country: 'India'
    },
    category: 'lake',
    images: [
      {
        url: 'https://hblimg.mmtcdn.com/content/hubble/img/gurgaon_imgs/mmt/activities/m_Damdama_lake_4_l_480_640.jpg',
        caption: 'DamDama Lake',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Popular weekend getaway with boating and trekking.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '7:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '2-4 hours',
      accessibility: 'Accessible by road, walking paths'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Boating', 'Picnics'],
    localFood: ['Local dhabas'],
    ratings: { average: 4.3, count: 5200 },
    isVerified: true
  },
  {
    name: 'Raipur Bird Sanctuary',
    description: 'A protected wetland area in Haryana attracting migratory birds.',
    location: {
      type: 'Point',
      coordinates: [76.7885, 29.7196],
      address: 'Raipur, Haryana',
      city: 'Raipur',
      state: 'Haryana',
      country: 'India'
    },
    category: 'wildlife sancturary',
    images: [
      {
        url: 'https://content.jdmagicbox.com/comp/def_content_category/bird-sanctuary/dbdccce2bf-bird-sanctuary-4-dwhim.jpg',
        caption: 'Raipur Bird Sanctuary',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Known for diverse bird species including migratory birds.',
      bestTimeToVisit: 'November to March',
      entryFee: { indian: '₹25', foreign: '₹100' },
      timings: { opening: '7:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '2-3 hours',
      accessibility: 'Walkways and hides'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Birdwatching', 'Photography'],
    localFood: ['Local snacks'],
    ratings: { average: 4.2, count: 800 },
    isVerified: true
  },
  {
    name: 'Morni Hills',
    description: '[translate:Morni Hills] hill station in Panchkula, Haryana, known for trekking.',
    location: {
      type: 'Point',
      coordinates: [76.8000, 30.8000],
      address: 'Morni, Panchkula, Haryana 134205',
      city: 'Panchkula',
      state: 'Haryana',
      country: 'India'
    },
    category: 'hill-station',
    images: [
      {
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/58/ae/62/morni-hills.jpg?w=900&h=-1&s=1',
        caption: 'Morni Hills',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Haryana’s only hill station with serene forests and lakes.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹20', foreign: '₹50' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '1-2 days',
      accessibility: 'Mountain roads and walking trails'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Trekking', 'Nature'],
    localFood: ['Punjabi and Haryanvi dishes'],
    ratings: { average: 4.4, count: 3500 },
    isVerified: true
  },
  {
    name: 'Karnal Lake',
    description: 'Man-made lake in Karnal city, popular picnic and bird-watching spot.',
    location: {
      type: 'Point',
      coordinates: [76.9635, 29.6857],
      address: 'Karnal, Haryana 132001',
      city: 'Karnal',
      state: 'Haryana',
      country: 'India'
    },
    category: 'lake',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrOIMuEG7ahQnZPhEzMLnrgnBeF5JEk-WrVQ&s',
        caption: 'Karnal Lake',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Constructed as a water body attraction and ecological reserve.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '8:00 PM', weeklyOff: 'None' },
      duration: '2-3 hours',
      accessibility: 'Wheelchair accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Picnic', 'Boating'],
    localFood: ['Karnal local restaurants'],
    ratings: { average: 4.3, count: 4000 },
    isVerified: true
  },
  {
    name: 'Heritage Transport Museum',
    description: 'One of India’s largest automobile museums situated near Gurgaon.',
    location: {
      type: 'Point',
      coordinates: [77.0660, 28.4368],
      address: 'Taoru, Gurgaon, Haryana 122001',
      city: 'Gurgaon',
      state: 'Haryana',
      country: 'India'
    },
    category: 'museum',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOtH131cjjUt-1tBMr_EU0i__SW1xte8Xj-Q&s',
        caption: 'Heritage Transport Museum',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Museum dedicated to preservation of automotive heritage.',
      bestTimeToVisit: 'November to February',
      entryFee: { indian: '₹100', foreign: '₹300' },
      timings: { opening: '9:00 AM', closing: '6:00 PM', weeklyOff: 'Monday' },
      duration: '2-3 hours',
      accessibility: 'Fully accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Automobiles', 'History'],
    localFood: ['Adjacent cafes'],
    ratings: { average: 4.7, count: 3000 },
    isVerified: true
  },
  {
    name: 'Sheetla Mata Mandir',
    description: 'Ancient temple dedicated to Goddess Sheetla Mata in Gurgaon.',
    location: {
      type: 'Point',
      coordinates: [77.0151, 28.4506],
      address: 'Sheetla Mata Mandir Rd, Gurgaon, Haryana 122001',
      city: 'Gurgaon',
      state: 'Haryana',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://haryanatourism.gov.in/wp-content/uploads/2024/07/sheetala_pic1-1.jpg',
        caption: 'Sheetla Mata Mandir',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Important religious site, attracts devotees especially during festivals.',
      bestTimeToVisit: 'All year',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '5:00 AM', closing: '9:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Accessible for all'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Religious significance', 'Festivals'],
    localFood: ['Nearby vegetarian cuisine'],
    ratings: { average: 4.5, count: 4200 },
    isVerified: true
  },
  {
    name: 'Iskcon Temple, Delhi',
    description: '[translate:Iskcon Temple] is a famous spiritual center and cultural hub in Delhi.',
    location: {
      type: 'Point',
      coordinates: [77.2259, 28.6139],
      address: 'H Block, Hare Krishna Land, East of Kailash, New Delhi, Delhi 110065',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/d0/3d/93/iconic-view-iskcon-glory.jpg?w=900&h=500&s=1',
        caption: 'Iskcon Temple Delhi',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Established in 1998, popular for spiritual and cultural festivals.',
      bestTimeToVisit: 'All year',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '4:30 AM', closing: '9:30 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Wheelchair accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Spiritual gatherings', 'Architecture'],
    localFood: ['Vegetarian meals served'],
    ratings: { average: 4.7, count: 9400 },
    isVerified: true
  },
  {
    name: 'Mahalaxmi Temple',
    description: '[translate:Mahalaxmi Temple] is a revered Hindu shrine dedicated to Goddess Mahalaxmi in Kolhapur.',
    location: {
      type: 'Point',
      coordinates: [74.2437, 16.6956],
      address: 'Shri Mahalaxmi Temple, Kolhapur, Maharashtra 416012',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Mahalaxmi_Temple%2C_Kolhapur.jpgg',
        caption: 'Mahalaxmi Temple Kolhapur',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built in the 7th century by Chalukya rulers, a Shakti Peetha of great religious significance.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '5:00 AM', closing: '10:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Fully wheelchair accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Religious devotion', 'Ancient architecture'],
    localFood: ['Misal Pav', 'Kolhapuri Thali'],
    ratings: { average: 4.8, count: 15000 },
    isVerified: true
  },
  {
    name: 'Panhala Fort',
    description: '[translate:Panhala Fort] is a historic hill fort near Kolhapur known for its Maratha legacy.',
    location: {
      type: 'Point',
      coordinates: [74.1054, 16.8127],
      address: 'Panhala, Kolhapur, Maharashtra 416201',
      city: 'Panhala',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'fort',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/panhala-fort-kolhapur-maharashtra-4-attr-hero?qlt=82&ts=1726668849264',
        caption: 'Panhala Fort',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Associated with Chhatrapati Shivaji Maharaj and the Maratha Empire.',
      bestTimeToVisit: 'October to February',
      entryFee: { indian: '₹20', foreign: '₹100' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '3-4 hours',
      accessibility: 'Accessible by road, moderate walking required'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['History', 'Architecture', 'Views'],
    localFood: ['Kolhapuri Tambada Rassa'],
    ratings: { average: 4.6, count: 8000 },
    isVerified: true
  },
  {
    name: 'Rankala Lake',
    description: '[translate:Rankala Lake] is a scenic man-made lake in the heart of Kolhapur city.',
    location: {
      type: 'Point',
      coordinates: [74.2255, 16.6950],
      address: 'Rankala Lake, Kolhapur, Maharashtra 416012',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'lake',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/rankala-lake-kolhapur-maharashtra-2-attr-hero?qlt=82&ts=1726668761178',
        caption: 'Rankala Lake',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Created in the 19th century, offers boating and sunset views.',
      bestTimeToVisit: 'November to February',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '8:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Good for families and children'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Boating', 'Sunset views'],
    localFood: ['Ice gola', 'Street snacks'],
    ratings: { average: 4.4, count: 6200 },
    isVerified: true
  },
  {
    name: 'Jyotiba Temple',
    description: '[translate:Jyotiba Temple] is a revered hilltop temple named after Lord Jyotiba near Kolhapur.',
    location: {
      type: 'Point',
      coordinates: [74.1523, 16.8452],
      address: 'Jyotiba Road, Wadi Ratnagiri, Maharashtra 416206',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/jyotiba-temple-kolhapur-maharashtra-1-attr-hero?qlt=82&ts=1726668740914',
        caption: 'Jyotiba Temple Kolhapur',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built in the 18th century, dedicated to the guardian deity of Kolhapur.',
      bestTimeToVisit: 'March to May during fair festivities',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '5:00 AM', closing: '9:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Steep hill road access'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Religious fairs', 'Hill views'],
    localFood: ['Bhakri, Jhunka'],
    ratings: { average: 4.5, count: 4500 },
    isVerified: true
  },
  {
    name: 'New Palace Museum',
    description: '[translate:New Palace Museum] showcases artifacts from Kolhapur’s royal family.',
    location: {
      type: 'Point',
      coordinates: [74.2293, 16.6923],
      address: 'New Palace, Shivaji University Road, Kolhapur 416008',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'museum',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/new-palace-kolhapur-maharashtra-3-attr-hero?qlt=82&ts=1726668831799',
        caption: 'New Palace Museum Kolhapur',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built in 1884 by Chhatrapati Shahu Maharaj, blending Indian and European styles.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹50', foreign: '₹200' },
      timings: { opening: '10:00 AM', closing: '6:00 PM', weeklyOff: 'Monday' },
      duration: '2-3 hours',
      accessibility: 'Partial wheelchair access'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Maratha history', 'Royal artifacts'],
    localFood: ['Kolhapuri Mutton'],
    ratings: { average: 4.6, count: 5900 },
    isVerified: true
  },
  {
    name: 'Radhanagari Wildlife Sanctuary',
    description: '[translate:Radhanagari Wildlife Sanctuary] is a UNESCO-protected wildlife reserve near Kolhapur.',
    location: {
      type: 'Point',
      coordinates: [73.8908, 16.3933],
      address: 'Radhanagari, Kolhapur, Maharashtra 416212',
      city: 'Radhanagari',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'wildlife',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7EOK7udArR_8jXrL0YO48MKeNRIJ6UFcn1g&s',
        caption: 'Radhanagari Wildlife Sanctuary',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Famous for Indian bison (gaur) and rich biodiversity.',
      bestTimeToVisit: 'November to February',
      entryFee: { indian: '₹30', foreign: '₹200' },
      timings: { opening: '7:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '3-5 hours',
      accessibility: 'Forest trails and safari routes'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Wildlife', 'Eco-tourism'],
    localFood: ['Local tribal dishes nearby'],
    ratings: { average: 4.7, count: 2800 },
    isVerified: true
  },
  {
    name: 'Gaganbawada',
    description: '[translate:Gaganbawada] is a beautiful hill station west of Kolhapur offering serene views.',
    location: {
      type: 'Point',
      coordinates: [73.7652, 16.8215],
      address: 'Gaganbawada, Kolhapur, Maharashtra 416206',
      city: 'Gaganbawada',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'hill-station',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Gagagngad.jpg',
        caption: 'Gaganbawada Hill Station',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Offers panoramic views of the Konkan valley, known for monsoon treks.',
      bestTimeToVisit: 'June to September',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'All Day', closing: 'All Day', weeklyOff: 'None' },
      duration: 'Half-day',
      accessibility: 'Good roads, hilly terrain'
    },
    amenities: {
      parking: true,
      restrooms: false,
      restaurant: true,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Nature', 'Photography'],
    localFood: ['Vadapav', 'Poha'],
    ratings: { average: 4.5, count: 3200 },
    isVerified: true
  },
  {
    name: 'Khasbag Wrestling Stadium',
    description: '[translate:Khasbag Maidan] is India’s largest wrestling stadium, built during the reign of Shahu Maharaj.',
    location: {
      type: 'Point',
      coordinates: [74.2455, 16.7045],
      address: 'Khasbag Maidan, Kolhapur, Maharashtra 416012',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'sports',
    images: [
      {
        url: 'https://seawatersports.com/images/places/khasbag-wrestling-stadium.png',
        caption: 'Khasbag Wrestling Stadium',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Historic center of traditional Indian wrestling (kushti).',
      bestTimeToVisit: 'During wrestling tournaments',
      entryFee: { indian: '₹20', foreign: '₹50' },
      timings: { opening: '8:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Central city location, fully accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Wrestling events', 'Cultural heritage'],
    localFood: ['Spiced buttermilk stalls nearby'],
    ratings: { average: 4.3, count: 2400 },
    isVerified: true
  },
  {
    name: 'Dajipur Wildlife Sanctuary',
    description: '[translate:Dajipur Sanctuary] is home to Indian bison and dense forests near the Sahyadris.',
    location: {
      type: 'Point',
      coordinates: [73.9145, 16.2858],
      address: 'Dajipur, Radhanagari Taluk, Kolhapur 416212',
      city: 'Dajipur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'wildlife',
    images: [
      {
        url: 'https://www.trawell.in/admin/images/upload/796114840Radhanagari_Sanctuary.jpg',
        caption: 'Dajipur Bison Sanctuary',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Protected forest region inside the Western Ghats biosphere.',
      bestTimeToVisit: 'December to April',
      entryFee: { indian: '₹50', foreign: '₹200' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: 'Half to full day',
      accessibility: 'Forest route, suitable for safaris'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Wildlife safari', 'Nature retreat'],
    localFood: ['Simple Marathi meals nearby'],
    ratings: { average: 4.6, count: 2100 },
    isVerified: true
  },
  {
    name: 'Kaneri Math (Siddhagiri Museum)',
    description: '[translate:Siddhagiri Museum] is an open-air museum depicting rural life through sculptures.',
    location: {
      type: 'Point',
      coordinates: [74.2182, 16.7184],
      address: 'Kaneri, Kolhapur, Maharashtra 416234',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'museum',
    images: [
      {
        url: 'https://siddhagirimatham.org/public/images/frontend/Matham-Entrance-2.png',
        caption: 'Siddhagiri Museum',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Depicts vision of a self-sustaining village envisioned by Mahatma Gandhi.',
      bestTimeToVisit: 'All year round',
      entryFee: { indian: '₹50', foreign: '₹200' },
      timings: { opening: '9:00 AM', closing: '6:00 PM', weeklyOff: 'Monday' },
      duration: '2 hours',
      accessibility: 'Wheelchair friendly premises'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Village life sculptures', 'Educational exhibits'],
    localFood: ['Kolhapuri snacks'],
    ratings: { average: 4.8, count: 5000 },
    isVerified: true
  },
  {
    name: 'Kopeshwar Temple',
    description: '[translate:Kopeshwar Temple] is an ancient Hindu temple dedicated to Lord Shiva, known for its intricate carvings and architecture.',
    location: {
      type: 'Point',
      coordinates: [74.2220, 16.7350],
      address: 'Kopeshwar Temple, Khidrapur, Kolhapur, Maharashtra 416114',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/kopeshwar-temple-kolhapur-maharashtra-2-attr-hero?qlt=82&ts=1726668804923',
        caption: 'Kopeshwar Temple',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built in the 12th century, a fine example of Hemadpanthi style architecture.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '8:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Moderate walking required'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Architecture', 'Religious festivals'],
    localFood: ['Traditional Maharashtrian prasad'],
    ratings: { average: 4.5, count: 2700 },
    isVerified: true
  },
  {
    name: 'Sagareshwar Wildlife Sanctuary',
    description: '[translate:Sagareshwar Wildlife Sanctuary] is a biodiversity hotspot near Kolhapur, rich in flora and fauna.',
    location: {
      type: 'Point',
      coordinates: [74.2770, 16.6450],
      address: 'Sagareshwar Sanctuary, Kolhapur, Maharashtra 416001',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'wildlife',
    images: [
      {
        url: 'https://vajiramandravi.com/current-affairs/wp-content/uploads/2025/04/sagareshwar_wildlife_sanctuary.webp',
        caption: 'Sagareshwar Wildlife Sanctuary',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Known for sightings of black bucks, spotted deer, and various birds.',
      bestTimeToVisit: 'November to February',
      entryFee: { indian: '₹30', foreign: '₹150' },
      timings: { opening: '7:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '3-4 hours',
      accessibility: 'Jungle trails, partial wheelchair access'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: false
    },
    famousFor: ['Wildlife viewing', 'Eco-tourism'],
    localFood: ['Local tribal food stalls'],
    ratings: { average: 4.6, count: 3200 },
    isVerified: true
  },
  {
    name: 'Chandrakant Mandhare Art Gallery',
    description: '[translate:Chandrakant Mandhare Art Gallery] exhibits contemporary and traditional art pieces by the renowned Kolhapur artist Chandrakant Mandhare.',
    location: {
      type: 'Point',
      coordinates: [74.2325, 16.7003],
      address: 'Chandrakant Mandhare Art Gallery, Kolhapur, Maharashtra 416008',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'art gallery',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/chandrakant-mandare-art-gallery-museum-kolhapur-maharashtra-attr-about?qlt=82&ts=1726674932624',
        caption: 'Chandrakant Mandhare Art Gallery',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Showcases the artistic heritage of Kolhapur through paintings and sculptures.',
      bestTimeToVisit: 'All year',
      entryFee: { indian: '₹20', foreign: '₹50' },
      timings: { opening: '10:00 AM', closing: '6:00 PM', weeklyOff: 'Monday' },
      duration: '1-2 hours',
      accessibility: 'Wheelchair accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Fine arts', 'Cultural exhibitions'],
    localFood: ['Nearby cafes'],
    ratings: { average: 4.4, count: 900 },
    isVerified: true
  },
  {
    name: 'Amboli Waterfall',
    description: '[translate:Amboli Waterfall] is a picturesque waterfall near Kolhapur, popular during monsoons.',
    location: {
      type: 'Point',
      coordinates: [74.2550, 16.6400],
      address: 'Amboli Waterfall, Kolhapur District, Maharashtra',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'waterfall',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHHaXMCc-be64XzVIcN53ebBcIzs1hXipm8g&s',
        caption: 'Amboli Waterfall',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Famous for natural beauty and biodiversity of the Western Ghats.',
      bestTimeToVisit: 'Monsoon season (June to September)',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '8:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '2-3 hours',
      accessibility: 'Accessible by road, some trekking involved'
    },
    amenities: {
      parking: true,
      restrooms: false,
      restaurant: false,
      guide: false,
      wheelchairAccessible: false
    },
    famousFor: ['Nature walks', 'Photography'],
    localFood: ['Local snacks from vendors'],
    ratings: { average: 4.7, count: 1800 },
    isVerified: true
  },
  {
    name: 'Bhavani Mandap',
    description: '[translate:Bhavani Mandap] is a historic palace complex and cultural center in Kolhapur.',
    location: {
      type: 'Point',
      coordinates: [74.2367, 16.7032],
      address: 'Bhavani Mandap, Kolhapur, Maharashtra 416008',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'heritage',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNpH07mm0erUbzglsHr_laVMRJjjxOHzGLrQ&s',
        caption: 'Bhavani Mandap',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Served as residence of Kolhapur’s rulers, venue for royal assemblies.',
      bestTimeToVisit: 'October to February',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '10:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Royal heritage', 'Architecture'],
    localFood: ['Kolhapuri misal nearby'],
    ratings: { average: 4.5, count: 2300 },
    isVerified: true
  },
  {
    name: 'Town Hall Museum',
    description: '[translate:Town Hall Museum] exhibits colonial-era artifacts and historical items of Kolhapur.',
    location: {
      type: 'Point',
      coordinates: [74.2370, 16.7090],
      address: 'Town Hall, Kolhapur, Maharashtra 416008',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'museum',
    images: [
      {
        url: 'https://www.kolhapurtourism.org/wp-content/uploads/2015/01/town-01.jpg',
        caption: 'Town Hall Museum Kolhapur',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Houses a collection of colonial memorabilia and local history artifacts.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹20', foreign: '₹50' },
      timings: { opening: '10:00 AM', closing: '5:00 PM', weeklyOff: 'Monday' },
      duration: '1-2 hours',
      accessibility: 'Wheelchair accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Historical exhibits', 'Colonial architecture'],
    localFood: ['Nearby eateries'],
    ratings: { average: 4.2, count: 900 },
    isVerified: true
  },
  {
    name: 'Shalini Palace',
    description: '[translate:Shalini Palace] is a royal palace on the shores of Rankala Lake, showcasing Indo-Saracenic architecture.',
    location: {
      type: 'Point',
      coordinates: [74.2265, 16.6955],
      address: 'Shalini Palace, Rankala Lake, Kolhapur, Maharashtra 416008',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'palace',
    images: [
      {
        url: 'https://www.tourmyindia.com/states/maharashtra/images/shalini-palace-kolhapur1.jpg',
        caption: 'Shalini Palace',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Built in early 20th century, used as a royal guest house and filming location.',
      bestTimeToVisit: 'October to February',
      entryFee: { indian: '₹30', foreign: '₹100' },
      timings: { opening: '10:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: true,
      wheelchairAccessible: true
    },
    famousFor: ['Architecture', 'Lake views'],
    localFood: ['Kolhapuri snacks'],
    ratings: { average: 4.6, count: 1600 },
    isVerified: true
  },
  {
    name: 'Chopdai (Baradari) Temple',
    description: '[translate:Chopdai (Baradari) Temple] is a marble temple featuring 84 pillars, located near Kedareshwar Temple.',
    location: {
      type: 'Point',
      coordinates: [74.2200, 16.7280],
      address: 'Chopdai Temple, Kolhapur, Maharashtra 416008',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR443Phf_NgJ_DnueQbFJB5hQ48BIWFiZjZmw&s',
        caption: 'Chopdai Temple',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'Known for its stunning pillars and intricate artwork.',
      bestTimeToVisit: 'All year',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '9:00 PM', weeklyOff: 'None' },
      duration: '30 minutes to 1 hour',
      accessibility: 'Accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: false,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Architecture', 'Religious importance'],
    localFood: ['Nearby street food'],
    ratings: { average: 4.3, count: 1100 },
    isVerified: true
  },
  {
    name: 'Ambabai Temple (Mahalaxmi Temple) Night View',
    description: '[translate:Ambabai Temple] offers a beautiful night view experience with the temple illuminated after sunset.',
    location: {
      type: 'Point',
      coordinates: [74.2437, 16.6956],
      address: 'Mahalaxmi Temple, Kolhapur, Maharashtra 416012',
      city: 'Kolhapur',
      state: 'Maharashtra',
      country: 'India'
    },
    category: 'temple',
    images: [
      {
        url: 'https://s7ap1.scene7.com/is/image/incredibleindia/mahalaxmi-temple-kolhapur-maharashtra-2-attr-hero?qlt=82&ts=1726668854430',
        caption: 'Mahalaxmi Temple Night View',
        source: 'Wikimedia'
      }
    ],
    details: {
      historicalSignificance: 'The illumination highlights detailed temple carvings and attracts evening visitors.',
      bestTimeToVisit: 'Evenings, all year',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 PM', closing: '10:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Fully accessible'
    },
    amenities: {
      parking: true,
      restrooms: true,
      restaurant: true,
      guide: false,
      wheelchairAccessible: true
    },
    famousFor: ['Night illumination', 'Spiritual ambiance'],
    localFood: ['Evening street food stalls'],
    ratings: { average: 4.7, count: 8200 },
    isVerified: true
  },
  {
    name: 'Red Fort',
    description: '[translate:Red Fort] is an iconic Mughal fort in Delhi, symbolizing India\'s rich heritage and hosting national events.',
    location: {
      type: 'Point',
      coordinates: [77.2410, 28.6562],
      address: 'Netaji Subhash Marg, Chandni Chowk, New Delhi, Delhi 110006',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'fort',
    images: [
      { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/red-fort-delhi-attr-hero?qlt=82&ts=1742170556347', 
        caption: 'Red Fort, Delhi', 
        source: 'Google Images' 
      }
    ],
    details: {
      historicalSignificance: 'UNESCO World Heritage Site and a major symbol of India’s Mughal era.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹35', foreign: '₹500' },
      timings: { opening: '9:30 AM', closing: '4:30 PM', weeklyOff: 'Monday' },
      duration: '2-3 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: true, guide: true, wheelchairAccessible: true },
    famousFor: ['Historical ceremonies', 'Mughal architecture'],
    localFood: ['Street food around Chandni Chowk'],
    ratings: { average: 4.5, count: 17000 },
    isVerified: true
  },
  {
    name: 'India Gate',
    description: '[translate:India Gate] is a war memorial dedicated to Indian soldiers, located in the heart of New Delhi.',
    location: {
      type: 'Point',
      coordinates: [77.2295, 28.6129],
      address: 'Rajpath, India Gate, New Delhi, Delhi 110001',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'monument',
    images: [
      { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/india-gate-delhi-2-attr-hero?qlt=82&ts=1742164655647', caption: 'India Gate, New Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Commemorates soldiers of the Indian Army who died in WWI.',
      bestTimeToVisit: 'Evenings, October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'Open 24 hours', closing: '', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: false, wheelchairAccessible: true },
    famousFor: ['War memorial', 'Night illumination'],
    localFood: ['Ice creams, Delhi street food nearby'],
    ratings: { average: 4.7, count: 74000 },
    isVerified: true
  },
  {
    name: 'Lotus Temple',
    description: '[translate:Lotus Temple] is a Baháʼí House of Worship famed for its flowerlike architecture.',
    location: {
      type: 'Point',
      coordinates: [77.2588, 28.5535],
      address: 'Lotus Temple Rd, Shambhu Dayal Bagh, Bahapur, New Delhi, Delhi 110019',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'temple',
    images: [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZXC1iRVdoZ-kAB-36JWpPtkndG4BtDYpRMg&s', caption: 'Lotus Temple, Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Noted for its design; open to people of all religions.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '9:00 AM', closing: '5:00 PM', weeklyOff: 'Monday' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: false, wheelchairAccessible: true },
    famousFor: ['Lotus-shaped structure', 'Peaceful ambiance'],
    localFood: ['Street stalls nearby'],
    ratings: { average: 4.6, count: 47000 },
    isVerified: true
  },
  {
    name: 'Humayun’s Tomb',
    description: '[translate:Humayun’s Tomb] is the tomb of the Mughal Emperor Humayun and a UNESCO World Heritage Site.',
    location: {
      type: 'Point',
      coordinates: [77.2507, 28.5933],
      address: 'Mathura Road, Opposite Dargah, Nizamuddin, New Delhi, Delhi 110013',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'monument',
    images: [
      { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/humayuns-tomb-delhi-1-attr-hero?qlt=82&ts=1742197608302', caption: 'Humayun’s Tomb, Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'First garden tomb in India and inspiration for the Taj Mahal.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹40', foreign: '₹600' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Mughal gardens', 'Architectural beauty'],
    localFood: ['Restaurants at Nizamuddin'],
    ratings: { average: 4.6, count: 23000 },
    isVerified: true
  },
  {
    name: 'Akshardham Temple',
    description: '[translate:Akshardham Temple] is a sprawling Hindu temple complex famous for its intricate carvings and exhibitions.',
    location: {
      type: 'Point',
      coordinates: [77.2773, 28.6127],
      address: 'Noida Mor, Pandav Nagar, New Delhi, Delhi 110092',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'temple',
    images: [
      { url: 'https://media.easemytrip.com/media/Blog/India/637116640324801740/637116640324801740ptZ4Mc.jpg', caption: 'Akshardham Temple, Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Modern architectural marvel and cultural complex.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free (complex), ₹220 for exhibitions', foreign: 'Same' },
      timings: { opening: '10:00 AM', closing: '6:30 PM', weeklyOff: 'Monday' },
      duration: '2-3 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: true, guide: true, wheelchairAccessible: true },
    famousFor: ['Water show', 'Carved stonework'],
    localFood: ['Yagnapurush Kund food court'],
    ratings: { average: 4.7, count: 61000 },
    isVerified: true
  },
  {
    name: 'Jama Masjid',
    description: '[translate:Jama Masjid] is one of India’s largest mosques, built by Shah Jahan in the 17th century.',
    location: {
      type: 'Point',
      coordinates: [77.2340, 28.6507],
      address: 'Jama Masjid Rd, Jama Masjid, Delhi 110006',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'temple',
    images: [
      { url: 'https://www.agrashivtourandtravels.com/wp-content/uploads/2020/06/jama-710x350.jpg', caption: 'Jama Masjid, Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Largest mosque in India; central to Old Delhi’s culture.',
      bestTimeToVisit: 'Morning or evening, October to March',
      entryFee: { indian: 'Free', foreign: 'Free (₹300 for photography)' },
      timings: { opening: '7:00 AM', closing: '6:30 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Partly accessible'
    },
    amenities: { parking: false, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Islamic architecture', 'Panoramic city views'],
    localFood: ['Old Delhi Mughlai food'],
    ratings: { average: 4.6, count: 35000 },
    isVerified: true
  },
  {
    name: 'Lodhi Gardens',
    description: '[translate:Lodhi Gardens] is a tranquil park featuring 15th-century tombs, historic architecture, and lush greenery.',
    location: {
      type: 'Point',
      coordinates: [77.2197, 28.5933],
      address: 'Lodhi Road, Lodhi Gardens, New Delhi, Delhi 110003',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/lodhi-garden-delhi-1-attr-hero?qlt=82&ts=1742199989187', caption: 'Lodhi Gardens, Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Mausoleums of Lodhi dynasty, green urban escape.',
      bestTimeToVisit: 'Morning, October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '7:30 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: false, wheelchairAccessible: true },
    famousFor: ['Historic tombs', 'City park'],
    localFood: ['Delhi street food nearby'],
    ratings: { average: 4.7, count: 40000 },
    isVerified: true
  },
  {
    name: 'Gurudwara Bangla Sahib',
    description: '[translate:Gurudwara Bangla Sahib] is Delhi’s most prominent Sikh shrine, renowned for its Sarovar and langar.',
    location: {
      type: 'Point',
      coordinates: [77.2090, 28.6263],
      address: 'Hanuman Road Area, Connaught Place, New Delhi, Delhi 110001',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'temple',
    images: [
      { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/gurudwara-banga-sahib-delhi-1-attr-hero?qlt=82&ts=1742170364166', caption: 'Bangla Sahib Gurudwara, Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Sikh worship place, offers free community meals.',
      bestTimeToVisit: 'Anytime, October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'Open 24 hours', closing: '', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: false, wheelchairAccessible: true },
    famousFor: ['Sarovar', 'Langar'],
    localFood: ['Langar meal'],
    ratings: { average: 4.8, count: 54000 },
    isVerified: true
  },
  {
    name: 'Rashtrapati Bhavan',
    description: '[translate:Rashtrapati Bhavan] is the official residence of the President of India, with impressive Mughal Gardens.',
    location: {
      type: 'Point',
      coordinates: [77.1990, 28.6143],
      address: 'Rashtrapati Bhavan, President’s Estate, New Delhi, Delhi 110004',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'palace',
    images: [
      { url: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2022/07/26164357/Rashtrapati-Bhavan.jpg?tr=w-1200,q-60', caption: 'Rashtrapati Bhavan, New Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'British-Era Presidential residence; renowned Mughal Gardens.',
      bestTimeToVisit: 'Garden: February-March',
      entryFee: { indian: '₹50', foreign: '₹50' },
      timings: { opening: '9:00 AM', closing: '4:00 PM', weeklyOff: 'Monday' },
      duration: '2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: false, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Presidential building', 'Mughal gardens'],
    localFood: [],
    ratings: { average: 4.8, count: 12000 },
    isVerified: true
  },
  {
    name: 'National Museum',
    description: '[translate:National Museum] contains artifacts representing 5000 years of Indian history and heritage.',
    location: {
      type: 'Point',
      coordinates: [77.2166, 28.6117],
      address: 'Janpath Rd, Rajpath Area, Central Secretariat, New Delhi, Delhi 110011',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'museum',
    images: [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_3QEJ6_x0PvnKrdw-Cqfmy0UpLT-prz7Cw&s', caption: 'National Museum, Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Rich collection spanning prehistory to modern times.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹20', foreign: '₹650' },
      timings: { opening: '10:00 AM', closing: '6:00 PM', weeklyOff: 'Monday' },
      duration: '2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: false, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Indian antiquities', 'Historical collections'],
    localFood: [],
    ratings: { average: 4.5, count: 11000 },
    isVerified: true
  },
  {
    name: 'Jantar Mantar',
    description: '[translate:Jantar Mantar] is an astronomical observatory with 18th-century instruments.',
    location: {
      type: 'Point',
      coordinates: [77.2100, 28.6272],
      address: 'Sansad Marg, Connaught Place, New Delhi, Delhi 110001',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMSTf0wsmk1HR0wJvQcZebYMPISyPqcU3S7w&s', caption: 'Jantar Mantar, Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'One of the five astronomical observatories built by Maharaja Jai Singh II.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹20', foreign: '₹250' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: false, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Astronomical instruments', 'Historic science site'],
    localFood: [],
    ratings: { average: 4.2, count: 7000 },
    isVerified: true
  },
  {
    name: 'Purana Qila (Old Fort)',
    description: '[translate:Purana Qila] is one of Delhi’s oldest forts, associated with ancient Indraprastha.',
    location: {
      type: 'Point',
      coordinates: [77.2439, 28.6094],
      address: 'Mathura Road, Pragati Maidan, New Delhi, Delhi 110003',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'fort',
    images: [
      { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/old-fort-(purana-quila)-delhi-attr-hero?qlt=82&ts=1742173633108', caption: 'Purana Qila, Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Links to Mahabharata’s Indraprastha; notable Mughal relics.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹30', foreign: '₹300' },
      timings: { opening: '7:00 AM', closing: '5:00 PM', weeklyOff: 'None' },
      duration: '2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Historic battles', 'Light & Sound show'],
    localFood: [],
    ratings: { average: 4.5, count: 15000 },
    isVerified: true
  },
  {
    name: 'Agrasen ki Baoli',
    description: '[translate:Agrasen ki Baoli] is an ancient stepwell in central Delhi, renowned for its unique arches and mystery.',
    location: {
      type: 'Point',
      coordinates: [77.2255, 28.6261],
      address: 'Hailey Road, Connaught Place, New Delhi, Delhi 110001',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://res.cloudinary.com/purnesh/image/upload/w_540,f_auto,q_auto:eco,c_limit/92876190-2638504226396955-8630912871820957302-n-1.jpg', caption: 'Agrasen ki Baoli, Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: '14th-century stepwell, famous for architecture and folklore.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '7:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '30 minutes',
      accessibility: 'Accessible'
    },
    amenities: { parking: false, restrooms: false, restaurant: false, guide: false, wheelchairAccessible: false },
    famousFor: ['Stepwell', 'Architectural photography'],
    localFood: [],
    ratings: { average: 4.5, count: 16000 },
    isVerified: true
  },
  {
    name: 'ISKCON Temple Delhi',
    description: '[translate:ISKCON Temple Delhi] is a vibrant Krishna temple in East of Kailash.',
    location: {
      type: 'Point',
      coordinates: [77.2448, 28.5688],
      address: 'Hare Krishna Hill, East of Kailash, New Delhi, Delhi 110065',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'temple',
    images: [
      { url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/d0/3d/93/iconic-view-iskcon-glory.jpg?w=900&h=500&s=1', caption: 'ISKCON Temple Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Major spiritual, educational, and cultural center of ISKCON.',
      bestTimeToVisit: 'Festivals, October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '4:30 AM', closing: '8:30 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: true, guide: false, wheelchairAccessible: true },
    famousFor: ['Krishna bhajans', 'Vibrant festivals'],
    localFood: ['Govinda’s Restaurant'],
    ratings: { average: 4.7, count: 17000 },
    isVerified: true
  },
  {
    name: 'National Rail Museum',
    description: '[translate:National Rail Museum] offers a rich collection of India’s railway heritage including engines and coaches.',
    location: {
      type: 'Point',
      coordinates: [77.1773, 28.5803],
      address: 'Chanakyapuri, New Delhi, Delhi 110021',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'museum',
    images: [
      { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/national-rail-museum-delhi-1-attr-hero?qlt=82&ts=1751459435602', caption: 'National Rail Museum, Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Preserves rail legacy; exhibits historic carriages, engines.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹50', foreign: '₹200' },
      timings: { opening: '10:00 AM', closing: '5:00 PM', weeklyOff: 'Monday' },
      duration: '1-2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Old engines', 'Toy train ride'],
    localFood: [],
    ratings: { average: 4.6, count: 13000 },
    isVerified: true
  },
  {
    name: 'Dilli Haat INA',
    description: '[translate:Dilli Haat INA] is an open-air market showcasing crafts, food, and culture from different states of India.',
    location: {
      type: 'Point',
      coordinates: [77.2204, 28.5687],
      address: 'Sri Aurobindo Marg, INA, New Delhi, Delhi 110023',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'other',
    images: [
      { url: 'https://delhitourism.travel/images/places-to-visit/headers/dilli-haat-delhi-tourism-entry-fee-timings-holidays-reviews-header.jpg', caption: 'Dilli Haat INA, Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Promotes India’s craft, cuisines, and handlooms.',
      bestTimeToVisit: 'Evening, October to March',
      entryFee: { indian: '₹30', foreign: '₹100' },
      timings: { opening: '10:30 AM', closing: '10:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: true, guide: false, wheelchairAccessible: true },
    famousFor: ['Crafts fair', 'Cultural festivals'],
    localFood: ['Food from diverse Indian states'],
    ratings: { average: 4.4, count: 19000 },
    isVerified: true
  },
  {
    name: 'Mehrauli Archaeological Park',
    description: '[translate:Mehrauli Archaeological Park] contains over 100 ancient monuments near Qutub Minar.',
    location: {
      type: 'Point',
      coordinates: [77.1852, 28.5153],
      address: 'Mehrauli, New Delhi, Delhi 110030',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/mehrauli-archaeological-park-delhi-1-attr-hero?qlt=82&ts=1742184718541', caption: 'Mehrauli Archaeological Park', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Oldest area of continual inhabitation in Delhi.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '5:00 AM', closing: '8:00 PM', weeklyOff: 'None' },
      duration: '2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: false, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Ruins and tombs', 'History walks'],
    localFood: [],
    ratings: { average: 4.5, count: 7000 },
    isVerified: true
  },
  {
    name: 'Safdarjung Tomb',
    description: '[translate:Safdarjung Tomb] is a beautiful 18th-century garden tomb with grand Mughal architecture.',
    location: {
      type: 'Point',
      coordinates: [77.2104, 28.5885],
      address: 'Air Force Golf Course, Delhi Race Club, New Delhi, Delhi 110021',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'monument',
    images: [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIcTVgGVQWeIJOFAAsqtVB_jZSisd2Wqggzw&s', caption: 'Safdarjung Tomb, Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Example of late Mughal garden tombs.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹25', foreign: '₹300' },
      timings: { opening: '7:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: false, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Mughal gardens', 'Architectural symmetry'],
    localFood: [],
    ratings: { average: 4.5, count: 10000 },
    isVerified: true
  },
  {
    name: 'Raj Ghat',
    description: '[translate:Raj Ghat] is the memorial dedicated to Mahatma Gandhi at the site of his cremation.',
    location: {
      type: 'Point',
      coordinates: [77.2496, 28.6408],
      address: 'Ring Road, near Shakti Sthal, New Delhi, Delhi 110006',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'monument',
    images: [
      { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/raj-ghat-delhi-1-attr-hero?qlt=82&ts=1742200321614', caption: 'Raj Ghat, Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Nation’s premier site for paying homage to Gandhi.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '6:30 PM', weeklyOff: 'None' },
      duration: '30-45 min',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: false, wheelchairAccessible: true },
    famousFor: ['Tributes to Gandhi', 'Green landscapes'],
    localFood: [],
    ratings: { average: 4.6, count: 18000 },
    isVerified: true
  },
  {
    name: 'Sheesh Mahal (Shalimar Bagh)',
    description: '[translate:Sheesh Mahal] is a Mughal-era palace known for its ornate mirrored interiors, recently restored and reopened to the public.',
    location: {
      type: 'Point',
      coordinates: [77.1573, 28.7165],
      address: 'Shalimar Bagh, Delhi 110088',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'palace',
    images: [
      { url: 'https://clubmahindra.gumlet.io/blog/media/section_images/sheeshmaha-2ed92355c9e6efa.jpg?w=376&dpr=2.6', caption: 'Sheesh Mahal, Shalimar Bagh', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Built by Shah Jahan; recently restored.',
      bestTimeToVisit: 'November to March',
      entryFee: { indian: '₹30', foreign: '₹300' },
      timings: { opening: '10:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: false, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Mirrored hall', 'Mughal architecture'],
    localFood: [],
    ratings: { average: 4.4, count: 2000 },
    isVerified: true
  },
  {
    name: 'Hauz Khas Village',
    description: '[translate:Hauz Khas Village] blends medieval ruins with modern culture, including the 14th-century reservoir, mosque, and lively boutiques.',
    location: {
      type: 'Point',
      coordinates: [77.1947, 28.5539],
      address: 'Hauz Khas, South Delhi, Delhi 110016',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/6f/c4/64/hauz-khas-village.jpg?w=700&h=400&s=1', caption: 'Hauz Khas Village and Complex', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Features ruins from the Tughlaq dynasty.',
      bestTimeToVisit: 'Evening, October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '10:00 AM', closing: '8:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: true, guide: false, wheelchairAccessible: true },
    famousFor: ['Trendy cafes', 'Nightlife', 'Medieval ruins'],
    localFood: ['Multicuisine restaurants, street food'],
    ratings: { average: 4.6, count: 27000 },
    isVerified: true
  },
  {
    name: 'National Gallery of Modern Art',
    description: '[translate:National Gallery of Modern Art] houses a wide collection of modern and contemporary Indian art, featuring works by famous artists.',
    location: {
      type: 'Point',
      coordinates: [77.2205, 28.6092],
      address: 'Jaipur House, India Gate, New Delhi, Delhi 110003',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'art gallery',
    images: [
      { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/national-gallery-of-modern-art-mumbai-maharashtra-2-attr-hero?qlt=82&ts=1742163298634', caption: 'National Gallery of Modern Art', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Showcases artists like Raja Ravi Varma, Amrita Sher-Gil.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹20', foreign: '₹500' },
      timings: { opening: '11:00 AM', closing: '6:30 PM', weeklyOff: 'Monday' },
      duration: '1-1.5 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: false, wheelchairAccessible: true },
    famousFor: ['Modern Indian art'],
    localFood: [],
    ratings: { average: 4.5, count: 7000 },
    isVerified: true
  },
  {
    name: 'Garden of Five Senses',
    description: '[translate:Garden of Five Senses] is a landscaped garden designed for sensory experiences, featuring themed zones, art installations, and events.',
    location: {
      type: 'Point',
      coordinates: [77.2109, 28.5192],
      address: 'Sarita Vihar, Mehrauli-Badarpur Road, South Delhi, Delhi 110030',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'other',
    images: [
      { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/garden-of-five-senses-delhi-5-attr-hero?qlt=82&ts=1742202514088', caption: 'Garden of Five Senses', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Venue for festivals and exhibitions.',
      bestTimeToVisit: 'February to March',
      entryFee: { indian: '₹35', foreign: '₹100' },
      timings: { opening: '9:00 AM', closing: '7:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: true, guide: false, wheelchairAccessible: true },
    famousFor: ['Sculpture installations', 'Flower shows'],
    localFood: [],
    ratings: { average: 4.3, count: 6000 },
    isVerified: true
  },
  {
    name: 'Nehru Park',
    description: '[translate:Nehru Park] is a vast green park in Chanakyapuri, ideal for walks, music festivals, and relaxation.',
    location: {
      type: 'Point',
      coordinates: [77.1758, 28.6005],
      address: 'Vinay Marg, Chanakyapuri, New Delhi, Delhi 110021',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'other',
    images: [
      { url: 'https://res.cloudinary.com/kmadmin/image/upload/v1724918944/kiomoi/nehru_park_guwahati_ticket_price_2053.jpg', caption: 'Nehru Park, Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Venue for SPIC MACAY concerts and Art Festivals.',
      bestTimeToVisit: 'Morning or evening, October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '5:00 AM', closing: '9:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: false, wheelchairAccessible: true },
    famousFor: ['Music events', 'Greenery'],
    localFood: [],
    ratings: { average: 4.5, count: 12000 },
    isVerified: true
  },
  {
    name: 'Yamuna Biodiversity Park',
    description: '[translate:Yamuna Biodiversity Park] is an ecological haven for wildlife, perfect for bird watching and nature walks.',
    location: {
      type: 'Point',
      coordinates: [77.2464, 28.7511],
      address: 'Main Jagatpur Road, Wazirabad, New Delhi, Delhi 110084',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'wildlife',
    images: [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuPPSt9U0UomgiEFOI_FkB9Oj4WQrfUJKxJQ&s', caption: 'Yamuna Biodiversity Park', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Biodiversity zone for conservation.',
      bestTimeToVisit: 'Morning, November to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '9:00 AM', closing: '5:00 PM', weeklyOff: 'Monday' },
      duration: '2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: false, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Birdwatching', 'Nature trails'],
    localFood: [],
    ratings: { average: 4.3, count: 4000 },
    isVerified: true
  },
  {
    name: 'Feroz Shah Kotla Fort',
    description: '[translate:Feroz Shah Kotla Fort] is a 14th-century fortress, famed for its ruins, Ashokan pillar, and spiritual legends.',
    location: {
      type: 'Point',
      coordinates: [77.2376, 28.6387],
      address: 'Bahadur Shah Zafar Marg, Delhi Gate, New Delhi, Delhi 110002',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'fort',
    images: [
      { url: 'https://static.toiimg.com/photo/msid-68271262,width-96,height-65.cms', caption: 'Feroz Shah Kotla Fort', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Built by Sultan Feroz Shah Tughlaq.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹20', foreign: '₹200' },
      timings: { opening: '9:00 AM', closing: '5:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: false, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Ashokan pillar', 'Spirits worship'],
    localFood: [],
    ratings: { average: 4.3, count: 7000 },
    isVerified: true
  },
  {
    name: 'Birla Mandir (Laxminarayan Temple)',
    description: '[translate:Birla Mandir] is a Hindu temple, notable for its architecture and peaceful gardens.',
    location: {
      type: 'Point',
      coordinates: [77.2090, 28.6375],
      address: 'Mandir Marg, Connaught Place, New Delhi, Delhi 110001',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'temple',
    images: [
      { url: 'https://shribirlamandir.co/admin/images/slider/2.jpg', caption: 'Birla Mandir, Delhi', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Opened in 1939 by Mahatma Gandhi.',
      bestTimeToVisit: 'Festivals, October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '4:30 AM', closing: '9:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Hindu rituals', 'Gardens'],
    localFood: [],
    ratings: { average: 4.7, count: 21000 },
    isVerified: true
  },
  {
    name: 'Delhi Ridge',
    description: '[translate:Delhi Ridge] is a large forested area part of the Aravalli range, popular for nature walks and wildlife.',
    location: {
      type: 'Point',
      coordinates: [77.1920, 28.6690],
      address: 'North-West Delhi, Delhi 110007',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'wildlife',
    images: [
      { url: 'https://static.toiimg.com/thumb/103969392/Delhi-ridge.jpg?width=636&height=358&resize=4', caption: 'Delhi Ridge Forest', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Natural barrier and ecological hotspot.',
      bestTimeToVisit: 'Morning, November to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'Sunrise', closing: 'Sunset', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: false, restrooms: false, restaurant: false, guide: false, wheelchairAccessible: false },
    famousFor: ['Nature trails', 'Birds'],
    localFood: [],
    ratings: { average: 4.2, count: 4000 },
    isVerified: true
  },
  {
    name: 'Pragati Maidan Exhibition Centre',
    description: '[translate:Pragati Maidan] is the primary venue for international and national fairs, expos, and conventions in Delhi.',
    location: {
      type: 'Point',
      coordinates: [77.2480, 28.6165],
      address: 'Mathura Road, Pragati Maidan, New Delhi, Delhi 110001',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India'
    },
    category: 'other',
    images: [
      { url: 'https://timesofindia.indiatimes.com/photo/msid-102064043/102064043.jpg?resizemode=4', caption: 'Pragati Maidan Exhibition Centre', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Hosts major trade shows.',
      bestTimeToVisit: 'During events, October to March',
      entryFee: { indian: 'As per event', foreign: 'As per event' },
      timings: { opening: 'Varies', closing: 'Varies', weeklyOff: 'None' },
      duration: '2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: true, guide: false, wheelchairAccessible: true },
    famousFor: ['Trade fairs', 'Convention center'],
    localFood: ['Event food court'],
    ratings: { average: 4.3, count: 13000 },
    isVerified: true
  },
  {
    name: 'Taj Mahal',
    description: '[translate:Taj Mahal] is a UNESCO World Heritage Site and a globally renowned symbol of love, made from white marble by Emperor Shah Jahan.',
    location: {
      type: 'Point',
      coordinates: [78.0421, 27.1751],
      address: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001',
      city: 'Agra',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'monument',
    images: [
      { url: 'https://whc.unesco.org/uploads/thumbs/site_0252_0008-1200-630-20250108121530.jpg', caption: 'Taj Mahal, Agra', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'One of the Seven Wonders of the World; masterpiece of Mughal architecture.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹50', foreign: '₹1100' },
      timings: { opening: '6:00 AM', closing: '6:30 PM', weeklyOff: 'None' },
      duration: '2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: true, guide: true, wheelchairAccessible: true },
    famousFor: ['Marble mausoleum', 'UNESCO site'],
    localFood: ['Petha, Mughlai cuisine'],
    ratings: { average: 4.8, count: 32500 },
    isVerified: true
  },
  {
    name: 'Agra Fort',
    description: '[translate:Agra Fort] is a UNESCO World Heritage stronghold featuring majestic palaces, gardens, and halls.',
    location: {
      type: 'Point',
      coordinates: [78.0081, 27.1795],
      address: 'Agra Fort, Rakabganj, Agra, Uttar Pradesh 282003',
      city: 'Agra',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'fort',
    images: [
      { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/agra-fort-agra-uttar%20pradesh-3-attr-hero?qlt=82&ts=1726650380726', caption: 'Agra Fort, Agra', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Royal residence for Mughal emperors; strategic fortification.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹50', foreign: '₹650' },
      timings: { opening: '6:00 AM', closing: '6:30 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Red sandstone', 'Royal pavilions'],
    localFood: ['Local snacks'],
    ratings: { average: 4.6, count: 12000 },
    isVerified: true
  },
  {
    name: 'Fatehpur Sikri',
    description: '[translate:Fatehpur Sikri] is a UNESCO World Heritage former Mughal capital, known for stunning palaces and Buland Darwaza.',
    location: {
      type: 'Point',
      coordinates: [77.6671, 27.0948],
      address: 'Fatehpur Sikri, Agra District, Uttar Pradesh 283110',
      city: 'Fatehpur Sikri',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/7b/57/01/caption.jpg?w=1200&h=-1&s=1', caption: 'Fatehpur Sikri', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'City built by Mughal Emperor Akbar; famed for architecture.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹50', foreign: '₹610' },
      timings: { opening: '7:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Buland Darwaza', 'Jodha Bai Palace'],
    localFood: [],
    ratings: { average: 4.5, count: 6000 },
    isVerified: true
  },
  {
    name: 'Kashi Vishwanath Temple',
    description: '[translate:Kashi Vishwanath Temple] is one of the holiest Shiva temples, famed for spiritual energy on the Ganges',
    location: {
      type: 'Point',
      coordinates: [83.0086, 25.3106],
      address: 'Lahori Tola, Varanasi, Uttar Pradesh 221001',
      city: 'Varanasi',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'temple',
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Kashi_Vishwanath.jpg/500px-Kashi_Vishwanath.jpg', caption: 'Kashi Vishwanath Temple', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'One of the 12 Jyotirlingas, sacred to Hindus.',
      bestTimeToVisit: 'Festivals, October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '4:00 AM', closing: '11:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Spiritual energy', 'Jyotirlinga'],
    localFood: ['Banarasi sweets'],
    ratings: { average: 4.7, count: 17000 },
    isVerified: true
  },
  {
    name: 'Sarnath',
    description: '[translate:Sarnath] is a major Buddhist pilgrimage spot where Buddha gave his first sermon, with famous stupas and temples.',
    location: {
      type: 'Point',
      coordinates: [83.0230, 25.3760],
      address: 'Sarnath, Varanasi, Uttar Pradesh 221007',
      city: 'Sarnath',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF8g8tHijJMCTkGQ-iafBhZ9CJ06jfJ2pFCQ&s', caption: 'Dhamek Stupa, Sarnath', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Site of Buddha’s first sermon; ancient stupas, museums.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹20', foreign: '₹200' },
      timings: { opening: '8:00 AM', closing: '5:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: true, guide: true, wheelchairAccessible: true },
    famousFor: ['Dhamek Stupa', 'Ashoka Pillar'],
    localFood: ['Local sweets'],
    ratings: { average: 4.4, count: 3100 },
    isVerified: true
  },
  {
    name: 'Ram Janmabhoomi Temple',
    description: '[translate:Ram Janmabhoomi Temple] is the most sacred site in Ayodhya, believed to be the birthplace of Lord Rama.',
    location: {
      type: 'Point',
      coordinates: [82.2036, 26.7962],
      address: 'Janmabhoomi, Ayodhya, Uttar Pradesh 224123',
      city: 'Ayodhya',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'temple',
    images: [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScRSL8k-_5S4A-c0gAgvkYgTYtphexUSQ1rA&s', caption: 'Ram Janmabhoomi Temple, Ayodhya', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Holy pilgrimage town with new temple inaugurated in 2024.',
      bestTimeToVisit: 'Festivals, November to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '7:00 AM', closing: '9:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Ram Temple', 'Holy city'],
    localFood: ['Ayodhya Mithai'],
    ratings: { average: 4.9, count: 25000 },
    isVerified: true
  },
  {
    name: 'Mathura',
    description: '[translate:Mathura] is the legendary birthplace of Lord Krishna, celebrated for temples and vibrant Krishna festival culture.',
    location: {
      type: 'Point',
      coordinates: [77.6737, 27.4924],
      address: 'Mathura, Uttar Pradesh 281001',
      city: 'Mathura',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Vishram_Ghat.jpg/330px-Vishram_Ghat.jpg', caption: 'Mathura', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Birthplace of Lord Krishna; sacred ghats and temples.',
      bestTimeToVisit: 'Holi festival, October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '8:00 PM', weeklyOff: 'None' },
      duration: '2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: true, guide: true, wheelchairAccessible: true },
    famousFor: ['Janmabhoomi Temple', 'Holi celebrations'],
    localFood: ['Pedas', 'Street food'],
    ratings: { average: 4.7, count: 16000 },
    isVerified: true
  },
  {
    name: 'Vrindavan',
    description: '[translate:Vrindavan] is a sacred town for Krishna devotees, famous for Banke Bihari Temple and lively religious festivals.',
    location: {
      type: 'Point',
      coordinates: [77.7032, 27.5747],
      address: 'Vrindavan, Mathura, Uttar Pradesh 281121',
      city: 'Vrindavan',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'temple',
    images: [
      { url: 'https://www.poojn.in/wp-content/uploads/2025/03/Prem-Mandir-Vrindavan-Architecture-Significance-and-History.jpeg.jpg', caption: 'Vrindavan Temples', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Center of Radha-Krishna worship and unique Holi celebrations.',
      bestTimeToVisit: 'Festivals, October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '5:00 AM', closing: '9:00 PM', weeklyOff: 'None' },
      duration: '2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: true, guide: true, wheelchairAccessible: true },
    famousFor: ['Banke Bihari Mandir', 'Prem Mandir'],
    localFood: ['Milk sweets', 'Street food'],
    ratings: { average: 4.8, count: 24000 },
    isVerified: true
  },
  {
    name: 'Jhansi Fort',
    description: '[translate:Jhansi Fort] is a historic fort famous for its role in the 1857 uprising led by Rani Lakshmibai.',
    location: {
      type: 'Point',
      coordinates: [78.5830, 25.4395],
      address: 'Jhansi Fort, Jhansi, Uttar Pradesh 284001',
      city: 'Jhansi',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'fort',
    images: [
      { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/jhansi-fort-jhansi-uttar-pradesh-3-attr-hero?qlt=82&ts=1726648828670', caption: 'Jhansi Fort', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Central to the Indian Rebellion of 1857.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: '₹25', foreign: '₹200' },
      timings: { opening: '7:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Rani Lakshmibai', 'Historic battles'],
    localFood: ['Local snacks'],
    ratings: { average: 4.4, count: 9000 },
    isVerified: true
  },
  {
    name: 'Allahabad (Prayagraj) - Triveni Sangam',
    description: '[translate:Triveni Sangam] is the confluence of the Ganga, Yamuna, and Saraswati rivers, a pivotal Hindu pilgrimage site.',
    location: {
      type: 'Point',
      coordinates: [81.8704, 25.4176],
      address: 'Triveni Sangam, Prayagraj, Uttar Pradesh 211008',
      city: 'Prayagraj',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrZBDc1tP_exR_kyGedRhYi2cohoRTvmS25g&s', caption: 'Triveni Sangam, Prayagraj', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Site of Kumbh Mela and major Hindu pilgrimages.',
      bestTimeToVisit: 'Kumbh Mela, October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '9:00 PM', weeklyOff: 'None' },
      duration: '2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Ganga-Yamuna-Saraswati confluence', 'Kumbh Mela'],
    localFood: ['Local fare'],
    ratings: { average: 4.6, count: 9000 },
    isVerified: true
  },
  {
    name: 'Dudhwa National Park',
    description: '[translate:Dudhwa National Park] is a premier wildlife sanctuary known for tigers, rhinos, and birdlife.',
    location: {
      type: 'Point',
      coordinates: [80.7302, 28.4986],
      address: 'Dudhwa National Park, Lakhimpur Kheri, Uttar Pradesh 262203',
      city: 'Lakhimpur Kheri',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'wildlife sancturary',
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Dudhwa_Tiger.jpg', caption: 'Dudhwa National Park', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Rich biodiversity and conservation focus.',
      bestTimeToVisit: 'November to May',
      entryFee: { indian: '₹50', foreign: '₹300' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '3-4 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Tiger reserves', 'Wildlife safaris'],
    localFood: [],
    ratings: { average: 4.5, count: 4000 },
    isVerified: true
  },
  {
    name: 'Kushinagar',
    description: '[translate:Kushinagar] is an important Buddhist site, marking the place of Buddha\'s Mahaparinirvana.',
    location: {
      type: 'Point',
      coordinates: [83.8885, 26.7371],
      address: 'Kushinagar, Uttar Pradesh 274403',
      city: 'Kushinagar',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Kushinara1.jpg', caption: 'Mahaparinirvana Stupa, Kushinagar', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Buddha’s Mahaparinirvana site; stupas and international temples.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Buddhist stupas', 'International temples'],
    localFood: [],
    ratings: { average: 4.4, count: 6000 },
    isVerified: true
  },
  {
    name: 'Naimisharanya',
    description: '[translate:Naimisharanya] is a tranquil pilgrimage town famed for ancient temples and the Chakra Tirtha.',
    location: {
      type: 'Point',
      coordinates: [80.4902, 27.2677],
      address: 'Naimisharanya, Sitapur, Uttar Pradesh 261402',
      city: 'Sitapur',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'temple',
    images: [
      { url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/fd/ef/2e/photo0jpg.jpg?w=1200&h=-1&s=1', caption: 'Naimisharanya Temples', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Ancient pilgrimage site mentioned in Puranas.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '9:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Chakra Tirtha', 'Sacred pools'],
    localFood: ['Prasad'],
    ratings: { average: 4.5, count: 5000 },
    isVerified: true
  },
  {
    name: 'Vindhyachal',
    description: '[translate:Vindhyachal] is famous for the Vindhyavasini Devi Temple and picturesque ghats along the Ganges.',
    location: {
      type: 'Point',
      coordinates: [82.5186, 25.1671],
      address: 'Vindhyachal, Mirzapur, Uttar Pradesh 231307',
      city: 'Mirzapur',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'temple',
    images: [
      { url: 'https://cdn1.tripoto.com/media/filter/nl/img/2380291/Image/1701965207_banner_1024x576.jpg.webp', caption: 'Vindhyavasini Devi Temple', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Major Shakti Peetha; scenic river ghats.',
      bestTimeToVisit: 'Navratri, October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '5:00 AM', closing: '8:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: true, guide: true, wheelchairAccessible: true },
    famousFor: ['Devi Temple', 'River ghats'],
    localFood: [],
    ratings: { average: 4.6, count: 7000 },
    isVerified: true
  },
  {
    name: 'Chitrakoot',
    description: '[translate:Chitrakoot] is a serene hill town revered for its spiritual legends and scenic falls.',
    location: {
      type: 'Point',
      coordinates: [80.8929, 25.2070],
      address: 'Chitrakoot, Uttar Pradesh 210205',
      city: 'Chitrakoot',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'hill-station',
    images: [
      { url: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2025/03/05134634/places-to-visit-in-Chitrakoot.jpg?tr=w-1200,q-60', caption: 'Chitrakoot hills', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Linked to Ramayana mythology and natural beauty.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: 'Sunrise', closing: 'Sunset', weeklyOff: 'None' },
      duration: '1-2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: false, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Spiritual sites', 'Waterfalls'],
    localFood: [],
    ratings: { average: 4.4, count: 5000 },
    isVerified: true
  },
  {
    name: 'Barua Sagar',
    description: '[translate:Barua Sagar] is an ancient lake near Jhansi, well-known for boating and nature views.',
    location: {
      type: 'Point',
      coordinates: [79.2571, 25.4027],
      address: 'Barua Sagar, Jhansi District, Uttar Pradesh 284201',
      city: 'Jhansi',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'lake',
    images: [
      { url: 'https://img.traveltriangle.com/blog/wp-content/uploads/2024/07/Barua-Sagar-Fort-og.jpg', caption: 'Barua Sagar Lake', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Nature spot near the site of historic fort battles.',
      bestTimeToVisit: 'October to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '6:00 AM', closing: '7:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: false, restaurant: false, guide: false, wheelchairAccessible: false },
    famousFor: ['Lake views', 'Boating'],
    localFood: [],
    ratings: { average: 4.2, count: 3000 },
    isVerified: true
  },
  {
    name: 'Deogarh',
    description: '[translate:Deogarh] holds a stunning group of Jain temples and ancient stone carvings in the Lalitpur district.',
    location: {
      type: 'Point',
      coordinates: [78.2632, 24.6299],
      address: 'Deogarh, Lalitpur, Uttar Pradesh 284303',
      city: 'Lalitpur',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://static.toiimg.com/photo/msid-82024127,width-96,height-65.cms', caption: 'Deogarh Jain Temple', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Jain temples with exquisite carvings.',
      bestTimeToVisit: 'November to March',
      entryFee: { indian: 'Free', foreign: 'Free' },
      timings: { opening: '8:00 AM', closing: '5:00 PM', weeklyOff: 'None' },
      duration: '1 hour',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: false, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Stone carvings', 'Jain art'],
    localFood: [],
    ratings: { average: 4.3, count: 1200 },
    isVerified: true
  },
  {
    name: 'Bara Imambara',
    description: '[translate:Bara Imambara] is Lucknow’s iconic historical hall known for its maze (Bhool Bhulaiya) and Indo-Islamic architecture.',
    location: {
      type: 'Point',
      coordinates: [80.9467, 26.8696],
      address: 'Bara Imambara, Machchhi Bhavan, Lucknow, Uttar Pradesh 226003',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXQVsR5oiuJqsPgEs7hWDdkv1-ZILd_MJtEg&s', caption: 'Bara Imambara, Lucknow', source: 'Google Images' }
    ],
    details: {
      historicalSignificance: 'Built in 1784 by Nawab Asaf-ud-Daula.',
      bestTimeToVisit: 'November to February',
      entryFee: { indian: '₹25', foreign: '₹300' },
      timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' },
      duration: '2 hours',
      accessibility: 'Accessible'
    },
    amenities: { parking: true, restrooms: true, restaurant: true, guide: true, wheelchairAccessible: true },
    famousFor: ['Bhool Bhulaiya', 'Historic hall'],
    localFood: ['Awadhi cuisine'],
    ratings: { average: 4.7, count: 16000 },
    isVerified: true
  },
  {
    name: 'Itimad-ud-Daulah\'s Tomb',
    description: '[translate:Itimad-ud-Daulah\'s Tomb] is a Mughal era mausoleum in Agra, often called the \"Baby Taj\" for its intricate marble work.',
    location: {
      type: 'Point',
      coordinates: [78.0146, 27.2060],
      address: 'Moti Bagh, Agra, Uttar Pradesh 282006',
      city: 'Agra',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'monument',
    images: [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGdSrs8GBY9wwL7NOieAlqtYN5rExmWREiRQ&s', caption: 'Baby Taj Mahal', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Model for the Taj Mahal design.', bestTimeToVisit: 'October to March', entryFee: { indian: '₹30', foreign: '₹310' }, timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' }, duration: '1 hour', accessibility: 'Accessible' },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Marble inlay', 'Quiet gardens'],
    localFood: ['Agra sweets'],
    ratings: { average: 4.5, count: 9500 },
    isVerified: true
  },
  {
    name: 'Jama Masjid (Agra)',
    description: '[translate:Jama Masjid Agra] is an impressive 17th-century mosque famous for its red sandstone and Indo-Islamic architecture.',
    location: {
      type: 'Point',
      coordinates: [78.0038, 27.1839],
      address: 'Jama Masjid, Agra, Uttar Pradesh 282003',
      city: 'Agra',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'monument',
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Jami_Masjid_-Agra_-Uttar_Pradesh_-IMG_0282.jpg/1200px-Jami_Masjid_-Agra_-Uttar_Pradesh_-IMG_0282.jpg', caption: 'Jama Masjid Agra', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Major Mughal mosque built by Shah Jahan.', bestTimeToVisit: 'October to March', entryFee: { indian: 'Free', foreign: 'Free' }, timings: { opening: '6:00 AM', closing: '8:00 PM', weeklyOff: 'None' }, duration: '1 hour', accessibility: 'Accessible' },
    amenities: { parking: false, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Mosque architecture', 'Historic prayers'],
    localFood: ['Local snacks'],
    ratings: { average: 4.4, count: 4500 },
    isVerified: true
  },
  {
    name: 'Akbar\'s Tomb (Sikandra)',
    description: '[translate:Akbar\'s Tomb] is the grand mausoleum of Emperor Akbar, set in sprawling gardens and featuring Indo-Persian design.',
    location: {
      type: 'Point',
      coordinates: [77.9330, 27.2206],
      address: 'Sikandra, Agra, Uttar Pradesh 282007',
      city: 'Agra',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'monument',
    images: [
      { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/sikandra-agra-uttar-pradesh-1-attr-hero?qlt=82&ts=1726650301943', caption: 'Akbar\'s Tomb', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Resting place of Akbar the Great.', bestTimeToVisit: 'October to March', entryFee: { indian: '₹30', foreign: '₹310' }, timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' }, duration: '1 hour', accessibility: 'Accessible' },
    amenities: { parking: true, restrooms: true, restaurant: true, guide: true, wheelchairAccessible: true },
    famousFor: ['Mughal gardens', 'Dynastic history'],
    localFood: [],
    ratings: { average: 4.5, count: 8000 },
    isVerified: true
  },
  {
    name: 'Buland Darwaza (Fatehpur Sikri)',
    description: '[translate:Buland Darwaza] is the towering entrance gate to Fatehpur Sikri, India\'s largest gateway.',
    location: {
      type: 'Point',
      coordinates: [77.6601, 27.0942],
      address: 'Fatehpur Sikri, Agra District, Uttar Pradesh 283110',
      city: 'Fatehpur Sikri',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'monument',
    images: [
      { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/fatehpur-sikri-agra-uttar-pradesh-1-attr-hero?qlt=82&ts=1726650332548', caption: 'Buland Darwaza', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Symbolic Mughal victory gate.', bestTimeToVisit: 'October to March', entryFee: { indian: 'Included with Sikri', foreign: 'Included' }, timings: { opening: '7:00 AM', closing: '6:00 PM', weeklyOff: 'None' }, duration: '1 hour', accessibility: 'Accessible' },
    amenities: { parking: true, restrooms: false, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Largest gateway', 'Historic entrance'],
    localFood: [],
    ratings: { average: 4.6, count: 9900 },
    isVerified: true
  },
  {
    name: 'Sankassa',
    description: 'Sankassa is an ancient Buddhist site, where Buddha is said to have descended after giving a sermon in heaven.',
    location: {
      type: 'Point',
      coordinates: [78.3037, 27.5103],
      address: 'Sankassa, Farrukhabad District, Uttar Pradesh 209739',
      city: 'Farrukhabad',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://content.jdmagicbox.com/v2/comp/farrukhabad/h4/9999p5692.5692.240426005941.t4h4/catalogue/sri-lanka-temple-punpal-pur-farrukhabad-buddhist-temples-8jUDEZlaL0.jpg', caption: 'Sankassa Archaeology', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'One of the Eight Great Places in Buddhism.', bestTimeToVisit: 'October to March', entryFee: { indian: 'Free', foreign: 'Free' }, timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' }, duration: '1 hour', accessibility: 'Accessible' },
    amenities: { parking: true, restrooms: false, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Buddhist history'],
    localFood: [],
    ratings: { average: 4.4, count: 1300 },
    isVerified: true
  },
  {
    name: 'Kaushambi',
    description: '[translate:Kaushambi] is an ancient city associated with Buddha and powerful dynasties, featuring old forts and stupas.',
    location: {
      type: 'Point',
      coordinates: [81.3448, 25.3315],
      address: 'Kaushambi, Uttar Pradesh 212216',
      city: 'Kaushambi',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Ghoshitaram_monastery_in_Kosambi.jpg', caption: 'Kaushambi Ruins', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Site of ancient Buddhist sermons.', bestTimeToVisit: 'October to March', entryFee: { indian: 'Free', foreign: 'Free' }, timings: { opening: 'Sunrise', closing: 'Sunset', weeklyOff: 'None' }, duration: '1 hour', accessibility: 'Accessible' },
    amenities: { parking: false, restrooms: false, restaurant: false, guide: false, wheelchairAccessible: false },
    famousFor: ['Ashokan Pillar', 'Buddhist relics'],
    localFood: [],
    ratings: { average: 4.2, count: 700 },
    isVerified: true
  },
  {
    name: 'Sravasti',
    description: 'Sravasti is a major Buddhist pilgrimage spot, famous for Jetavana Monastery.',
    location: {
      type: 'Point',
      coordinates: [81.9286, 27.5061],
      address: 'Sravasti, Shravasti District, Uttar Pradesh 271805',
      city: 'Sravasti',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73g487wDNg6i_4YePB8SA0eNF25B-GCZZYw&s', caption: 'Jetavana Monastery', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Buddha\'s favorite monsoon retreat.', bestTimeToVisit: 'October to March', entryFee: { indian: 'Free', foreign: 'Free' }, timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' }, duration: '1 hour', accessibility: 'Accessible' },
    amenities: { parking: true, restrooms: false, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Monastery ruins', 'Buddhist festivals'],
    localFood: [],
    ratings: { average: 4.3, count: 1700 },
    isVerified: true
  },
  {
    name: 'Chunar Fort',
    description: '[translate:Chunar Fort] is a hill fortress steeped in legends, overlooking the Ganges near Mirzapur.',
    location: {
      type: 'Point',
      coordinates: [82.9047, 25.1299],
      address: 'Chunar, Mirzapur District, Uttar Pradesh 231304',
      city: 'Chunar',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'fort',
    images: [
      { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/chunar-fort-varanasi-uttar-pradesh-2-musthead-hero?qlt=82&ts=1727353296892', caption: 'Chunar Fort', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Built by the Mauryas, used by Mughals, British.', bestTimeToVisit: 'November to March', entryFee: { indian: '₹20', foreign: '₹200' }, timings: { opening: '7:00 AM', closing: '6:00 PM', weeklyOff: 'None' }, duration: '1 hour', accessibility: 'Accessible' },
    amenities: { parking: true, restrooms: false, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Hill fort', 'River views'],
    localFood: [],
    ratings: { average: 4.2, count: 3400 },
    isVerified: true
  },
  {
    name: 'Rumi Darwaza',
    description: '[translate:Rumi Darwaza] is Lucknow\'s imposing historical gateway built in Awadhi style.',
    location: {
      type: 'Point',
      coordinates: [80.9477, 26.8690],
      address: 'Rumi Darwaza, Lucknow, Uttar Pradesh 226003',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Rumi_Darwaza_-_DSC2797-01.jpg/330px-Rumi_Darwaza_-_DSC2797-01.jpg', caption: 'Rumi Darwaza', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Built by Nawab Asaf-ud-Daula in 1784.', bestTimeToVisit: 'October to March', entryFee: { indian: 'Free', foreign: 'Free' }, timings: { opening: 'Open 24 hours', closing: '', weeklyOff: 'None' }, duration: '30 min', accessibility: 'Accessible' },
    amenities: { parking: false, restrooms: false, restaurant: false, guide: false, wheelchairAccessible: true },
    famousFor: ['Gateway arch'],
    localFood: [],
    ratings: { average: 4.4, count: 8200 },
    isVerified: true
  },
  {
    name: 'La Martiniere College',
    description: 'La Martiniere College is a colonial-era architectural marvel, set in lush grounds in Lucknow.',
    location: {
      type: 'Point',
      coordinates: [80.9222, 26.8353],
      address: 'La Martiniere Road, Lucknow, Uttar Pradesh 226001',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_S3Xi59YCbLUPwGXarOFKitIxYebsL-VC8w&s', caption: 'La Martiniere College', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Founded in early 19th century, fine example of colonial design.', bestTimeToVisit: 'November to March', entryFee: { indian: 'Free', foreign: 'Free' }, timings: { opening: 'By permission', closing: '', weeklyOff: 'None' }, duration: '1 hour', accessibility: 'Partly accessible' },
    amenities: { parking: true, restrooms: false, restaurant: false, guide: false, wheelchairAccessible: false },
    famousFor: ['Colonial architecture'],
    localFood: [],
    ratings: { average: 4.5, count: 4300 },
    isVerified: true
  },
  {
    name: 'Hazratganj',
    description: '[translate:Hazratganj] is Lucknow\'s iconic shopping and cultural street, known for its nightlife and historical importance.',
    location: {
      type: 'Point',
      coordinates: [80.9422, 26.8522],
      address: 'Hazratganj, Lucknow, Uttar Pradesh 226001',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'other',
    images: [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-AqYnj0XfECNR26TMeSsXUr0hfClm_n_3MQ&s', caption: 'Hazratganj, Lucknow', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Heart of Lucknow, blend of old and modern.', bestTimeToVisit: 'Evening, November to March', entryFee: { indian: 'Free', foreign: 'Free' }, timings: { opening: '9:00 AM', closing: '11:00 PM', weeklyOff: 'None' }, duration: '2 hours', accessibility: 'Accessible' },
    amenities: { parking: true, restrooms: true, restaurant: true, guide: false, wheelchairAccessible: true },
    famousFor: ['Shopping', 'Nightlife'],
    localFood: ['Awadhi sweets'],
    ratings: { average: 4.7, count: 18000 },
    isVerified: true
  },
  {
    name: 'Chhota Imambara',
    description: '[translate:Chhota Imambara] is a magnificent monument and mausoleum, central to Lucknow\'s Shia culture.',
    location: {
      type: 'Point',
      coordinates: [80.9373, 26.8746],
      address: 'Chhota Imambara, Lucknow, Uttar Pradesh 226003',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdXKfSarUAiHvIrwq0pkdbiQSMQtcg63Bubg&s', caption: 'Chhota Imambara', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Built in 1838; famed for festivals.', bestTimeToVisit: 'October to March', entryFee: { indian: '₹25', foreign: '₹300' }, timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' }, duration: '1 hour', accessibility: 'Accessible' },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Shia monument', 'Illuminations'],
    localFood: [],
    ratings: { average: 4.5, count: 7200 },
    isVerified: true
  },
  {
    name: 'Meerut',
    description: 'Meerut is a city with significant role in India\'s First War of Independence, historic churches and nearby wildlife.',
    location: {
      type: 'Point',
      coordinates: [77.7064, 28.9845],
      address: 'Meerut, Uttar Pradesh 250001',
      city: 'Meerut',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'other',
    images: [
      { url: 'https://media-cdn.tripadvisor.com/media/photo-c/1280x250/0a/d4/84/b6/jambu-deep-hastinapur.jpg', caption: 'St. John’s Church, Meerut', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'First War of Independence, historic sites.', bestTimeToVisit: 'October to March', entryFee: { indian: 'Free', foreign: 'Free' }, timings: { opening: '8:00 AM', closing: '8:00 PM', weeklyOff: 'None' }, duration: '1 hour', accessibility: 'Accessible' },
    amenities: { parking: true, restrooms: false, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Churches', 'Hastinapur Wildlife Sanctuary'],
    localFood: [],
    ratings: { average: 4.3, count: 7200 },
    isVerified: true
  },
  {
    name: 'Hastinapur',
    description: '[translate:Hastinapur] is known for its connection to Mahabharata, Jain temples, and wildlife sanctuary.',
    location: {
      type: 'Point',
      coordinates: [78.0077, 29.1616],
      address: 'Hastinapur, Meerut District, Uttar Pradesh 250404',
      city: 'Meerut',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'wildlife sancturary',
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Kailash_Parvat_Rachna_-_2.jpg/250px-Kailash_Parvat_Rachna_-_2.jpg', caption: 'Jambudweep Temple, Hastinapur', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Birthplace of Jain Tirthankaras; Mahabharata capital.', bestTimeToVisit: 'October to March', entryFee: { indian: 'Free', foreign: 'Free' }, timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' }, duration: '2 hours', accessibility: 'Accessible' },
    amenities: { parking: true, restrooms: true, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Wildlife', 'Jain pilgrimage'],
    localFood: [],
    ratings: { average: 4.4, count: 3400 },
    isVerified: true
  },
  {
    name: 'Bithoor',
    description: '[translate:Bithoor] is a holy town near Kanpur, best known for its ghats and mythological significance.',
    location: {
      type: 'Point',
      coordinates: [80.2742, 26.5558],
      address: 'Bithoor, Kanpur Nagar, Uttar Pradesh 209217',
      city: 'Kanpur',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQULZHsn8rkBKhGR2J8eGlGaiax3o-YrYyk-g&s', caption: 'Brahmavart Ghat, Bithoor', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Associated with Ramayana and Puranic legends.', bestTimeToVisit: 'October to March', entryFee: { indian: 'Free', foreign: 'Free' }, timings: { opening: '6:00 AM', closing: '7:00 PM', weeklyOff: 'None' }, duration: '1 hour', accessibility: 'Accessible' },
    amenities: { parking: true, restrooms: false, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Ghats', 'Spiritual legends'],
    localFood: [],
    ratings: { average: 4.4, count: 3900 },
    isVerified: true
  },
  {
    name: 'Jalaun',
    description: '[translate:Jalaun] features such attractions as the ancient Orai Fort and Kachaura Ghat on the Yamuna.',
    location: {
      type: 'Point',
      coordinates: [79.4885, 26.1451],
      address: 'Jalaun, Uttar Pradesh 285123',
      city: 'Jalaun',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'heritage',
    images: [
      { url: 'https://bdsup.org/wp-content/uploads/2021/08/Rampura-Fort.webp', caption: 'Orai Fort, Jalaun', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Rich blend of fort architecture and spiritual ghats.', bestTimeToVisit: 'October to March', entryFee: { indian: 'Free', foreign: 'Free' }, timings: { opening: '8:00 AM', closing: '6:00 PM', weeklyOff: 'None' }, duration: '1 hour', accessibility: 'Accessible' },
    amenities: { parking: true, restrooms: false, restaurant: false, guide: true, wheelchairAccessible: false },
    famousFor: ['Ancient fort', 'Ghats'],
    localFood: [],
    ratings: { average: 4.2, count: 2400 },
    isVerified: true
  },
  {
    name: 'Baldeo',
    description: '[translate:Baldeo] is the site of an ancient Krishna temple and nearby sacred forest.',
    location: {
      type: 'Point',
      coordinates: [77.6622, 27.5672],
      address: 'Baldeo, Mathura District, Uttar Pradesh 281301',
      city: 'Mathura',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'temple',
    images: [
      { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdLFKhoEyTPseJ_wsQ_FOpSbrEqgHKxF6jWw&s', caption: 'Baldeo Temple', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Historic connection to Krishna legends.', bestTimeToVisit: 'October to March', entryFee: { indian: 'Free', foreign: 'Free' }, timings: { opening: '6:00 AM', closing: '8:00 PM', weeklyOff: 'None' }, duration: '1 hour', accessibility: 'Accessible' },
    amenities: { parking: true, restrooms: false, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Krishna temple', 'Forest'],
    localFood: [],
    ratings: { average: 4.3, count: 2100 },
    isVerified: true
  },
  {
    name: 'Lakhimpur Kheri',
    description: 'Lakhimpur Kheri is a scenic area, featuring Dudhwa National Park and historic palaces.',
    location: {
      type: 'Point',
      coordinates: [80.7797, 27.9076],
      address: 'Lakhimpur Kheri, Uttar Pradesh 262701',
      city: 'Lakhimpur Kheri',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'wildlife sancturary',
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Lakhimpurfrogtemple.jpg/250px-Lakhimpurfrogtemple.jpg', caption: 'Dudhwa National Park, Lakhimpur Kheri', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Known for Dudhwa tiger reserve; Surat Bhawan Palace.', bestTimeToVisit: 'November to May', entryFee: { indian: '₹50', foreign: '₹300' }, timings: { opening: '6:00 AM', closing: '6:00 PM', weeklyOff: 'None' }, duration: '3 hours', accessibility: 'Accessible' },
    amenities: { parking: true, restrooms: false, restaurant: false, guide: true, wheelchairAccessible: true },
    famousFor: ['Tiger reserve', 'Palace'],
    localFood: [],
    ratings: { average: 4.4, count: 1500 },
    isVerified: true
  },
  {
    name: 'Kannauj',
    description: '[translate:Kannauj] is renowned for its traditional perfume-making and archaeological remains.',
    location: {
      type: 'Point',
      coordinates: [79.9220, 27.0550],
      address: 'Kannauj, Uttar Pradesh 209725',
      city: 'Kannauj',
      state: 'Uttar Pradesh',
      country: 'India'
    },
    category: 'other',
    images: [
      { url: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2023/12/01152541/Temple-in-Kannauj-ELAKSHI-CREATIVE-BUSINESS-Shutterstock.jpg', caption: 'Kannauj Perfume District', source: 'Google Images' }
    ],
    details: { historicalSignificance: 'Perfume capital of India; historic Gulab Bari.', bestTimeToVisit: 'October to March', entryFee: { indian: 'Free', foreign: 'Free' }, timings: { opening: '8:00 AM', closing: '6:00 PM', weeklyOff: 'None' }, duration: '1 hour', accessibility: 'Accessible' },
    amenities: { parking: false, restrooms: false, restaurant: false, guide: false, wheelchairAccessible: false },
    famousFor: ['Perfume industry', 'Heritage sites'],
    localFood: [],
    ratings: { average: 4.3, count: 3300 },
    isVerified: true
  }
];


exports.seedPlaces = async () => {
  try {
    
    await Place.deleteMany({});
    console.log('Cleared existing places');

    
    const places = await Place.insertMany(samplePlaces);
    console.log(`✅ Seeded ${places.length} places successfully`);
    
    return places;
  } catch (error) {
    console.error('❌ Error seeding places:', error);
    throw error;
  }
};