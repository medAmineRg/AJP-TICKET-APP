const { hash, compare } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

const customError = (msg, code) => {
  const error = new Error(msg);
  error.code = code;
  throw error;
};

const successResponse = (api, code, message, result = {}, token = null) => {
  return { api, code, message, result, token };
};

const sendResponse = (message, code = null, result = null) => {
  return { message, code, result };
};

const hashPassword = async password => {
  if (password.length < 8) {
    throw customError("Password should contain at least 8 character!", 400);
  }
  const saltRounds = 10;

  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const match = await compare(password, hashedPassword);
  if (!match) throw customError("Email or Password might be wrong!!", 400);
};

const generateToken = async userID => {
  const token = sign({ userID }, process.env.TOKEN_KEY);
  return token;
};

const verifyToken = token => {
  const decoded = verify(token, process.env.TOKEN_KEY);
  if (decoded) return decoded;
  customError("Invalid token!", 400);
};

module.exports = {
  customError,
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  successResponse,
  sendResponse,
};
