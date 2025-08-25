import React, { useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { Images } from "@/assets";
import { RootState } from "@/redux/store";
import { setUserDetails, logoutUser } from "@/redux/Slice/user/userSlice";
import { changeProfile, profileEdit } from "@/api/user/base/userService";
import {
  deleteProfile,
  passwordModify,
  sendOtp,
  userLogout,
  validateEmail,
  verifyOtp,
} from "@/api/user/auth/userAuthService";
import ConfirmDialog from "@/reusable-components/user/Landing/ConfirmDialog";
import CustomToastContainer from "@/reusable-components/messages/ToastContainer";
import { AxiosError } from "axios";
import Otp from "@/components/Otp";
import { BiSolidEditAlt } from "react-icons/bi";
import Spinner from "@/components/Spinner";
import { changePasswordErrorState } from "@/utils/Types/user/profileTypes";
import { changePasswordState } from "@/utils/Types/user/profileTypes";
import { validateChangePasswordForm } from "@/utils/validations/user/Auth/changePasswordValidation";

const Profile: React.FC = () => {
  const profile = useSelector((state: RootState) => state.user.userInfo);
  const [activeTab, setActiveTab] = useState("Profile Information");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const firstInputRef = useRef<HTMLInputElement>(null);
  // const [profileImage, setProfileImage] = useState<string>(
  //     Images.default_profile
  //   );
  const [editProfileForm, setEditProfileForm] = useState({
    firstname: profile?.firstname || "",
    lastname: profile?.lastname || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
  });
  const [changePasswordForm, setChangePasswordForm] =
    useState<changePasswordState>({
      currentPassword: "",
      newPassword: "",
    });
  const [errors, setErrors] = useState<changePasswordErrorState>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  useEffect(() => {
  //      const fetchProfileImage = async () => {
  //        if (!profile?.id) return;

  //        try {
  //          const blob = await getProfileImage(profile.id);

  //          const objectUrl = URL.createObjectURL(blob);
  //          setProfileImage(objectUrl);
  //        } catch (error) {
  //          console.log(error);
  //          setProfileImage(Images.default_profile);
  //        }
  //      };

  //      fetchProfileImage();

  //      return () => {
  //        if (profileImage?.startsWith("blob:")) {
  //          URL.revokeObjectURL(profileImage);
  //        }
  //      };
  //    }, [profile]);

  const handleProfileDelete = async () => {
    await deleteProfile();
    toast.success("Account deleted");
    handleLogout();
  };

  const hanldeChangePasswordSubmit = async () => {
    setUpdating(true);

    const { isValid, errors: validationErrors } =
      validateChangePasswordForm(changePasswordForm);

    if (!isValid) {
      setErrors(validationErrors);
      toast.error("Please correct the errors in the form.");
      setTimeout(() => setErrors({}), 10000);
      setUpdating(false);
      return;
    }

    try {
      const response = await passwordModify(changePasswordForm);
      dispatch(setUserDetails(response.data));
      toast.success("Password changed!");
      setChangePasswordForm({ currentPassword: "", newPassword: "" });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast.error("Incorrect current password.");
        } else if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePasswordForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTriggerEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 0);
  };

  const handleSaveProfile = () => {
    editProfileMutate(editProfileForm);
  };

  const handleTriggerSave = async () => {
    const emailChanged = profile?.email !== editProfileForm.email;

    if (emailChanged) {
      const exists = await validateEmail(editProfileForm.email);
      if (exists) {
        toast.error("Email already registered, please use another email.");
        return;
      }
      sendOtpMutation({ email: editProfileForm.email });
    } else {
      try {
        const { email, ...formToSubmit } = editProfileForm;
        const response = await profileEdit(formToSubmit);
        dispatch(setUserDetails(response.data));
        toast.success("Profile updated!");
        console.log(`Profile changed of ${email}`);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error("Failed to update");
        }
      } finally {
        setIsEditing(false);
      }
    }
  };

  const { mutate: sendOtpMutation, isPending: sendingOtp } = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      toast.success("OTP sent successfully!");
      setShowOtp(true);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    },
  });

  const { mutate: verifyOtpMutation, isPending: verifyingOtp } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      toast.success("Email verified successfully!");
      handleSaveProfile();
      setShowOtp(false);
      setIsEditing(false);
      setOtpError("");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      setOtpError(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
    },
  });

  const { mutate: resendOtpMutation, isPending: resendingOtp } = useMutation({
    mutationFn: sendOtp,
    onMutate: () => {
      toast.dismiss("resend-toast");
      toast.loading("Sending OTP...", { toastId: "resend-toast" });
    },
    onSuccess: () => {
      toast.dismiss("resend-toast");
      toast.success("OTP resent successfully!", { autoClose: 3000 });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.dismiss("resend-toast");
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    },
  });

  const { mutate: editProfileMutate, isPending: editing } = useMutation({
    mutationFn: profileEdit,
    onSuccess: (response) => {
      dispatch(setUserDetails(response.data));
      toast.success("Profile updated!");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(
        error.response?.data?.message ||
          "Profile editing failed. Please try again."
      );
    },
  });

  const handleVerifyOtp = (otp: string) => {
    setOtpError("");
    verifyOtpMutation({ email: editProfileForm.email, otp });
  };

  const handleResendOtp = () => {
    resendOtpMutation({ email: editProfileForm.email });
  };

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditProfileForm((prev) => ({ ...prev, [name]: value }));
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

  const handleLogout = async () => {
    try {
      dispatch(logoutUser());
      await userLogout();
      toast.success("Logout successfull!");
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message || "Failed to update profile");
      }
    }
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
    <div className="min-h-screen bg-white p-4 md:p-10 text-black font-poppins mt-9">
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
                            ? profile.profilePic
                            : Images.default_profile)
                        }
                        alt="Profile"
                        className="w-full h-full object-cover p-1"
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
                      ref={firstInputRef}
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      value={editProfileForm.firstname}
                      className="border-b-2 p-2 rounded w-full text-[18px]"
                      readOnly={!isEditing}
                      onChange={handleChangeProfile}
                    />
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      value={editProfileForm.lastname}
                      className="border-b-2 p-2 rounded w-full text-[18px]"
                      readOnly={!isEditing}
                      onChange={handleChangeProfile}
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={editProfileForm.email}
                    className="border-b-2 p-2 rounded w-full text-[18px]"
                    readOnly={!isEditing}
                    onChange={handleChangeProfile}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={editProfileForm?.phone}
                    className="border-b-2 p-2 rounded w-full text-[18px]"
                    readOnly={!isEditing}
                    onChange={handleChangeProfile}
                  />
                  <div className="flex justify-end">
                    {!showOtp &&
                      (isEditing ? (
                        <button
                          onClick={handleTriggerSave}
                          className="bg-main_color hover:bg-[#564eef] text-white px-4 py-2 rounded text-sm font-semibold flex items-center justify-center gap-2"
                          disabled={sendingOtp}
                        >
                          {sendingOtp ? (
                            <Spinner text="Sending OTP..." />
                          ) : (
                            "Save changes"
                          )}
                        </button>
                      ) : (
                        <div
                          className="cursor-pointer hover:bg-gray-200 rounded-full p-2 inline-flex items-center justify-center"
                          onClick={handleTriggerEdit}
                        >
                          <BiSolidEditAlt className="text-black h-6 w-6" />
                        </div>
                      ))}
                  </div>
                </div>
                <form className="w-full lg:w-1/2 space-y-3">
                  <p className="text-sm md:text-lg font-bold">
                    Change Password
                  </p>
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current password"
                    className="border-b-2 p-2 rounded w-full text-[16px]"
                    value={changePasswordForm.currentPassword}
                    onChange={handleChangePassword}
                  />
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1 font-bold">
                      {errors.currentPassword}
                    </p>
                  )}
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New password"
                    className="border-b-2 p-2 rounded w-full text-[16px]"
                    value={changePasswordForm.newPassword}
                    onChange={handleChangePassword}
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1 font-bold">
                      {errors.newPassword}
                    </p>
                  )}
                  <div className="flex justify-end">
                    <button
                      className={`${
                        updating
                          ? "bg-main_color text-white px-4"
                          : "hover:bg-gray-200"
                      } cursor-pointer rounded-full p-2 inline-flex items-center justify-center`}
                      onClick={hanldeChangePasswordSubmit}
                      type="button"
                      disabled={updating}
                    >
                      {updating ? (
                        <Spinner text="Changing..." />
                      ) : (
                        <BiSolidEditAlt className="text-black h-6 w-6" />
                      )}
                    </button>
                  </div>
                </form>
              </div>
              <div className="space-y-3">
                <p className="text-sm md:text-lg font-bold">Delete account</p>
                <p className="text-[16px] text-gray-400">
                  Deleting account is a permanent action and cannot be undone.
                  Are you sure you want to proceed?
                </p>
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold"
                >
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
        {showOtp && (
          <Otp
            email={editProfileForm.email}
            onVerify={handleVerifyOtp}
            onResend={handleResendOtp}
            loading={verifyingOtp || editing || resendingOtp}
            errorMessage={otpError}
            resendTimeOut={60}
          />
        )}
      </div>
      <ConfirmDialog
        isOpen={confirmDelete}
        title="Confirm delete"
        description="Are you sure you want to delete your account?"
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={() => {
          handleProfileDelete();
          setConfirmDelete(false);
        }}
        onCancel={() => setConfirmDelete(false)}
      />
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
