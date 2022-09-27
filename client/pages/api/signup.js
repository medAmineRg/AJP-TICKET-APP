import connectDB from "../../middleware/connectDB";
import User from "../../models/User";
import { customError, generateToken, hashPassword } from "../../utils/utils";

export default connectDB(async function handler(req, res) {
  try {
    let { firstName, lastName, email, password } = req.body;

    if (password.trim().length < 8)
      return customError("The password must contain 8 at least", 400);
    //check email existence
    if (await User.emailExistence(email))
      return customError("Email Already exist, please login.", 400);

    password = await hashPassword(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    const token = await generateToken(user._id);

    return res
      .status(200)
      .json({ user, token, message: "Registered successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(error.code >= 400 || error.code <= 499 ? error.code : 500)
      .json({ message: error.message || "Something wrong" });
  }
});
