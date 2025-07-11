import { useState } from "react";
import HostSignup from "./HostSignup";
import HostLogin from "./HostLogin";

interface Props {
  isLogin: boolean;
  onClose: () => void;
}

const HostAuthModal = ({ isLogin, onClose }: Props) => {
  const [isLoginMode, setIsLoginMode] = useState(isLogin);

  return isLoginMode ? (
    <HostLogin
      onClose={onClose}
      showSignup={() => setIsLoginMode(false)}
    />
  ) : (
    <HostSignup
      onClose={onClose}
      showLogin={() => setIsLoginMode(true)}
    />
  );
};

export default HostAuthModal;
