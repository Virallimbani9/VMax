const Captain = require('../models/captain.models');

const createCaptain = async ({
    firstName,
    lastName,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType,
}) => {
    if(!firstName || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('Please provide all required fields');
    }
    const existingCatain = await Captain.findOne({ email });
    if(existingCatain){
        throw new Error('Captain already exists');
    }

    const captain = Captain.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return captain;
}

const captainLogin = async (
     email,
     password
) =>{
    if(!email || !password){
        throw new Error('Please provide all required fields');
    }
    const captain = await Captain.findOne({ email }).select('+password');
    if(!captain){
        throw new Error('Captain does not exist');
    }
    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        throw new Error('Invalid login credentials');
    }
    return captain;
}

module.exports = {
    createCaptain,
    captainLogin
};