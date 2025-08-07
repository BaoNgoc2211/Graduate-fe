export interface IPayment {
  _id: string;
  orderId: string;
  paymentMethod: 'VNPay' | 'MoMo' | 'COD';
  amount: number;
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  transactionId?: string;
  paymentUrl?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPaymentMethodOption {
  id: string;
  name: string;
  type: 'vnpay' | 'momo' | 'cod';
  description: string;
  icon: string;
  enabled: boolean;
}