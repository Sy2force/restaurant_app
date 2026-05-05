const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { auth, isAdmin } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validation');
const upload = require('../middleware/upload');

// Public routes
router.post('/', validateRegister, userController.register);
router.post('/login', validateLogin, userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

// Protected: own profile (specific routes BEFORE /:id)
router.get('/profile', auth, userController.getMe);
router.put('/profile', auth, userController.updateProfile);
router.post('/avatar', auth, upload.single('avatar'), userController.uploadAvatar);
router.delete('/avatar', auth, userController.deleteAvatar);
router.get('/favorites', auth, userController.getFavorites);
router.post('/favorites', auth, userController.addToFavorites);
router.delete('/favorites', auth, userController.removeFromFavorites);
router.get('/dashboard/stats', auth, userController.getDashboardStats);

// Admin / dynamic
router.get('/', auth, isAdmin, userController.getAllUsers);
router.get('/:id', auth, userController.getUserById); // Controller checks Self/Admin
router.put('/:id', auth, userController.updateUser); // Controller checks Self
router.patch('/:id', auth, userController.updateIsBusiness); // Controller checks Self
router.delete('/:id', auth, userController.deleteUser); // Controller checks Self/Admin

module.exports = router;
