// src/mock/mockOrders.ts
import { IOrder } from "@/interface/order/order.interface";

export const mockOrders: IOrder[] = [
  {
    _id: "ORD123",
    status: "Chờ xác nhận",
    totalAmount: 500000,
    shippingFee: 20000,
    shippingVoucher: 10000,
    totalVoucher: 5000,
    orderDate: new Date(),
    order_id: {
      stock_id: {
        medicine_id: {
          thumbnail: "https://via.placeholder.com/100",
          packaging: "Hộp 10 viên",
        },
      },
      name: "Paracetamol",
      price: "100000",
      quantity: 5,
      totalAmount: 500000,
      note: "Uống sau khi ăn",
    },
    info: {
      address: "123 Đường ABC, Q.1, TP.HCM",
      name: "Nguyễn Văn A",
      phone: 987654321,
    },
  },
  {
    _id: "ORD124",
    status: "Đã nhận đơn",
    totalAmount: 350000,
    shippingFee: 15000,
    shippingVoucher: 0,
    totalVoucher: 0,
    orderDate: new Date(),
    order_id: {
      stock_id: {
        medicine_id: {
          thumbnail: "https://via.placeholder.com/100",
          packaging: "Chai 60ml",
        },
      },
      name: "Sirô ho",
      price: "175000",
      quantity: 2,
      totalAmount: 350000,
      note: "",
    },
    info: {
      address: "456 Đường DEF, Q.3, TP.HCM",
      name: "Trần Thị B",
      phone: 912345678,
    },
  },
];
