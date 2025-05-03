export const formatCurrency = (currency: number) => {
  return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
  }).format(currency);
}