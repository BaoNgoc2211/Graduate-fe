// "use client";
// import Image from "next/image";
// import { IMedicine } from "@/interface/medicine/medicine.interface";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import MedicineImage from "./medicine-image";
// import { data } from "react-router-dom";
// import MedicineInfo from "./medicine-info";
// const MedicineDetail: React.FC<Partial<IMedicine>> = ({
//   _id,
//   name,
//   thumbnail,
//   image,
//   packaging,
//   dosageForm,
//   stock_id,
//   manufacturer_id,
// }) => {
//   return (
//     // px-15 py-5 max-w-full mx-auto
//     <div className="container mx-auto px-4 py-5">
//       <div className="flex flex-col lg:flex-row gap-10">
//         {/* Hình ảnh thuốc */}
//         {/* flex-2 */}
//         <div className="lg:basis-2/5 ">
//           <MedicineImage thumbnail={thumbnail} image={image} />
//         </div>
//         {/* flex-3 */}
//         <div className="lg:basis-2/5 space-y-6">
//           <MedicineInfo
//             _id={_id}
//             stock_id={(stock_id?.quantity, stock_id?.sellingPrice)}
//             name={name}
//             packaging={packaging}
//             dosageForm={dosageForm}
//             manufacturer_id={manufacturer_id}
//             thumbnail={thumbnail}
//           />
//         </div>
//         {/* flex-1 */}
//         <div className=" lg:basis-1/5">
//           <div className="border rounded-lg shadow-sm p-4 bg-white">
//             <Tabs defaultValue="account" className="w-[400px]">
//               <TabsList>
//                 <TabsTrigger value="account">Account</TabsTrigger>
//                 <TabsTrigger value="password">Password</TabsTrigger>
//               </TabsList>
//               <TabsContent value="account">
//                 Make changes to your account here.
//               </TabsContent>
//               <TabsContent value="password">
//                 Change your password here.
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default MedicineDetail;
"use client";
// import Image from "next/image";
import { IMedicine } from "@/interface/medicine/medicine.interface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MedicineImage from "./medicine-image";
import MedicineInfo from "./medicine-info";
import { data } from "react-router-dom";
import MedicineTabs from "./medicine-tabs";

const MedicineDetail: React.FC<Partial<IMedicine>> = ({
  _id,
  name,
  thumbnail,
  image,
  packaging,
  dosageForm,
  stock_id,
  manufacturer_id,
}) => {
  return (
    <div className="container mx-auto py-5">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Hình ảnh thuốc */}
        <div className="lg:basis-1/3">
          <MedicineImage thumbnail={thumbnail} image={image} />
        </div>

        {/* Thông tin + Tab */}
        <div className="lg:basis-2/3 flex flex-col lg:flex-row gap-6">
          {/* Thông tin thuốc */}
          <div className="lg:basis-2/3 space-y-4">
            <MedicineInfo
              _id={_id}
              name={name}
              packaging={packaging}
              dosageForm={dosageForm}
              manufacturer_id={manufacturer_id}
              thumbnail={thumbnail}
              sellingPrice={stock_id?.sellingPrice ?? 0}
              quantity={stock_id?.quantity ?? 0}
            />
          </div>

          {/* Tab Mua ngay */}
          <div className="lg:basis-1/3">
            <div className="border rounded-lg shadow-sm p-4 bg-white">
              {/* <Tabs defaultValue="account" className="w-full">
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  Make changes to your account here.
                </TabsContent>
                <TabsContent value="password">
                  Change your password here.
                </TabsContent>
              </Tabs> */}
              <MedicineTabs name={name} packaging={packaging} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;
