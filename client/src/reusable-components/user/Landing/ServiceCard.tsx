import { useState, useEffect, useRef } from "react";
import ServiceCardFilter from "@/components/ServiceCardFilter";
import {
  FaHeart,
  FaShareAlt,
  FaLocationArrow,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaSearch,
} from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { IRentCarBase } from "@/utils/Types/user/rentCarTypes";
import { IVenueBase } from "@/utils/Types/user/venueTypes";
import { Images } from "@/assets";
import Loader from "@/components/Loader";
import Retry from "@/components/Retry";
import { serviceOptions } from "@/utils/Options/user/serviceOptions";
import { ICatersBase } from "@/utils/Types/user/catersTypes";
import { IStudioBase } from "@/utils/Types/user/studioTypes";

type Asset = IRentCarBase | IVenueBase | ICatersBase | IStudioBase;

type ServicesCardProps = {
  assets: Asset[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
};

export default function ServicesCard({
  assets,
  loading,
  error,
  onRetry,
}: ServicesCardProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { type } = useParams();
  const normalizedType = type?.toLowerCase();
  const [selectedTab, setSelectedTab] = useState<string>("");
  const filterRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (normalizedType) {
      setSelectedTab(normalizedType);
    }
  }, [normalizedType]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
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

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader />
        <p className="mt-2 text-sm text-gray-500">Loading assets...</p>
      </div>
    );
  }

  if (error) {
    return <Retry message={error} onRetry={onRetry} />;
  }

  if (assets.length === 0) {
    return <Retry message="No assets found" onRetry={onRetry} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 font-JosephicSans mt-12">
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
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 border-b pb-2">
          <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide sm:overflow-visible sm:whitespace-nowrap">
            <div className="inline-flex gap-2 px-1">
              {serviceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedTab(option.value)}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm transition whitespace-nowrap ${
                    selectedTab === option.value
                      ? "bg-main_color text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-main_color text-white text-xs sm:text-sm rounded-2xl hover:bg-indigo-500"
              aria-label="Filter"
            >
              <FaFilter className="text-xs" />
            </button>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-main_color text-white text-xs sm:text-sm rounded-2xl hover:bg-indigo-500"
              aria-label="Sort"
            >
              <FaSortAmountDownAlt className="text-xs" />
            </button>

            {isFilterOpen && (
              <ServiceCardFilter
                filterOpen={setIsFilterOpen}
                filterRef={filterRef}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-4 text-xs sm:text-sm text-gray-600 gap-1 sm:gap-2">
        {normalizedType === "venue" && (
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button className="px-3 py-1 text-xs sm:text-sm hover:bg-gray-200 whitespace-nowrap">
              All Spaces
            </button>
            <button className="px-3 py-1 text-xs sm:text-sm hover:bg-gray-200 whitespace-nowrap">
              Business spaces
            </button>
            <button className="px-3 py-1 text-xs sm:text-sm hover:bg-gray-200 whitespace-nowrap">
              Multi purpose
            </button>
            <button className="px-3 py-1 text-xs sm:text-sm hover:bg-gray-200 whitespace-nowrap">
              Warehouse
            </button>
          </div>
        )}
        <p className="text-center sm:text-left"></p>
        <button
          className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 hover:text-blue-500"
          aria-label="Show map"
        >
          <FaMapMarkerAlt className="text-xs" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {assets.map((asset) => (
          <div
            key={asset._id}
            className="bg-white rounded-md overflow-hidden shadow-2xl hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/user/services/${normalizedType}/details/${asset._id}`)}
          >
            <div className="relative h-36 sm:h-48 w-full group">
              <img
                src={
                  Array.isArray(asset.Images) ? asset.Images[0] : Images.imageNA
                }
                alt={asset.name || "Asset"}
                className="w-full h-full object-cover rounded-t-lg transition-opacity duration-300 group-hover:opacity-0"
              />

              {Array.isArray(asset.Images) && asset.Images[1] && (
                <img
                  src={asset.Images[1]}
                  alt={asset.name || "Asset preview"}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              )}

              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-1 sm:gap-2 z-10">
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
              <h3 className="text-2xl sm:text-sm font-poppins text-gray-800 line-clamp-2 font-semibold">
                {asset.name}
              </h3>
              <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-900">
                {asset.packagesCount ? (
                  <span>{String(asset.packagesCount ?? asset.amount)} available packages</span>
                ) : (
                  <div className="flex items-center">
                    <FaRupeeSign className="text-[10px]" />
                    <span className="text-base">{asset.amount}</span>
                  </div>
                )}
                <span className="text-gray-500 text-[12px]">
                  • "Responds within 1 hr"
                </span>
              </div>
              <div className="text-xs sm:text-xs text-main_color flex items-center gap-1">
                <FaLocationArrow className="text-xs" />
                <span>
                  {asset.location.state}, {asset.location.country}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
