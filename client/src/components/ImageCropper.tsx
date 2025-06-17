import React, { useRef, useEffect, useState } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

interface ImageCropperProps {
  file: File;
  onClose: (file: File) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ file, onClose }) => {
  const cropperRef = useRef<CropperRef>(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleCropSave = () => {
    const canvas = cropperRef.current?.getCanvas();
    if (canvas) {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const croppedFile = new File([blob], file.name, {
              type: "image/jpeg",
            });
            onClose(croppedFile);
          }
        },
        "image/jpeg",
        0.92
      );
    }
  };

  const handleCancel = () => {
    onClose(file);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center font-JosephicSans">
      <div className="bg-white rounded-lg shadow-lg w-[90vw] max-w-3xl h-[80vh] flex flex-col">
        <div className="flex-grow overflow-hidden rounded-t-lg">
          {imageUrl && (
            <Cropper
              ref={cropperRef}
              src={imageUrl}
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
          )}
        </div>
        <div className="p-4 flex justify-center gap-4 border-t">
          <button
            onClick={handleCropSave}
            className="border-2  px-3 py-1 rounded border-main_host text-main_host hover:bg-main_host hover:text-main_white"
          >
            crop & save
          </button>
          <button
            onClick={handleCancel}
            className="bg-black px-3 py-1 text-sm text-white rounded hover:bg-gray-900"
          >
            skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
