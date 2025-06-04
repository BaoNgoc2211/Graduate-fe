// context/FakeShopProvider.tsx
"use client"
import { createContext, useContext } from "react";

export const ShopContext = createContext<any>(null);

// Giá trị mock (giả lập)
const mockValue = {
  navigate: (path: string) => alert(`Redirect to: ${path}`),
  currency: " VND",
  delivery_fee: 10.000,
  getCartAmount: () => 200.000,
};

export const FakeShopProvider = ({ children }: { children: React.ReactNode }) => {
  return <ShopContext.Provider value={mockValue}>{children}</ShopContext.Provider>;
};

// Hook để dùng
export const useShopContext = () => useContext(ShopContext);
