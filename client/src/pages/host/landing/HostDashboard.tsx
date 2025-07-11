import { IoIosRefresh } from "react-icons/io";

const HostDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 w-full">
      <div className="flex items-center justify-center px-4 py-4 gap-2 text-gray-700">
        Data not found
        <IoIosRefresh />
      </div>
    </div>
  );
};

export default HostDashboard;
