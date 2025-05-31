interface TitleProps {
  text1: string;
}
const TitleDisease: React.FC<TitleProps> = ({ text1 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-blue-900 font-bold text-2xl">{text1}</p>
    </div>
  );
};

export default TitleDisease;
