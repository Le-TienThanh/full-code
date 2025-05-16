const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");
const { JsonWebTokenError } = require("jsonwebtoken");
const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      paymentMethod,
      orderItems,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
      user,
    } = newOrder;
    try {
      const promises = orderItems.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            countInStock: { $gte: order.amount },
          },
          {
            $inc: {
              countInStock: -order.amount,
              sold: +order.amount,
            },
          },
          { new: true }
        );
        if (productData) {
          const createdOrder = await Order.create({
            orderItems,
            shippingAddress: {
              fullName,
              address,
              city,
              phone,
            },
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            user: user,
          });
          if (createdOrder) {
            return {
              status: "OK",
              message: "SUCCESS ",
            };
          }
        } else {
          return {
            status: "OK",
            message: "ERR",
            id: order.product,
          };
        }
      });
      const results = await Promise.all(promises);
      const newData = results && results.filter((item) => item.id);
      if (newData.length) {
        resolve({
          status: "ERR",
          message: `Sản phẩm với id ${newData.join(",")} không đủ hàng`,
        });
      }
      resolve({
        status: "OK",
        message: "success",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id,
      });
      // console.log("checkUser", checkUser);
      if (order === null) {
        resolve({
          status: "OK",
          message: "The order is not exist!",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS!",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({
        _id: id,
      });
      // console.log("checkUser", checkUser);
      if (order === null) {
        resolve({
          status: "OK",
          message: "The order is not exist!",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS!",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const cancelOrderDetails = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = [];

      const promises = data.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            sold: {$gte: order.amount}
          },
          {
            $inc: {
              countInStock: +order.amount,
              sold: -order.amount,
            },
          },
          { new: true }
        );
        if (productData) {
          order = await Order.findByIdAndDelete(id);
          if (order === null) {
            resolve({
              status: "ERR",
              message: "The order is not define",
            });
          }
        } else {
          return {
            status: "OK",
            message: "ERR",
            id: order.product,
          };
        }
      });
      const results = await Promise.all(promises);
     
      resolve({
        status: "OK",
        message: "success",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
  getAllOrderDetails,
  getOrderDetails,
  cancelOrderDetails,
};
