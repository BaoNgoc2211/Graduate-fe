
import { useQuery } from "@tanstack/react-query";
import { getAllShippingAPI, getByIdShippingAPI } from "@/api/shipping.api";

export const useShippingMethods = () => {
  return useQuery({
    queryKey: ["shipping-methods"],
    queryFn: getAllShippingAPI,
    staleTime: 5 * 60 * 1000, 
    // cacheTime: 10 * 60 * 1000, 
    
    select: (data) => {
      // Sắp xếp theo thứ tự ưu tiên: active trước, sau đó theo giá
      const methods = data?.data || [];
      const sortedMethods = [...methods].sort((a, b) => {
        // Active methods lên đầu
        if (a.isActive && !b.isActive) return -1;
        if (!a.isActive && b.isActive) return 1;
        // Sắp xếp theo giá tăng dần
        return a.price - b.price;
      });

      return {
        ...data,
        data: sortedMethods,
      };
    },
  });
};
export const useShippingById = (id: string) => {
  return useQuery({
    queryKey: ["shipping", id],
    queryFn: () => getByIdShippingAPI(id),
    enabled: !!id,
  });
};
