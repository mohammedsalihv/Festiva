import { NavbarMenu } from "@/utils/Navbar/user/navLinks";
import { CiSearch } from "react-icons/ci";
import { MdMenu, MdClose } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import React, { useState, useRef, useEffect } from "react";
import ResponsiveNavLinks from "../../../utils/Navbar/user/ResponsiveNavLinks";
import { useNavigate } from "react-router-dom";
import LogoText from "@/components/LogoText";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logoutUser } from "@/redux/Slice/user/userSlice";
import { Images } from "@/assets";
import ConfirmDialog from "./ConfirmDialog";
import { toast } from "react-toastify";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [confirmLogout, setConfirmLogout] = useState(false);

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

  const handleLogout = () => {
    dispatch(logoutUser());
    setTimeout(() => {
      toast.success("Logout successful");
    }, 500);
    navigate("/");
  };
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-30 bg-black bg-opacity-40 text-white backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center px-4 py-6">
          <LogoText />
          <div className="hidden md:block">
            <ul className="flex items-center gap-6">
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  <a
                    className="inline-block py-1 px-3 hover:text-main_color font-semibold text-white font-JosephicSans"
                    href={item.link}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-white text-xl sm:text-2xl hover:bg-main_color hover:text-white rounded-full p-2 duration-300">
              <CiSearch />
            </button>
            <button className="text-white text-xl sm:text-2xl hover:bg-main_color hover:text-white rounded-full p-2 duration-300">
              <CiLocationOn />
            </button>
            {isAuthenticated ? (
              <div className="relative hidden md:block" ref={dropDownRef}>
                <img
                  onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                    e.preventDefault();
                    setDropDown((prev) => !prev);
                  }}
                  src={
                    profile?.profilePic
                      ? `${import.meta.env.VITE_PROFILE_URL}${
                          profile.profilePic
                        }`
                      : Images.default_profile
                  }
                  alt=""
                  className="w-10 h-10 rounded-full cursor-pointer border border-white bg-white"
                />
                {dropDown && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border z-50 shadow-lg rounded-md font-JosephicSans py-2">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-md text-black"
                      onClick={() => navigate("/user/profile")}
                    >
                      Profile
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-md text-black"
                      onClick={() => navigate("/user/bookings")}
                    >
                      My bookings
                    </button>
                    <button
                      onClick={() => setConfirmLogout(true)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-md text-black"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden md:block hover:bg-main_color hover:border-main_color text-white border border-neutral-300 rounded-md px-6 py-1.5 duration-300 font-JosephicSans"
              >
                Login
              </button>
            )}
          </div>
          <div className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? (
              <MdClose className="text-4xl cursor-pointer " />
            ) : (
              <MdMenu className="text-4xl cursor-pointer" />
            )}
          </div>
        </div>
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
