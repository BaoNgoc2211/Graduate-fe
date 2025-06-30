// import { ICart } from "@/interface/order/cart.interface";
// import APIConfig from "../api.config";

// export interface IAddToCartPayload {
//   medicine_id: string;
//   quantity: number;
// }
// // interface ApiResponse<T> {
// //   message: string;
// //   data: T;
// // }
// export const getAllCartAPI = async (): Promise<{ data: ICart[] }> => {
//   const response = await APIConfig.get("/api/cart/get-cart");
//   return response.data as Promise<{ data: ICart[] }>;
// };
// export const addToCartAPI = async (payload: IAddToCartPayload) => {
//   const response = await APIConfig.post("/api/cart/add-item", payload, {
//     withCredentials: true,
//   });
//   return response.data;
// };
// export const updateCartAPI = async (
//   medicine_id: string,
//   quantity: number
// ): Promise<{ data: ICart }> => {
//   const response = await APIConfig.put(`/api/cart/update/${medicine_id}`, {
//     medicine_id,
//     quantity,
//   });
//   return response.data as Promise<{ data: ICart }>;
// };
// export const removeCartAPI = async (
//   medicine_id: string
// ): Promise<{ data: ICart }> => {
//   const response = await APIConfig.delete(`/api/cart/remove/${medicine_id}`);
//   return response.data as Promise<{ data: ICart }>;
// };
// export const clearCartAPI = async () => {
//   const res = await APIConfig.delete(`/api/cart/clear`);
//   return res.data;
// };
//#region thành công nhưng không lấy được giá
// import type { ICart } from "@/interface/order/cart.interface"
// import APIConfig from "../api.config"

// export interface IAddToCartPayload {
//   medicine_id: string
//   quantity: number
// }

// export const getAllCartAPI = async (): Promise<{ data: ICart[] }> => {
//   const response = await APIConfig.get("/api/cart/get-cart")
//   return response.data as Promise<{ data: ICart[] }>
// }

// export const addToCartAPI = async (payload: IAddToCartPayload) => {
//   const response = await APIConfig.post("/api/cart/add-item", payload, {
//     withCredentials: true,
//   })
//   return response.data
// }

// export const updateCartAPI = async (medicine_id: string, quantity: number): Promise<{ data: ICart }> => {
//   const response = await APIConfig.put(`/api/cart/update/${medicine_id}`, {
//     medicine_id,
//     quantity,
//   })
//   return response.data as Promise<{ data: ICart }>
// }

// export const removeCartAPI = async (medicine_id: string): Promise<{ data: ICart }> => {
//   const response = await APIConfig.delete(`/api/cart/remove/${medicine_id}`)
//   return response.data as Promise<{ data: ICart }>
// }

// export const clearCartAPI = async () => {
//   const res = await APIConfig.delete(`/api/cart/clear`)
//   return res.data
// }
//#endregion
import type { ICart } from "@/interface/order/cart.interface";
import APIConfig from "../api.config";

export interface IAddToCartPayload {
  medicine_id: string;
  quantity: number;
}
export interface RemoveCartPayload {
  medicine_id: string;
}

export interface RemoveCartResponse {
  message: string;
  data: ICart;
}
export const getAllCartAPI = async (): Promise<{ data: ICart[] }> => {
  const response = await APIConfig.get("/api/cart/get-cart");
  return response.data as Promise<{ data: ICart[] }>;
};

export const addToCartAPI = async (payload: IAddToCartPayload) => {
  const response = await APIConfig.post("/api/cart/add-item", payload, {
    withCredentials: true,
  });
  return response.data;
};

export const updateCartAPI = async (
  medicine_id: string,
  quantity: number
): Promise<{ data: ICart }> => {
  const response = await APIConfig.put(`/api/cart/update/${medicine_id}`, {
    medicine_id,
    quantity,
  });
  return response.data as Promise<{ data: ICart }>;
};
export const removeCartAPI = async (
  payload: RemoveCartPayload
): Promise<RemoveCartResponse> => {
  const response = await APIConfig.post<RemoveCartResponse>(
    "/api/cart/remove",
    payload
  );
  return response.data;
};
// export const removeCartAPI = async (
//   medicine_id: string
// ): Promise<{ data: ICart }> => {
//   const response = await APIConfig.delete(`/api/cart/remove`, { medicine_id });
//   return response.data as Promise<{ data: ICart }>;
// };

export const clearCartAPI = async () => {
  const res = await APIConfig.delete(`/api/cart/clear`);
  return res.data;
};
