import Button04 from "@/components/ui/button-04";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface MedicineTabsProps {
  name: string;
  packaging: string;
}

const MedicineTabs: React.FC<MedicineTabsProps> = ({ name, packaging }) => {
  return (
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
          <Button04 text="Mua Ngay" />
          <Button04 text="Thêm vào giỏ hàng" />
        </div>
      </TabsContent>

      {/* Tab: Mô tả */}
      <TabsContent value="description">
        <div className="p-4">
          {/* Bạn có thể thêm mô tả hoặc nội dung khác ở đây */}
          Mô tả sản phẩm sẽ được hiển thị ở đây.
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MedicineTabs;
