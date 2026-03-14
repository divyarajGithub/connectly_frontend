import apiRoutes from "@/api/routes";
import axiosInstance from "./axiosInstance";

type SignupData = {
  username: string;
  email: string;
  password: string;
};

export const signupApi = (data: SignupData) => {
  return axiosInstance.post(apiRoutes.signup, data);
};

export const loginApi = (data: SignupData) => {
  return axiosInstance.post(apiRoutes.login, data);
};