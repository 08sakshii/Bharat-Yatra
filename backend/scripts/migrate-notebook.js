require('dotenv').config();
const mongoose = require('mongoose');
const Notebook = require('../models/Notebook');

async function migrateNotebook() {
  try {
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(' Connected to MongoDB');

    
    const result = await Notebook.updateMany(
      { isPrivate: { $exists: false } },
      { $set: { isPrivate: true } }
    );

    console.log(` Migration complete — updated ${result.modifiedCount} notebooks`);
  } catch (err) {
    console.error(' Migration failed:', err);
  } finally {
    
    await mongoose.disconnect();
    console.log(' MongoDB disconnected');
  }
}

migrateNotebook();
