"use client";
import Button04 from "@/components/ui/button-04";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAddToCart } from "@/hooks/order/cart.hooks";
import { useState } from "react";
interface MedicineTabsProps {
  medicineId: string;
  name: string;
  packaging: string;
  thumbnail?: string;
  price?: number;
}

const MedicineTabs: React.FC<MedicineTabsProps> = ({
  medicineId,
  name,
  packaging,
}) => {
  const mutation = useAddToCart();
  const [quantity, setQuantity] = useState(1);
  const handleChangeQuantity = (type: "increment" | "decrement") => {
    setQuantity((prev) => {
      if (type === "increment") return prev + 1;
      if (type === "decrement") return prev > 1 ? prev - 1 : 1;
      return prev;
    });
  };
  const handleAddToCart = (
    e?: React.FormEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.preventDefault();

    if (!medicineId) {
      toast.error("Thiếu ID thuốc", { duration: 2000 });
      return;
    }

    mutation.mutate({ medicine_id: medicineId, quantity });
  };
  const handleBuyNow = () => {
    toast.info("Chức năng mua ngay đang phát triển.");
  };
  return (
    <div defaultValue="info" className="w-full">
      {" "}
      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">Thông tin</TabsTrigger>
          <TabsTrigger value="description">Mô tả</TabsTrigger>
        </TabsList>

        {/* Tab: Thông tin */}
        <TabsContent value="info">
          <div className=" flex flex-col space-y-2 p-4 ">
            <h2 className="text-xl font-semibold mb-3">{name}</h2>
            <hr className="border border-gray-300 mb-3" />
            <p className="text-blue-900 font-semibold">Phân loại sản phẩm: </p>
            <p className="border border-blue-900 text-blue-900 w-fit px-5 py-2 text-[14px]">
              {packaging}
            </p>
            <p className="text-blue-900 font-semibold">Số lượng: </p>
            <div className="flex space-x-4 justify-center">
              {/* <p className="border border-blue-900 rounded-full w-7 h-7 text-center font-semibold">
                {" "}
                -
              </p> */}
              <button
                onClick={() => handleChangeQuantity("decrement")}
                className="border border-blue-900 rounded-full w-7 h-7 text-center font-semibold hover:bg-blue-100"
              >
                -
              </button>
              {/* <p className="rounded-full w-7 h-7 text-center font-medium text-[18px]">
                50
              </p> */}
              <p className="w-8 text-center text-lg font-medium">{quantity}</p>
              {/* <p className="border border-blue-900 rounded-full w-7 h-7 text-center font-semibold">
                +
              </p> */}
              <button
                onClick={() => handleChangeQuantity("increment")}
                className="border border-blue-900 rounded-full w-7 h-7 text-center font-semibold hover:bg-blue-100"
              >
                +
              </button>
            </div>
            <Button04
              text="Mua Ngay"
              type="button"
              isLoading={mutation.isPending}
              onClick={handleBuyNow}
            />
            <Button04
              text="Thêm vào giỏ hàng"
              type="button"
              isLoading={mutation.isPending}
              onClick={handleAddToCart}
            />
          </div>
        </TabsContent>

        {/* Tab: Mô tả */}
        <TabsContent value="description">
          <div className="p-4">Mô tả sản phẩm sẽ được hiển thị ở đây.</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicineTabs;
