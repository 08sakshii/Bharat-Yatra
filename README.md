# 🗺️ Bharat Yatra

> India's first intelligent location-based travel companion — discover, plan,
> and explore India's hidden treasures.

## ⚙️ Setup & Installation

### Prerequisites

- Node.js v18+
- MongoDB (local) or MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/08sakshii/Bharat-Yatra.git
cd Bharat-Yatra
```

### 2. Backend Setup

```bash
cd backend
npm install
npm start
```

Create a `.env` file inside the `backend/` folder with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_anything_random
```

> For `MONGO_URI` — either use local MongoDB:
> `mongodb://127.0.0.1:27017/bharat_yatra` or use MongoDB Atlas:
> `mongodb+srv://<username>:<password>@cluster.mongodb.net/bharat_yatra`

Then seed the database (run once):

```bash
npm run seed
```

This loads 256 tourist places into your database.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:5000
VITE_GEMINI_API_KEY=your_gemini_api_key
```

> Get your free Gemini API key from: https://aistudio.google.com/apikey

### 4. Open in browser

```
http://localhost:5173
```

> ⚠️ Make sure both backend (port 5000) and frontend (port 5173) are running
> simultaneously in separate terminals.

## 🛠️ Tech Stack

| Layer      | Technology                                           |
| ---------- | ---------------------------------------------------- |
| Frontend   | React.js, Vite, Tailwind CSS, Framer Motion          |
| Backend    | Node.js, Express.js, MongoDB, JWT Authentication     |
| Maps       | Leaflet.js, OpenStreetMap (Nominatim + Overpass API) |
| AI Chatbot | Google Gemini API                                    |
| Algorithms | Haversine Formula, Nearest Neighbour (TSP)           |

## 📁 Project Structure

```
Bharat-Yatra/
├── backend/
│   ├── controllers/      # Route, auth, places logic
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── middleware/        # JWT auth middleware
│   ├── seed.js           # Database seeder (256 places)
│   └── server.js         # Entry point
├── frontend/
│   ├── src/
│   │   ├── pages/        # HomePage, Explore, PlanTrip, MyRoutes, MyJournal
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # Auth and Location context
│   │   └── services/     # API service functions
│   └── vite.config.js
└── README.md
```

---

# Documentation of Bharat Yatra

# Introduction of Idea

Welcome to Bharat Yatra - a revolutionary travel platform designed specifically
to showcase the breathtaking diversity and cultural richness of India. Unlike
generic map applications, our platform is purpose-built to help tourists
discover, explore, and fall in love with India's incredible destinations through
intelligent, personalized route planning.

In short, project similar to Google Maps but with a focus on promoting tourism
in India. The idea is that whenever you open the app or website, it will ask for
your current location. Based on where you are, it will show you the nearest
famous and beautiful tourist places across India.

For example, if I am in Varanasi, it will start from there and show the nearest
tourist spots. Then, it will guide me to the next nearest place, and so
on—creating a route that covers all the important places in the shortest
possible distance and time.

It's like how food delivery apps like Zomato show many restaurants nearby, but
here it will show tourist places with details like nearby hotels, resorts,
historical importance, famous food, and other attractions(though currently we
have implemented basic hotels route fetching but once increased the scope we can
tie up with hotels for recommendation and exclusive offers for our users)

Also, one special feature is that users will have a personal notebook where they
can write about their journey, add pictures, and share their own experience and
opinions. This notebook will be private and only visible to the user, but incase
user wants to share their journey with other we have that covered too, make your
notebook public and we will help your diary reach everyone

The main goal of this app is to help tourists easily plan their trips, cover the
most important places efficiently, and enjoy their journey with all the
necessary information at their fingertips.

# **Why This Idea?**

Traditional travel planners often suffer from rigid, fixed routes and
predetermined stays, leaving little room for personalization—especially for
group travels where preferences vary widely.

**Solution:** Bharat Yatra empowers users to:

- Create completely custom routes tailored to user preferences
- Choose their own accommodations and stops
- Get optimized Google Maps routes for easy navigation
- Share and discover routes created by other travelers
- Maintain travel journals and share experiences

This flexibility addresses the core limitation of existing travel platforms
while providing a seamless, user-driven experience.

# **How It Works - The Magical Experience**

### **1. Smart Location-Based Discovery**

```
// The moment you open the app
Welcome to Bharat Yatra - Discover India's Hidden Treasures!
Detecting your location...
You're in Varanasi!
Here are the most beautiful places starting from here:
```

**What You See:**

- **Historical Sites**: Ancient temples, monuments, heritage sites
- **Natural Wonders**: Waterfalls, hills, beaches, landscapes
- **Culinary Hotspots**: Famous local restaurants and street food
- **Shopping Destinations**: Local markets and craft centers
- **Accommodations**: Hotels, resorts, homestays nearby

### **2. Intelligent Route Optimization**

**Example Journey from Varanasi:**

```
1. Kashi Vishwanath Temple (0 km) --  15 mins
2. Dashashwamedh Ghat (1.2 km) -- 5 mins
3. Sarnath (10 km) -- 25 mins
4. Ramnagar Fort (14 km) -- 30 mins
5. Chunar Fort (35 km) -- 45 mins
→ Continuing to discover more wonders...
```

**Our Smart Algorithm Considers:**

- Opening hours and best visiting times
- Current traffic conditions
- Weather considerations
- Tourist preferences and interests
- Time optimization between locations

### **3. Rich Destination Insights**

**For Each Location, You Get:**

```
🏛️ Kashi Vishwanath Temple
⭐ Historical Significance: One of India's most sacred temples
🕒 Best Time to Visit: Early morning or evening aarti
🎫 Entry Details: Free entry, security check required
🍜 Must-Try Food: Malaiyyo (seasonal sweet) from nearby stalls
📸 Photo Spots: Temple exterior from specific angles
💡 Local Tip: Visit the nearby Gyanvapi Mosque for historical context
🏨 Nearby Stays: 15+ hotels within 1km range
```

### **4. Personal Travel Journal**

**Your Private Digital Diary:**

```
📖 My Incredible India Journey
📍 Currently in: Pune,Maharashtra
📅 Date: June 18,2026
❤️ Favorite Moment: Sunrise boat ride on Ganges
📸 Photos Added: 12 beautiful memories
🍜 Food Discovered: Amazing kachori sabzi at local stall
💭 Personal Notes: The evening aarti was spiritually uplifting...
🔒 Private & Secure - Only you can access these memories
```

# How much location we have added till yet?

Till now we have added 256 places focusing on diversity, as no proper API's are
there so i am creating the places database by myself by researching

# So main doubt : How to use it?

<img width="800" height="612" alt="image" src="https://github.com/user-attachments/assets/a8518744-89e7-407e-8c6c-b365a12e4e59" />

# **Calculation Techniques**

### **1. Distance Calculation**

- **Method**: Haversine Formula
- **Purpose**: Calculate distance between user coordinates and destination
  coordinates
- **Implementation**: Accurate geographical distance computation for route
  planning

### **2. Travel Time Estimation**

- **Method**: Average Speed Calculation
- **Default Speed**: 50 km/hr
- **Output**: Estimated travel time between destinations

### **3. Route Optimization**

- **Algorithm**: Nearest Neighbour Algorithm
- **Why not Dijkstra?**:
  - Nearest Neighbour provides faster computation for travel route optimization
  - More suitable for TSP (Traveling Salesman Problem) scenarios
  - Balances accuracy with performance for real-time calculations

### **4. Fuel Cost Calculation**

- **Assumption**: Vehicle mileage of 15 km/liter
- **Input**: Total distance of route
- **Output**: Estimated fuel expenditure

### **5. Toll Cost Calculation**

- **Base Rate**: 2.5 Rs per km on highways
- **Frequency**: Tolls every 50-100 km
- **Average Assumption**: 150 Rs per toll
- **Calculation**: Based on route distance and highway segments

### **6. Accommodation Cost**

- **Budget Tier**: ₹1,000/night
- **Mid Tier**: ₹1,500/night
- **Luxury Tier**: ₹3,000/night
- **Flexibility**: Users can customize based on preferences

<img width="800" height="1091" alt="image" src="https://github.com/user-attachments/assets/cb958175-1547-4551-b5ea-df2b0151261a" />

# Key Feature

### AI ChatBot in Plan Trip section:

1. Just ask him to create a route for two days based on current location
2. Or just ask him about specific places
3. Or about Budget constraints

AI has got you covered

# Work Flow

### **1. Authentication & Onboarding**

```
User Login → Explore Page → Location Access Request → Map Display
```

### **2. Destination Discovery**

- Interactive map showing nearby places and attractions
- Clickable markers with detailed information
- "Add to Route" functionality

### **3. Route Management**

- **Personal Routes**: Create and save custom routes
- **Public Routes**: Discover popular routes created by other users
- **Route Saving**: Bookmark and reuse preferred routes

### **4. Travel Journal**

- Document experiences and journeys
- Share travels publicly or with selected groups
- Integrated with route planning for seamless storytelling

### **5. Advanced Planning**

- Intelligent destination suggestions based on preferences
- Success tracking for completed journeys

# Conclusion : **Join the Journey of Discovery**

Bharat Yatra is more than an app—it's your personal key to unlocking the magic
of India. From the snow-capped Himalayas to the sunny beaches of Goa, from
ancient temples to modern marvels, we guide you through an unforgettable journey
that respects your time, budget, and curiosity.

_"Atithi Devo Bhava" - The Guest is God. We bring this ancient Indian wisdom to
the digital age, ensuring every traveler experiences the true warmth and wonder
of Incredible India._
