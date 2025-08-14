// export type AuthResponse = {
//     message: string;
//     success: boolean;
//     accessToken: string;
//   };
  
  export type TBodyRegister = {
    email: string;
    password: string;
    confirmPassword: string;
  };
  
  export type TResponseRegister = {
    message: string;
    success: boolean;
    accessToken: string;
  };
  export type TBodyResetPassword = {
    newPassword: string;
    confirmPassword: string;
  };