"use client";

import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
// import { getALLMedicineAPI } from "../api/medicine.api";
import { IMedicine } from "@/interface/medicine/medicine.interface";
import { getALLMedicineAPI } from "@/api/medicine/medicine.api";

interface ShopContextType {
  products: IMedicine[];
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Record<string, any>;
  setCartItems: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  addToCart: (itemID: string, size?: string) => void;
  getCartCount: () => number;
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
  getCartAmount: () => number;
  navigate: (path: string) => void;
}

export const ShopContext = createContext<ShopContextType | null>(null);

interface ShopContextProviderProps {
  children: React.ReactNode;
}

const ShopContextProvider: React.FC<ShopContextProviderProps> = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState<Record<string, any>>({});
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  // ✅ Dùng useQuery để lấy dữ liệu thuốc
  const { data: products = [], isLoading, isError } = useQuery<IMedicine[]>({
    queryKey: ["get-all-medicine"],
    queryFn: getALLMedicineAPI,
  });

  if (isLoading) {
    return <div>Đang tải danh sách thuốc...</div>;
  }

  if (isError) {
    return <div>Lỗi khi tải danh sách thuốc!</div>;
  }

  const addToCart = async (itemId: string, size?: string) => {
    if (!size) {
      toast.error("Chọn kích thước thuốc");
      return;
    }

    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        if (cartItems[items][size] > 0) {
          totalCount += cartItems[items][size];
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId: string, size: string, quantity: number) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      for (const size in cartItems[items]) {
        if (cartItems[items][size] > 0) {
          totalAmount += (itemInfo?.price || 0) * cartItems[items][size];
        }
      }
    }
    return totalAmount;
  };

  const contextValue: ShopContextType = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
