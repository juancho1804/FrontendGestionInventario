import { signInApi, registerApi } from "../data/userApi";

export const signinService = async (email, contrasenia) => {
  return await signInApi({ email, contrasenia });
};

export const registerService = async (formData) => {
  return await registerApi(formData); // formData ya viene completo desde RegisterForm
};