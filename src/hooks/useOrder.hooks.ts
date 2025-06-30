import { ICart } from "@/interface/order/cart.interface";
import { checkoutAPI } from "@/api/cart/order.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/router";

export const useCheckout = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: ["checkout"],
    mutationFn: () => checkoutAPI(ICart),
    onSuccess: () => {
      toast.success("Checkout successful");
      router.push("/orders");
    },
    onError: (error: unknown) => {
      const err = error as { message: string };
      toast.error("Checkout failed: " + err.message);
    },
  });
};
