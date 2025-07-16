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
import { serviceOptions } from "@/utils/Options/user/serviceOptions";
import { filterAsset, sortAssets } from "@/api/user/base/assetServices";
import { Button } from "@/components/Button";
import {
  Asset,
  filterParams,
  sortParams,
} from "@/utils/Types/user/filterSortTypes";
import { Input } from "@/components/Input";
import LocationSearchBar from "@/components/LocationSearchBar";

export default function ServicesCard() {
  const { type } = useParams();
  const normalizedType = type?.toLowerCase();
  const navigate = useNavigate();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<filterParams>({});
  const [sorts, setSorts] = useState<sortParams>({});
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    label: string;
  } | null>(null);

  const pageSize = 8;

  useEffect(() => {
    if (normalizedType) setSelectedTab(normalizedType);
  }, [normalizedType]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fetchRef.current &&
        !fetchRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      console.error(err);
      setError("Something went wrong while fetching assets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTab) fetchAssets(selectedTab, filters, sorts, 1);
  }, [selectedTab, filters, sorts]);

  const handlePageChange = (page: number) => {
    fetchAssets(selectedTab, filters, sorts, page);
  };

  const renderNoResults = () => (
    <div className="flex flex-col items-center justify-center h-[300px] text-center gap-4">
      <img src="/no-match-icon.png" alt="No match" className="w-10 h-10" />
      <h2 className="text-lg font-semibold">No exact matches</h2>
      <p className="text-sm text-gray-500">
        Try changing or removing some of your filters.
      </p>
      <button
        onClick={() => {
          setFilters({});
          setSorts({});
          setSelectedLocation(null);
        }}
        className="text-green-700 border border-green-700 px-4 py-1.5 rounded hover:bg-green-50 transition text-sm font-medium"
      >
        Reset all filters
      </button>
    </div>
  );

  return (
    <div className="max-w-full sm:px-6 md:px-4 mx-auto px-2 py-4 sm:py-6 font-JosephicSans mt-14">
      <div className="w-full flex flex-col gap-3 mb-4 sm:gap-4 border-b py-3">
        <div className="flex flex-col gap-3 lg:hidden">
          <div className="flex gap-2">
            <div className="flex-1 min-w-[150px]">
              <LocationSearchBar
                onLocationSelect={(location) => {
                  setSelectedLocation(location);
                  setFilters((prev) => ({
                    ...prev,
                    lat: location.lat,
                    lng: location.lng,
                    radius: 50,
                  }));
                }}
              />
            </div>
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center px-3 py-2 bg-main_color text-white text-xs rounded-2xl"
            >
              <FaFilter className="mr-1 text-xs" />
            </Button>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1 min-w-[150px]">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
              <Input
                type="text"
                placeholder="Add keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm font-extralight"
              />
            </div>
            <Button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center px-3 py-2 bg-main_color text-white text-xs rounded-2xl"
            >
              <FaSortAmountDownAlt className="mr-1 text-xs" />
            </Button>
          </div>
        </div>

        {/* Large Layout */}
        <div className="hidden lg:flex w-full items-center justify-between gap-4 border-b p-2 border-t">
          <div className="flex gap-20 flex-1 max-w-4xl mx-auto justify-center">
            <div className="relative w-full max-w-[300px] flex items-center">
              <FaSearch className="absolute left-3 text-gray-500 text-base pointer-events-none" />
              <input
                type="text"
                placeholder="Add keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div className="relative w-full max-w-[300px]">
              <LocationSearchBar
                onLocationSelect={(location) => {
                  setSelectedLocation(location);
                  setFilters((prev) => ({
                    ...prev,
                    lat: location.lat,
                    lng: location.lng,
                    radius: 50,
                  }));
                }}
              />
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center px-3 py-2 bg-main_color text-white text-sm rounded-2xl hover:bg-indigo-500"
            >
              <FaSortAmountDownAlt className="mr-1 text-xs" />
            </Button>
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center px-3 py-2 bg-main_color text-white text-sm rounded-2xl hover:bg-indigo-500"
            >
              <FaFilter className="mr-1 text-xs" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide justify-start sm:justify-center lg:justify-center">
          {serviceOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setSelectedTab(option.value);
                navigate(`/user/assets/${option.value}`);
              }}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap transition ${
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
      {selectedLocation && (
        <div className="mb-2 text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full inline-flex items-center gap-2">
          📍 {selectedLocation.label}
          <button
            onClick={() => {
              setSelectedLocation(null);
              setFilters((prev) => {
                const { lat, lng, radius, ...rest } = prev;
                return rest;
              });
            }}
          >
            ❌
          </button>
        </div>
      )}

      {/* Active Filters */}
      {(Object.keys(filters).length > 0 || Object.keys(sorts).length > 0) && (
        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs sm:text-sm mb-2">
          {Object.entries(filters).map(([key, value]) => (
            <div
              key={`filter-${key}`}
              className="border text-blue-600 px-3 py-2 rounded-md flex items-center gap-2"
            >
              <span className="capitalize">
                <span className="text-black">{key}</span>: {String(value)}
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
                <span className="text-black">{key}</span>: {value}
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
              setSelectedLocation(null);
            }}
            className="ml-2 text-red-500 hover:text-red-700 hover:underline font-medium"
          >
            Clear All
          </button>
        </div>
      )}
      {loading ? (
        <div className="text-center py-12 mt-32">
          <Loader />
        </div>
      ) : assets.length === 0 ? (
        renderNoResults()
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 p-2 md:p-5">
            {assets
              .filter((asset) => {
                const keyword = searchTerm.trim().toLowerCase();
                return (
                  !keyword ||
                  asset.name?.toLowerCase().includes(keyword) ||
                  asset.location?.state?.toLowerCase().includes(keyword) ||
                  asset.location?.country?.toLowerCase().includes(keyword)
                );
              })
              .map((asset) => (
                <div
                  key={asset._id}
                  className="bg-white overflow-hidden shadow-2xl hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/user/services/${normalizedType}/details/${asset._id}`
                    )
                  }
                >
                  <div className="relative h-52 sm:h-60 w-full group">
                    <img
                      src={
                        Array.isArray(asset.Images)
                          ? asset.Images[0]
                          : Images.imageNA
                      }
                      alt={asset.name || "Asset"}
                      className="w-full h-full object-cover rounded-t-md transition-opacity duration-300 group-hover:opacity-0"
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
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}

      {/* Filter and Sort Modals */}
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
  );
}
