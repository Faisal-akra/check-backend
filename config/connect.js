const mongoose = require('mongoose');


const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('mongoose is connect sucessfully')
  } catch (error) {
    console.log( error, "error mongoose is not properly connected!")
  }
}

module.exports = connectDB;
