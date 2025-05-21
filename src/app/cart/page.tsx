import Title from "@/components/ui/title";
import Image from "next/image";
import { assets } from "../../../public/assets";

const Cart = () => {
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"Giỏ Hàng"} text2={"Của Bạn"} />
      </div>
      <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
        <div className="flex items-start gap-6">
          <Image src={assets.cart_icon} alt="" width={20} height={20} />
          <div>
            <p className="text-xs sm:text-lg font-medium">name</p>
            <div className="flex items-center gap-5 mt-2">
              <p></p>
              <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
