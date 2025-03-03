const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        firstName:{
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters'],
            maxLength: [50, 'First name must be at most 50 characters']
        },
        lastName:{
            type: String,
            required: true,
            minlength: [3, 'Last name must be at least 3 characters'],
            maxLength: [50, 'Last name must be at most 50 characters']
        }
    },
    password:{
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters'],
        maxLength: [100, 'Password must be at most 100 characters'],
        select: false
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    socketId:{
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    }
},{timestamps: true});

userSchema.methods.generateToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
};

userSchema.statics.hashPassword = async function(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);