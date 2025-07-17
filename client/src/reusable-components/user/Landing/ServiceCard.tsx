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
import { MdLocationPin } from "react-icons/md";
import {
  Asset,
  filterParams,
  sortParams,
} from "@/utils/Types/user/filterSortTypes";
import { Input } from "@/components/Input";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "@/redux/Slice/user/assetSearchSlice";
import { RootState } from "@/redux/store";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function ServicesCard() {
  const { type } = useParams();
  const normalizedType = type?.toLowerCase();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sorts, setSorts] = useState<sortParams>({});
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const geocoderContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<{
    label: string;
    lat: number;
    lng: number;
  } | null>(null);
  const filters = useSelector((state: RootState) => state.assetSearch.filters);

  const pageSize = 8;

  useEffect(() => {
    if (normalizedType) setSelectedTab(normalizedType);
  }, [normalizedType]);

  useEffect(() => {
    // Initialize Mapbox Geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: import.meta.env.VITE_MAPBOX_API_KEY, // Replace with your Mapbox token
      types: "place,locality,neighborhood,address",
      placeholder: "Search location...",
    });

    if (geocoderContainerRef.current) {
      geocoderContainerRef.current.appendChild(geocoder.onAdd());
      geocoder.on("result", (e) => {
        const { text, geometry } = e.result;
        setSelectedLocation({
          label: text,
          lat: geometry.coordinates[1],
          lng: geometry.coordinates[0],
        });
        dispatch(
          setFilters({
            ...filters,
            lat: geometry.coordinates[1],
            lng: geometry.coordinates[0],
            radius: 10, // Default radius in miles
          })
        );
      });
      geocoder.on("clear", () => {
        setSelectedLocation(null);
        const { lat, lng, radius, ...rest } = filters;
        dispatch(setFilters(rest));
      });
    }

    return () => {
      if (geocoderContainerRef.current) {
        geocoderContainerRef.current.innerHTML = "";
      }
    };
  }, [dispatch, filters]);

  useEffect(() => {
    if (mapContainerRef.current && selectedLocation) {
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [selectedLocation.lng, selectedLocation.lat],
        zoom: 12,
      });

      new mapboxgl.Marker({ color: "#FF0000" })
        .setLngLat([selectedLocation.lng, selectedLocation.lat])
        .setPopup(new mapboxgl.Popup().setText(selectedLocation.label))
        .addTo(map);

      assets.forEach((asset) => {
        if (asset.location?.lng && asset.location?.lat) {
          new mapboxgl.Marker()
            .setLngLat([asset.location.lng, asset.location.lat])
            .setPopup(new mapboxgl.Popup().setText(asset.name || "Service"))
            .addTo(map);
        }
      });

      return () => map.remove();
    }
  }, [selectedLocation, assets]);

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
      // Exclude location filters if no selectedLocation
      const params = selectedLocation
        ? { ...filters, ...sorts, page, limit: pageSize }
        : { ...sorts, page, limit: pageSize };
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
          dispatch(setFilters({}));
          setSorts({});
          setSelectedLocation(null);
        }}
        className="text-green-700 border border-green-700 px-4 py-1.5 rounded hover:bg-green-50 transition text-sm font-medium"
      >
        Reset all filters
      </button>
    </div>
  );

  if (error) {
    return (
      <div>
        <p className="px-10 py-10">Failed to fetch</p>
      </div>
    );
  }

  return (
    <div className="max-w-full sm:px-6 md:px-4 mx-auto px-2 py-4 sm:py-6 font-JosephicSans mt-14">
      <div className="w-full flex flex-col gap-3 mb-4 sm:gap-4 border-b py-3">
        <div className="flex flex-col gap-3 lg:hidden">
          <div className="flex gap-2">
            <div className="flex-1 min-w-[150px] relative">
              <MdLocationPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm z-10" />
              <div
                ref={geocoderContainerRef}
                className="w-full pl-10 pr-3 py-2 text-sm font-extralight"
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
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs" />
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
        <div className="hidden lg:flex w-full items-center border-b border-t justify-center py-2">
          <div className="flex items-center bg-white gap-2 w-full justify-between">
            <div className="flex flex-1 gap-2 min-w-0">
              {/* Search input - wider */}
              <div className="relative flex-[3] min-w-[200px]">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
                <Input
                  type="text"
                  placeholder="Search keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-base text-black font-extralight outline-none focus:outline-none border-none focus:border-none ring-0 focus:ring-0"
                />
              </div>

              {/* Location input - smaller */}
              <div className="relative flex-[2] min-w-[160px]">
                <MdLocationPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-base" />
                <div
                  id="mapbox-container"
                  ref={geocoderContainerRef}
                  className="w-full pl-3 pr-10 py-2 text-base font-extralight"
                />
              </div>
            </div>

            <div className="flex gap-2 ml-4">
              <Button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center px-3 py-2 text-white text-sm shadow-none hover:bg-gray-200 rounded-md bg-main_gradient"
              >
                <FaSortAmountDownAlt className="mr-1 text-xs" />
              </Button>
              <Button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center px-2 py-1 text-white text-sm shadow-none rounded-md bg-main_gradient"
              >
                <FaFilter className="mr-1 text-xs" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide justify-start sm:justify-center lg:justify-center">
          {serviceOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setSelectedTab(option.value);
                navigate(`/user/assets/${option.value}`);
                setSelectedLocation(null); // Reset location when changing tabs
                dispatch(setFilters({})); // Reset filters when changing tabs
              }}
              className={`flex flex-col items-center justify-center px-3 border-b-2 transition min-w-[64px]
                ${
                  selectedTab === option.value
                    ? "border-[#e879f9] bg-gradient-to-r from-[#e879f9] to-[#1a002f] bg-clip-text text-transparent"
                    : "border-transparent text-black hover:bg-gradient-to-r hover:from-[#e879f9] hover:to-[#1a002f] hover:bg-clip-text hover:text-transparent"
                }`}
            >
              <img
                src={option.icon}
                alt={option.label}
                className={`w- h-5 sm:w-7 sm:h-7 object-contain ${
                  selectedTab === option.value ? "opacity-100" : "opacity-85"
                }`}
              />
              <span className="text-[10px] sm:text-sm mt-1">
                {option.label}
              </span>
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
              const { lat, lng, radius, ...rest } = filters;
              dispatch(setFilters(rest));
            }}
          >
            ❌
          </button>
        </div>
      )}
      {selectedLocation && (
        <div className="mb-4">
          <div ref={mapContainerRef} className="w-full h-[400px] rounded-md" />
        </div>
      )}
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
                onClick={() => {
                  const updated = { ...filters };
                  delete updated[key];
                  if (key === "lat" || key === "lng" || key === "radius") {
                    setSelectedLocation(null);
                    const { lat, lng, radius, ...rest } = updated;
                    dispatch(setFilters(rest));
                  } else {
                    dispatch(setFilters(updated));
                  }
                }}
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
              dispatch(setFilters({}));
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
            onApplyFilter={(appliedFilters) =>
              dispatch(setFilters(appliedFilters))
            }
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
