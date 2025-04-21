import { NavbarMenu } from "@/utils/Navbar/navLinks";
import { CiSearch } from "react-icons/ci";
import { MdMenu, MdClose } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";
import ResponsiveNavLinks from "../../../utils/Navbar/ResponsiveNavLinks";
import { useNavigate } from "react-router-dom";
import LogoText from "@/components/LogoText";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-30 bg-transparent mt-4">
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
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block hover:bg-main_color hover:border-main_color text-white border border-neutral-300 rounded-md px-6 py-1.5 duration-300 font-JosephicSans"
            >
              Login
            </button>
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
      <ResponsiveNavLinks open={open} setOpen={setOpen} />
    </>
  );
};

export default Header;
