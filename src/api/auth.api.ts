import { ISignIn, IVerify } from "@/interface/auth/auth.interface";
import APIConfig from "./api.config";

export const signInAPI = async (data: ISignIn) => {
  const response = await APIConfig.post("/api/auth/sign-in", data);
  return response.data;
};
export const verifyEmailAPI = async (data:IVerify) => {
  const response = await APIConfig.post("/api/auth/verify-otp", data);
  return response.data;
}