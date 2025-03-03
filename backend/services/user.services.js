const User = require('../models/user.models');

// Register a new user
const createUser = async ({
    firstName,
    lastName,
    email,
    password,
}) => {
    if(!firstName || !email || !password){
        throw new Error('Please provide all required fields');
    }
    const existingUser = await User.findOne({ email });
    if(existingUser){
        throw new Error('User already exists');
    }

    const user = User.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password,
    });
    return user;
}

// Login a user
const loginUser = async (email, password) => {
    if(!email || !password){
        throw new Error('Please provide email and password');
    }
    const user = await User.findOne({ email }).select('+password');
    if(!user){
        throw new Error('Invalid email or password');
    }
    const isValid = await user.comparePassword(password);
    if(!isValid){
        throw new Error('Invalid email or password');
    }
    return user;
}



module.exports = {
    createUser,
    loginUser
}; 