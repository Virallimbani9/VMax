const express = require('express');
const router = express.Router();
const{body} = require('express-validator');
const userController = require('../controllers/user.controllers');
const auth = require('../middleware/auth');


router.post('/register', [
    body('fullName.firstName').isLength({min: 3, max: 50}).withMessage('First name must be between 3 and 50 characters'),
    body('fullName.lastName').isLength({min: 3, max: 50}).withMessage('Last name must be between 3 and 50 characters'),
    body('password').isLength({min: 8, max: 100}).withMessage('Password must be between 8 and 100 characters'),
    body('email').isEmail().withMessage('Please enter a valid email address')
], userController.register);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long')
], userController.login);

router.get('/profile', auth.authUser, userController.getProfile);
router.get('/logout', auth.authUser, userController.logout);


module.exports = router;