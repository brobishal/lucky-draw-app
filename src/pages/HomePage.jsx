import { Siderbar } from "../layouts/Siderbar";

const HomePage = () => {
  return (
    <div className="bg-blue-50">
      <div className="grid grid-cols-12 items-center content-center">
        <div className="col-span-10 h-screen bg-white  flex items-center justify-center">
          Data
        </div>
        <div className="col-span-2 h-full">
          <Siderbar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
