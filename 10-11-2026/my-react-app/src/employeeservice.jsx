import api from "./api";

// GET - Get all employees
export const getEmployees = async () => {
  const response = await api.get("/users");
  return response.data;
};

// GET - Get employee by ID
export const getEmployeeById = async (id) => {
  const response = await api.get('/users/${id}');
  return response.data;
};

// POST - Add new employee
export const addEmployee = async (employee) => {
  const response = await api.post("/users/add", employee);
  return response.data;
};

// PUT - Update complete employee details
export const updateEmployee = async (id, employee) => {
  const response = await api.put('/users/${id}', employee);
  return response.data;
};

// PATCH - Update selected employee details
export const patchEmployee = async (id, employee) => {
  const response = await api.patch('/users/${id}', employee);
  return response.data;
};

// DELETE - Delete employee
export const deleteEmployee = async (id) => {
    try{
  const response = await api.delete('/users/${id}');
  return response.data;
    }catch (error){
    console.error("Error deleting employee:",error);
}
  
};