const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const cleanDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    
    
    console.log('🗑️  Dropping notebooks collection...');
    try {
      await db.collection('notebooks').drop();
      console.log('Notebooks collection dropped\n');
    } catch (err) {
      console.log('No notebooks collection to drop\n');
    }

    console.log(' Database cleanup complete!\n');
    console.log('The notebooks collection has been removed.');
    console.log('It will be recreated with correct schema on first entry creation.\n');
    
    process.exit(0);
  } catch (error) {
    console.error(' Error:', error);
    process.exit(1);
  }
};

cleanDatabase();