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
            className="fixed top-0 left-0 w-full h-full backdrop-blur-full bg-black/30 z-10"
          />
          <div className="fixed top-[17px] right-4 z-50 md:hidden">
            <MdClose
              onClick={() => setOpen(false)}
              className="text-white text-4xl cursor-pointer"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-18 left-0 w-full h-screen z-50 bg-black"
          >
            <div className="text-sm font-semibold text-white py-10 m-1 mt-11 md:hidden shadow-lg">
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
