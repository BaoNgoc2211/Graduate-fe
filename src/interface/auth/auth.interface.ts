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
  name?: string;
  phone?: string;
  avatar?: string;
  gender?: string;
  point?: number;
  birthday?: Date;
  address?: {
    provinceId?: string;
    provinceName?: string;
    wardId?: string;
    wardName?: string;
    street?: string;
  };
}

export interface ICheckAuth {
  message: string;
  data: string;
}

// export interface IForgotPassword {
//   email: string;
// }

export interface IReset {
  email: string;
  otp: string;
  newPassword: string;
}

// // Address related interfaces
// export interface Province {
//   code: number;
//   name: string;
// }

// export interface District {
//   code: number;
//   name: string;
// }

// export interface Ward {
//   code: number;
//   name: string;
// }

// // Profile response interface
// export interface IProfileResponse {
//   message: string;
//   data: {
//     _id: string;
//     email: string;
//     info: IInfo;
//   };
// }
// interface/auth/auth.interface.ts - Cập nhật interfaces
export interface IAddress {
  provinceId?: string;
  provinceName?: string;
  wardId?: string;
  wardName?: string;
  street?: string; // Địa chỉ chi tiết
}

export interface IInfo {
  name?: string;
  phone?: string;
  avatar?: string;
  gender?: string;
  point?: number;
  birthday?: string; // Thay đổi từ Date thành string để dễ xử lý
  address?: IAddress;
}

export interface IUser {
  _id: string;
  email: string;
  isEmailVerified: boolean;
  info?: IInfo;
  createdAt: string;
  updatedAt: string;
}

// Profile form state interface
export interface IProfileFormState {
  name: string;
  phone: string;
  email: string;
  birthday: string;
  gender: string;
  password: string;
  address: {
    province: string;
    district: string;
    ward: string;
    detail: string;
  };
}

// API interfaces
export interface IProfileResponse {
  message: string;
  data: IUser;
  success: boolean;
}

export interface IUpdateProfilePayload {
  info: IInfo;
}

// Address related interfaces
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