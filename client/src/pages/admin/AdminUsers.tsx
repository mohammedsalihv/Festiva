import { Images } from "@/assets";
import AdminLayout from "@/reusable-components/admin/AdminLayout";
import { useState, useEffect, FormEvent } from "react";
import { RiCloseFill } from "react-icons/ri";
import { VscListSelection } from "react-icons/vsc";
import { LuUserSearch } from "react-icons/lu";
import { AiTwotoneEdit } from "react-icons/ai";
import Pagination from "@/components/Pagination";
import { MdBlock } from "react-icons/md";
import {
  editUserDetails,
  getAllUsers,
  changeProfile,
  blockUnblockUser,
  deleteUser
} from "@/services/admin/userManagement.services";
import {
  setAllUsers,
  updateUser,
} from "@/redux/Slice/admin/userManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User, EditUserPayload, UserSortOptions } from "@/utils/types";
import { AxiosError } from "axios";
import { CgUnblock } from "react-icons/cg";
import logger from "@/utils/logger";
import ConfirmDialog from "@/reusable-components/user/Landing/ConfirmDialog";
import { toast } from "react-toastify";
import Drawer from "@/components/Drawer";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router-dom";
import Dropdown from "@/components/Dropdown";
import { FaTrashRestoreAlt } from "react-icons/fa";

const AdminUsers = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sort, setSort] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmAction, setConfirmAction] = useState(false);
  const [editForm, setEditForm] = useState<typeof selectedUser | null>(null);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(
    (state: RootState) => state.userManagement.users
  );

  const [form, setForm] = useState({
    firstname: selectedUser?.firstname || "",
    lastname: selectedUser?.lastname || "",
    phone: selectedUser?.phone || "",
    role: selectedUser?.role || "",
    profilePic: selectedUser?.profilePic || "",
    isActive: selectedUser?.isActive || false,
    isBlocked: selectedUser?.isBlocked || false,
  });

  useEffect(() => {
    console.log(selectedUser);
    if (selectedUser) {
      setForm({
        firstname: selectedUser.firstname || "",
        lastname: selectedUser.lastname || "",
        phone: selectedUser.phone || "",
        role: selectedUser.role || "",
        profilePic: selectedUser?.profilePic || "",
        isActive: selectedUser.isActive || false,
        isBlocked: selectedUser.isBlocked || false,
      });
    }
  }, [selectedUser]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "isBlocked") {
      setForm((prev) => ({
        ...prev,
        isBlocked: value === "block",
      }));
    } else if (name === "isActive") {
      setForm((prev) => ({
        ...prev,
        isActive: value === "active",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

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

  const handleBlockOrUnblock = async (userId: string, isBlocked: boolean) => {
    try {
      const response = await blockUnblockUser(userId, isBlocked);
      const updatedUsers = await getAllUsers();
      dispatch(setAllUsers(updatedUsers));
      setSelectedUser(updatedUsers.find((u) => u._id === userId) || null);
      toast.success(response.message);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
        logger.error(
          { userId, error: errorMessage },
          "Blocking/Unblocking failed"
        );
        throw new Error(`Blocking/Unblocking failed: ${errorMessage}`);
      } else {
        const errorMessage = (error as Error).message || "Something went wrong";
        toast.error(errorMessage);
        logger.error(
          { userId, error: errorMessage },
          "Blocking/Unblocking failed"
        );
        throw new Error(`Blocking/Unblocking failed: ${errorMessage}`);
      }
    }
  };

  const handleEditForm = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedUser?._id) {
      toast.error("No user selected");
      return;
    }
    setSubmitting(true);
    setTimeout(async () => {
      try {
        const payload: EditUserPayload = {
          firstname: form.firstname,
          lastname: form.lastname,
          phone: form.phone,
          role: form.role,
          profilePic: form.profilePic,
          isActive: form.isActive,
          isBlocked: form.isBlocked,
        };

        const res = await editUserDetails(selectedUser._id, payload);
        toast.success(res.message);

        const updatedUsers = await getAllUsers().catch((err) => {
          console.error("Failed to fetch users:", err);
          return [];
        });
        dispatch(setAllUsers(updatedUsers));
        setSelectedUser(
          updatedUsers.find((u) => u._id === selectedUser._id) || null
        );
        setEditForm(null);
        navigate("/admin/users");
      } catch (err: unknown) {
        toast.error((err as Error).message || "Failed to update user");
      } finally {
        setSubmitting(false);
      }
    }, 2000);
  };

  const handleSaveImage = async () => {
    if (selectedImage && selectedUser) {
      const formData = new FormData();
      formData.append("file", selectedImage);

      setIsLoading(true);
      try {
        const response = await changeProfile(selectedUser._id, formData);
        if (response?.profilePhotoUrl) {
          const updatedUser = {
            ...selectedUser,
            profilePic: response.profilePhotoUrl,
          };

          dispatch(updateUser(updatedUser));

          setSelectedUser(updatedUser);

          setForm((prev) => ({
            ...prev,
            profilePic: response.profilePhotoUrl,
          }));

          toast.success("Profile image updated successfully");
          setPreviewImage(null);
          setSelectedImage(null);
          setEditForm(null);
        } else {
          toast.error("Failed to update profile photo");
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.message || "Failed to update profile");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match("image.*")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

    const handleDelete = async (hostId: string) => {
      try {
        await deleteUser(hostId);
        const updatedUser = await getAllUsers();
        dispatch(setAllUsers(updatedUser));
        setSelectedUser(null);
        toast.success("User account deleted");
        navigate("/admin/users");
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error("User account delete failed");
          logger.error({ hostId, error: error }, "User account delete failed");
        }
        console.log(error)
      }
    };
  

  const filteredUsers = userData
    .filter((user) => {
      const query = searchQuery.toLowerCase();
      return (
        user.firstname.toLowerCase().includes(query) ||
        user.lastname.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
    })
    .filter((user) => {
      switch (sort) {
        case "Blocked":
          return user.isBlocked;
        case "Unblocked":
          return !user.isBlocked;
        case "Active":
          return user.isActive;
        case "Admin":
          return user.role.toLowerCase() === "admin";
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sort) {
        case "name":
          return a.firstname.localeCompare(b.firstname); // A-Z
        case "name-desc":
          return b.firstname.localeCompare(a.firstname); // Z-A
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
    return (
      <div className="flex items-center justify-center flex-col font-bold px-20 py-40 mt-20">
        <Loader size={64} color="#000" />
      </div>
    );

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row h-screen bg-main_white rounded-md font-prompt">
        <div
          className={`transition-all duration-300 ${
            selectedUser ? "md:w-2/3" : "w-full"
          } overflow-hidden p-4`}
        >
          <div className="flex justify-between items-center mb-10 mt-5 px-2">
            <h2 className="text-sm md:text-xl font-semibold">Peoples</h2>
            <div className="flex items-center gap-2 relative">
              <div className="relative w-40 sm:w-52 md:w-64">
                <input
                  type="text"
                  className="pl-8 pr-2 py-3 border rounded w-full text-sm md:text-base"
                  placeholder="Search by name, email, role"
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
                  options={UserSortOptions}
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
                  <th className="px-4 py-4">Firstname</th>
                  <th className="px-4 py-4">Lastname</th>
                  <th className="px-4 py-4">Email</th>
                  <th className="px-4 py-4">Role</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {filteredUsers
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
                      <td className="px-4 py-4">
                        <div className="flex justify-center">
                          <img
                            src={
                              user?.profilePic
                                ? `${import.meta.env.VITE_PROFILE_URL}${
                                    user.profilePic
                                  }`
                                : Images.default_profile
                            }
                            alt="Profile"
                            className="w-8 h-8 rounded-full border"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-[10px] lg:text-sm">
                        {user.firstname || "N/A"}
                      </td>
                      <td className="px-4 py-4 text-[10px] lg:text-sm">
                        {user.lastname || "N/A"}
                      </td>
                      <td className="px-4 py-4 text-[10px] lg:text-sm">
                        {user.email || "N/A"}
                      </td>
                      <td className="px-4 py-4 text-[10px] lg:text-sm">
                        {user.role || "N/A"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {selectedUser && (
          <div className="w-full md:w-1/3 p-2 bg-gray-50">
            <div className="flex justify-between items-center mb-4 mt-2">
              <h3 className="text-sm lg:text-xl font-semibold px-2">
                User Details
              </h3>
              <RiCloseFill
                className="w-6 h-6 cursor-pointer"
                onClick={() => setSelectedUser(null)}
              />
            </div>
            <div className="p-4 space-y-3">
              <img
                src={
                  selectedUser?.profilePic
                    ? `${import.meta.env.VITE_PROFILE_URL}${
                        selectedUser.profilePic
                      }`
                    : Images.default_profile
                }
                alt="Profile"
                className="w-24 h-24 mb-4 rounded-full border"
              />
              <p className="text-[12px] lg:text-sm">
                <strong>Name:</strong> {selectedUser.firstname || "N/A"}{" "}
                {selectedUser.lastname || ""}
              </p>
              <p className="text-[12px] text-sm lg:text-base">
                <strong>Email:</strong> {selectedUser.email || "N/A"}
              </p>
              <p className="text-[12px] text-sm lg:text-base">
                <strong>Phone:</strong> {selectedUser.phone || "N/A"}
              </p>
              <p className="text-[12px] text-sm lg:text-base">
                <strong>Block/Unblock:</strong>{" "}
                {selectedUser.isBlocked ? "Block" : "Unblock"}
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
                <button
                  className="px-3 p-1 border rounded bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1"
                  onClick={() => setEditForm(selectedUser)}
                >
                  Edit
                  <AiTwotoneEdit className="w-4 h-4" />
                </button>
                {selectedUser.isBlocked ? (
                  <button
                    className="px-3 p-1 border rounded bg-green-500 hover:bg-green-600 text-white flex items-center gap-1"
                    onClick={() => setConfirmAction(true)}
                  >
                    Unblock
                    <CgUnblock className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    className="px-3 p-1 border rounded bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-1"
                    onClick={() => setConfirmAction(true)}
                  >
                    Block
                    <MdBlock className="w-4 h-4" />
                  </button>
                )}
                  <button
                    className="px-3 p-1 border rounded bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
                    onClick={() => handleDelete(selectedUser._id)}
                  >
                    <FaTrashRestoreAlt className="w-4 h-4" />
                  </button>
              </div>
            </div>
            <ConfirmDialog
              isOpen={confirmAction}
              title={
                selectedUser.isBlocked ? "Confirm Unblock" : "Confirm Block"
              }
              description={
                selectedUser.isBlocked
                  ? "Are you sure you want to unblock this user?"
                  : "Are you sure you want to block this user?"
              }
              confirmText={
                selectedUser.isBlocked ? "Yes, Unblock" : "Yes, Block"
              }
              cancelText="Cancel"
              onConfirm={() => {
                handleBlockOrUnblock(
                  selectedUser._id,
                  selectedUser.isBlocked ? false : true
                );
                setConfirmAction(false);
              }}
              onCancel={() => setConfirmAction(false)}
            />
          </div>
        )}
      </div>
      <Drawer
        isOpen={!!editForm}
        onClose={() => setEditForm(null)}
        title="Edit Details"
      >
        {editForm && (
          <>
            <div className="px-3 py-10 md:px-11 md:py-1 font-prompt">
              <div className="flex flex-col items-center py-2">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <img
                    src={
                      previewImage ||
                      (selectedUser?.profilePic
                        ? `${import.meta.env.VITE_PROFILE_URL}${
                            selectedUser.profilePic
                          }`
                        : Images.default_profile)
                    }
                    alt="Profile picture"
                    className="w-16 md:w-24 h-16 md:h-24 rounded-full object-cover border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        Images.default_profile;
                    }}
                  />
                )}

                <label
                  htmlFor="profileImage"
                  className="mt-2 text-blue-600 text-sm underline cursor-pointer hover:text-blue-800 focus:text-blue-800 transition-colors"
                >
                  Change
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                {selectedImage && (
                  <button
                    className="bg-[#6c63ff] text-white hover:bg-[#564eef] px-4 py-2 rounded text-sm font-semibold"
                    onClick={handleSaveImage}
                  >
                    Save
                  </button>
                )}
              </div>
              <form onSubmit={handleEditForm} className="grid gap-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="firstname"
                      className="text-sm font-light px-1"
                    >
                      Firstname
                    </label>
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      className="border p-2 md:p-3 rounded-md"
                      value={form.firstname}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="lastname"
                      className="text-sm font-light px-1"
                    >
                      Lastname
                    </label>
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      className="border p-2 md:p-3 rounded-md"
                      value={form.lastname}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-light px-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="border p-2 md:p-3 rounded-md"
                      value={selectedUser?.email}
                      disabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="phone" className="text-sm font-light px-1">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      className="border p-2 md:p-3 rounded-md"
                      value={form.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="role" className="text-sm font-light px-1">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      className="border p-2 md:p-3 rounded-md"
                      value={form.role}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="register"
                      className="text-sm font-light px-1"
                    >
                      Logged Time
                    </label>
                    <input
                      id="register"
                      type="text"
                      className="border p-2 md:p-3 rounded-md"
                      value={selectedUser?.timestamp}
                      disabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="isBlocked"
                      className="text-sm font-light px-1"
                    >
                      Block Status
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="isBlocked"
                        className="border p-2 md:p-3 rounded-md w-full"
                        value={form.isBlocked ? "Blocked" : "Unblocked"}
                        disabled
                      />
                      <select
                        name="isBlocked"
                        className="border p-2 md:p-3 rounded-md w-full"
                        value={form.isBlocked ? "block" : "unblock"}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="block">Block</option>
                        <option value="unblock">Unblock</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="isActive"
                      className="text-sm font-light px-1"
                    >
                      Account Status
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="isActive"
                        className="border p-2 md:p-3 rounded-md w-full"
                        value={form.isActive ? "Active" : "Inactive"}
                        disabled
                      />
                      <select
                        name="isActive"
                        className="border p-2 md:p-3 rounded-md w-full"
                        value={form.isActive ? "active" : "inactive"}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    className={`px-4 py-2 border hover:bg-slate-700 ${
                      submitting ? "bg-slate-700" : "bg-black"
                    } text-white rounded-md`}
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </Drawer>
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
