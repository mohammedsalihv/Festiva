import { IoIosRefresh } from "react-icons/io";

export default function AdminDashboard() {
  return (
    <div className="p-4 md:p-8 bg-white min-h-screen rounded-md font-prompt">
      <div className="flex items-center justify-center px-4 py-4 gap-2 text-gray-700">
        Data not found
        <IoIosRefresh />
      </div>
    </div>
  );
}
