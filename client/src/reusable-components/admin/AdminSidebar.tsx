import { FC, useState } from "react";
import navItems from "@/utils/Navbar/admin/AdminSidebarNav";
import ConfirmDialog from "../user/Landing/ConfirmDialog";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "@/redux/Slice/admin/adminSlice";
import { toast } from "react-toastify";
import CustomToastContainer from "@/reusable-components/messages/ToastContainer";

const AdminSidebar: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const handleLogout = () => {
    dispatch(logoutAdmin());
    setTimeout(() => {
      toast.success("Logout Successful!");
    }, 1000);
    navigate("/admin/admin-login");
  };

  return (
    <aside className="font-prompt fixed left-0 h-screen w-16 flex flex-col justify-center items-center py-4 space-y-6 z-50">
      {navItems.map((item, i) => (
        <a
          key={i}
          title={item.label}
          className="text-black hover:text-blue-500 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            if (item.isLogout) {
              setConfirmLogout(true);
            } else if (item.link) {
              navigate(item.link);
            }
          }}
        >
          <item.icon className="text-[28px]" />
        </a>
      ))}

      <CustomToastContainer />

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
    </aside>
  );
};

export default AdminSidebar;
