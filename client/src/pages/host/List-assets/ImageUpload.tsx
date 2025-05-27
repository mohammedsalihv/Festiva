import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeImage, addCroppedImage, setAllImages } from "@/redux/Slice/host/imageSlice";
import ImageCropper from "@/components/ImageCropper";
import { Images } from "@/assets";
import { toast } from "react-toastify";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { useNavigate } from "react-router-dom";

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
      e.target.value = ""; // clear input value
    }
  };

  const handleRemoveImage = (index: number) => {
    dispatch(removeImage(index));
  };

  const handleCloseCropper = (file: File) => {
    dispatch(addCroppedImage(file)); // Either cropped or original passed from cropper
    setIsCropping(false);
    setSelectedFile(null);
  };

  const handleSubmit = () => {
    if (croppedImages.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    setLoading(true);
    dispatch(setAllImages(croppedImages)); // Optionally redundant
    toast.success("Images saved successfully");
    navigate("/host/location-details/");
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-white flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 p-8 bg-white">
        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-xl font-semibold mb-4 font-prompt">
            Get your listing to stand out
          </h2>
          <p className="text-red-500 bg-red-100 px-3 py-1 rounded mb-2 text-sm inline-block">
            You need at least 1 photo. You can skip for now, but won’t be able
            to publish the listing.
          </p>
          <p className="text-gray-600 mb-4 text-sm font-JosephicSans">
            Add as many images of your location as you'd like. Photographers
            typically select a location based on the photos. Make sure your
            images are at least 1020px wide.
          </p>

          <div
            onClick={handleUploadClick}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center text-center cursor-pointer hover:border-indigo-500 transition"
          >
            <p className="text-sm text-gray-500">
              Drag and drop or{" "}
              <span className="text-indigo-600 font-medium">
                click to upload your photos
              </span>
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

          <div className="mt-6 grid grid-cols-3 gap-4">
            {croppedImages.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`Preview ${index}`}
                  className="w-full h-32 object-cover rounded shadow"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-black text-white rounded-full px-2 py-1 text-xs hidden group-hover:block"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-gray-50 border border-gray-200 rounded-lg px-8 py-5 mt-6 md:mt-8 hidden md:block">
          <img
            src={Images.image_uplaod}
            alt="Photographer Illustration"
            className="mb-4 mx-auto h-24"
          />
          <h3 className="text-lg font-semibold mb-2">Showcase your location.</h3>
          <p className="text-gray-600 text-sm mb-4 font-JosephicSans">
            Include photos of the areas that will be available: interior and
            exterior.
          </p>
        </div>
      </div>

      {isCropping && selectedFile && (
        <ImageCropper file={selectedFile} onClose={handleCloseCropper} />
      )}

      <div className="flex justify-end mt-10">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`flex items-center justify-center gap-2 bg-main_host text-white px-10 py-3 rounded-lg transition ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:brightness-110"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Submitting...
            </>
          ) : (
            "Next"
          )}
        </button>
      </div>

      <CustomToastContainer />
    </div>
  );
};

export default ImageUploader;
