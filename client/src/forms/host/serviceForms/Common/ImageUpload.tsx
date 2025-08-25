import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeImage,
  addCroppedImage,
  setAllImages,
} from "@/redux/Slice/host/common/imageSlice";
import ImageCropper from "@/components/ImageCropper";
import { Images } from "@/assets";
import { toast } from "react-toastify";
import CustomToastContainer from "@/reusable-components/messages/ToastContainer";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { GrFormClose } from "react-icons/gr";

const ImageUploader: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const croppedImages = useAppSelector((state) => state.images.croppedImages);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsCropping(true);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    dispatch(removeImage(index));
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleCloseCropper = async (file: File) => {
    const base64 = await fileToBase64(file);
    dispatch(addCroppedImage(base64));
    setIsCropping(false);
    setSelectedFile(null);
  };

  const handleSubmit = () => {
    if (croppedImages.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    setLoading(true);
    dispatch(setAllImages(croppedImages));
    toast.success("Saving...");
    setTimeout(() => {
      navigate("/host/list/location-details/");
    }, 2000);
  };

  return (
    <div className="max-w-full mt-8 px-4 sm:px-6 md:px-10 py-6 bg-white flex flex-col font-poppins">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Left Panel */}
        <div className="w-full md:w-[60%] lg:w-[65%] xl:w-[70%]">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 font-prompt">
            Get your listing to stand out
          </h2>

          <p className="text-red-500 bg-red-100 px-3 py-2 rounded mb-3 text-sm">
            You need at least 1 photo. You can skip for now, but won’t be able
            to publish the listing.
          </p>

          <p className="text-gray-600 mb-4 text-sm font-JosephicSans">
            Add as many images of your location as you'd like. Photographers
            typically select a location based on the photos. Make sure your
            images are at least 1020px wide.
          </p>

          {/* Upload Box */}
          <div
            onClick={handleUploadClick}
            className="border-2 border-dashed border-black rounded-lg p-4 sm:p-5 md:p-6 w-full max-w-full sm:max-w-[450px] flex flex-col items-center text-center cursor-pointer hover:border-main_host transition"
          >
            <p className="text-sm font-JosephicSans font-bold">
              Drag and drop or{" "}
              <span className="text-black font-bold">click to upload</span>
            </p>
            <p className="text-xs text-gray-400 mt-1 font-JosephicSans">
              Add as many images of your location as you'd like (at least 1)
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(100px,0fr))] justify-start gap-2 sm:gap-4 md:gap-8">
            {croppedImages.map((base64, index) => (
              <div
                key={index}
                className="relative group w-[100px] sm:w-[120px] md:w-[128px] aspect-square"
              >
                <img
                  src={base64}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-black bg-opacity-70 text-white rounded-full p-1 hover:bg-red-600 transition hidden group-hover:block"
                >
                  <GrFormClose size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Illustration */}
        <div className="w-full md:w-[40%] lg:w-[35%] xl:w-[30%] bg-gray-50 border border-gray-200 rounded-lg px-4 sm:px-6 py-5 mt-4 md:mt-0 hidden md:block">
          <img
            src={Images.image_uplaod}
            alt="Photographer Illustration"
            className="mb-4 mx-auto h-24"
          />
          <h3 className="text-base sm:text-lg font-semibold mb-2">
            Showcase your location.
          </h3>
          <p className="text-gray-600 text-sm mb-4 font-JosephicSans">
            Include photos of the areas that will be available: interior and
            exterior.
          </p>
        </div>
      </div>

      {/* Cropper Modal */}
      {isCropping && selectedFile && (
        <ImageCropper file={selectedFile} onClose={handleCloseCropper} />
      )}

      {/* Submit Button */}
      <div className="flex justify-center md:justify-end mt-8">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`flex items-center justify-center gap-2 bg-main_host text-white px-6 py-2 sm:px-10 sm:py-3 rounded-lg transition ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:brightness-110"
          }`}
        >
          {loading ? <Spinner text="Saving..." /> : "Next"}
        </button>
      </div>

      <CustomToastContainer />
    </div>
  );
};

export default ImageUploader;
