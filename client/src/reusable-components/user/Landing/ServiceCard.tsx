import { useState, useEffect, useRef } from "react";
import ServiceCardFilter from "@/components/ServiceCardFilter";
import ServiceCardSort from "@/components/ServiceCardSort";
import Pagination from "@/components/Pagination";
import {
  FaHeart,
  FaShareAlt,
  FaLocationArrow,
  FaRupeeSign,
  FaSearch,
  FaSortAmountDownAlt,
  FaFilter,
} from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Images } from "@/assets";
import Loader from "@/components/Loader";
import Retry from "@/components/Retry";
import { serviceOptions } from "@/utils/Options/user/serviceOptions";
import { filterAsset, sortAssets } from "@/api/user/base/assetServices";
import { Button } from "@/components/Button";
import {
  Asset,
  filterParams,
  sortParams,
} from "@/utils/Types/user/filterSortTypes";
import { Input } from "@/components/Input";

export default function ServicesCard() {
  const { type } = useParams(); // ✅ must be before using it
  const normalizedType = type?.toLowerCase();
  const navigate = useNavigate();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<filterParams>({});
  const [sorts, setSorts] = useState<sortParams>({});
  const [assets, setAssets] = useState<Asset[]>([]);
  const [hasTriedRetry, setHasTriedRetry] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchRef = useRef<HTMLDivElement>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    if (normalizedType) {
      setSelectedTab(normalizedType);
    }
  }, [normalizedType]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fetchRef.current && !fetchRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFilterOpen]);

  const fetchAssets = async (
    type: string,
    filters: filterParams,
    sorts: sortParams,
    page = 1
  ) => {
    setLoading(true);
    try {
      const params = { ...filters, ...sorts, page, limit: pageSize };
      const response =
        Object.keys(sorts).length > 0
          ? await sortAssets(type, params)
          : await filterAsset(type, params);

      setAssets(response.data);
      setTotalPages(response.totalPages);
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Something went wrong while fetching assets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTab) {
      setHasTriedRetry(false);
      setRetryCount(0);
      fetchAssets(selectedTab, filters, sorts, 1);
    }
  }, [selectedTab, filters, sorts]);

  const handlePageChange = (page: number) => {
    fetchAssets(selectedTab, filters, sorts, page);
  };

  if (loading) {
    return (
      <div className="text-center py-12 mt-32">
        <Loader />
        <p className="mt-5 text-sm text-gray-500">Loading assets...</p>
      </div>
    );
  }

  if (error || (assets.length === 0 && !hasTriedRetry)) {
    return (
      <Retry
        message={error || "No matching assets found for your filters."}
        onRetry={() => {
          if (retryCount === 0) {
            setRetryCount(1);
            fetchAssets(selectedTab, filters, sorts);
          } else {
            setFilters({});
            setSorts({});
            setRetryCount(0);
            setHasTriedRetry(false);
            fetchAssets(selectedTab, {}, {}, 1);
          }
        }}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 font-JosephicSans mt-14">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-2 sm:mb-4 gap-2 sm:gap-3 border-b">
        {/* Search */}
        <div className="w-full relative">
          <FaSearch className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-base" />
          <Input
            type="text"
            placeholder="Add keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1 sm:py-2 rounded-lg text-xs sm:text-base border-0 focus:outline-none focus:ring-0"
          />
        </div>

        {/* Tabs + Filters */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 border-b pb-2">
          <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide sm:overflow-visible">
            <div className="inline-flex gap-2 px-1">
              {serviceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSelectedTab(option.value);
                    navigate(`/user/assets/${option.value}`);
                  }}
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
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-main_color text-white  text-xs sm:text-sm rounded-2xl hover:bg-indigo-500"
            >
              <FaFilter className="text-xs" />
            </Button>
            <Button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-main_color text-white text-xs sm:text-sm rounded-2xl hover:bg-indigo-500"
            >
              <FaSortAmountDownAlt className="text-xs" />
            </Button>

            {isFilterOpen && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <ServiceCardFilter
                  type={selectedTab}
                  filterRef={fetchRef}
                  filterOpen={setIsFilterOpen}
                  onApplyFilter={(appliedFilters) => setFilters(appliedFilters)}
                />
              </div>
            )}
            {isSortOpen && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <ServiceCardSort
                  type={selectedTab}
                  sortRef={fetchRef}
                  sortOpen={setIsSortOpen}
                  onApplySort={(appliedSorts) => setSorts(appliedSorts)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter/Sort pills */}
      {(Object.keys(filters).length > 0 || Object.keys(sorts).length > 0) && (
        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs sm:text-sm mb-2">
          {Object.entries(filters).map(([key, value]) => (
            <div
              key={`filter-${key}`}
              className="border text-blue-600 px-3 py-2 rounded-md flex items-center gap-2"
            >
              <span className="capitalize">
                <span className="text-black">{key}</span> : {String(value)}
              </span>
              <button
                onClick={() =>
                  setFilters((prev) => {
                    const updated = { ...prev };
                    delete updated[key];
                    return updated;
                  })
                }
                className="text-red-500 hover:text-red-700 font-bold"
              >
                <IoIosClose className="w-6 h-6" />
              </button>
            </div>
          ))}
          {Object.entries(sorts).map(([key, value]) => (
            <div
              key={`sort-${key}`}
              className="border text-main_color px-3 py-2 rounded-md flex items-center gap-2"
            >
              <span className="capitalize">
                <span className="text-black">{key}</span>:{" "}
                {value === "asc"
                  ? "A-Z / Oldest / Asc"
                  : value === "desc"
                  ? "Z-A / Newest / Desc"
                  : value === "low-high"
                  ? "Low → High"
                  : value === "high-low"
                  ? "High → Low"
                  : value}
              </span>
              <button
                onClick={() =>
                  setSorts((prev) => {
                    const updated = { ...prev };
                    delete updated[key];
                    return updated;
                  })
                }
                className="text-red-500 hover:text-red-700 font-bold"
              >
                <IoIosClose className="w-6 h-6" />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              setFilters({});
              setSorts({});
            }}
            className="ml-2 text-red-500 hover:text-red-700 hover:underline font-medium"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {assets
          .filter((asset) => {
            if (!searchTerm.trim()) return true;
            const keyword = searchTerm.toLowerCase();
            return (
              asset.name?.toLowerCase().includes(keyword) ||
              asset.location?.state?.toLowerCase().includes(keyword) ||
              asset.location?.country?.toLowerCase().includes(keyword)
            );
          })
          .map((asset) => (
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
                    Array.isArray(asset.Images)
                      ? asset.Images[0]
                      : Images.imageNA
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
                    <span>{`${asset.packagesCount ?? asset.amount} available packages`}</span>
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

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
