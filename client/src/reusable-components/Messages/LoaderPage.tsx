import Loader from "@/components/Loader";
import React, { useEffect, useState } from "react";

interface PageWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

const LoaderPage: React.FC<PageWrapperProps> = ({ children, delay = 1500 }) => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return isReady ? (
    <>{children}</>
  ) : (
    <div className="flex items-center justify-center h-screen bg-white">
      <Loader size={64} color="#000" />
    </div>
  );
};

export default LoaderPage;
