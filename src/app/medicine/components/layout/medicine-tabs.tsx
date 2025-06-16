import { createCartAPI } from "@/api/cart/cart.api";
import Button04 from "@/components/ui/button-04";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ICart } from "@/interface/order/cart.interface";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
  thumbnail,
  price,
}) => {
  const mutation = useMutation({
    mutationKey: ["createCard"],
    mutationFn: (data: ICart) => createCartAPI(data),
    onSuccess: () => {
      toast.success("Thêm vào giỏ hàng thành công!");
    },
    onError: (error: unknown) => {
      const err = error as { message: string };
      toast.error("Thêm vào giỏ hàng thất bại: " + err.message);
    },
  });
  const handleBuyNow = () => {
    toast.info("Chức năng mua ngay đang phát triển.");
  };
  const handleAddToCart = () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }
    const cartData: ICart = {
      user_id: userId,
      medicine_item: [
        {
          _id: medicineId,
          thumbnail: thumbnail ?? "",
          name,
          quantity: 1,
          price: price ?? 0,
        },
      ],
      totalItems: 1,
      totalPrice: price ?? 0,
    };
    mutation.mutate(cartData);
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
              <p className="border border-blue-900 rounded-full w-7 h-7 text-center font-semibold">
                {" "}
                -
              </p>
              <p className="rounded-full w-7 h-7 text-center font-medium text-[18px]">
                50
              </p>
              <p className="border border-blue-900 rounded-full w-7 h-7 text-center font-semibold">
                +
              </p>
            </div>
            <Button04
              text="Mua Ngay"
              isLoading={mutation.isPending}
              onClick={handleBuyNow}
            />
            <Button04
              text="Thêm vào giỏ hàng"
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
