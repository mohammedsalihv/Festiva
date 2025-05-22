import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { Images } from "@/assets";
import { RootState } from "@/redux/store";
import { setUserDetails, logoutUser } from "@/redux/Slice/user/userSlice";
import { changeProfile } from "@/services/user/userService";
import { sendOtp } from "@/services/user/userAuthService";
import ConfirmDialog from "@/reusable-components/user/Landing/ConfirmDialog";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { AxiosError } from "axios";

const Profile: React.FC = () => {
  const profile = useSelector((state: RootState) => state.user.userInfo);
  const [activeTab, setActiveTab] = useState("Profile Information");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [isEditing , setIsEditing] = useState(false)
  const [email , setEmail]  = useState(profile?.email || "")
  const [originalEmail , setOriginalEmail] = useState(false)
  const [editProfileForm , setEditProfileForm] = useState({
    firstname: profile?.firstname || "",
  lastname: profile?.lastname || "",
  email: profile?.email || "",
  phone: profile?.phone || ""
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  // const handleSaveProfile = () =>{
    
  // }

  // const {mutate : sendOtpMutation , isPending : sendingOtp} = useMutation({
  //     mutationFn:sendOtp,
  //     onSuccess: () =>{
  //       toast.success("OTP sent successfully!");
  //       navigate("/otp-verification", { state: { userData: editProfileForm } });
  //     },
  //     onError:(error)=>{
  //        console.error("OTP Sending Error:", error);
  //        toast.error(error.message || "Failed to send OTP. Please try again.");
  //     }
  // })

  const handleChangeProfile = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name , value} = e.target;
    setEditProfileForm(prev => ({...prev,[name]:value}))

  }

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
    if (selectedImage && profile) {
      const formData = new FormData();
      formData.append("file", selectedImage);

      setIsLoading(true);
      try {
        const response = await changeProfile(formData);
        if (response?.profilePhotoUrl) {
          dispatch(
            setUserDetails({
              ...profile,
              profilePic: response.profilePhotoUrl,
            })
          );
          toast.success("Profile image updated successfully");
        } else {
          toast.error("Failed to update profile photo");
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.message || "Failed to update profile");
        }
      } finally {
        setIsLoading(false);
        setSelectedImage(null);
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
    "Faq",
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
                className={`w-full py-2 rounded font-semibold text-left text-[15px] px-3 ${
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
                        src={
                          previewImage ||
                          (profile?.profilePic
                            ? `${import.meta.env.VITE_PROFILE_URL}${
                                profile.profilePic
                              }`
                            : Images.default_profile)
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            Images.default_profile;
                        }}
                      />
                    )}
                  </div>
                  <div className="flex flex-col lg:flex-row gap-2 items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="profileImage"
                        className="text-[16px] text-[#6c63ff] underline cursor-pointer"
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
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/2 space-y-3">
                  <p className="text-sm md:text-lg font-bold">Personal data</p>
                  <div className="flex flex-col lg:flex-row gap-4">
                    <input
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      value={profile?.firstname || ""}
                      className="border-b-2 p-2 rounded w-full text-[16px]"
                      readOnly={!isEditing}
                      disabled={!isEditing}
                      onChange={handleChangeProfile}
                    />
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      value={profile?.lastname || ""}
                      className="border-b-2 p-2 rounded w-full text-[16px]"
                      readOnly={!isEditing}
                      disabled={!isEditing}
                      onChange={handleChangeProfile}
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={profile?.email || ""}
                    className="border-b-2 p-2 rounded w-full text-[16px]"
                    readOnly={!isEditing}
                    disabled={!isEditing}
                    onChange={handleChangeProfile}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={profile?.phone || ""}
                    className="border-b-2 p-2 rounded w-full text-[16px]"
                    readOnly={!isEditing}
                    disabled={!isEditing}
                    onChange={handleChangeProfile}
                  />
                  <div className="flex justify-end">
                    <button className="bg-[#6c63ff] hover:bg-[#564eef] text-white px-4 py-2 rounded text-sm font-semibold">
                      Edit
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 space-y-3">
                  <p className="text-sm md:text-lg font-bold">
                    Change Password
                  </p>
                  <input
                    type="password"
                    placeholder="Current password"
                    className="border-b-2 p-2 rounded w-full text-[16px]"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="border-b-2 p-2 rounded w-full text-[16px]"
                  />
                  <input
                    type="password"
                    placeholder="Repeat password"
                    className="border-b-2 p-2 rounded w-full text-[16px]"
                  />
                  <div className="flex justify-end">
                    <button className="bg-[#6c63ff] hover:bg-[#564eef] text-white px-4 py-2 rounded text-sm font-semibold">
                      Change
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm md:text-lg font-bold">Delete account</p>
                <p className="text-[16px] text-gray-400">
                  Deleting account is a permanent action and cannot be undone.
                  Are you sure you want to proceed?
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
