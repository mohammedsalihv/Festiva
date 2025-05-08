import { Images } from "@/assets";
import AdminLayout from "@/reusable-components/admin/AdminLayout";
import { useState, useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";
import { VscListSelection } from "react-icons/vsc";
import { LuUserSearch } from "react-icons/lu";
import { FaSort } from "react-icons/fa";
import { AiTwotoneEdit } from "react-icons/ai";
import Pagination from "@/components/Pagination";
import { MdBlock } from "react-icons/md";
import { getAllUsers } from "@/services/admin/adminServices";
import { setAllUsers } from "@/redux/Slice/admin/userManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/utils/types";
import { AxiosError } from "axios";

const AdminUsers = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const userData = useSelector(
    (state: RootState) => state.userManagement.users
  );

  const handleSelect = (user: User) => {
    if (selectedUser?._id === user._id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        dispatch(setAllUsers(data));
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error("Axios error:", error.response?.data || error.message);
          setError("Failed to load users");
        } else {
          console.error("Unexpected error:", error);
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row h-screen bg-main_white rounded-md font-prompt">
        <div
          className={`transition-all duration-300 ${
            selectedUser ? "md:w-2/3" : "w-full"
          } overflow-hidden p-4`}
        >
          <div className="flex justify-between items-center mb-10 mt-5 px-2">
            <h2 className="text-lg md:text-xl font-semibold">Peoples</h2>
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
                  <th className="px-4 py-2">Firstname</th>
                  <th className="px-4 py-2">Lastname</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {userData
                  .filter((user) => user !== null)
                  .map((user) => (
                    <tr
                      key={user._id}
                      onClick={() => handleSelect(user)}
                      className="cursor-pointer hover:bg-gray-100 transition-all duration-200"
                    >
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={selectedUser?._id === user._id}
                          readOnly
                        />
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex justify-center">
                          <img
                            src={Images.default_profile}
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        {user.firstname || "N/A"}
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        {user.lastname || "N/A"}
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        {user.email || "N/A"}
                      </td>
                      <td className="px-4 py-2 text-[10px] lg:text-sm">
                        {user.role || "N/A"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {selectedUser && (
          <div className="w-full md:w-1/3 p-2 bg-gray-50 mt-7">
            <div className="flex justify-between items-center mb-4 mt-7">
              <h3 className="text-sm lg:text-xl font-semibold">User Details</h3>
              <RiCloseFill
                className="w-6 h-6 cursor-pointer"
                onClick={() => setSelectedUser(null)}
              />
            </div>
            <div className="p-4 space-y-3">
              <img
                src={Images.default_profile}
                alt="Profile"
                className="w-24 h-24 mb-4 rounded-full"
              />
              <p className="text-[12px] lg:text-sm">
                <strong>Name:</strong> {selectedUser.firstname || "N/A"}{" "}
                {selectedUser.lastname || ""}
              </p>
              <p className="text-[12px] text-sm lg:text-base">
                <strong>Email:</strong> {selectedUser.email || "N/A"}
              </p>
              <p className="text-[12px] text-sm lg:text-base">
                <strong>Status:</strong>{" "}
                {selectedUser.isActive ? (
                  <span className="text-green-600 text-[12px] lg:text-sm font-semibold">
                    active
                  </span>
                ) : (
                  <span className="text-red-500 text-[12px] lg:text-sm font-semibold">
                    inactive
                  </span>
                )}
              </p>
              <p className="text-[12px] lg:text-base">
                <strong>Registered time:</strong>{" "}
                {selectedUser.timestamp
                  ? new Date(selectedUser.timestamp).toLocaleString()
                  : "N/A"}
              </p>
              <div className="flex flex-row gap-2">
                <button className="px-3 p-1 border rounded bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-1">
                  Edit
                  <AiTwotoneEdit className="w-4 h-4" />
                </button>
                <button className="px-3 p-1 border rounded bg-red-600 hover:bg-red-700 text-white flex items-center gap-1">
                  Block
                  <MdBlock className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-2">
        <Pagination
          currentPage={page}
          totalPages={10}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
