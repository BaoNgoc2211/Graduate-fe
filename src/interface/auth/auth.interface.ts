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

// export interface IInfo {
//   name?: string;
//   phone?: string;
//   avatar?: string;
//   gender?: string;
//   point?: number;
//   birthday?: Date;
//   address?: {
//     // provinceId?: string;
//     // provinceName?: string;
//     // wardId?: string;
//     // wardName?: string;
//     // street?: string;
//   };
// }

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
// export interface IAddress {
//   provinceId?: string;
//   provinceName?: string;
//   wardId?: string;
//   wardName?: string;
//   street?: string; // Địa chỉ chi tiết
// }

export interface IInfo {
  name?: string;
  phone?: string;
  avatar?: string;
  gender?: string;
  point?: number;
  // birthday?: string; // Thay đổi từ Date thành string để dễ xử lý
  address?: string;
  birth?: Date;
}

// export interface IUser {
//   _id: string;
//   email: string;
//   isEmailVerified: boolean;
//   info?: IInfo;
//   createdAt: string;
//   updatedAt: string;
// }
export interface IUser {
  _id: string;
  email: string;
  isEmailVerified: boolean;
  info?: IInfo;
  createdAt: string;
  updatedAt: string;
  // THÊM MỚI: Support cho legacy data structure (flat fields)
  name?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  gender?: string;
  birth?: Date;
}

// Profile form state interface
export interface IProfileFormState {
  name: string;
  phone: string;
  email: string;
  birthday: string;
  gender: string;
  password: string;
  address: string
  // {
  //   province: string;
  //   district: string;
  //   ward: string;
  //   detail: string;
  // };
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
export interface IProfileFormData {
  name: string;
  phone: string;
  address: string;
  avatar?: string;
  gender: "male" | "female";
  birth: string;
}

// THÊM MỚI: Helper function để normalize user data
export const normalizeUserData = (userData: IUser): {
  name: string;
  phone: string;
  email: string;
  gender: string;
  birthday: Date;
  avatar?: string;
  address?: string;
} => {
  // Handle both nested info structure và flat structure
  const info = userData.info || {};
  
  return {
    name: info.name || userData.name || '',
    phone: info.phone || userData.phone || '',
    email: userData.email || '',
    gender: info.gender || userData.gender || '',
    birthday: info.birthday || info.birth || userData.birth ,
    avatar: info.avatar || userData.avatar,
    address: info.address || userData.address || '',
  };
};