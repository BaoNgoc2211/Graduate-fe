import DisCategoryCard from "../ui/disease-01";

const Heading = () => {
  return (
    <div className="flex flex-col">
      <div className="flex ">
        <h2 className="font-bold text-2xl text-blue-800">Bệnh phổ biến</h2>
        <DisCategoryCard />
      </div>
      <div>
        <h2 className="font-bold text-2xl text-blue-800">
          Bệnh theo nhóm tuổi
        </h2>
      </div>
      <div>
        <h2 className="font-bold text-2xl text-blue-800">Bệnh chuyên khoa</h2>
      </div>
    </div>
  );
};
export default Heading;
