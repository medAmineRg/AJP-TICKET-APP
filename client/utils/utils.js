const { hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const validateEmail = email => {
  const validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  return email.match(validRegex) ? true : false;
};

const customError = (msg, code) => {
  const error = new Error(msg);
  error.code = code;
  throw error;
};

const successResponse = (api, code, message, result) => {
  return { api, code, message, result };
};

const sendResponse = (message, code = null, result = null) => {
  return { message, code, result };
};

const hashPassword = async password => {
  if (password.length < 8) {
    throw customError(400, "Password should contain at least 8 character!");
  }
  const saltRounds = 10;

  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const match = await compare(password, hashedPassword);

  if (match) {
    return true;
  }
  throw customError("Email or Password might be wrong!!", 400);
};

const generateToken = async userID => {
  const token = sign({ userID }, process.env.TOKEN_KEY);
  return token;
};

const verifyToken = token => {
  const decoded = verify(token, process.env.TOKEN_KEY);
  if (decoded) return decoded;
  customError(400, "Invalid token!");
};

module.exports = {
  validateEmail,
  customError,
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  successResponse,
  sendResponse,
};
