const express = require('express');
const router = express.Router();
const{body} = require('express-validator');
const captainController = require('../controllers/captain.controllers');
const {authCaptain} = require('../middleware/auth');

router.post('/register', [
    body('fullName.firstName').isLength({min: 3, max: 50}).withMessage('First name must be between 3 and 50 characters'),
    body('fullName.lastName').isLength({min: 3, max: 50}).withMessage('Last name must be between 3 and 50 characters'),
    body('password').isLength({min: 8, max: 100}).withMessage('Password must be between 8 and 100 characters'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('vehicle.color').isLength({min: 1}).withMessage('Please enter a valid color'),
    body('vehicle.plate').isLength({min: 1}).withMessage('Please enter a valid plate'),
    body('vehicle.capacity').isLength({min: 1}).withMessage('Please enter a valid capacity'),
    body('vehicle.vehicleType').isLength({min: 1}).withMessage('Please enter a valid vehicleType')

], captainController.register);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long')
], captainController.login);

router.get('/profile', authCaptain, captainController.getProfile);
router.get('/logout', authCaptain, captainController.logout);


module.exports = router;