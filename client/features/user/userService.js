import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL;

const getUsers = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(URL + "user", config);
  return response.data;
};

const createUser = async (user, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(URL + "signup", user, config);

  return response.data;
};

const updateUser = async (user, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(URL + "user/" + user.id, user, config);
  return response.data;
};

const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(URL + "user/" + id, config);
  return response.data;
};

const userService = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
};

export default userService;
