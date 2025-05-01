import { FC, useState } from "react";
import navItems from "@/utils/Navbar/admin/AdminSidebarNav";
import ConfirmDialog from "../user/Landing/ConfirmDialog";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "@/redux/Slice/admin/adminSlice";
import { toast } from "react-toastify";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";

const AdminSidebar: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin/admin-login");
    toast.success("Logout successfully");
  };

  return (
    <aside className="fixed left-0 h-screen w-16 flex flex-col justify-center items-center py-4 space-y-6 z-50">
      {navItems.map((item, i) => (
        <a
          key={i}
          title={item.label}
          className="text-black hover:text-blue-500 cursor-pointer"
          href={item.link}
          onClick={item.label === "Signout" ? handleLogout : undefined}
        >
          <item.icon className="text-[28px]" />
        </a>
      ))}

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
    </aside>
  );
};

export default AdminSidebar;
