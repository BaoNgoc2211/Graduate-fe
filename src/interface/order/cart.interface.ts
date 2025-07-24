//#region 
// export interface ICart {
//   _id?: string
//   user_id: string
//   medicine_item: ICartItem[]
//   quantity?: number
//   totalPrice?: number
// }

// export interface ICartItem {
//   medicine_id: {
//     _id: string
//     name: string
//     code: string
//     thumbnail: string
//     stock_id: {
//       _id: string
//       sellingPrice: number
//     }
//   }
//   quantity: number
// }

// // Interface cho checkout
// export interface ICheckoutItem {
//   medicine_id: string
//   name: string
//   price: number
//   thumbnail: string
//   packaging?: string
//   quantity: number
//   totalPrice: number
// }

// export interface ICheckoutData {
//   items: ICheckoutItem[]
//   totalAmount: number
//   selectedCount: number
// }
//#endregion
export interface ICart {
  _id?: string
  user_id: string
  medicine_item: ICartItem[]
  quantity?: number
  totalPrice?: number
}

export interface ICartItem {
  medicine_id: {
    _id: string
    name: string
    code: string
    thumbnail: string
    stock_id: {
      _id: string
      sellingPrice: number
    }
  }
  quantity: number
}

// Interface cho checkout
export interface ICheckoutItem {
  medicine_id: string
  name: string
  price: number
  thumbnail: string
  packaging?: string
  quantity: number
  totalPrice: number
}

export interface ICheckoutData {
  items: ICheckoutItem[]
  totalAmount: number
  selectedCount: number
}

