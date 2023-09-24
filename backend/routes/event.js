const express = require('express');
const router = express.Router();
const { Alumni, Event, Post } = require('../models/User'); // Replace with the correct path to your models

// Middleware to check if a user is authenticated (you can implement this separately)
const isAuthenticated = require("../Middleware/fetchuser")

// Events Routes

// Get all events
router.get('/events', async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Create a new event
  router.post('/events', isAuthenticated, async (req, res) => {
    try {
      const newEvent = new Event(req.body);
      await newEvent.save();
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  