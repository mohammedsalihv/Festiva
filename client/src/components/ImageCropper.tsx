import React, { useRef, useEffect } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { useAppDispatch } from "@/redux/hooks";
import { addCroppedImage } from "@/redux/Slice/host/imageSlice";

interface ImageCropperProps {
  file: File;
  onClose: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ file, onClose }) => {
  const dispatch = useAppDispatch();
  const cropperRef = useRef<CropperRef>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleCropSave = () => {
    const canvas = cropperRef.current?.getCanvas();
    if (canvas) {
      const croppedDataUrl = canvas.toDataURL("image/jpeg", 0.92);
      dispatch(addCroppedImage(croppedDataUrl)); 
      onClose();
    }
  };

  const handleCancel = () => {
    const reader = new FileReader();
    reader.onload = () => {
      dispatch(addCroppedImage(reader.result as string)); 
      onClose();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[90vw] max-w-3xl h-[80vh] flex flex-col">
        <div className="flex-grow overflow-hidden rounded-t-lg">
          <Cropper
            ref={cropperRef}
            src={URL.createObjectURL(file)}
            stencilProps={{
              movable: true,
              resizable: true,
              handlers: true,
            }}
            defaultSize={{
              width: 300,
              height: 300,
            }}
            className="h-full w-full"
            backgroundClassName="bg-gray-100"
          />
        </div>
        <div className="p-4 flex justify-center gap-4 border-t">
          <button
            onClick={handleCropSave}
            className="border-2 border-green-700 px-4 py-2 text-black rounded hover:bg-green-700 hover:text-white"
          >
            Crop & Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 px-4 py-2 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
