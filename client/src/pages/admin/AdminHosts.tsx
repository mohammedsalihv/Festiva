import AdminLayout from "@/reusable-components/admin/AdminLayout";
import { LuUserSearch } from "react-icons/lu";
import { FaSort } from "react-icons/fa";
import { VscListSelection } from "react-icons/vsc";
import { Images } from "@/assets";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import Drawer from "@/components/Drawer";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CgCloseR } from "react-icons/cg";
import { getAllHosts } from "@/services/admin/adminServices";
import { useDispatch, useSelector } from "react-redux";
import { setAllHosts } from "@/redux/Slice/admin/hostManagementSlice";
import { AxiosError } from "axios";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { toast } from "react-toastify";
import { Host } from "@/utils/types";
import { RootState } from "@/redux/store";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdBlock } from "react-icons/md";

const AdminHosts = () => {
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<Host | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const hosts = useSelector((state: RootState) => state.hostManagement.hosts);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getAllHosts();
        dispatch(setAllHosts(data));
        toast.success("list refreshed");
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log("Axios Error", error.response?.data || error.message);
          setError("Failed to load hosts");
          toast.error("hosts list fetching failed");
        } else {
          console.log("something went wrong", error);
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  if (loading)
    return <div className="text-cente font-bold px-4 py-4">Loading...</div>;
  if (error)
    return <div className="text-cente font-bold px-4 py-4">{error}</div>;

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
              <thead className="bg-gray-50 text-center">
                <tr>
                  <th className="px-6 lg:px-3 py-2">
                    <div className="flex justify-center">
                      <VscListSelection />
                    </div>
                  </th>
                  <th className="px-4 py-2">
                    <div className="flex justify-center">Person</div>
                  </th>
                  <th className="px-4 py-2 ">Name</th>
                  <th className="px-4 py-2 ">Email</th>
                  <th className="px-4 py-2">More</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {hosts.map((host, index) => (
                  <tr
                    key={host._id}
                    className="cursor-pointer hover:bg-gray-100 transition-all duration-200"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="flex justify-center gap-2">
                      <img
                        src={host.profile_pic || Images.casual_user}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                    </td>
                    <td className="px-4 py-2 text-[10px] lg:text-sm">
                      <span className="text-[10px] lg:text-sm">
                        {host.name}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-[10px] lg:text-sm">
                      {host.email}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex justify-center">
                        <IoMdArrowForward
                          className="text-black h-5 w-5 lg:h-7 lg:w-7"
                          onClick={() => setSelectedUser(host)}
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
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="Host Details"
      >
        {" "}
        {selectedUser && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:px-5 lg:py-5 px-4 py-4 font-prompt">
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
              <div className="flex flex-col justify-center lg:items-center items-start text-sm">
                <p
                  className={`${
                    selectedUser.isActive ? "text-green-500" : "text-red-500"
                  } font-semibold text-sm`}
                >
                  {selectedUser.isActive ? "Active" : "Not Active"}
                </p>
                <p>Verified</p>
              </div>
              <div className="flex flex-col justify-center lg:items-end items-start text-sm">
                <p>
                  <strong>Register Time and Date:</strong>
                </p>

                <p>timestamp</p>
              </div>
              <div className="flex flex-col justify-center lg:items-end items-start text-sm">
                <p className="flex md:flex-col flex-row gap-1">
                  <button className="border px-2 py-1 rounded text-sm bg-yellow-500 hover:bg-yellow-600 text-white flex gap-1">
                    Edit <AiTwotoneEdit className="w-4 h-4" />
                  </button>
                  <button className="border px-2 py-1 rounded text-sm bg-red-600 hover:bg-red-700 text-white flex gap-1">
                    Block <MdBlock className="w-4 h-4" />
                  </button>
                </p>

                <p></p>
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
                        {selectedUser.location}
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm"></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        Listed Assets
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        {selectedUser.listedAssets}{" "}
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
                        {selectedUser.isSubscriber ? (
                          <IoMdCheckmarkCircleOutline className="w-5 h-5 text-green-500" />
                        ) : (
                          <CgCloseR className="w-5 h-5 text-red-500" />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <CustomToastContainer />
            </div>
          </>
        )}
      </Drawer>
    </AdminLayout>
  );
};

export default AdminHosts;
