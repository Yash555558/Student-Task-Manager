import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api"
});

// attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const signup = (payload) => api.post("/auth/signup", payload).then(r => r.data);
export const login = (payload) => api.post("/auth/login", payload).then(r => r.data);

export const fetchTasks = (params) => api.get("/tasks", { params }).then(r => r.data);
export const createTask = (task) => api.post("/tasks", task).then(r => r.data);
export const updateTask = (id, updates) => api.put(`/tasks/${id}`, updates).then(r => r.data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`).then(r => r.data);

export default api;