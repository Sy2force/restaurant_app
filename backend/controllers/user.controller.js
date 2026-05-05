const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Dish = require('../models/Dish');
const Recipe = require('../models/Recipe');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

const generateToken = (userId, isAdmin, isBusiness) => {
  return jwt.sign({ _id: userId, isAdmin, isBusiness }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// POST /users - Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, isBusiness } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    const user = new User({
      name,
      email,
      password,
      isBusiness: isBusiness || false
    });
    
    await user.save();
    
    // According to PDF, POST /users is Public "Inscription". 
    // Usually returns user data or token. Let's return what auth.controller did.
    const token = generateToken(user._id, user.isAdmin, user.isBusiness);
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isBusiness: user.isBusiness,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// POST /users/login - Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    if (user.isLocked()) {
      return res.status(423).json({ 
        message: 'Account locked due to too many failed login attempts. Please try again later.',
        lockUntil: user.lockUntil
      });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      await user.incLoginAttempts();
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }
    
    const token = generateToken(user._id, user.isAdmin, user.isBusiness);
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isBusiness: user.isBusiness,
        isAdmin: user.isAdmin,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// GET /users/profile - Get current user profile
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('favoriteRecipes')
      .populate('likedDishes');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

// GET /users - Admin only
exports.getAllUsers = async (req, res) => {
  try {
    // Pagination optional but good practice
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// GET /users/:id - Self or Admin
exports.getUserById = async (req, res) => {
  try {
    if (req.userId.toString() !== req.params.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('favoriteRecipes')
      .populate('likedDishes');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// PUT /users/:id - Self
exports.updateUser = async (req, res) => {
  try {
    if (req.userId.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Access denied. You can only update your own profile.' });
    }

    const { password, isAdmin, isBusiness, ...updateData } = req.body;
    // Prevent updating password directly here if strictly following "Modify profile" usually implies names/details.
    // If password update is allowed via this route, it should be hashed. User model pre-save hooks handle hashing if using .save(), but findByIdAndUpdate bypasses middleware unless careful.
    // The previous implementation used findByIdAndUpdate. 
    // To be safe and simple, let's allow updating name, avatar, etc.
    // If password is sent, we might need to handle it.
    
    // PDF says "Modifier profil utilisateur". 
    // Let's exclude password/roles from this general update to stay safe, unless specified otherwise.
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// PATCH /users/:id - Self (Modifier isBusiness)
exports.updateIsBusiness = async (req, res) => {
  try {
    if (req.userId.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Access denied. You can only update your own status.' });
    }

    const { isBusiness } = req.body;
    if (typeof isBusiness !== 'boolean') {
      return res.status(400).json({ message: 'isBusiness must be a boolean' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBusiness },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating business status', error: error.message });
  }
};

// DELETE /users/:id - Self or Admin
exports.deleteUser = async (req, res) => {
  try {
    if (req.userId.toString() !== req.params.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// PUT /users/profile - Update own profile (name, email)
exports.updateProfile = async (req, res) => {
  try {
    const { password, isAdmin, isBusiness, avatar, avatarPublicId, _id, ...updateData } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

// POST /users/avatar - Upload avatar
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      if (req.file.path) fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove previous avatar from cloudinary if any
    if (user.avatarPublicId) {
      try { await cloudinary.uploader.destroy(user.avatarPublicId); } catch (_) {}
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'flavors-of-israel/avatars',
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });

    if (req.file.path) fs.unlinkSync(req.file.path);

    user.avatar = result.secure_url;
    user.avatarPublicId = result.public_id;
    await user.save();

    res.json({
      message: 'Avatar uploaded successfully',
      avatar: user.avatar,
      user: { _id: user._id, name: user.name, email: user.email, avatar: user.avatar, isBusiness: user.isBusiness, isAdmin: user.isAdmin }
    });
  } catch (error) {
    if (req.file && req.file.path) {
      try { fs.unlinkSync(req.file.path); } catch (_) {}
    }
    res.status(500).json({ message: 'Error uploading avatar', error: error.message });
  }
};

// DELETE /users/avatar - Remove avatar
exports.deleteAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.avatarPublicId) {
      try { await cloudinary.uploader.destroy(user.avatarPublicId); } catch (_) {}
    }

    user.avatar = 'https://res.cloudinary.com/demo/image/upload/v1/avatar-placeholder.jpg';
    user.avatarPublicId = undefined;
    await user.save();

    res.json({ message: 'Avatar deleted successfully', avatar: user.avatar });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting avatar', error: error.message });
  }
};

// POST /users/favorites - Add to favorites
exports.addToFavorites = async (req, res) => {
  try {
    const { type, itemId } = req.body;
    if (!type || !itemId) {
      return res.status(400).json({ message: 'type and itemId are required' });
    }

    const field = type === 'recipe' || type === 'recipes' ? 'favoriteRecipes'
                : type === 'dish' || type === 'dishes' ? 'likedDishes'
                : null;
    if (!field) return res.status(400).json({ message: 'Invalid favorite type' });

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $addToSet: { [field]: itemId } },
      { new: true }
    ).select('-password');

    res.json({ message: 'Added to favorites', user });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites', error: error.message });
  }
};

// DELETE /users/favorites - Remove from favorites
exports.removeFromFavorites = async (req, res) => {
  try {
    const { type, itemId } = req.body;
    if (!type || !itemId) {
      return res.status(400).json({ message: 'type and itemId are required' });
    }

    const field = type === 'recipe' || type === 'recipes' ? 'favoriteRecipes'
                : type === 'dish' || type === 'dishes' ? 'likedDishes'
                : null;
    if (!field) return res.status(400).json({ message: 'Invalid favorite type' });

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { [field]: itemId } },
      { new: true }
    ).select('-password');

    res.json({ message: 'Removed from favorites', user });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from favorites', error: error.message });
  }
};

// POST /users/forgot-password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    // Always respond 200 to avoid email enumeration
    if (!user) {
      return res.json({ message: 'If an account exists, a reset link has been sent.' });
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1h
    await user.save();

    // TODO: send email with reset link. Returning token only in non-production for testability.
    const payload = { message: 'If an account exists, a reset link has been sent.' };
    if (process.env.NODE_ENV !== 'production') {
      payload.resetToken = rawToken;
    }
    res.json(payload);
  } catch (error) {
    res.status(500).json({ message: 'Error processing request', error: error.message });
  }
};

// POST /users/reset-password
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ message: 'token and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const hashed = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashed,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error: error.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate({
        path: 'favoriteRecipes',
        populate: { path: 'bookId', select: 'title coverImage' }
      })
      .populate({
        path: 'likedDishes',
        populate: { path: 'restaurantId', select: 'name city' }
      });
    
    res.json({
      favoriteRecipes: user.favoriteRecipes,
      likedDishes: user.likedDishes
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error: error.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (user.isBusiness) {
      // Get all restaurants owned by the user
      const restaurants = await Restaurant.find({ ownerId: userId });
      const restaurantIds = restaurants.map(r => r._id);
      
      // Get all dishes from these restaurants
      const dishes = await Dish.find({ restaurantId: { $in: restaurantIds } });
      
      // Calculate stats
      const totalRestaurants = restaurants.length;
      const totalDishes = dishes.length;
      const totalLikes = dishes.reduce((acc, dish) => acc + (dish.likes ? dish.likes.length : 0), 0);
      const averageRating = 4.8; // Mock rating
      
      // Top Dishes
      const topDishes = [...dishes]
        .sort((a, b) => (b.likes ? b.likes.length : 0) - (a.likes ? a.likes.length : 0))
        .slice(0, 3)
        .map(dish => ({
          _id: dish._id,
          name: dish.title,
          image: dish.image,
          rating: { average: 4.5, count: dish.likes ? dish.likes.length : 0 }
        }));

      return res.json({
        role: 'business',
        overview: {
          totalRestaurants,
          totalDishes,
          totalLikes,
          averageRating
        },
        restaurants: restaurants.map(r => ({
          _id: r._id,
          name: r.name,
          address: r.address ? (typeof r.address === 'string' ? JSON.parse(r.address) : r.address) : {}, 
          logo: r.logo
        })),
        topDishes
      });
    } else {
      // Regular User Stats
      // Favorites
      const favoritesCount = (user.favoriteRecipes ? user.favoriteRecipes.length : 0) + (user.likedDishes ? user.likedDishes.length : 0);
      
      // Posts created
      // We need CommunityPost model here, let's require it at top or inline if circular dependency is an issue (it shouldn't be)
      const CommunityPost = require('../models/CommunityPost');
      const posts = await CommunityPost.find({ userId: userId });
      const postsCount = posts.length;
      
      // Likes received on posts
      const likesReceived = posts.reduce((acc, post) => acc + (post.likes ? post.likes.length : 0), 0);

      return res.json({
        role: 'user',
        favoritesCount: {
          total: favoritesCount,
          recipes: user.favoriteRecipes ? user.favoriteRecipes.length : 0,
          dishes: user.likedDishes ? user.likedDishes.length : 0
        },
        likesCount: {
          total: likesReceived,
          posts: likesReceived
        },
        postsCount
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};
