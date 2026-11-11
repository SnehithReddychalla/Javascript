import axios from "axios";

// Login function
export const loginUser = async () => {
  try {
    const response = await axios.post(
      "https://dummyjson.com/auth/login",
      {
        username: "emilys",
        password: "emilyspass"
      }
    );

    // Get token from server
    const token = response.data.accessToken;

    // Store token
    localStorage.setItem("token", token);

    return response.data;

  } catch (error) {
    console.log("Login failed:", error);
    throw error;
  }
};