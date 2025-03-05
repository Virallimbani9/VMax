const Captain = require('../models/captain.models');
const CaptainService = require('../services/captain.services');
const {validationResult} = require('express-validator');
const BlacklistToken = require('../models/blacklistToken.models');

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;
    // console.log(req.body);

    // Check if the captain already exists
    const existingCaptain = await Captain.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    // Hash password
    const hashedPassword = await Captain.hashPassword(password);

    // Create captain with correct nested structure
    const captain = await Captain.create({
      fullName: {
        firstName: fullName.firstName,
        lastName: fullName.lastName
      },
      email,
      password: hashedPassword,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
      }
    });

    // Generate token
    const token = captain.generateToken();
    res.status(201).json({ captain, token });
};

const login = async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;

    const captain = await CaptainService.captainLogin(email, password);
    if (!captain) return res.status(401).json({message: 'Invalid credentials'});
    
    const token = captain.generateToken();
    res.cookie('token',token);
    res.status(200).json({captain, token});
}

const getProfile = async (req, res) => {
    try {
        res.status(200).json(req.captain);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

const logout = async (req, res) => {
    res.clearCookie('token');
    let token = req.cookies.token || req.authorization.split(' ')[1];
    await BlacklistToken.create({token});
    res.status(200).json({message: 'Logged out'});
}

module.exports = {
    register,
    login,
    getProfile,
    logout,
};