const { verifyToken, customError } = require("../helpers/utils");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = verifyToken(token);
    const user = await User.findOne({ where: { idUser: decoded.userID } });
    if (!user) customError("No user was found", 404);
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json(e);
  }
};

module.exports = {
  auth,
};
