import api from "./api";

// 1. GET - Get all users
export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// 2. GET - Get one user
export const getUserById = async (id) => {
  const response = await api.get('/users/${id}');
  return response.data;
};

// 3. POST - Create user
export const createUser = async (user) => {
  const response = await api.post("/users", user);
  return response.data;
};

// 4. PUT - Update complete user
export const updateUser = async (id, user) => {
  const response = await api.put('/users/${id}', user);
  return response.data;
};

// 5. PATCH - Update selected information
export const patchUser = async (id, user) => {
  const response = await api.patch('/users/${id}', user);
  return response.data;
};

// 6. DELETE - Delete user
export const deleteUser = async (id) => {
  const response = await api.delete('/users/${id}');
  return response.data;
};