// // app/medicine/[id]/MedicineDetailClient.tsx
// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { getMedicineAPI } from "@/api/medicine/medicine.api";
// import MedicineDetail from "../components/layout/medicine-detail";
// import NavbarInfo from "../components/layout/navbar-info";

// type Props = {
//   id: string;
// };

// const MedicineDetailClient = ({ id }: Props) => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["medicine-detail", id],
//     queryFn: () => getMedicineAPI(id),
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error fetching data</p>;

//   return (
//     <>
//       <MedicineDetail
//         name={data?.data.name}
//         thumbnail={data?.data.thumbnail}
//         image={data?.data.image}
//         packaging={data?.data.packaging}
//         dosage={data?.data.dosageForm}
//         stock_id={data?.data.stock_id}
//       />
//       <NavbarInfo
//         note={data?.data.note}
//         use={data?.data.use}
//         dosage={data?.data.dosage}
//         indication={data?.data.indication}
//         adverse={data?.data.adverse}
//         precaution={data?.data.precaution}
//         contraindication={data?.data.contraindication}
//         ability={data?.data.ability}
//         pregnancy={data?.data.pregnancy}
//         storage={data?.data.storage}
//         drugInteractions={data?.data.drugInteractions}
//       />
//       <div className="mt-20">
//         <div className="flex">
//           <b className="border px-5 py-3 text-sm">Description</b>
//           <p className="border px-5 py-3 text-sm">Reviews (122)</p>
//         </div>
//         <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
//           <p>
//             An e-commerce website is an online platform that facilitates the
//             buying and selling of products or services over the internet. ...
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MedicineDetailClient;
