import axiosClient from "../api/axiosClient";

export const signInApi = async (credentials) => {
  const response = await axiosClient.post("/auth/signin", credentials);
  return response.data; // devuelve el token como string
};

export const registerApi = async (registerData) => {
  const response = await axiosClient.post("/auth/register", registerData);
  return response.data;
};