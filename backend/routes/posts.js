const express = require('express');
const router = express.Router();
const { Alumni, Event, Post } = require('../models/User'); // Replace with the correct path to your models

// Middleware to check if a user is authenticated (you can implement this separately)
const isAuthenticated = require("../Middleware/fetchuser")


// Posts Routes

// Get all posts
router.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find().populate('author');
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  // Route to create a new post
  router.post('/posts',isAuthenticated, async (req, res) => {
      try {
        const { author, content } = req.body;
    
        // Check if the author (Alumni) exists
        const alumni = await Alumni.findById(author);
        if (!alumni) {
          return res.status(404).json({ message: 'Author not found' });
        }
    
        // Create a new post
        const newPost = new Post({ author, content });
    
        // Save the new post
        await newPost.save();
    
        res.status(201).json({ message: 'Post created successfully', post: newPost });
      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });
    
    // Route to delete a post by ID
    router.delete('/posts/:postId',isAuthenticated, async (req, res) => {
      try {
        const postId = req.params.postId;
    
        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        // Delete the post
        await post.remove();
    
        res.json({ message: 'Post deleted successfully' });
      } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });
    
    // Route to update a post by ID
    router.put('/posts/:postId',isAuthenticated, async (req, res) => {
      try {
        const postId = req.params.postId;
        const { content } = req.body;
    
        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        // Update the post content
        post.content = content;
    
        // Save the updated post
        await post.save();
    
        res.json({ message: 'Post updated successfully', post });
      } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });
    
    // Route to add a comment to a post
    router.post('/posts/:postId/comments', async (req, res) => {
      try {
        const postId = req.params.postId;
        const { author, text } = req.body;
    
        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        // Create a new comment
        const newComment = {
          author,
          text,
        };
    
        // Add the comment to the post's comments array
        post.comments.push(newComment);
    
        // Save the updated post with the new comment
        await post.save();
    
        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
      } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });
    
  
  module.exports = router;
  