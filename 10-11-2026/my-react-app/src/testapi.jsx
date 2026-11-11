import api from "./api.jsx";

export const testAxios = async () => {
  try {
    const response = await api.get("/users");

    console.log("Axios working:", response.data);

  } catch (error) {
    console.log("Axios error:", error.message);
  }
};