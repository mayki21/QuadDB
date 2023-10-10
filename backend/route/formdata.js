const express = require('express');
const router = express.Router();
const User = require('../model/user')
const authenticate = require('../middleware/auth');

// API Endpoint 1: Get user details by user_id
router.get('/details/:user_id', authenticate, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user details' });
  }
});

// API Endpoint 2: Update user details by user_id
router.put('/update/:user_id', authenticate, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { user_id: req.params.user_id },
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user details' });
  }
});

// API Endpoint 3: Get user image by user_id
router.get('/image/:user_id', authenticate, async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id });
    if (!user || !user.user_image) {
      return res.status(404).json({ message: 'User image not found' });
    }
    res.json({ user_image: user.user_image });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user image' });
  }
});

// API Endpoint 4: Insert a new user
router.post('/insert', authenticate, async (req, res) => {
  try {
    const newUser = new User(req.body.user_details);
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// API Endpoint 5: Delete a user by user_id
router.delete('/delete/:user_id', authenticate, async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ user_id: req.params.user_id });
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = router;
