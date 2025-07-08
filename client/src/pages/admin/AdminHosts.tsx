import Pagination from "@/components/Pagination";
import { LuUserSearch } from "react-icons/lu";
import { Images } from "@/assets";
import { useEffect, useState, FormEvent } from "react";
import { IoMdArrowForward } from "react-icons/io";
import Drawer from "@/components/Drawer";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CgCloseR } from "react-icons/cg";
import {
  blockUnblockHost,
  getAllHosts,
  editHostDetails,
  changeProfile,
  deleteHost,
} from "@/api/admin/hostManagement.services";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllHosts,
  updateHost,
} from "@/redux/Slice/admin/hostManagementSlice";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  EditHostPayload,
  HostSortOptions,
} from "@/utils/Types/admin/hostManagementTypes";
import { Host } from "@/utils/Types/host/authTypes";
import { RootState } from "@/redux/store";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdBlock } from "react-icons/md";
import logger from "@/utils/logger";
import ConfirmDialog from "@/reusable-components/user/Landing/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import Dropdown from "@/components/Dropdown";
import { FaTrashRestoreAlt } from "react-icons/fa";
import Table from "@/components/Table";

const AdminHosts = () => {
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmAction, setConfirmAction] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editForm, setEditForm] = useState<typeof selectedHost | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hosts = useSelector((state: RootState) => state.hostManagement.hosts);

  const [form, setForm] = useState({
    name: selectedHost?.name || "",
    phone: selectedHost?.phone || "",
    role: selectedHost?.role || "",
    location: selectedHost?.location || "",
    isActive: selectedHost?.isActive || false,
    isBlocked: selectedHost?.isBlocked || false,
    isVerified: selectedHost?.isVerified || false,
    profilePic: selectedHost?.profilePic || "",
    isSubscriber: selectedHost?.isSubscriber || false,
    listedAssets: selectedHost?.listedAssets || 0,
    totalRequests: selectedHost?.totalRequests || 0,
    acceptedRequests: selectedHost?.acceptedRequests || 0,
    rejectedRequests: selectedHost?.rejectedRequests || 0,
  });

  useEffect(() => {
    if (selectedHost) {
      setForm({
        name: selectedHost.name || "",
        phone: selectedHost.phone || "",
        location: selectedHost?.location || "",
        role: selectedHost.role || "",
        isActive: selectedHost.isActive || false,
        isBlocked: selectedHost.isBlocked || false,
        isVerified: selectedHost?.isVerified || false,
        profilePic: selectedHost?.profilePic || "",
        isSubscriber: selectedHost?.isSubscriber || false,
        listedAssets: selectedHost?.listedAssets || 0,
        totalRequests: selectedHost?.totalRequests || 0,
        acceptedRequests: selectedHost?.acceptedRequests || 0,
        rejectedRequests: selectedHost?.rejectedRequests || 0,
      });
    }
  }, [selectedHost]);

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
    } else if (name === "isVerified") {
      setForm((prev) => ({
        ...prev,
        isVerified: value === "verified",
      }));
    } else if (name === "isSubscriber") {
      setForm((prev) => ({
        ...prev,
        isSubscriber: value === "Subscriber",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const fetchPaginatedHosts = async () => {
      try {
        setLoading(true);
        const response = await getAllHosts(page, limit);
        dispatch(setAllHosts(response.data));
        setTotalPages(response.totalPages);
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError
            ? error.response?.data?.message || error.message
            : "Failed to load hosts";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPaginatedHosts();
  }, [page]);

  const handleBlockOrUnblock = async (hostId: string, isBlocked: boolean) => {
    try {
      const response = await blockUnblockHost(isBlocked, hostId);

      const updatedRes = await getAllHosts(page, limit);
      dispatch(setAllHosts(updatedRes.data));

      setSelectedHost(
        updatedRes.data.find((h: Host) => h._id === hostId) || null
      );

      toast.success(response.message);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message || error.message
          : "Something went wrong";
      toast.error(errorMessage, { toastId: `error-${hostId}` });
      logger.error(
        { hostId, error: errorMessage },
        "Blocking/Unblocking failed"
      );
    }
  };

  const handleEditForm = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedHost?._id) {
      toast.error("No host selected");
      return;
    }

    setSubmitting(true);

    setTimeout(async () => {
      try {
        const payload: EditHostPayload = {
          role: form.role,
          isActive: form.isActive,
          isBlocked: form.isBlocked,
          isVerified: form.isVerified,
          profilePic: form.profilePic,
          isSubscriber: form.isSubscriber,
          listedAssets: form.listedAssets,
          totalRequests: form.totalRequests,
          acceptedRequests: form.acceptedRequests,
          rejectedRequests: form.rejectedRequests,
        };

        const res = await editHostDetails(payload, selectedHost._id);
        toast.success(res.message);

        const updatedRes = await getAllHosts(page, limit);
        dispatch(setAllHosts(updatedRes.data));
        setSelectedHost(
          updatedRes.data.find((h: Host) => h._id === selectedHost._id) || null
        );
        setEditForm(null);
      } catch (err: unknown) {
        toast.error((err as Error).message || "Failed to update host");
      } finally {
        setSubmitting(false);
      }
    }, 2000);
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

  const handleSaveImage = async () => {
    if (selectedHost && selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);

      setIsLoading(true);
      try {
        const response = await changeProfile(formData, selectedHost._id);
        if (response?.profilePhotoUrl) {
          const updatedHost = {
            ...selectedHost,
            profilePic: response.profilePhotoUrl,
          };
          dispatch(updateHost(updatedHost));
          setSelectedHost(updatedHost);
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

  const handleDelete = async (hostId: string) => {
    try {
      await deleteHost(hostId);
      const updatedRes = await getAllHosts(page, limit);
      dispatch(setAllHosts(updatedRes.data));
      setSelectedHost(null);
      toast.success("Host account deleted");
      navigate("/admin/hosts");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error("Host account delete failed");
        logger.error({ hostId, error: error }, "Host account delete failed");
      }
      console.log(error);
    }
  };

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

  return (
    <div>
      <div className="flex flex-col md:flex-row h-screen bg-main_white rounded-md font-prompt">
        <div className="transition-all duration-300 overflow-hidden p-4 w-full">
          <div className="flex justify-between items-center mb-10 mt-5 px-2">
            <h2 className="text-lg md:text-xl font-semibold">Hosts</h2>
            <div className="flex items-center gap-2">
              <div className="relative w-40მოჀ System: .jsx">
                <input
                  type="text"
                  className="pl-8 pr-2 py-2 border rounded w-full text-sm md:text-base"
                  placeholder="Search by name, email"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
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
                  onSelect={(value: string) => {
                    setSort(value);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          </div>
          <Table
            data={filteredHosts}
            onRowClick={(host) => setSelectedHost(host)}
            renderRowStart={(_, index) => index + 1}
            columns={[
              {
                header: "Person",
                accessor: (host) => (
                  <img
                    src={host.profilePic ? host.profilePic : Images.casual_user}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border"
                  />
                ),
                center: true,
              },
              { header: "Name", accessor: "name" },
              { header: "Email", accessor: "email" },
              {
                header: "More",
                accessor: () => (
                  <IoMdArrowForward className="text-black h-5 w-5 lg:h-7 lg:w-7" />
                ),
                center: true,
              },
            ]}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
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
                      ? selectedHost.profilePic
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
                    onClick={() => setEditForm(selectedHost)}
                  >
                    Edit <AiTwotoneEdit className="w-4 h-4" />
                  </button>
                  <button
                    className="border px-3 p-2 rounded text-sm bg-yellow-500 hover:bg-yellow-600 text-white flex gap-1 items-center"
                    onClick={() => setConfirmAction(true)}
                  >
                    {selectedHost.isBlocked ? "Unblock" : "Block"}{" "}
                    <MdBlock className="w-4 h-4" />
                  </button>
                  <button
                    className="border p-2 rounded text-sm bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
                    onClick={() => handleDelete(selectedHost._id)}
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
              <ConfirmDialog
                isOpen={confirmAction}
                title={
                  selectedHost.isBlocked ? "Confirm Unblock" : "Confirm Block"
                }
                description={
                  selectedHost.isBlocked
                    ? "Are you sure you want to unblock this user?"
                    : "Are you sure you want to block this user?"
                }
                confirmText={
                  selectedHost.isBlocked ? "Yes, Unblock" : "Yes, Block"
                }
                cancelText="Cancel"
                onConfirm={() => {
                  handleBlockOrUnblock(
                    selectedHost._id,
                    selectedHost.isBlocked ? false : true
                  );
                  setConfirmAction(false);
                }}
                onCancel={() => setConfirmAction(false)}
              />
            </div>
          </>
        )}
      </Drawer>
      <Drawer
        isOpen={!!editForm}
        onClose={() => setEditForm(null)}
        title="Edit Details"
      >
        {editForm && (
          <>
            <div className="px-3 py-4 md:px-6 md:py-2 font-prompt pb-20">
              <div className="flex flex-col items-center py-3">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <img
                    src={
                      previewImage ||
                      (selectedHost?.profilePic
                        ? selectedHost.profilePic
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
                  htmlFor="profilePic"
                  className="mt-2 text-blue-600 md:text-sm text-[11px] underline cursor-pointer hover:text-blue-800 focus:text-blue-800 transition-colors py-2 "
                >
                  Change
                  <input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    name="profilePic"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                {selectedImage && (
                  <button
                    className="bg-[#6c63ff] text-white hover:bg-[#564eef] px-3 py-1 md:py-2 rounded md:text-sm text-[11px] font-semibold mb-3"
                    onClick={handleSaveImage}
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                )}
              </div>
              <form onSubmit={handleEditForm} className="grid gap-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="Name" className={`text-sm font-light px-1`}>
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="border p-2 md:p-3 rounded-md"
                      value={form.name}
                      disabled
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
                      value={selectedHost?.email}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="phone" className="text-sm font-light px-1">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="phone"
                      name="phone"
                      className="border p-2 md:p-3 rounded-md"
                      value={form.phone}
                      disabled
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="role"
                      className={`text-sm font-light px-1 `}
                    >
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      className="border p-2 md:p-3 rounded-md"
                      value={form.role}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="user">User</option>
                      <option value="host">Host</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="totalRequests"
                      className={`text-sm font-light px-1`}
                    >
                      Total Requests
                    </label>
                    <input
                      id="totalRequests"
                      name="totalRequests"
                      type="number"
                      className="border p-2 md:p-3 rounded-md"
                      value={form.totalRequests}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="acceptedRequests"
                      className="text-sm font-light px-1"
                    >
                      Accepted Request
                    </label>
                    <input
                      id="acceptedRequests"
                      type="number"
                      name="acceptedRequests"
                      className="border p-2 md:p-3 rounded-md"
                      value={form?.acceptedRequests}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="rejectedRequests"
                      className="text-sm font-light px-1"
                    >
                      Rejected Requests
                    </label>
                    <input
                      id="rejectedRequests"
                      type="number"
                      name="rejectedRequests"
                      className="border p-2 md:p-3 rounded-md"
                      value={form.rejectedRequests}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="listedAssets"
                      className="text-sm font-light px-1"
                    >
                      Listed assets
                    </label>
                    <input
                      id="listedAssets"
                      type="number"
                      name="listedAssets"
                      className="border p-2 md:p-3 rounded-md"
                      value={form.listedAssets}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="location"
                      className={`text-sm font-light px-1 `}
                    >
                      Location
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      className="border p-2 md:p-3 rounded-md"
                      value={form.location}
                      disabled
                    />
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
                      value={selectedHost?.timestamp?.toLocaleString() || "N/A"}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="isVerified"
                      className={`text-sm font-light px-1 `}
                    >
                      Verified Status
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="isVerified"
                        className="border p-2 md:p-3 rounded-md w-full"
                        value={form.isVerified ? "verified" : "unverified"}
                        disabled
                      />
                      <select
                        name="isVerified"
                        className="border p-2 md:p-3 rounded-md w-full"
                        value={form.isVerified ? "verified" : "unverified"}
                        onChange={handleInputChange}
                      >
                        <option value="verified">verified</option>
                        <option value="unverified">unverified</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="isBlocked"
                      className={`text-sm font-light px-1 `}
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
                      >
                        <option value="block">Block</option>
                        <option value="unblock">Unblock</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="isActive"
                      className={`text-sm font-light px-1 `}
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
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="isSubscriber"
                      className={`text-sm font-light px-1 `}
                    >
                      Subscribe status
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="isSubscriber"
                        className="border p-2 md:p-3 rounded-md w-full"
                        value={form.isBlocked ? "subscriber" : "unsubscribe"}
                        disabled
                      />
                      <select
                        name="isSubscriber"
                        className="border p-2 md:p-3 rounded-md w-full"
                        value={form.isSubscriber ? "subscriber" : "unsubscribe"}
                        onChange={handleInputChange}
                      >
                        <option value="subscriber">subscriber</option>
                        <option value="unsubscribe">unsubscribe</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end md:py-9">
                  <button
                    className={`py-2 border hover:bg-slate-700 ${
                      submitting ? "bg-slate-700" : "bg-black"
                    } text-white rounded-md md:text-sm text-[11px] px-3`}
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
    </div>
  );
};

export default AdminHosts;
