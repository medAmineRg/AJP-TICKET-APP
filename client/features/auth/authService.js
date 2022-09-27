import axios from "axios";
const URL = process.env.NEXT_PUBLIC_URL;
// signup user
const signup = async userData => {
  const response = await axios.post(URL + "signup", userData);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  return response.data;
};

const login = async userData => {
  const response = await axios.post(URL + "login", userData);
  console.log(response.data);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  signup,
  logout,
  login,
};

export default authService;
