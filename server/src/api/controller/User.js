const { Op } = require("sequelize");
const {
  hashPassword,
  customError,
  generateToken,
  comparePassword,
} = require("../helpers/utils");
const User = require("../models/User");

const getUsers = async (req, res) => {
  let { limit, page } = req.query;
  if (!limit) {
    limit = 10;
  }
  if (!page) {
    page = 0;
  }
  const total = await User.count({
    where: {
      role: {
        [Op.ne]: "Admin",
      },
    },
  });
  const user = await User.findAll({
    offset: parseInt(limit * page),
    limit: parseInt(limit),
    attributes: [
      ["idUser", "id"],
      "role",
      "fullName",
      "email",
      "createdAt",
      "updatedAt",
    ],
    where: {
      role: {
        [Op.ne]: "Admin",
      },
    },
  });
  return res.status(200).send({
    message: !total ? "No users in database" : "Get all users successfully",
    user,
    total,
  });
};

const signup = async (req, res) => {
  let { fullName, email, password, role } = req.body;
  if (!role || (role !== "User" && role !== "Admin")) role = "User";

  if (!fullName || !email || !password)
    customError("You must provide 'Fullname, email and password' ", 400);
  if (password.trim().length < 8)
    customError("password must contain at least 8 character", 400);

  const checkForEmail = await User.findOne({ where: { email } });
  if (checkForEmail) customError("Email Already exist, please login", 400);
  password = await hashPassword(password);
  let user = await User.create({ fullName, email, password, role });
  const token = await generateToken(user.idUser);
  user.password = "";
  res.status(201).json({
    message: "User created successfully",
    user: { ...user.dataValues, token },
  });
};

const login = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) customError("Email and Password are required!");
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
  let { fullName, password, email, role } = req.body;
  if (!fullName && !password && !email && !role)
    customError(
      "Nothing was changed, you have not provide us with any new data.",
      400
    );
  if (password) {
    password = await hashPassword(password);
  }
  let user = await User.findByPk(req.params.id);
  if (fullName) user.fullName = fullName;
  if (password) user.password = password;
  if (email) user.email = email;
  if (role) user.role = role;

  await user.save();
  res.status(204).send();
};

const deleteUser = async (req, res) => {
  if (req.user.role !== "Admin")
    customError("You do not have permission to do that", 403);
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
