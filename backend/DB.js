// const { MongoClient } = require('mongodb');


// const mongoURI = 'mongodb://127.0.0.1:27017/Alumnius';

// // Create a MongoClient object
// const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// // Connect to the MongoDB server
// async function connectToMongoDB() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// }

// // Call the connectToMongoDB function to establish the connection
// connectToMongoDB();

// // You can then use the 'client' object to interact with the database
// // For example, you can create a reference to a specific collection:
// const myCollection = client.db().collection('mycollection');

// // Now you can perform database operations using 'myCollection'


const mongoose = require('mongoose');

// MongoDB connection URI (replace with your own database URL)
const mongoURI = 'mongodb://127.0.0.1:27017/Alumnius';

// Connect to MongoDB
const connectToMongo = () => {
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
}

// // You can define your Mongoose models and schemas here
// const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/Alumnius?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

// const connectToMongo = () => {
//     mongoose.connect(mongoURI, () => {
//         console.log("connected");
//     })
// }

module.exports = connectToMongo;