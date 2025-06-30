export interface ISignUp {
  name: string;
  email: string;
  password: string;
  phone: number;
}
export interface ISignIn {
  email: string;
  password: string;
}
export interface IVerify {
  email: string;
  otp: string;
}
export interface IInfo {
  fullName: string;
  email: string;
  password: string;
  phone: number;
  gender?: string;
  birthday?: Date;
  avatar?: string;
  address: string;
  width: number;
  role: string;
}
export interface ICheckAuth {
  message: string;
  data: string;
}
export interface IForgotPassword {
  email: string;
}
export interface IReset {
  email: string;
  otp: string;
  newPassword: string;
}
export interface Province {
  code: number;
  name: string;
}

export interface District {
  code: number;
  name: string;
}

export interface Ward {
  code: number;
  name: string;
}
