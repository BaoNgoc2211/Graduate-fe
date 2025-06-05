export type OrderStatus = 'Chờ xác nhận' | 'Đã xác nhận' | 'Đang giao' | 'Hoàn tất' | 'Đã hủy';

export interface Order {
  id: string;
  customer: string;
  address: string;
  phone: string;
  product: string;
  price: number;
  status: OrderStatus;
  date: string;
}
