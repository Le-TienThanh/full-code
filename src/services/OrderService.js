const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");
const { JsonWebTokenError } = require("jsonwebtoken");

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
      user
    } = newOrder;
    try {
      const createdOrder = await Order.create({
        orderItems,
        shippingAddress: {
            fullName, 
            address,
            city,
            phone
        },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        user: user,
      })
      if (createdOrder) {
        resolve({
          status: "OK",
          message: "Create user success!",
          data: createdOrder,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
};
