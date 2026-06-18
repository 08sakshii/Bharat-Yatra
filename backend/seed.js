// backend/seed.js - Database Seeder Script

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { seedPlaces } = require('./utils/seedPlaces');

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected\n');

    // Seed places
    console.log('📍 Seeding tourist places...');
    await seedPlaces();

    console.log('\n✅ Database seeding completed successfully!');
    console.log('You can now start the server and explore places.\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();