import * as Dailog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

interface confirmDailogProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}

const ConfirmDialog: React.FC<confirmDailogProps> = ({
  isOpen,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  children,
}) => {
  return (
    <Dailog.Root open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AnimatePresence>
        {isOpen && (
          <Dailog.Portal forceMount>
            <Dailog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dailog.Overlay>
            <Dailog.Content asChild>
              <motion.div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 sm:p-6 bg-white shadow-xl rounded-xl"                >
                  <div className="flex justify-between items-center">
                    <Dailog.Title className="text-lg font-semibold">
                      {title}
                    </Dailog.Title>
                    <Dailog.Close asChild>
                      <button onClick={onCancel}>
                        <X className="w-5 h-5 text-sm text-gray-500 hover:text-black" />
                      </button>
                    </Dailog.Close>
                  </div>

                  <Dailog.Description className="text-gray-600 mt-2">
                    {description}
                  </Dailog.Description>

                  {children && <div className="mt-4">{children}</div>}

                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      onClick={onCancel}
                      className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
                    >
                      {cancelText}
                    </button>
                    <button
                      onClick={onConfirm}
                      className="px-4 sm:py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      {confirmText}
                    </button>
                  </div>
                </div>
              </motion.div>
            </Dailog.Content>
          </Dailog.Portal>
        )}
      </AnimatePresence>
    </Dailog.Root>
  );
};

export default ConfirmDialog;
