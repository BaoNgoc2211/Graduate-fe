// import { TabsList } from "@/components/ui/tabs"

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// <Tabs defaultValue="account" className="w-[400px]">
//   <TabsList>
//     <TabsTrigger value="account">Account</TabsTrigger>
//     <TabsTrigger value="password">Password</TabsTrigger>
//   </TabsList>
//   <TabsContent value="account">Make changes to your account here.</TabsContent>
//   <TabsContent value="password">Change your password here.</TabsContent>
// </Tabs>;
import Button from "@/components/home/button";
import Button04 from "@/components/ui/button-04";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FC } from "react";
// import { IMedicine } from "@/types/IMedicine"; // Đường dẫn import IMedicine tuỳ chỉnh

interface MedicineTabsProps {
  // medicine: IMedicine;
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
          <p className="text-gray-600">Phân loại sản phẩm: </p>
          <p className="border border-blue-900 text-blue-900 w-fit p-1 rounded-xl text-[14px]">
            {packaging}
          </p>
          <p className="text-gray-600">Số lượng: </p>
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
