const User = require("../models/User");

const register = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) return null;
  return User.create({ name, email, password });
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const valid = await user.matchPassword(password);
  if (!valid) return null;
  return user;
};

module.exports = { register, login };
