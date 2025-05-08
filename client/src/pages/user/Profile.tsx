import { Images } from "@/assets";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Profile Information");
  const profile = useSelector((state: RootState) => state.user.userInfo);

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
        <div className="bg-white flex-1 p-6 rounded-xl space-y-6 border border-gray-400">
          {activeTab === "Profile Information" ? (
            <>
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
                    readOnly
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={profile?.lastname || ""}
                    className="border-b-2 p-2 rounded flex-1"
                    readOnly
                  />
                </div>
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
