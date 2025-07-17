import { motion, AnimatePresence } from "framer-motion";
import { NavbarMenu } from "./navLinks";
import { MdClose } from "react-icons/md";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

type ResponsiveNavLinksProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  onLogout: () => void;
  navigate: (path: string) => void;
};
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  exit: { opacity: 0, y: 30 },
};

const ResponsiveNavLinks = ({
  open,
  setOpen,
  isAuthenticated,
  onLogout,
  navigate,
}: ResponsiveNavLinksProps) => {
  const menuItems = [
    ...NavbarMenu.map((item) => ({
      id: item.id,
      title: item.title,
      action: () => navigate(item.link),
    })),
    ...(isAuthenticated
      ? [
          {
            id: "profile",
            title: "Profile",
            icon: <FaUser size={36} />,
            action: () => navigate("/user/profile"),
          },
          {
            id: "logout",
            title: "Logout",
            icon: <FaSignOutAlt size={36} />,
            action: onLogout,
          },
        ]
      : []),
  ];

  return (
    <AnimatePresence mode="wait">
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-md z-40"
            onClick={() => setOpen(false)}
          />

          {/* Menu Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 text-white"
          >
            {/* Close Button */}
            <MdClose
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white text-4xl cursor-pointer"
            />
            <motion.ul
              className="flex flex-col items-start gap-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {menuItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={itemVariants}
                  onClick={() => {
                    item.action();
                    setOpen(false);
                  }}
                  className="flex flex-col items-center text-sm font-semibold hover:text-main_color cursor-pointer transition"
                >
                  <span className="mt-2">{item.title}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveNavLinks;
