import connectDB from "../../middleware/connectDB";
import User from "../../models/User";
import { comparePassword, customError, generateToken } from "../../utils/utils";

export default connectDB(async function handler(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) customError("Email wasn't found, please signup first.", 400);
    await comparePassword(password, user.password);
    const token = await generateToken(user._id);
    return res.status(200).json({ user, token, message: "Login successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(error.code >= 400 || error.code <= 499 ? error.code : 500)
      .json({ message: error.message || "Something wrong", code: error.code });
  }
});
