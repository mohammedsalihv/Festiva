import { Images } from "@/assets";
import { setUserDetails } from "@/redux/Slice/user/userSlice";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Profile Information");
  const profile = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveImage = () => {
    if (selectedImage && profile) {
      const imageUrl = URL.createObjectURL(selectedImage);

      dispatch(
        setUserDetails({
          profilePhoto: imageUrl,
        })
      );

      setSelectedImage(null);
      setPreviewImage(null);
    }
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
    <div className="min-h-screen bg-white p-4 md:p-10 text-black">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar Tabs */}
        <div className="bg-white p-6 rounded-xl w-full md:w-60 space-y-4 border border-gray-400">
          <div className="flex flex-col space-y-2 text-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`w-full py-2 rounded font-semibold text-left px-3 ${
                  activeTab === tab
                    ? "bg-[#6c63ff] text-white"
                    : "hover:border-gray-400"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white flex-1 p-6 rounded-xl space-y-6 border border-gray-400">
          {activeTab === "Profile Information" ? (
            <>
              {/* Profile Picture */}
              <div className="space-y-2">
                <p className="text-lg font-semibold">Profile picture</p>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
                  <div className="w-14 h-14 border border-black rounded-full overflow-hidden">
                    <img
                      src={
                        previewImage ||
                        profile?.profilePhoto ||
                        Images.default_profile
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
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
                        className="bg-[#6c63ff] text-white px-4 py-1 rounded text-sm font-semibold"
                        onClick={handleSaveImage}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Data & Change Password */}
              <div className="flex flex-col lg:flex-row gap-6 w-full">
                {/* Personal Data */}
                <div className="space-y-3 flex-1">
                  <p className="text-lg font-semibold">Personal data</p>
                  <div className="flex flex-col lg:flex-row gap-4 w-full">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={profile?.firstname || ""}
                      className="border-b-2 p-2 rounded w-full"
                      readOnly
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={profile?.lastname || ""}
                      className="border-b-2 p-2 rounded w-full"
                      readOnly
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={profile?.email || ""}
                    className="border-b-2 p-2 rounded w-full"
                    readOnly
                  />
                </div>

                {/* Change Password */}
                <div className="space-y-3 lg:w-1/2 w-full">
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
                  <div className="flex justify-end">
                    <button className="bg-[#6c63ff] text-white px-4 py-2 rounded text-sm font-semibold">
                      Change
                    </button>
                  </div>
                </div>
              </div>

              {/* Delete Account */}
              <div className="space-y-2">
                <p className="text-lg font-semibold">Delete account</p>
                <p className="text-sm text-gray-400">
                  Deleting account is a permanent action and cannot be undone.
                  Are you sure you want to proceed?
                </p>
                <button className="bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold">
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
    </div>
  );
};

export default Profile;
