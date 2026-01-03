import axios from "axios";

export const customerLogin = async (email, password) => {
  try {
    const res = await axios.post("http://localhost:5000/api/customer/auth/login", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};
