interface TitleProps {
  text1: string;
}
const TitleMedicine: React.FC<TitleProps> = ({ text1 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-blue-900 font-semibold text-xl">{text1}</p>
    </div>
  );
};

export default TitleMedicine;
