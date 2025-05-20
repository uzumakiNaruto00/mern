const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function register(req, res) {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hash });
  await user.save();
  res.sendStatus(201);
}
async function login(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.user = user._id;
  res.json({ message: "Logged in successfully" });
}

async function logout(req, res) {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.json({ message: "Logged out successfully" });
}

async function me(req, res) {
  if (!req.session.user)
    return res.status(401).json({ message: "Not authenticated" });

  const user = await User.findById(req.session.user).select("-password");
  res.json(user);
}


module.exports = {
  register,
  login, 
  logout, 
  me
}