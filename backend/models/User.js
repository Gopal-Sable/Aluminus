
const mongoose = require('mongoose');

// Define the Alumni Schema
const alumniSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    batch: { type: Number, required: true }, //year of batch
    password: { type: String, required: true },
    Department: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    linkedInProfile: String,
    currentCompany: String,
    location: String,
    DomainOfWork: String,
    Designation:String,
    profileImage: { type: Buffer }, // Add a field for image data
    imageType: { type: String }
});

// Define the Event Schema
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: String,
    description: String,
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' }],
    // Add more fields as needed for events
});

// Define the Post Schema
const postSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    comments: [{
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni' },
        text: String,
        createdAt: { type: Date, default: Date.now },
    }],
    // Add more fields as needed for posts
});

// Create Mongoose models
const Alumni = mongoose.model('Alumni', alumniSchema);
const Event = mongoose.model('Event', eventSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = {
    Alumni,
    Event,
    Post,
};
