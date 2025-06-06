const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");
const { JsonWebTokenError } = require("jsonwebtoken");


const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser != null) {
        resolve({
          status: "ERR",
          message: "The email is exist!",
        });
      }
      const hash = bcrypt.hashSync(password, 10);

      const createUser = await User.create({
        name,
        email,
        password: hash,

        phone,
      });
      if (createUser) {
        resolve({
          status: "OK",
          message: "Create user success!",
          data: createUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;

    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not exist!",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password or user is not correct!",
        });
      }

      //   try {
      //     const access_token =  generalAccessToken({
      //         id: checkUser.id,
      //         isAdmin: checkUser.isAdmin,
      //     });
      //     console.log("access_token", access_token);
      // } catch (error) {
      //     console.error("Error generating access token:", error);
      // }
      // console.log("imported", generalAccessToken);

      const access_token = await generalAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      console.log("access_token", access_token);

      const refresh_token = await generalRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      // resolve({
      //   status: "OK",
      //   message: "Create user success!",
      //   access_token,
      //   refresh_token,
      // });
      resolve({
        status: "OK",
        message: "Login success!",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      // console.log("checkUser", checkUser);
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not exist!",
        });
      }
      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
      console.log("updateUser", updateUser);

      resolve({
        status: "OK",
        message: "Login success!",
        data: updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      // console.log("checkUser", checkUser);
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not exist!",
        });
      }
      await User.findByIdAndDelete(id);
      // console.log("updateUser", updateUser);

      resolve({
        status: "OK",
        message: "Delete user success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
      resolve({
        status: "OK",
        message: "Success!",
        data: allUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      // console.log("checkUser", checkUser);
      if (user === null) {
        resolve({
          status: "OK",
          message: "The user is not exist!",
        });
      }
      // await User.findByIdAndDelete(id);
      // console.log("updateUser", updateUser);

      resolve({
        status: "OK",
        message: "SUCCESS!",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};


module.exports = { createUser, 
  loginUser, 
  updateUser, 
  deleteUser, 
  getAllUser, 
  getDetailsUser, 
  // refreshTokenJwtService
  };


