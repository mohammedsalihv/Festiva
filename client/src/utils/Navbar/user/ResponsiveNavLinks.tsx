import { motion, AnimatePresence } from "framer-motion";
import { NavbarMenu } from "./navLinks";
import { MdClose } from "react-icons/md";

type ResponsiveNavLinksProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  onLogout: () => void;
  navigate: (path: string) => void;
};

const ResponsiveNavLinks = ({
  open,
  setOpen,
  isAuthenticated,
  onLogout,
  navigate,
}: ResponsiveNavLinksProps) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-black/60 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Menu Content */}
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-transparent backdrop-blur-sm z-50 overflow-y-auto"
          >
            {/* Close button inside menu */}
            <div className="absolute top-5 right-4">
              <MdClose
                onClick={() => setOpen(false)}
                className="text-white text-4xl cursor-pointer"
              />
            </div>

            <div className="text-sm font-semibold text-white py-10 mt-16 px-6">
              <ul className="flex flex-col justify-center items-center gap-7 cursor-pointer">
                {NavbarMenu.map((item) => (
                  <li key={item.id}>
                    <a
                      className="hover:text-main_color transition-colors duration-300"
                      href={item.link}
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
                {isAuthenticated && (
                  <>
                    <li>
                      <button
                        className="hover:text-main_color transition-colors duration-300"
                        onClick={() => {
                          navigate("/profile");
                          setOpen(false);
                        }}
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        className="hover:text-main_color transition-colors duration-300"
                        onClick={() => {
                          onLogout();
                          setOpen(false);
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveNavLinks;
