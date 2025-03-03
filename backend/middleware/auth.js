const User = require('../models/user.models');
const Captain = require('../models/captain.models');
const BlacklistToken = require('../models/blacklistToken.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authUser = async (req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({message: 'Unauthorized'});

    const blacklistedToken = await BlacklistToken.findOne({token });
    if (blacklistedToken) return res.status(401).json({message: 'Unauthorized'});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne(decoded._id);
        if (!user) return res.status(401).json({message: 'Unauthorized'});
        req.user = user;
        next();
    } catch (error){
        res.status(401).json({message: 'Token is not valid'});
    }
}

const authCaptain = async (req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({message: 'Unauthorized'});

    const blacklistedToken = await BlacklistToken.findOne({token });
    if (blacklistedToken) return res.status(401).json({message: 'Unauthorized'});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await Captain.findOne(decoded._id);
        if (!captain) return res.status(401).json({message: 'Unauthorized'});
        req.captain = captain;
        next();
    } catch (error){
        res.status(401).json({message: 'Token is not valid'});
    }
}

module.exports = {authUser,authCaptain};