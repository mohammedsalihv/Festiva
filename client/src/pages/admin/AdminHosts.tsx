import AdminLayout from "@/reusable-components/admin/AdminLayout";
import { LuUserSearch } from "react-icons/lu";
import { FaSort } from "react-icons/fa";
import { VscListSelection } from "react-icons/vsc";
import { Images } from "@/assets";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import Drawer from "@/components/Drawer";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CgCloseR } from "react-icons/cg";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  active: boolean;
  verified: string;
  registrationDateTime: string;
  listedAssets: number;
  totalRequests: number;
  acceptedRequests: number;
  rejectedRequests: number;
  subscribed: boolean;
}

const AdminHosts = () => {
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "123456798",
      location: "NY, USA",
      active: true,
      verified: "verified",
      registrationDateTime: "2025-05-03T09:00:00Z",
      listedAssets: 3,
      totalRequests: 10,
      acceptedRequests: 7,
      rejectedRequests: 3,
      subscribed: true,
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      phone: "123456798",
      location: "LA, USA",
      active: true,
      verified: "not verified",
      registrationDateTime: "2025-05-01T11:30:00Z",
      listedAssets: 3,
      totalRequests: 10,
      acceptedRequests: 7,
      rejectedRequests: 3,
      subscribed: true,
    },
    {
      id: 3,
      name: "Catherine Lee",
      email: "catherine.lee@example.com",
      phone: "123456798",
      location: "TX, USA",
      active: true,
      verified: "verified",
      registrationDateTime: "2025-04-28T15:45:00Z",
      listedAssets: 3,
      totalRequests: 10,
      acceptedRequests: 7,
      rejectedRequests: 3,
      subscribed: true,
    },
    {
      id: 4,
      name: "David Wright",
      email: "david.wright@example.com",
      phone: "123456798",
      location: "FL, USA",
      active: false,
      verified: "not verified",
      registrationDateTime: "2025-05-02T08:10:00Z",
      listedAssets: 3,
      totalRequests: 10,
      acceptedRequests: 7,
      rejectedRequests: 3,
      subscribed: false,
    },
    {
      id: 5,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "123456798",
      location: "IL, USA",
      active: true,
      verified: "verified",
      registrationDateTime: "2025-05-03T12:00:00Z",
      listedAssets: 3,
      totalRequests: 10,
      acceptedRequests: 7,
      rejectedRequests: 3,
      subscribed: true,
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row h-screen bg-main_white rounded-md font-prompt">
        <div className="transition-all duration-300 overflow-hidden p-4 w-full">
          <div className="flex justify-between items-center mb-10 mt-5 px-2">
            <h2 className="text-lg md:text-xl font-semibold">Hosts</h2>
            <div className="flex items-center gap-2">
              <div className="relative w-40 sm:w-52 md:w-64">
                <input
                  type="text"
                  className="pl-8 pr-2 py-2 border rounded w-full text-sm md:text-base"
                  placeholder="Search by name, email"
                />
                <LuUserSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm md:text-base" />
              </div>
              <FaSort className="text-base md:text-xl cursor-pointer" />
            </div>
          </div>
          <div className="relative w-full overflow-x-auto">
            <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-2 text-left">
                    <VscListSelection />
                  </th>
                  <th className="px-4 py-2 text-left text-sm">Person</th>
                  <th className="px-4 py-2 text-left text-sm">Email</th>
                  <th className="px-4 py-2 text-left text-sm">Block</th>
                  <th className="px-4 py-2 text-left text-sm">More</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="cursor-pointer hover:bg-gray-100 transition-all duration-200"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <img
                        src={Images.default_profile}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-[10px] lg:text-sm">
                        {user.name}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-[10px] lg:text-sm">
                      {user.email}
                    </td>
                    <td className="px-4 py-2">
                      <button className="border px-2 py-1 rounded text-sm hover:bg-black hover:text-white">
                        Block
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <IoMdArrowForward
                        className="text-black h-5 w-5 lg:h-7 lg:w-7"
                        onClick={() => setSelectedUser(user)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="p-1">
        <Pagination
          currentPage={page}
          totalPages={10}
          onPageChange={(p) => setPage(p)}
        />
      </div>
      <Drawer
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="Host Details"
      >
        {" "}
        {selectedUser && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:px-10 lg:py-10 px-4 py-4 font-prompt">
              {/* Left - Image and Info */}
              <div className="flex lg:items-start items-center">
                <img
                  src={Images.casual_user}
                  alt=""
                  className="h-20 w-20 mr-4"
                />
                <div className="text-sm lg:text-[15px]">
                  <p>
                    <strong>Name:</strong> {selectedUser.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedUser.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedUser.phone}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center text-sm">
                <p
                  className={`${
                    selectedUser.active ? "text-green-500" : "text-red-500"
                  } font-semibold text-sm`}
                >
                  {selectedUser.active ? "Active" : "Not Active"}
                </p>
                <p>Verified</p>
              </div>
              <div className="flex flex-col justify-center lg:items-end items-center text-sm">
                <p>
                  <strong>Register Time and Date:</strong>
                </p>
                <p>{selectedUser.registrationDateTime.toLocaleString()}</p>
              </div>
            </div>

            <div className="lg:px-20">
              <div className="w-full overflow-x-auto font-prompt">
                <table className="w-full table-auto border-collapse text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-sm font-medium text-gray-600">
                        Activity
                      </th>
                      <th className="px-4 py-2 text-sm font-medium text-gray-600">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        Location
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        {selectedUser.location}
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        Listed Assets
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                          {selectedUser.listedAssets}{" "}
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                      <IoMdArrowDropright className="w-7 h-6 cursor-pointer text-blue-800" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        Total Requests
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                      {selectedUser.totalRequests}
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                      <IoMdArrowDropright className="w-7 h-6 cursor-pointer text-blue-800" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        Accepted Requests
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                      {selectedUser.acceptedRequests}
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                      <IoMdArrowDropright className="w-7 h-6 cursor-pointer text-blue-800" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        Rejected Requests
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                      {selectedUser.rejectedRequests}
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                      <IoMdArrowDropright className="w-7 h-6 cursor-pointer text-blue-800" />
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        Subscribed
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        {selectedUser.subscribed ? (
                          <IoMdCheckmarkCircleOutline className="w-5 h-5 text-green-500" />
                        ) : (
                          <CgCloseR className="w-5 h-5 text-red-500" />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </Drawer>
    </AdminLayout>
  );
};

export default AdminHosts;
