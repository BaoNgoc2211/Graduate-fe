"use client";
import TitleDisease from "./components/layout/title";
import Disease01 from "./components/ui/disease-01";
import Disease02 from "./components/ui/disease-02";
import Disease03 from "./components/ui/disease-03";

const DiseasePage = () => {
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["get-category-disease"],
  //   queryFn: getALLDisCategoryAPI,
  // });

  // if (isLoading) return <div>Đang tải dữ liệu...</div>;
  // if (isError) return <div>Lỗi khi tải danh mục bệnh</div>;
  return (
    <div>
      <div className="flex flex-col mb-5">
        {/* phổ biến biến biến */}
        <TitleDisease text1="Bệnh theo khoa"/>
        <Disease01 />
      </div>
      <div className="flex flex-col mb-5">
      <TitleDisease text1="Bệnh theo đối tượng"/>
        <Disease02 />
      </div>
      <div className="flex flex-col mb-5">
      <TitleDisease text1="Chuyên trang bệnh học"/>
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
export default DiseasePage;
