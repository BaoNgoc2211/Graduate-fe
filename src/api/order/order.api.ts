// import { Order } from '@/types/order';

import { Order } from "@/styles/order";

export async function getAllOrders(): Promise<Order[]> {
  // Dữ liệu ảo để test giao diện
  return [
    {
      id: "DH001",
      customer: "Nguyễn Văn A",
      address: "123 Lê Lợi, TP.HCM",
      phone: "0901234567",
      product: "Áo thun trắng",
      price: 199000,
      status: "Chờ xác nhận",
      date: "2025-06-01",
    },
    {
      id: "DH002",
      customer: "Trần Thị B",
      address: "456 CMT8, TP.HCM",
      phone: "0912345678",
      product: "Quần jean xanh",
      price: 299000,
      status: "Đang giao",
      date: "2025-06-02",
    },
    {
      id: "DH003",
      customer: "Lê Văn C",
      address: "789 Nguyễn Huệ, TP.HCM",
      phone: "0923456789",
      product: "Giày sneaker",
      price: 499000,
      status: "Hoàn tất",
      date: "2025-06-03",
    },
    {
      id: "DH004",
      customer: "Phạm Thị D",
      address: "321 Lý Thường Kiệt, TP.HCM",
      phone: "0934567890",
      product: "Túi xách nữ",
      price: 350000,
      status: "Đã hủy",
      date: "2025-06-04",
    },
  ];
}
