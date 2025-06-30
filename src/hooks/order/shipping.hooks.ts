import { getAllShippingAPI, getByIdShippingAPI } from "@/api/cart/shipping.api";
import { IShipping } from "@/interface/order/shipping.interface";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useShippingMethods = () => {
  return useQuery<{ data: IShipping[] }>({
    queryKey: ["shipping"],
    queryFn: getAllShippingAPI,
  });
};
export const useShippingMethodById = () => {
  const params = useParams<{ _id: string }>();
  const shippingId = params._id;
  console.log("Shipping ID:", shippingId);
  const isIdReady = !!shippingId;
  return useQuery({
    queryKey: ["shipping-by-id", shippingId],
    queryFn: () => getByIdShippingAPI(shippingId),
    enabled: isIdReady,
  });
};
