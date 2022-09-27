const {
  successResponse,
  hashPassword,
  customError,
  validateEmail,
  generateToken,
  comparePassword,
} = require("../helpers/utils");
const User = require("../models/User");

const getUsers = async (req, res) => {
  const user = await User.findAll({
    attributes: ["idUser", "role", "fullName", "email"],
  });
  return res.status(200).send({ message: "Get all users successfully", user });
};

const signup = async (req, res) => {
  let { fullName, email, password } = req.body;
  if (!fullName || !email || !password)
    customError("You must provide the 'fullName, email and password' ", 400);
  validateEmail(email);
  if (password.trim().length < 8)
    customError("password must contain at least 8 character", 400);

  const checkForEmail = await User.findOne({ where: { email } });
  if (checkForEmail) customError("Email Already exist, please login", 400);
  password = await hashPassword(password);
  let user = await User.create({ fullName, email, password, role: "Admin" });
  const token = await generateToken(user.idUser);
  user.password = "";
  res.status(201).json({
    message: "User created successfully",
    user: { ...user.dataValues, token },
  });
};

const login = async (req, res) => {
  let { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
    attributes: ["idUser", "role", "fullName", "email", "password"],
    raw: true,
  });
  if (!user) customError("No email was found please signup", 404);
  await comparePassword(password, user.password);
  const token = await generateToken(user.idUser);
  user.password = "";
  res
    .status(200)
    .json({ message: "Logged in successfully", user: { ...user, token } });
};

const updateUser = async (req, res) => {
  let { fullName, password, email } = req.body;
  if (password) {
    password = await hashPassword(password);
  }
  let user = req.user;
  if (fullName) user.fullName = fullName;
  if (password) user.password = password;
  if (email) user.email = email;
  await user.save();
  user.password = "";
  res.status(204).send();
};

const deleteUser = async (req, res) => {
  await User.destroy({ where: { idUser: req.params.id } });
  res.status(204).send();
};

module.exports = {
  signup,
  login,
  updateUser,
  deleteUser,
  getUsers,
};
