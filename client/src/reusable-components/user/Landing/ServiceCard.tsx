import { useState, useEffect, useRef } from "react";
import { FaHeart, FaShareAlt, FaLocationArrow, FaRupeeSign, FaSlidersH, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { Images } from "@/assets";
type Asset = {
  id: number;
  title: string;
  costPerDay: number;
  place: string;
  images: string[];
  rating?: number;
  responseTime?: string;
};

type ServicesCardProps = {
  assets: Asset[];
};

export default function ServicesCard({ assets }: ServicesCardProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 font-JosephicSans">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-2 sm:mb-4 gap-2 sm:gap-3 border-b">
        <div className="w-full relative">
          <FaSearch className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm" />
          <input
            type="text"
            placeholder="Add keywords..."
            className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1 sm:py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
            aria-label="Search for venues"
          />
        </div>
       <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto relative my-2 sm:my-0 pb-2">
          <div className="flex gap-1 sm:gap-2 overflow-x-auto lg:overflow-x-visible lg:flex-nowrap py-1 sm:py-0">
            <button
              className="px-3 sm:px-5 py-1 rounded-2xl border text-gray-700 text-xs sm:text-sm hover:bg-gray-200 whitespace-nowrap"
              aria-label="Filter by All Spaces"
            >
              All Spaces
            </button>
            <button
              className="px-3 sm:px-5 py-1 rounded-2xl border text-gray-700 text-xs sm:text-sm hover:bg-gray-200 whitespace-nowrap"
              aria-label="Filter by Photo Studio"
            >
              Photo Studio
            </button>
            <button
              className="px-3 sm:px-5 py-1 rounded-2xl border text-gray-700 text-xs sm:text-sm hover:bg-gray-200 whitespace-nowrap"
              aria-label="Filter by Film Studio"
            >
              Film Studio
            </button>
            <button
              className="px-3 sm:px-5 py-1 rounded-2xl border text-gray-700 text-xs sm:text-sm hover:bg-gray-200 whitespace-nowrap"
              aria-label="Filter by Warehouse"
            >
              Warehouse
            </button>
          </div>
          <div className="relative lg:ml-2 lg:static lg:flex-shrink-0">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-1 px-3 sm:px-5 py-2 sm:py-2 bg-main_color rounded-2xl border text-white text-xs sm:text-sm hover:bg-indigo-500 sticky right-0 lg:static"
              aria-label="Open filters"
            >
              <FaSlidersH className="text-xs" />
              Filters
            </button>
            {isFilterOpen && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                <div
                  ref={filterRef}
                  className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 max-w-md bg-white rounded-lg shadow-lg p-3 sm:p-4 max-h-[80vh] overflow-y-auto relative"
                >
                  <h1 className="text-center text-base sm:text-lg border-b pb-1 sm:pb-2 mb-2 sm:mb-4">
                    Filters
                  </h1>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="absolute top-1 sm:top-2 right-1 sm:right-2 text-gray-500 hover:text-gray-700"
                    aria-label="Close filters"
                  >
                    <svg
                      className="w-4 sm:w-5 h-4 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="mb-2 sm:mb-4 border-b p-2 sm:p-4">
                    <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                      Venue Features
                    </h4>
                    <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
                      <input type="checkbox" className="accent-blue-500" />
                      Garden/Yard
                    </label>
                    <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
                      <input type="checkbox" className="accent-blue-500" />
                      High Ceiling
                    </label>
                    <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
                      <input type="checkbox" className="accent-blue-500" />
                      Light Wood/Whitewash Floor
                    </label>
                    <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
                      <input type="checkbox" className="accent-blue-500" />
                      Open Kitchen
                    </label>
                    <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
                      <input type="checkbox" className="accent-blue-500" />
                      White Walls
                    </label>
                    <button className="text-main_color text-xs sm:text-sm mt-1 sm:mt-2 text-left">
                      Show all (349)
                    </button>
                  </div>

                  {/* Location Allows Section */}
                  <div className="mb-2 sm:mb-4 p-2 sm:p-4">
                    <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                      Location Allows
                    </h4>
                    <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
                      <input type="checkbox" className="accent-blue-500" />
                      Adult Filming
                    </label>
                    <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
                      <input type="checkbox" className="accent-blue-500" />
                      Pets
                    </label>
                    <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
                      <input type="checkbox" className="accent-blue-500" />
                      Alcohol
                    </label>
                    <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
                      <input type="checkbox" className="accent-blue-500" />
                      Smoking
                    </label>
                    <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
                      <input type="checkbox" className="accent-blue-500" />
                      Loud Noises
                    </label>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2 sm:pt-3">
                    <button className="text-gray-600 text-xs sm:text-sm hover:text-gray-800">
                      Clear all
                    </button>
                    <button className="bg-main_color text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-indigo-500">
                      Show 132 listings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-4 text-xs sm:text-sm text-gray-600 gap-1 sm:gap-2">
        <p className="text-center sm:text-left">
          Showing 1-24 of 132 wedding locations near Los Angeles, CA, USA
        </p>
        <button
          className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 hover:text-blue-500"
          aria-label="Show map"
        >
          <FaMapMarkerAlt className="text-xs" />
          Show map
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="relative h-36 sm:h-48 w-full">
              <img
                src={Images.business_space}
                alt={asset.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-1 sm:gap-2">
                <button
                  className="bg-white/80 rounded-full p-1 sm:p-1.5 hover:bg-white"
                  aria-label="Add to favorites"
                >
                  <FaHeart className="text-gray-600 hover:text-red-500 text-xs sm:text-sm" />
                </button>
                <button
                  className="bg-white/80 rounded-full p-1 sm:p-1.5 hover:bg-white"
                  aria-label="Share"
                >
                  <FaShareAlt className="text-gray-600 hover:text-blue-400 text-xs sm:text-sm" />
                </button>
              </div>
            </div>

            <div className="p-2 sm:p-3 space-y-1">
              <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2">
                {asset.title}
              </h3>
              <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-900">
                <FaRupeeSign className="text-xs" />
                <span>{asset.costPerDay} / hr</span>
                <span className="text-gray-500 font-normal">
                  • {asset.responseTime || "Responds within 1 hr"}
                </span>
              </div>
              <div className="text-xs sm:text-xs text-gray-500 flex items-center gap-1">
                <FaLocationArrow className="text-xs" />
                <span>{asset.place}</span>
              </div>
              {asset.rating && (
                <div className="text-xs sm:text-xs text-gray-600 font-medium flex items-center gap-1">
                  <span className="text-green-600">★</span>
                  <span>
                    {asset.rating.toFixed(1)} ({Math.floor(Math.random() * 1000) + 1})
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}