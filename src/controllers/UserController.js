
const UserService = require("../services/UserService");

const createUser = async  (req, res) => {
  try {
    // await UserService.createUser();

    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The input is required" });
    } 
    else if (!isCheckEmail) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The input is email" });
    } 
    else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The password and confirm password is not match",
      });
    }
    
    // const response = await UserService.createUser(req.body);
    // return res.status(200).json(response);
    // console.log('req.body', req.body);
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
    
  }
};
const loginUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The input is required" });
    } else if (!isCheckEmail) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The input is email" });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The password and confirm password is not match",
      });
    }
    // console.log("isCheck", isCheck);
    // const response = await UserService.loginUser(req.body);
    // return res.status(200).json(response);
    // console.log('req.body', req.body);
    const response = await UserService.loginUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

module.exports = { createUser, loginUser };

// module.exports = { createUser };