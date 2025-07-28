import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoText = () => {
  const [scrolled, setIsScrolled] = useState(false);
  const isHomePage = location.pathname === "/user/home";
  const landingPage = location.pathname === "/";
  const showTransparent = isHomePage && !scrolled;
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      onClick={() => navigate("/user/home")}
      className="text-xl sm:text-2xl flex items-center gap-2 font-bold uppercase cursor-pointer"
    >
      <span
        className={`${
          landingPage
            ? "text-gray-300"
            : showTransparent
            ? "text-gray-400"
            : "text-black"
        } font-orbitron text-2xl sm:text-3xl`}
      >
        Festiva.
      </span>
    </div>
  );
};

export default LogoText;
