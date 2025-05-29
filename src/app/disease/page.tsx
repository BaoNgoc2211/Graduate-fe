"use client";
import Disease01 from "./components/ui/disease-01";
import Disease02 from "./components/ui/disease-02";
import Disease03 from "./components/ui/disease-03";

const Collection = () => {
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["get-category-disease"],
  //   queryFn: getALLDisCategoryAPI,
  // });

  // if (isLoading) return <div>Đang tải dữ liệu...</div>;
  // if (isError) return <div>Lỗi khi tải danh mục bệnh</div>;
  return (
    <div>
      <div className="flex flex-col mb-5">
        <p className="font-semibold text-2xl text-blue-900 mb-3">
          Bệnh phổ biến biến biến
        </p>
        <Disease01 />
      </div>
      <div className="flex flex-col mb-5">
        <p className="font-semibold text-2xl text-blue-900 mb-3">
          Bệnh theo đối tượng
        </p>
        <Disease02 />
      </div>
      <div className="flex flex-col mb-5">
        <p className="font-semibold text-2xl text-blue-900 mb-3">
          Chuyên trang bệnh học
        </p>
        <Disease03 />
      </div>
      {/* <div className="flex flex-row gap-3 px-1 py-2 justify-center">
        {data?.data?.map((item: IDisCategory, index: number) => (
          <NavbarItem key={index} name={item.name} icon={item.icon} />
        ))}
      </div> */}
      {/* <div>
        <DisCategoryItem />
      </div> */}
    </div>
  );
};
export default Collection;
