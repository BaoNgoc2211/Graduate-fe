

const DiseaseLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className=" lg:px-20 lg:py-5">
      {/* <Heading /> */}
      {children}
    </div>
  );
};

export default DiseaseLayout;
