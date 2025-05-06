import { IoSettings } from "react-icons/io5";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { SiBookstack } from "react-icons/si";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { HiMiniUsers } from "react-icons/hi2";
import { FaUsersRectangle } from "react-icons/fa6";

const navItems = [
  {
    icon: RiDashboardHorizontalFill,
    label: "Home",
    link: "/admin/dashboard",
  },
  { icon: SiBookstack, label: "Bookings", link: "/admin/bookings" },
  { icon: HiMiniUsers, label: "Customers", link: "/admin/users" },
  { icon: FaUsersRectangle, label: "Hosts", link: "/admin/hosts" },
  { icon: IoSettings, label: "Settings", link: "/admin/dettings" },
  { icon: RiLogoutCircleRLine, label: "Signout" , isLogout: true, },
];

export default navItems;
