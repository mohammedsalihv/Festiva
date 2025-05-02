import { IoSettings } from "react-icons/io5";
import { PiUsersThreeFill } from "react-icons/pi";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { SiBookstack } from "react-icons/si";
import { RiLogoutCircleRLine } from "react-icons/ri";

const navItems = [
  {
    icon: RiDashboardHorizontalFill,
    label: "Home",
    link: "/admin/dashboard",
  },
  { icon: SiBookstack, label: "Bookings", link: "/admin/bookings" },
  { icon: PiUsersThreeFill, label: "Customers", link: "/admin/users" },
  { icon: IoSettings, label: "Settings", link: "/admin/dettings" },
  { icon: RiLogoutCircleRLine, label: "Signout" , isLogout: true, },
];

export default navItems;
