const express = require("express");
const {
  signup,
  login,
  updateUser,
  deleteUser,
  getUsers,
} = require("../controller/User");
const { auth } = require("../middleware/auth");
const errorHandler = require("../middleware/errorHandler");
const router = express.Router();

router.post("/signup", errorHandler(signup));
router.post("/login", errorHandler(login));
router.get("/user", auth, errorHandler(getUsers));
router.patch("/user/:id", auth, errorHandler(updateUser));
router.delete("/user/:id", auth, errorHandler(deleteUser));

module.exports = router;
