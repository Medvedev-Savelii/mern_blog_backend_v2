const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPass,
    });
    const user = await newUser.save();
  } catch (error) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(password, user.password);
    !validated && res.status(400).json("Wrong credentials!");
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(err);
  }
};

module.exports = { register, login };
