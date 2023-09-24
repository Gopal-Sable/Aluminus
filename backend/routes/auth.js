const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { Alumni, Event, Post } = require('../models/User'); // Replace with the correct path to your models

const JWT_SECRETE = "this is very secrete code save in invi.. variable"

// Middleware to check if a user is authenticated (you can implement this separately)
const fetchuser = require("../Middleware/fetchuser.js")
// Alumni Routes

//1. Get all alumni profiles
router.get('/alumni', async (req, res) => {
    try {
        const alumni = await Alumni.find().select("-password");
        res.json(alumni);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

//2. Get a specific alumni profile by ID

router.get('/alumni/:id', async (req, res) => {
    try {
        const alumni = await Alumni.findById(req.params.id).select("-password");
        if (!alumni) {
            return res.status(404).json({ message: 'Alumni not found' });
        }
        res.json(alumni);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// 3.Create a new alumni profile
router.post('/alumni', [
    body('firstName', 'Enter a valid firstname').isLength({ min: 3 }),
    body('lastName', 'Enter a valid lastname').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('Department', 'Department can not be empty').notEmpty(),
    body('batch', 'Batch can not be empty').notEmpty(),
    body('contactNumber', 'Phone number must be a 10-digit number').isNumeric().isLength({ min: 10, max: 10 }),
    body('password', 'Password must be atleast 6 characters').isLength({ min: 6 }),

], async (req, res) => {
    let success = false;
    // if there are errors,return Bad requist and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await Alumni.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({ errors: " sorry email is already exist" })
        }
        //incripting password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        newAlumni = await Alumni.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            batch: req.body.batch,
            password: secPass,
            Department: req.body.Department,
            contactNumber: req.body.contactNumber,
            linkedInProfile: req.body.linkedInProfile,
            currentCompany: req.body.currentCompany,
            location: req.body.location,
            DomainOfWork: req.body.DomainOfWork,
        });
        const data = {
            newAlumni: {
                id: newAlumni.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRETE);
        success = true;
        // res.json({ success, authtoken })
        res.status(201).json({newAlumni, success, authtoken });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

//4. login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password can not be blank').exists(),
  ], async (req, res) => {
    let success = false;
    // if there are errors,return Bad requist and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await Alumni.findOne({ email })
      if (!user) {
        success = false;
        return res.status(400).json({ errors: "please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password)
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ errors: "please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRETE);
      success = true;
      res.json({ success, authtoken })
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal servaer error")
    }
  })
  
  //Route:5
  //get loggedin user details using: POST "/api/auth/getuser"  login required
  router.post('/getuser', fetchuser, async (req, res) => {
  
    try {
      userId = req.user.id;
      const user = await Alumni.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal servaer error")
    }
  })

//   // 6. Define a route for updating user information
// router.put('/update', fetchuser, [
//     body('firstName', 'Enter a valid firstname').isLength({ min: 3 }),
//     body('lastName', 'Enter a valid lastname').isLength({ min: 3 }),
//     body('email', 'Enter a valid email').isEmail(),
//     body('Department', 'Department can not be empty').notEmpty(),
//     body('batch', 'Batch can not be empty').notEmpty(),
//     body('contactNumber', 'Phone number must be a 10-digit number').isNumeric().isLength({ min: 10, max: 10 }),
//     body('password', 'Password must be atleast 6 characters').isLength({ min: 6 }),

//   ], async (req, res) => {
//     try {
//       const errors = validationResult(req);
  
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
  
//       // Extract updated user data from the request body
//       const { firstName,lastName,email,batch,password,Department,contactNumber,linkedInProfile,currentCompany,location,DomainOfWork
//       } = req.body;
//       const salt = await bcrypt.genSalt(10);
//       const secPass = await bcrypt.hash(req.body.password, salt)
//       // Update the user's information in the database
//       // Replace the following code with your database update logic
//       const updatedUser = await User.findByIdAndUpdate(req.user.id, {
//         firstName,lastName,email,batch,password,Department,contactNumber,linkedInProfile,currentCompany,location,DomainOfWork
//       }, { new: true });
      
//       if (!updatedUser) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       res.json({ success: true, message: 'User information updated successfully', user: updatedUser });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send('Internal server error');
//     }
//   });

module.exports = router;