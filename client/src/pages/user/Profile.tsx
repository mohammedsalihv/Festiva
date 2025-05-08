import { Images } from "@/assets";
<<<<<<< HEAD
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
=======
import { setUserDetails } from "@/redux/Slice/user/userSlice";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "@/reusable-components/user/Landing/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/redux/Slice/user/userSlice";
import { changeProfile } from "@/services/user/userService";
import { setLoading } from "@/redux/Slice/host/locationFeaturesSlice";
import { toast } from "react-toastify";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
>>>>>>> main

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Profile Information");
  const profile = useSelector((state: RootState) => state.user.userInfo);
<<<<<<< HEAD
=======
  console.log(profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveImage = async () => {
    if (selectedImage && profile) {
      const formData = new FormData();
      formData.append("file", selectedImage);

      setLoading(true);
      try {
        const response = await changeProfile(profile.id, formData);
        if(response?.profilePhotoUrl){
          dispatch(
            setUserDetails({
              profilePhoto: response.profilePhotoUrl,
            })
          );
          toast.success('Image updated')
        }else{
          toast.error("Failed to update profile photo.");
        }
        setSelectedImage(null);
        setPreviewImage(null);
      } catch (error) {
        console.error("Error updating profile image:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
>>>>>>> main

  const tabs = [
    "Profile Information",
    "My bookings",
    "Saved",
    "Service ticket",
    "FAQ",
    "Mylist",
    "Logout",
  ];

  return (
    <div className="min-h-screen bg-white p-4 md:p-10 text-black font-JosephicSans">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="bg-white p-6 rounded-xl w-full md:w-60 space-y-4 border border-gray-400">
          <div className="flex flex-col space-y-2 text-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`w-full py-2 rounded font-semibold text-left px-3 ${
                  activeTab === tab
                    ? "bg-[#6c63ff] text-white"
<<<<<<< HEAD
                    : "hover:border-gray-400"
=======
                    : "hover:border-gray-400 hover:text-main_color"
>>>>>>> main
                }`}
                onClick={() => {
                  if (tab === "Logout") {
                    setConfirmLogout(true);
                  } else {
                    setActiveTab(tab);
                  }
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white flex-1 p-6 rounded-xl space-y-6 border border-gray-400">
          {activeTab === "Profile Information" ? (
            <>
<<<<<<< HEAD
              <div className="space-y-2 border-gray-400">
                <p className="text-lg font-semibold">Profile picture</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 border border-black rounded-full flex items-center justify-center text-xl">
                    <img src={Images.default_profile} alt="" />
                  </div>
                  <button className="text-sm text-[#6c63ff] underline">
                    Change photo
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold">Personal data</p>
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={profile?.firstname || ""}
                    className="border-b-2 p-2 rounded flex-1"
=======
              <div className="space-y-2">
                <p className="text-sm md:text-lg font-bold">Profile picture</p>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
                  <div className="w-[93px] h-[85px] border border-black rounded-full overflow-hidden relative">
                    {isLoading ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <img
                        src={
                          previewImage ||
                          profile?.profilePhoto ||
                          Images.default_profile
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex flex-col lg:flex-row gap-2 items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="profileImage"
                        className="text-sm text-[#6c63ff] underline cursor-pointer"
                      >
                        Change photo
                      </label>
                      <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                    {selectedImage && (
                      <button
                        className="bg-[#6c63ff] text-white hover:bg-[#564eef] px-4 py-2 rounded text-sm font-semibold"
                        onClick={handleSaveImage}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-6 w-full">
                <div className="space-y-3 flex-1">
                  <p className="text-sm md:text-lg font-bold">Personal data</p>
                  <div className="flex flex-col lg:flex-row gap-4 w-full">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={profile?.firstname || ""}
                      className="border-b-2 p-2 rounded w-full text-sm"
                      readOnly
                      disabled
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={profile?.lastname || ""}
                      className="border-b-2 p-2 rounded w-full text-sm"
                      readOnly
                      disabled
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={profile?.email || ""}
                    className="border-b-2 p-2 rounded w-full text-sm"
>>>>>>> main
                    readOnly
                    disabled
                  />
                  <input
<<<<<<< HEAD
                    type="text"
                    placeholder="Last Name"
                    value={profile?.lastname || ""}
                    className="border-b-2 p-2 rounded flex-1"
=======
                    type="phone"
                    placeholder="Phone"
                    value={profile?.phone || ""}
                    className="border-b-2 p-2 rounded w-full text-sm"
>>>>>>> main
                    readOnly
                    disabled
                  />
                   <div className="flex justify-end">
                    <button className="bg-[#6c63ff] hover:bg-[#564eef] text-white md:px-4 md:py-2 px-2 py-1 rounded text-sm font-semibold">
                      Edit
                    </button>
                  </div>
                </div>
                <div className="space-y-3 lg:w-1/2 w-full">
                  <p className="text-sm md:text-lg font-bold">Change Password</p>
                  <input
                    type="password"
                    placeholder="Current password"
                    className="border-b-2 p-2 rounded w-full text-sm"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="border-b-2 p-2 rounded w-full text-sm"
                  />
                  <div className="flex justify-end">
                    <button className="bg-[#6c63ff] hover:bg-[#564eef] text-white md:px-4 md:py-2 px-2 py-1 rounded text-sm font-semibold">
                      Change
                    </button>
                  </div>
                </div>
<<<<<<< HEAD
                <input
                  type="email"
                  placeholder="Email"
                  value={profile?.email || ""}
                  className="border-b-2 p-2 rounded w-full mt-2"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold">Change Password</p>
                <input
                  type="password"
                  placeholder="Current password"
                  className="border-b-2 p-2 rounded w-full"
                />
                <input
                  type="password"
                  placeholder="New password"
                  className="border-b-2 p-2 rounded w-full"
                />
                <input
                  type="password"
                  placeholder="Repeat password"
                  className="border-b-2 p-2 rounded w-full"
                />
                <button className="bg-[#6c63ff] text-white px-4 py-2 rounded text-sm font-semibold">
                  Change
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold">Delete account</p>
=======
              </div>
              <div className="space-y-2">
                <p className="text-sm md:text-lg font-bold">Delete account</p>
>>>>>>> main
                <p className="text-sm text-gray-400">
                  Deleting account is a permanent action and cannot be undone.
                  Are you sure you want to proceed?
                </p>
<<<<<<< HEAD
                <button className="bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold">
=======
                <button className="bg-red-600 hover:bg-red-700 text-white md:px-4 md:py-2 px-2 py-1 rounded text-sm font-semibold">
>>>>>>> main
                  Delete
                </button>
              </div>
            </>
          ) : (
            <div className="text-gray-300 text-sm">
              <p>This is the "{activeTab}" tab content placeholder.</p>
            </div>
          )}
        </div>
      </div>
      <ConfirmDialog
        isOpen={confirmLogout}
        title="Confirm Logout"
        description="Are you sure you want to logout?"
        confirmText="Yes, Logout"
        cancelText="Cancel"
        onConfirm={() => {
          handleLogout();
          setConfirmLogout(false);
        }}
        onCancel={() => setConfirmLogout(false)}
      />
      <CustomToastContainer/>
    </div>
  );
};

export default Profile;
