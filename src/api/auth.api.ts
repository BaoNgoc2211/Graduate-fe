import { IReset } from "./../interface/auth/auth.interface";
import { ISignIn, IVerify } from "@/interface/auth/auth.interface";
import APIConfig from "./api.config";
export const signupAPI = async (data: ISignIn) => {
  const response = await APIConfig.post("/api/auth/sign-up", data);
  return response.data;
};
export const verifyEmailAPI = async (data: IVerify) => {
  const response = await APIConfig.post("/api/auth/verify-otp", data);
  return response.data;
};
export const signInAPI = async (data: ISignIn) => {
  const response = await APIConfig.post("/api/auth/sign-in", data);
  return response.data;
};
export const logOutAPI = async () => {
  const response = await APIConfig.post("/api/auth/logout");
  return response.data;
};
export const checkAuthAPI = async () => {
  const response = await APIConfig.get("/api/auth/check-auth");
  return response.data;
};
export const forgotPasswordAPI = async (data: { email: string }) => {
  const response = await APIConfig.post("/api/auth/forgot-password", data);
  return response.data;
};
export const resetPasswordAPI = async (data: IReset) => {
  const response = await APIConfig.post("/api/auth/reset-password", data);
  return response.data;
};
