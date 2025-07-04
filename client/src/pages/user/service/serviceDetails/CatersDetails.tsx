import React, { useState } from "react";
import { Images } from "@/assets";
import { X } from "lucide-react";
import { ICaters } from "@/utils/Types/user/catersTypes";
import { VscDebugBreakpointData } from "react-icons/vsc";
import { BsCurrencyRupee } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

interface catersDetailsProps {
  data: ICaters & { typeOfAsset: "caters" };
}

const CatersDetails: React.FC<catersDetailsProps> = ({ data }) => {
  console.log(data);
  const [showGallery, setShowGallery] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="relative mt-16 sm:mt-20 md:mt-24 font-JosephicSans">
      <div className="w-full max-w-[1350px] mx-auto p-1">
        <div className="grid lg:grid-cols-3 gap-2">
          <div className="lg:col-span-2">
            <img
              src={
                data.Images && data.Images.length > 0
                  ? data.Images[0]
                  : Images.imageNA
              }
              alt="Main"
              onClick={() => setShowGallery(true)}
              className="w-full sm:h-[510px] object-cover rounded-md cursor-pointer"
            />
          </div>
          {data.Images && data.Images.length > 1 ? (
            <div className="hidden lg:grid grid-cols-2 gap-2 h-full">
              {data.Images.slice(1, 5).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`img${i}`}
                  onClick={() => setShowGallery(true)}
                  className="w-full h-[250px] object-cover rounded-md cursor-pointer"
                />
              ))}
            </div>
          ) : (
            <div className="hidden lg:grid grid-cols-2 gap-2 h-full">
              <img
                src={Images.imageNA}
                alt="Fallback"
                className="w-full h-[250px] object-cover rounded-md col-span-2"
              />
            </div>
          )}
        </div>
      </div>

      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 p-4 overflow-y-auto">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowGallery(false)}
              className="text-white"
            >
              <X size={30} />
            </button>
          </div>
          {data.Images && data.Images.length > 1 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {data.Images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`gallery-${i}`}
                  className="sm:h-96 sm:w-96 aspect-square object-cover rounded-md"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <img
                src={Images.imageNA}
                className="w-full aspect-square object-cover rounded-md"
              />
            </div>
          )}
        </div>
      )}
      <div className="w-full max-w-[1350px] mx-auto grid lg:grid-cols-3 gap-4 p-3 pb-28">
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold">
            {data.catersName?.toUpperCase()}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <div className="flex items-start sm:items-center gap-1">
              <CiLocationOn className="text-black shrink-0 mt-[2px]" />
              <p className="text-xs sm:text-base text-gray-500 font-poppins font-bold break-words">
                {[
                  data?.location?.houseNo,
                  data?.location?.street,
                  data?.location?.district,
                  data?.location?.state,
                  data?.location?.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
                {data?.location?.zip ? ` - ${data.location.zip}` : ""}
              </p>
            </div>
          </div>

          <div className="border-b py-3">
            <h2 className="text-xl font-semibold mb-1">About the Space</h2>
            <p className="text-base text-gray-700">{data.about}</p>
          </div>

          <div className="border-b py-3">
            <h3 className="text-xl font-semibold mb-2">Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 text-base text-gray-600 gap-y-2">
              <div>Manpower: {data.manpower} persons</div>
              <div>Charge per person : {data.charge}</div>
            </div>
          </div>

          <div className="border-b py-3">
            <h3 className="text-xl font-semibold mb-2">
              Features of the service
            </h3>
            <ul className="list-inside text-base text-gray-600">
              {data.features &&
                data.features.map((feature, i) => (
                  <div className="flex items-center gap-2">
                    <VscDebugBreakpointData className="text-black text-xs" />
                    <li key={i}>{feature}</li>
                  </div>
                ))}
            </ul>
          </div>

          <div className="border-b py-3">
            <h3 className="text-xl font-semibold mb-2">Available services</h3>
            <div className="flex gap-4 flex-wrap text-base text-gray-600">
              {data.serviceTypes &&
                data.serviceTypes.map((types, i) => (
                  <div className="flex items-center gap-1">
                    <VscDebugBreakpointData className="text-black text-xs" />
                    <span key={i}>{types}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="py-3 border-b">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-base text-gray-700">{data.description}</p>
          </div>

          <div className="py-3 border-b">
            <h2 className="text-xl font-semibold mb-2">Terms & Conditions</h2>
            <p className="text-base text-gray-700">{data.conditions}</p>
          </div>

          <div className=" pt-6 mt-6 border border-gray-300 p-4 rounded-md bg-gray-100">
            <h3 className="text-base font-bold text-gray-800 mb-2">
              Hosted by <span className="font-bold">{data.host.name}</span>
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-600">
              <div>
                <p>Member since December 2022</p>
                <p className="text-xs mt-1 text-main_color">
                  Responds within a few hours
                </p>
              </div>
              <button className="text-base mt-2 sm:mt-0 bg-gray-200 text-gray-800 px-4 py-2 rounded border hover:border-main_color_hover hover:text-main_color_hover">
                Message Host
              </button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block space-y-4 rounded-md">
          <div className="border p-4 rounded-lg shadow-md w-full max-w-md space-y-4">
            <div className="text-xl font-semibold flex items-center">
              <BsCurrencyRupee className="text-xl" />
              {data.totalAmount}
              <span className="text-gray-500 text-sm ml-1">/Day</span>
              <span className="text-gray-500 text-sm ml-auto">
                1 hr. minimum
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-center gap-6 pb-3 cursor-pointer">
                <div className="border-b-2 border-gray-300 px-4 py-2 w-full text-center text-sm font-medium text-main_color hover:border-main_color transition">
                  Pick a Date
                </div>
                <div className="border-b-2 border-gray-300 px-4 py-2 w-full text-center text-sm font-medium text-main_color hover:border-main_color transition">
                  Pick a Time
                </div>
              </div>

              <div className="text-right text-sm text-gray-500">
                Total hours: 0
              </div>
            </div>

            <div className="relative">
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none">
                <option>Attendees: 1 - 5 people</option>
              </select>
            </div>
            <button className="w-full bg-main_color text-white font-semibold py-2 rounded hover:bg-main_color_hover transition">
              Reserve
            </button>

            <p className="text-xs text-gray-400 text-center">
              Cancel for free within 24 hours <span className="ml-1">ℹ️</span>
            </p>
          </div>
          <div className="border p-4 rounded-lg shadow-md w-full max-w-md space-y-2 text-sm text-gray-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3">
              <img
                src={data.host.profilePic}
                alt="Host Profile"
                className="w-14 h-14 border rounded-full p-1 object-cover"
              />
              <p className="text-gray-700 text-base font-bold">
                Hosted by: {data.host.name}
              </p>
            </div>
            <button className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition">
              Message Host
            </button>
          </div>
        </div>
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center">
              <BsCurrencyRupee className="text-lg" />
              {data.totalAmount}
              <span className="text-gray-500 text-sm ml-1">/Day</span>
            </h2>
          </div>
          <button
            onClick={() => setShowOverlay(true)}
            className="bg-main_color text-white px-4 py-2 rounded"
          >
            Instant Book
          </button>
        </div>
      </div>

      {showOverlay && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white p-4 overflow-y-auto">
          <div className="flex justify-end">
            <button onClick={() => setShowOverlay(false)}>
              <IoClose className="text-2xl text-gray-600" />
            </button>
          </div>

          <div className="space-y-4 mt-2">
            <div className="text-xl font-semibold flex items-center">
              <BsCurrencyRupee className="text-xl" />
              {data.totalAmount}
              <span className="text-gray-500 text-sm ml-1">/Day</span>
              <span className="text-gray-500 text-sm ml-auto">
                1 hr. minimum
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="w-full border-b pb-3">
                <div className="flex justify-center gap-6 cursor-pointer">
                  <div className="border-b-2 border-gray-300 px-4 py-2 w-full text-center text-main_color hover:border-main_color transition">
                    Pick a Date
                  </div>
                  <div className="border-b-2 border-gray-300 px-4 py-2 w-full text-center text-main_color hover:border-main_color transition">
                    Pick a Time
                  </div>
                </div>
              </div>

              <button className="text-sm text-main_color font-medium hover:underline">
                Add a day
              </button>

              <div className="text-right text-sm text-gray-500">
                Total hours: 0
              </div>
            </div>

            <div className="relative">
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none">
                <option>Attendees: 1 - 5 people</option>
              </select>
            </div>

            <button className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition">
              Reserve
            </button>

            <p className="text-xs text-gray-400 text-center">
              Cancel for free within 24 hours <span className="ml-1">ℹ️</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatersDetails;
