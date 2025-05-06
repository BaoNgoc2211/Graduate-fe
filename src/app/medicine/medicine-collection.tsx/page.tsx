import MedicineItem from "@/components/medicine/medicine-item";

const MedicinePage = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
        {/* Medicine Sort */}
        <div>
          <select className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to low</option>
          </select>
        </div>
        {/* Medicine Selection */}
        <div>
          <MedicineItem />
        </div>
      </div>
    </>
  );
};
export default MedicinePage;
