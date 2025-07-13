import { NavbarMenu } from "@/utils/Navbar/user/navLinks";
import { CiSearch, CiLocationOn } from "react-icons/ci";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { MdOutlineBookmarks } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import React, { useState, useRef, useEffect } from "react";
import ResponsiveNavLinks from "../../../utils/Navbar/user/ResponsiveNavLinks";
import { useNavigate } from "react-router-dom";
import LogoText from "@/components/LogoText";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logoutUser } from "@/redux/Slice/user/userSlice";
import { Images } from "@/assets";
import ConfirmDialog from "./ConfirmDialog";
import { userLogout } from "@/api/user/auth/userAuthService";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/user/home";
  const showTransparent = isHomePage && !isScrolled;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const isAuthenticated = !!userInfo?.accessToken;
  const profile = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await userLogout();
      toast.success("Logout successful");
      dispatch(logoutUser());
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error("Logout failed");
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${
          showTransparent ? "bg-transparent" : "bg-white"
        } font-JosephicSans`}
      >
        <div className="container mx-auto flex justify-between items-center px-2 py-5">
          <div className="flex-shrink-0">
            <LogoText />
          </div>
          <div
            className={`${
              showTransparent ? "text-white" : "text-black"
            }  hidden lg:flex items-center justify-center gap-6 text-sm font-semibold`}
          >
            {NavbarMenu.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className="hover:text-main_color font-prompt text-base"
              >
                {item.title}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              className={`${
                showTransparent ? "text-white border-gray-600" : "text-black"
              } hover:text-main_color text-xl hover:border-main_color border rounded-full px-1 py-1`}
            >
              <CiSearch />
            </button>
            <button
              className={`${
                showTransparent ? "text-white border-gray-600" : "text-black"
              } hover:text-main_color text-xl hover:border-main_color border rounded-full px-1 py-1`}
            >
              <CiLocationOn />
            </button>

            {isAuthenticated ? (
              <div className="relative hidden lg:block" ref={dropDownRef}>
                <img
                  onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                    e.preventDefault();
                    setDropDown((prev) => !prev);
                  }}
                  src={
                    profile?.profilePic
                      ? profile.profilePic
                      : Images.default_profile
                  }
                  alt=""
                  className="w-9 h-9 rounded-full cursor-pointer border border-gray-300"
                />
                {dropDown && (
                  <div className="fixed inset-0 z-50 flex justify-end items-end pointer-events-none">
                    <div className="w-64 h-full bg-white shadow-lg animate-slide-up-full pointer-events-auto font-JosephicSans">
                      <div className="flex justify-end p-4">
                        <IoIosClose
                          onClick={() => setDropDown(false)}
                          className="text-gray-500 text-xl"
                        />
                      </div>

                      <div className="px-4 py-4 space-y-3">
                        <button
                          className="flex items-center justify-start gap-2 w-full py-2 rounded-md text-gray-800 hover:bg-gray-100 text-left"
                          onClick={() => {
                            navigate("/user/profile");
                            setDropDown(false);
                          }}
                        >
                          <FaUser className="min-w-[20px]" />
                          Profile
                        </button>

                        <button
                          className="flex items-center justify-start gap-2 w-full py-2 rounded-md text-gray-800 hover:bg-gray-100 text-left"
                          onClick={() => {
                            navigate("/user/bookings");
                            setDropDown(false);
                          }}
                        >
                          <MdOutlineBookmarks className="min-w-[20px]" />
                          My Bookings
                        </button>

                        <button
                          className="flex items-center justify-start gap-2 w-full py-2 rounded-md text-gray-800 hover:bg-gray-100 text-left"
                          onClick={() => {
                            setConfirmLogout(true);
                            setDropDown(false);
                          }}
                        >
                          <FaSignOutAlt className="min-w-[20px]" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden lg:block text-sm text-gray-700 border border-gray-300 rounded px-5 py-1.5 hover:bg-gray-100"
              >
                Login
              </button>
            )}
            {!open && (
              <div className="lg:hidden" onClick={() => setOpen(true)}>
                <MdMenu
                  className={`${
                    showTransparent ? "text-white" : "text-black"
                  } text-3xl cursor-pointer`}
                />
              </div>
            )}
          </div>
        </div>
        <CustomToastContainer />
      </nav>

      <ResponsiveNavLinks
        open={open}
        setOpen={setOpen}
        isAuthenticated={isAuthenticated}
        onLogout={() => setConfirmLogout(true)}
        navigate={navigate}
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
    </>
  );
};

export default Header;
