
const express = require("express");

const router = express.Router();
const userController = require("../controllers/UserController");

// router.get("/", (req, res) => {
//   return res.status(200).json("hello world");
// });
// router.post("/sign-up", userController.createUser);
// router.post("/sign-in", userController.loginUser);
router.post("/", userController.createUser);

module.exports = router;