// // export interface IOrder {
// //   _id: string;
// //   status: string;
// //   totalAmount: number;
// //   shippingFee: number;
// //   shippingVoucher: number;
// //   totalVoucher: number;
// //   orderDate: Date;
// //   order_id: [{
// //     stock_id: {
// //       medicine_id: {
// //         thumbnail: string;
// //         packaging: string;
// //       };
// //     };
// //     name: string;
// //     price: string;
// //     quantity: number;
// //     totalAmount: number;
// //     note: string;
// //   }];
// //   info: {
// //     address: string;
// //     name: string;
// //     phone: number;
// //   };
// // }
// // interfaces/order.interface.ts
// export interface IOrderItem {
//   medicine_id: string;
//   stock_id: string;
//   thumbnail: string;
//   name: string;
//   price: number;
//   quantity: number;
//   totalAmount: number;
//   note: string;
// }

// export interface IOrderReview {
//   orderItemsReview: IOrderItem[];
//   totalAmount: number;
//   shippingPrice: number;
//   finalAmount: number;
//   shippingMethod: string;
//   userInfo: {
//     name: string;
//     phone: string;
//     address: string;
//   };
// }

// export interface ICheckoutPayload {
//   selectItemIds: string[];
//   shippingId: string;
// }
export interface ICheckoutPayload {
  selectItemIds: string[]
  shippingId: string
}

export interface IOrderItem {
  medicine_id: string
  stock_id: string
  thumbnail: string
  name: string
  price: number
  quantity: number
  totalAmount: number
  note: string
}

export interface IOrderReview {
  orderItemsReview: IOrderItem[]
  totalAmount: number
  shippingPrice: number
  finalAmount: number
  shippingMethod: string
  userInfo: {
    name: string
    phone: string
    address: string
  }
}

