import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { myAssets } from "@/api/host/hostAccountService";
import { useDispatch, useSelector } from "react-redux";
import { setMyAssets } from "@/redux/Slice/host/common/myAssetsSlice";
import { RootState } from "@/redux/store";
import Pagination from "@/components/Pagination";
import { useNavigate } from "react-router-dom";
import { FaSort } from "react-icons/fa6";
import Loader from "@/components/Loader";

export default function MyAssets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | undefined>(
    undefined
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assets = useSelector((state: RootState) => state.myAssets.assets);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageLimit = 8;

  const fetchMyAssets = async (
    pageNumber: number,
    pageLimit: number,
    search = "",
    status?: string | string[],
    assetType?: string,
    sortOption?: "newest" | "oldest"
  ) => {
    setLoading(true);
    try {
      const response = await myAssets(
        pageNumber,
        pageLimit,
        search,
        status,
        assetType,
        sortOption
      );
      dispatch(setMyAssets(response.data));
      setCurrentPage(pageNumber);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to fetch assets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAssets(currentPage, pageLimit);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
  const delay = setTimeout(() => {
    let status: string | string[] | undefined;
    let type: string | undefined;

    if (activeTab === "Available") {
      status = "approved";
    } else if (activeTab === "Not Available") {
      status = ["pending", "rejected"];
    } else if (["venue", "studio", "rentcar", "caters"].includes(activeTab)) {
      type = activeTab;
    }

    fetchMyAssets(1, pageLimit, searchTerm, status, type);
  }, 300);

  return () => clearTimeout(delay);
}, [searchTerm, activeTab]);


  const handlePageChange = (page: number) => {
    let status, type;
    if (activeTab === "Available") status = "approved";
    else if (activeTab === "Not Available") status = "pending";
    else if (["venue", "studio", "rentcar", "caters"].includes(activeTab))
      type = activeTab;

    fetchMyAssets(page, pageLimit, searchTerm, status, type, sortBy);
  };

  const handleAssetDetails = async (assetId: string, assetType: string) => {
    navigate(`/host/assets/details/${assetType}/${assetId}`);
  };

  const triggerSort = (selectedSort: "newest" | "oldest") => {
    let status, type;

    if (activeTab === "Available") status = "approved";
    else if (activeTab === "Not Available") status = "pending";
    else if (["venue", "studio", "rentcar", "caters"].includes(activeTab))
      type = activeTab;

    fetchMyAssets(1, pageLimit, searchTerm, status, type, selectedSort);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".sort-dropdown")) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="px-3 py-8 md:px-10 md:py-8 font-poppins">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4 border-b py-2 px-1">
        <div className="-mx-2 px-2 overflow-x-auto scrollbar-none">
          <div className="flex gap-2 whitespace-nowrap">
            {[
              { label: "All", value: "All" },
              { label: "Venues", value: "venue" },
              { label: "Rent Cars", value: "rentcar" },
              { label: "Caters", value: "caters" },
              { label: "Studios", value: "studio" },
              { label: "Available", value: "Available" },
              { label: "Not Available", value: "Not Available" },
            ].map((tab) => (
              <Button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`p-2 text-xs sm:text-sm md:text-base rounded font-poppins ${
                  activeTab === tab.value
                    ? "bg-black text-white"
                    : "bg-gray-100"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
          <div className="relative w-full max-w-sm">
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <Input
              type="text"
              placeholder="Search Product"
              className="pr-9 pl-8 py-1 rounded border text-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative sort-dropdown">
            {/* Sort Icon */}
            <div
              className="text-xl cursor-pointer"
              onClick={() => setShowSortDropdown((prev) => !prev)}
            >
              <FaSort />
            </div>

            {/* Dropdown */}
            {showSortDropdown && (
              <div className="absolute right-0 mt-2 bg-white border shadow-md rounded z-50 w-36 sm:w-40 text-sm">
                {["newest", "oldest"].map((option) => (
                  <div
                    key={option}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      sortBy === option ? "font-semibold bg-gray-50" : ""
                    }`}
                    onClick={() => {
                      setSortBy(option as "newest" | "oldest");
                      setShowSortDropdown(false);
                      triggerSort(option as "newest" | "oldest");
                    }}
                  >
                    {option === "newest" ? "Newest" : "Oldest"}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {loading ? ( // ✅ Show loader while fetching
          <div className="flex justify-center items-center py-16">
            <Loader />
          </div>
        ) : (
          <div className="grid justify-center sm:justify-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
            {assets.length > 0 ? (
              assets.map((asset) => (
                <div
                  onClick={() =>
                    handleAssetDetails(asset.assetId, asset.assetType)
                  }
                  key={asset.assetId}
                  className="bg-white shadow hover:shadow-xl transition rounded-lg border w-full max-w-sm mx-auto cursor-pointer"
                >
                  <img
                    src={asset.assetImage}
                    alt={asset.assetName}
                    className="h-52 sm:h-56 md:h-60 object-cover w-full rounded-t-lg"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-base md:text-md">
                      {asset.assetName}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500">
                      {asset.assetType}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span
                        className={`text-sm ${
                          asset.status === "approved"
                            ? "text-green-500"
                            : asset.status === "rejected"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {asset.status}
                      </span>
                      <span className="text-black text-sm md:text-base">
                        {new Date(asset.listedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500 text-sm sm:text-base">
                No assets found.
              </div>
            )}
          </div>
        )}
      </div>

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
