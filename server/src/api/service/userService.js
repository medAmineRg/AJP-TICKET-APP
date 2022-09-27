// const {
//   validateEmail,
//   customError,
//   hashPassword,
// } = require("../helpers/utils");
// const User = require("../models/User");

// const userRegisterCheck = async (
//   firstName,
//   lastName,
//   email,
//   password,
//   role
// ) => {
//   validateEmail(email);

//   if (await User.emailExistence(email))
//     customError("Email already exist, please login", 400);
//   password = await hashPassword(password);
//   const user = await User.create(firstName, lastName, email, password, role);
//   return user;
// };

// module.exports = {
//   userRegisterCheck,
// };
