import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Images } from "@/assets";
import { RootState } from "@/redux/store";
import { setUserDetails, logoutUser } from "@/redux/Slice/user/userSlice";
import { setLoading } from "@/redux/Slice/host/locationFeaturesSlice";
import { changeProfile } from "@/services/user/userService";
import ConfirmDialog from "@/reusable-components/user/Landing/ConfirmDialog";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Profile Information");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state: RootState) => state.user.userInfo);

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

      dispatch(setLoading(true));
      try {
        const response = await changeProfile(profile.id, formData);
        if (response?.profilePhotoUrl) {
          dispatch(
            setUserDetails({
              profilePhoto: response.profilePhotoUrl,
            })
          );
          toast.success("Image updated");
        } else {
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
                    : "hover:border-gray-400 hover:text-main_color"
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
              {/* Profile Picture Section */}
              <div className="space-y-2">
                <p className="text-sm md:text-lg font-bold">Profile picture</p>
                <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
                  <div className="w-[93px] h-[85px] border border-black rounded-full overflow-hidden relative">
                    {isLoading ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <img
                        src={previewImage || profile?.profilePhoto || Images.default_profile}
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

              {/* Personal Info Section */}
              <div className="space-y-3">
                <p className="text-sm md:text-lg font-bold">Personal data</p>
                <div className="flex flex-col lg:flex-row gap-4">
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
                  readOnly
                  disabled
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={profile?.phone || ""}
                  className="border-b-2 p-2 rounded w-full text-sm"
                  readOnly
                  disabled
                />
                <div className="flex justify-end">
                  <button className="bg-[#6c63ff] hover:bg-[#564eef] text-white px-4 py-2 rounded text-sm font-semibold">
                    Edit
                  </button>
                </div>
              </div>

              {/* Change Password Section */}
              <div className="space-y-3">
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
                <input
                  type="password"
                  placeholder="Repeat password"
                  className="border-b-2 p-2 rounded w-full text-sm"
                />
                <button className="bg-[#6c63ff] text-white px-4 py-2 rounded text-sm font-semibold">
                  Change
                </button>
              </div>

              {/* Delete Account Section */}
              <div className="space-y-3">
                <p className="text-sm md:text-lg font-bold">Delete account</p>
                <p className="text-sm text-gray-400">
                  Deleting account is a permanent action and cannot be undone. Are you sure you want to proceed?
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold">
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
      <CustomToastContainer />
    </div>
  );
};

export default Profile;