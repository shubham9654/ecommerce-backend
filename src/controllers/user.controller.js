const User = require("../models/user.model");

const getUser = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)
    if (user) {
      const { password, ...rest } = user._doc;
      res.status(200).json({ status: "success", user: rest });
    } else {
      res.status(404).json({ errMsg: 'user not found' });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ errMsg: err });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const getNeUser = req.query.new
    const allUsers = getNeUser ? await User.find().sort({ _id: -1 }).limit(1) : await User.find().limit(20);
    if (allUsers.length > 0) {
      const updatedUsers = allUsers.map(({ _doc }) => {
        delete _doc.password
        return _doc
      })
      res.status(200).json({ status: "success", user: updatedUsers });
    } else {
      res.status(404).json({ errMsg: 'users not found' });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ errMsg: err });
  }
}

const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(password, 10)
    }
    const userId = req.params.id
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $set: req.body
    }, { new: true })
    if (updatedUser) {
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json({ status: "success", user: rest });
    } else {
      res.status(404).json({ errMsg: 'user not found' });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ errMsg: err });
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id
    await User.findOneAndDelete(userId)
    res.status(200).json({ status: "success", msg: "user deleted"});
  } catch (err) {
    console.log(err)
    res.status(500).json({ errMsg: err });
  }
}

// need to understand later
const getUserStatus = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserStatus
};
