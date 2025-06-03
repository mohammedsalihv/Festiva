import AdminLayout from "@/reusable-components/admin/AdminLayout";
import { LuUserSearch } from "react-icons/lu";
import { VscListSelection } from "react-icons/vsc";
import { Images } from "@/assets";
import Pagination from "@/components/Pagination";
import { useEffect, useState} from "react";
import { IoMdArrowForward } from "react-icons/io";
import Drawer from "@/components/Drawer";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CgCloseR } from "react-icons/cg";
import { AllServices } from "@/api/admin/serviceManagement.services";
import { useDispatch, useSelector } from "react-redux";
import { setAllServices } from "@/redux/Slice/admin/serviceManagementSlice";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  HostSortOptions,
} from "@/utils/Types/admin/hostManagementTypes";
import { Host } from "@/utils/Types/host/authTypes";
import { RootState } from "@/redux/store";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdBlock } from "react-icons/md";
import Loader from "@/components/Loader";
import Dropdown from "@/components/Dropdown";
import { FaTrashRestoreAlt } from "react-icons/fa";

const AdminServices = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string>("");
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const hosts = useSelector((state: RootState) => state.hostManagement.hosts);
 
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await AllServices();
        dispatch(setAllServices(data));
        toast.success("List refreshed");
      } catch (error: unknown) {
        const errorMessage =
          error instanceof AxiosError
            ? error.response?.data?.message || error.message
            : "An unexpected error occurred";
        console.error("Error fetching hosts:", error);
        setError(errorMessage);
        toast.error("services fetching failed");
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  const filteredHosts = hosts
    .filter((host) => {
      const query = searchQuery.toLowerCase();
      return (
        host.name.toLowerCase().includes(query) ||
        host.email.toLowerCase().includes(query) ||
        host.role?.toLowerCase().includes(query)
      );
    })
    .filter((host) => {
      switch (sort) {
        case "Blocked":
          return host.isBlocked;
        case "Unblocked":
          return !host.isBlocked;
        case "Active":
          return host.isActive;
        case "Admin":
          return host.role?.toLowerCase() === "host";
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name); // Z-A
        case "createdAt":
          return (
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
        default:
          return 0;
      }
    });

  if (loading)
    return (
      <div className="text-center font-bold px-20 py-20">
        <Loader size={64} color="#000" />
      </div>
    );
  if (error)
    return <div className="text-center font-bold px-4 py-4">{error}</div>;
  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row h-screen bg-main_white rounded-md font-prompt">
        <div className="transition-all duration-300 overflow-hidden p-4 w-full">
          <div className="flex justify-between items-center mb-10 mt-5 px-2">
            <h2 className="text-lg md:text-xl font-semibold">Services</h2>
            <div className="flex items-center gap-2">
              <div className="relative w-40მოჀ System: .jsx">
                <input
                  type="text"
                  className="pl-8 pr-2 py-2 border rounded w-full text-sm md:text-base"
                  placeholder="Search by name, email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <LuUserSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm md:text-base" />
              </div>
              {sort && (
                <button
                  onClick={() => setSort("")}
                  className="text-[9px] md:text-sm bg-black text-white hover:bg-white hover:text-black p-2 border md:px-3 md:py-2 rounded"
                >
                  Clear
                </button>
              )}
              <div className="flex items-center gap-2">
                <Dropdown
                  options={HostSortOptions}
                  onSelect={(value: string) => setSort(value)}
                />
              </div>
            </div>
          </div>
          <div className="relative w-full overflow-x-auto">
            <table className="min-w-full table-auto divide-y divide-gray-200">
              <thead className="bg-gray-50 text-center">
                <tr>
                  <th className="px-6 lg:px-3 py-2">
                    <div className="flex justify-center">
                      <VscListSelection />
                    </div>
                  </th>
                  <th className="px-4 py-4">
                    <div className="flex justify-center">Person</div>
                  </th>
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Email</th>
                  <th className="px-4 py-4">More</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {filteredHosts.map((host, index) => (
                  <tr
                    key={host._id}
                    className="cursor-pointer hover:bg-gray-100 transition-all duration-200"
                  >
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="flex justify-center gap-2 py-4">
                      <img
                        src={
                          host.profilePic
                            ? `${import.meta.env.VITE_PROFILE_URL}${
                                host.profilePic
                              }`
                            : Images.casual_user
                        }
                        alt="Profile"
                        className="w-8 h-8 rounded-full border"
                      />
                    </td>
                    <td className="px-4 py-4 text-[10px] lg:text-sm">
                      <span className="text-[10px] lg:text-sm">
                        {host.name}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-[10px] lg:text-sm">
                      {host.email}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center">
                        <IoMdArrowForward
                          className="text-black h-5 w-5 lg:h-7 lg:w-7"
                          onClick={() => setSelectedHost(host)}
                        />
                      </div>
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
        isOpen={!!selectedHost}
        onClose={() => setSelectedHost(null)}
        title="Host Details"
      >
        {selectedHost && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:px-5 lg:py-5 px-4 py-4 font-prompt ">
              <div className="flex lg:items-start items-center">
                <img
                  src={
                    selectedHost.profilePic
                      ? `${import.meta.env.VITE_PROFILE_URL}${
                          selectedHost.profilePic
                        }`
                      : Images.casual_user
                  }
                  alt=""
                  className="h-20 w-20 mr-4 border rounded-full "
                />
                <div className="text-sm lg:text-[15px]">
                  <p>
                    <strong>Name:</strong> {selectedHost.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedHost.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedHost.phone || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center lg:items-center items-center text-sm">
                <p
                  className={`${
                    selectedHost.isActive ? "text-green-500" : "text-red-600"
                  } font-semibold text-sm`}
                >
                  {selectedHost.isActive ? "Active" : "Not Active"}
                </p>
                <p
                  className={`${
                    selectedHost.isVerified
                      ? "text-main_color"
                      : "text-yellow-500"
                  } font-semibold text-sm`}
                >
                  {selectedHost.isVerified ? "verfied" : "Not verfied"}
                </p>
                <p
                  className={`${
                    selectedHost.isBlocked ? "text-red-600" : "text-black"
                  } font-semibold text-sm`}
                >
                  {selectedHost.isBlocked ? "Blocked" : "Unblock"}
                </p>
              </div>
              <div className="flex flex-col justify-center lg:items-end items-center text-sm">
                <p>
                  <strong>Register Time and Date:</strong>
                </p>
                <p>
                  {selectedHost.timestamp
                    ? new Date(selectedHost.timestamp).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div className="flex flex-col justify-center lg:items-end items-center text-sm">
                <div className="flex md:flex-col flex-row gap-1">
                  <button
                    className="border px-3 p-2 rounded text-sm bg-blue-500 hover:bg-blue-600 text-white flex gap-1 items-center"
                    
                  >
                    Edit <AiTwotoneEdit className="w-4 h-4" />
                  </button>
                  <button
                    className="border px-3 p-2 rounded text-sm bg-yellow-500 hover:bg-yellow-600 text-white flex gap-1 items-center"

                  >
                    {selectedHost.isBlocked ? "Unblock" : "Block"}{" "}
                    <MdBlock className="w-4 h-4" />
                  </button>
                  <button
                    className="border p-2 rounded text-sm bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
                  >
                    <FaTrashRestoreAlt className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:px-14">
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
                        {selectedHost?.location || "N/A"}
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm"></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        Listed Assets
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        {selectedHost?.listedAssets ?? 0}
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        <a href="">
                          <IoMdArrowDropright className="w-7 h-6 cursor-pointer text-blue-800 underline" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        Total Requests
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        {selectedHost?.totalRequests ?? 0}
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
                        {selectedHost?.acceptedRequests ?? 0}
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
                        {selectedHost?.rejectedRequests ?? 0}
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
                        {selectedHost?.isSubscriber ? (
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

export default AdminServices;
