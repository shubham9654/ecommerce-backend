const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, isAdmin=false } = req.body
    const hashPassword = await bcrypt.hash(password, 10)

    const existUser = await User.findOne({ username: req.body.username })
    if (existUser) {
      res.status(403).json({ status: "fail", msg: 'username already exist!', wrongValue: 'username' });
    } else {
      const newUser = await User.create({
        name,
        username,
        email,
        password: hashPassword,
        isAdmin
      });
      if (newUser) {
        res.status(200).json({ status: "success", user: newUser });
      }
    }
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
}

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    
    if (user) {
      const hashPassword = await bcrypt.compare(req.body.password, user.password)
      if (hashPassword) {
        const accessToken = jwt.sign({
          id: user._id,
          isAdmin: user.isAdmin
        }, process.env.JWT_SECRET_KEY, { expiresIn: "2d"})
        const { password, ...rest } = user._doc;
        res.status(200).json({ status: "success", user: rest, accessToken });
      } else {
        res.status(401).json({ status: "fail", errMsg: "wrong credentials" });
      }
    } else {
      res.status(401).json({ status: "fail", errMsg: "wrong username" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err });
  }
}

module.exports = {
  registerUser,
  loginUser
}
