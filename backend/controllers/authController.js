const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const generateToken = require("../utils/generateToken");

const authResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  isAdmin: user.isAdmin,
  createdAt: user.createdAt,
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    res.status(409);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  res.status(201).json({
    token: generateToken(user._id),
    user: authResponse(user),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    token: generateToken(user._id),
    user: authResponse(user),
  });
});

const getProfile = asyncHandler(async (req, res) => {
  res.json(authResponse(req.user));
});

module.exports = { registerUser, loginUser, getProfile };
