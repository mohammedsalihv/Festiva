import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { myAssets } from "@/api/host/hostAccountService";
import { useDispatch, useSelector } from "react-redux";
import { setMyAssets } from "@/redux/Slice/host/common/myAssetsSlice";
import { RootState } from "@/redux/store";
import Pagination from "@/components/Pagination";

export default function MyAssets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.myAssets.assets);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageLimit = 8;

  const fetchMyAssets = async (pageNumber: number, pageLimit: number) => {
    const response = await myAssets(pageNumber, pageLimit);
    dispatch(setMyAssets(response.data));
    setCurrentPage(pageNumber);
    setTotalPages(response.totalPages);
  };

  useEffect(() => {
    fetchMyAssets(currentPage, pageLimit);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.assetName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === "All"
        ? true
        : activeTab === "Available"
        ? asset.status === "approved"
        : activeTab === "Not Available"
        ? asset.status !== "approved"
        : asset.assetType === activeTab;

    return matchesSearch && matchesTab;
  });

  const handlePageChange = (page: number) => {
    fetchMyAssets(page, pageLimit);
  };

  console.log(assets);

  return (
    <div className="px-3 py-8 md:px-10 md:py-8 font-poppins">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap- border-b p-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-none mb-2">
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
              className={`p-3 text-xs sm:text-base md:text-base rounded font-poppins ${
                activeTab === tab.value ? "bg-black text-white" : "bg-gray-100"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <div className="relative w-full max-w-sm">
          <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <Input
            type="text"
            placeholder="Search Product"
            className="pr-9 pl-8 py-1 rounded border text-sm w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid justify-center sm:justify-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset) => (
              <div
                key={asset.assetId}
                className="bg-white shadow hover:shadow-xl transition rounded-lg border w-full max-w-sm mx-auto"
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
