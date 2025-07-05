import { useState, useEffect, useRef } from "react";
import ServiceCardFilter from "@/components/ServiceCardFilter";
import {
  FaHeart,
  FaShareAlt,
  FaLocationArrow,
  FaRupeeSign,
  FaSearch,
  FaSortAmountDownAlt,
  FaFilter,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { IRentCarBase } from "@/utils/Types/user/rentCarTypes";
import { IVenueBase } from "@/utils/Types/user/venueTypes";
import { ICatersBase } from "@/utils/Types/user/catersTypes";
import { IStudioBase } from "@/utils/Types/user/studioTypes";
import { Images } from "@/assets";
import Loader from "@/components/Loader";
import Retry from "@/components/Retry";
import { serviceOptions } from "@/utils/Options/user/serviceOptions";
import { filterAsset } from "@/api/user/base/assetServices";

type Asset = IRentCarBase | IVenueBase | ICatersBase | IStudioBase;

export default function ServicesCard() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { type } = useParams();
  const normalizedType = type?.toLowerCase();
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Update selectedTab when route param changes
  useEffect(() => {
    if (normalizedType) {
      setSelectedTab(normalizedType);
    }
  }, [normalizedType]);

  // Close filter if clicked outside
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFilterOpen]);

  // Fetch assets from backend
  const fetchAssets = async (type: string, filters: Record<string, any>) => {
    setLoading(true);
    try {
      const response = await filterAsset(type, filters);
      setAssets(response);
      setError(null);
    } catch (err) {
      setError("Something went wrong while fetching assets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTab) {
      fetchAssets(selectedTab, filters);
    }
  }, [selectedTab, filters]);

  if (loading) {
    return (
      <div className="text-center py-12 mt-32">
        <Loader />
        <p className="mt-5 text-sm text-gray-500">Loading assets...</p>
      </div>
    );
  }

  if (error)
    return (
      <Retry
        message={error}
        onRetry={() => fetchAssets(selectedTab, filters)}
      />
    );
  if (assets.length === 0)
    return (
      <Retry
        message="No assets found"
        onRetry={() => fetchAssets(selectedTab, filters)}
      />
    );

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 font-JosephicSans mt-12">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-2 sm:mb-4 gap-2 sm:gap-3 border-b">
        <div className="w-full relative">
          <FaSearch className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm" />
          <input
            type="text"
            placeholder="Add keywords..."
            className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1 sm:py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
          />
        </div>
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 border-b pb-2">
          <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide sm:overflow-visible">
            <div className="inline-flex gap-2 px-1">
              {serviceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedTab(option.value)}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm transition ${
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
            >
              <FaFilter className="text-xs" />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-main_color text-white text-xs sm:text-sm rounded-2xl hover:bg-indigo-500">
              <FaSortAmountDownAlt className="text-xs" />
            </button>
            {isFilterOpen && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <ServiceCardFilter
                  type={selectedTab}
                  filterRef={filterRef}
                  filterOpen={setIsFilterOpen}
                  onApplyFilter={(appliedFilters) => setFilters(appliedFilters)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {assets.map((asset) => (
          <div
            key={asset._id}
            className="bg-white rounded-md overflow-hidden shadow-2xl hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() =>
              navigate(`/user/services/${normalizedType}/details/${asset._id}`)
            }
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
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                <button className="bg-white/80 rounded-full p-1 hover:bg-white">
                  <FaHeart className="text-gray-600 hover:text-red-500 text-xs" />
                </button>
                <button className="bg-white/80 rounded-full p-1 hover:bg-white">
                  <FaShareAlt className="text-gray-600 hover:text-blue-400 text-xs" />
                </button>
              </div>
            </div>
            <div className="p-2 sm:p-3 space-y-1">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                {asset.name}
              </h3>
              <div className="flex items-center gap-1 text-xs font-semibold text-gray-900">
                {"packagesCount" in asset ? (
                  <span>{`${
                    asset.packagesCount ?? asset.amount
                  } available packages`}</span>
                ) : (
                  <div className="flex items-center">
                    <FaRupeeSign className="text-[10px]" />
                    <span className="text-base">{asset.amount}</span>
                  </div>
                )}
                <span className="text-gray-500 text-[12px]">
                  • Responds within 1 hr
                </span>
              </div>
              <div className="text-xs text-main_color flex items-center gap-1">
                <FaLocationArrow className="text-xs" />
                <span>
                  {asset.location?.state}, {asset.location?.country}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
