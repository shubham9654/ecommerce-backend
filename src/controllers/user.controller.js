
const getAllUsers = async (req, res) => {
  try {
    // const allTasks = await Task.find();
    res.status(200).json({ allTasks: [] });
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
}

module.exports = {
  getAllUsers
}