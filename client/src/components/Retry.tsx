import React from "react";
import { CiRedo } from "react-icons/ci";

interface RetryProps {
  message: string;
  onRetry?: () => void;
}

const Retry: React.FC<RetryProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 mt-20 text-gray-500">
      <button
        onClick={onRetry}
        aria-label="Retry loading"
        className="mt-4 px-4 py-2 text-base flex items-center gap-2 font-bold hover:text-main_color transition-colors"
      >
        {message} <CiRedo className="text-main_color font-bold" />
      </button>
    </div>
  );
};

export default Retry;
