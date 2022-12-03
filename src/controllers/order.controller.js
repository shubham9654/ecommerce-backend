const Order = require("../models/order.model");

const getOrder = async (req, res) => {
  try {
    const userId = req.params.id
    const order = await Order.find({ userId });
    if (order) {
      res.status(200).json({ status: "success", order });
    } else {
      res.status(404).json({ status: "fail", msg: "order not found!" });
    }
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
}

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().limit(20);
    if (orders) {
      res.status(200).json({ status: "success", orders });
    } else {
      res.status(404).json({ errMsg: 'orders not found' });
    }
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
}

const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    if (order) {
      res.status(200).json({ status: "success", order });
    }
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id
    const order = await Order.findByIdAndUpdate(orderId, {
      $set: req.body
    }, { new: true });
    if (order) {
      res.status(200).json({ status: "success", order });
    } else {
      res.status(400).json({ status: "fail", msg: "order not found!" });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ errMsg: err });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByIdAndDelete(orderId)
    if (order) {
      res.status(200).json({ status: "success", msg: "order deleted successfully!", order });
    } else {
      res.status(400).json({ status: "fail", msg: "order not found!" });
    }
  } catch (err) {
    res.status(500).json({ errMsg: err });
  }
};

// need to understand later
const monthlyIncome = async (req, res) => {
  try {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getOrder,
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  monthlyIncome
}