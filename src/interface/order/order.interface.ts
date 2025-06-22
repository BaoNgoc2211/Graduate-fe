export interface IOrder {
  _id: string;
  status: string;
  totalAmount: number;
  shippingFee: number;
  shippingVoucher: number;
  totalVoucher: number;
  orderDate: Date;
  order_id: [{
    stock_id: {
      medicine_id: {
        thumbnail: string;
        packaging: string;
      };
    };
    name: string;
    price: string;
    quantity: number;
    totalAmount: number;
    note: string;
  }];
  info: {
    address: string;
    name: string;
    phone: number;
  };
}
