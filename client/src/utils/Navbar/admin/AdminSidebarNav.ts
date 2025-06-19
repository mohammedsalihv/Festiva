
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { SiBookstack } from "react-icons/si";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { HiMiniUsers } from "react-icons/hi2";
import { FaUsersRectangle } from "react-icons/fa6";
import { MdOutlineManageAccounts } from "react-icons/md";
import { DiDatabase } from "react-icons/di";


const navItems = [
  {
    icon: RiDashboardHorizontalFill,
    label: "Home",
    link: "/admin/dashboard",
  },
  { icon: SiBookstack, label: "Bookings", link: "/admin/bookings" },
  { icon: HiMiniUsers, label: "Customers  Management", link: "/admin/users" },
  { icon: FaUsersRectangle, label: "Host Management", link: "/admin/hosts" },
  { icon: DiDatabase, label: "Asset Management", link: "/admin/assets" },
  { icon: MdOutlineManageAccounts, label: "Settings", link: "/admin/settings" },
  { icon: RiLogoutCircleRLine, label: "Signout" , isLogout: true, },
];

export default navItems;
