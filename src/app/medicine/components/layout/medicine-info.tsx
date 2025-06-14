"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createCartAPI } from "@/api/cart/cart.api";
import { toast } from "react-toastify";
import { ICart } from "@/interface/order/cart.interface";
import Image from "next/image";

interface MedicineInfoProps {
  _id?: string;
  name?: string;
  packaging?: string;
  dosageForm?: string;
  manufacturer_id?: string;
  thumbnail?: string;
  sellingPrice: number;
  quantity: number;
}

const MedicineInfo: React.FC<MedicineInfoProps> = ({
  _id,
  name,
  packaging,
  dosageForm,
  manufacturer_id,
  thumbnail,
  sellingPrice,
  quantity,
}) => {
  const router = useRouter();
  const user_id =
    typeof window !== "undefined" ? localStorage.getItem("user_id") || "" : "";

  const mutation = useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: (cartData: ICart) => createCartAPI(cartData),
    onSuccess: (res: any) => {
      if (res?.message === "Add Product On Cart Successful") {
        toast.success("Đã thêm vào giỏ hàng!");
        router.push("/cart");
      } else {
        toast.error("Thêm vào giỏ hàng thất bại!");
      }
    },
    onError: (error) => {
      console.error("Error adding to cart:", error);
      toast.error("Thêm vào giỏ hàng thất bại!");
    },
  });

  const handleBuyNow = () => {
    if (!_id || !sellingPrice) {
      toast.error("Thiếu thông tin sản phẩm!");
      return;
    }

    const cartItem: ICartItem = {
      _id,
      thumbnail: thumbnail || "",
      name: name || "Unknown",
      price: sellingPrice,
      quantity: 1,
    };

    const cartData: ICart = {
      user_id,
      medicine_item: [cartItem],
      totalItems: 1,
      totalPrice:sellingPrice,
    };

    mutation.mutate(cartData);
  };

  return (
    <div className="flex-1 space-y-1">
      <h1 className="text-xl font-bold text-gray-800">
        {name} {packaging}
      </h1>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Image
            key={i}
            src="/star_icon.png"
            alt="rating"
            width={16}
            height={16}
          />
        ))}
        <span className="text-gray-500 text-sm">(chưa có đánh giá)</span>
        <p>||</p>
        <span className="text-gray-500 text-sm">{quantity} </span>
      </div>
      <p className="text-2xl text-red-600 font-bold">{sellingPrice}VND</p>
      <p className="text-gray-500 text-20">
        Giá đã bao gồm thuế. Phí vận chuyển và các chi phí khác (nếu có) sẽ được
        thể hiện khi đặt hàng.
      </p>
      <hr className="mb-3 border-t border-gray-300" />
      <div>
        <p className="mb-1">
          <span className="font-bold text-blue-900">Danh mục:</span> {packaging}
        </p>
        <p className="mb-1">
          <span className="font-bold text-blue-900">Nhóm sản phẩm:</span>{" "}
          {packaging}
        </p>
        <p className="mb-1">
          <span className="font-bold text-blue-900">Quy cách:</span> {packaging}
        </p>
        <p className="mb-1">
          <span className="font-bold text-blue-900">Dạng bào chế:</span>{" "}
          {dosageForm}
        </p>
        <p className="mb-4">
          <span className="font-bold text-blue-900">Hãng sản xuất:</span>{" "}
          {manufacturer_id}
        </p>
        <button
          onClick={handleBuyNow}
          className="bg-white border border-blue-900 text-blue-900 py-3 px-6 rounded-lg hover:bg-blue-900 hover:text-white transition"
        >
          Mua ngay
        </button>
        <ul className="text-sm text-gray-600 list-disc pl-5 mt-3">
          <li>100% sản phẩm chính hãng</li>
          <li>Thanh toán khi nhận hàng</li>
          <li>Đổi trả trong 14 ngày</li>
        </ul>
      </div>
    </div>
  );
};

export default MedicineInfo;
