
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const fixIndex = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const Notebook = mongoose.connection.collection('notebooks');

    
    try {
      await Notebook.dropIndex('location_2dsphere');
      console.log(' Dropped old location index');
    } catch (err) {
      console.log('No old index to drop');
    }

    
    await Notebook.createIndex({ location: '2dsphere' }, { sparse: true });
    console.log(' Created new sparse geospatial index');

    console.log('\nIndex fix complete!');
    process.exit(0);
  } catch (error) {
    console.error(' Error:', error);
    process.exit(1);
  }
};

fixIndex();