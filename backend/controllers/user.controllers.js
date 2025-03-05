const User = require("../models/user.models");
const BlacklistToken = require("../models/blacklistToken.models");
const userService = require("../services/user.services");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashPassword = await User.hashPassword(password);

  const user = await userService.createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashPassword,
  });
  const token = user.generateToken();
  res.status(201).json({ user, token });
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const user = await userService.loginUser(email, password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = user.generateToken();
  res.cookie("token", token);
  res.status(200).json({ user, token });
};

const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const logout = async (req, res) => {
    try {
        if (!req.cookies.token && !req.headers.authorization) {
            return res.status(400).json({ message: "No token provided" });
        }

        // Extract token
        let token = req.cookies.token || req.headers.authorization.split(" ")[1];

        // Prevent duplicate blacklist entries
        const existingToken = await BlacklistToken.findOne({ where: { token } });
        if (existingToken) {
            return res.status(200).json({ message: "Already logged out" });
        }

        // Add to blacklist
        await BlacklistToken.create({ token });

        // Clear cookie
        res.clearCookie("token", { httpOnly: true });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = {
  register,
  login,
  getProfile,
  logout,
};
