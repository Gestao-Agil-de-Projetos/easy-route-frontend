import api from "./client";

export const login = async (email, password) => {
  const res = await api.post("/login", { email, password });
  return res.data;
};

export const register = async (userData) => {
  const res = await api.post("/register", userData);
  return res.data;
};
