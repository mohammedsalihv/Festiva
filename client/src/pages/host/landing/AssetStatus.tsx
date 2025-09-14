import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import { Column } from "@/utils/Options/user/tableFields";
import { getAllAssetRequests } from "@/api/host/hostAccountService";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AssetRequest } from "@/utils/Types/host/pages/assetRequests";
import { FaSearch, FaSort } from "react-icons/fa";
import { Input } from "@/components/Input";
import { FiFilter } from "react-icons/fi";

dayjs.extend(relativeTime);

const columns: Column<AssetRequest>[] = [
  {
    header: "No",
    accessor: (_row, index) => (index !== undefined ? index + 1 : "-"),
  },
  {
    header: "Asset",
    accessor: (row) => (
      <div className="flex items-center gap-3 min-w-[200px]">
        <img
          src={row.image}
          alt="asset"
          className="w-10 h-10 rounded-md object-cover border"
        />
        <div className="truncate max-w-[150px]">{row.name}</div>
      </div>
    ),
  },
  { header: "Service type", accessor: "assetType" },
  { header: "Req Date", accessor: (row) => dayjs(row.reqDate).fromNow() },
  {
    header: "Action Date",
    accessor: (row) =>
      row.actionDate ? dayjs(row.actionDate).fromNow() : "Not yet",
  },
  {
    header: "Status",
    accessor: (row) => (
      <span
        className={clsx(
          "px-3 py-1 rounded-full text-xs font-semibold capitalize",
          {
            "bg-yellow-100 text-yellow-700": row.status === "pending",
            "bg-green-100 text-green-600": row.status === "approved",
            "bg-red-100 text-red-600": row.status === "rejected",
          }
        )}
      >
        {row.status}
      </span>
    ),
  },
];

const tabs = ["All requests", "pending", "approved", "rejected"] as const;
type TabType = (typeof tabs)[number];

export const AssetStatus: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("All requests");
  const [requests, setRequests] = useState<AssetRequest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const sortRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);

  const fetchRequests = async (page = 1) => {
    try {
      setLoading(true);
      const status = activeTab !== "All requests" ? activeTab : "";
      const { data, totalPages } = await getAllAssetRequests(
        page,
        7,
        search,
        status,
        sortBy,
        sortOrder,
        serviceType
      );
      setRequests(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Failed to fetch asset requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
    fetchRequests(currentPage);
  }, [currentPage, activeTab, search, sortBy, sortOrder, serviceType]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSort(false);
      }
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredData =
    activeTab === "All requests"
      ? requests
      : requests.filter((item) => item.status === activeTab);

  return (
    <div className="px-4 py-3 sm:px-6 md:px-20 font-poppins">
      <h2 className="text-base sm:text-xl font-semibold mb-4">My Requests</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 mb-10">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide md:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "px-4 py-2 text-xs sm:text-sm md:text-base whitespace-nowrap",
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4 w-full md:w-auto mb-1">
          {/* Search */}
          <div className="relative grow md:grow-0 md:w-60 min-w-[180px]">
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <Input
              type="text"
              placeholder="Search Product"
              className="pr-9 pl-8 py-1 rounded border text-sm w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="relative">
            <div
              className="text-xl cursor-pointer"
              onClick={() => setShowSort((prev) => !prev)}
            >
              <FaSort />
            </div>
            {showSort && (
              <div className="absolute right-0 mt-2 z-10 bg-white border shadow rounded-md p-3 w-48 text-sm space-y-2">
                <select
                  className="w-full border px-2 py-1 rounded"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Sort By</option>
                  <option value="reqDate">Request Date</option>
                  <option value="actionDate">Action Date</option>
                  <option value="status">Status</option>
                </select>

                <select
                  className="w-full border px-2 py-1 rounded"
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value as "asc" | "desc");
                    setCurrentPage(1);
                  }}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            )}
          </div>
          <div className="relative">
            <div
              className="text-xl cursor-pointer"
              onClick={() => setShowFilter((prev) => !prev)}
            >
              <FiFilter />
            </div>
            {showFilter && (
              <div className="absolute right-0 mt-2 z-10 bg-white border shadow rounded-md p-3 w-48 text-sm space-y-2">
                {/* Filter by service type */}
                <div>
                  <label className="block text-xs mb-1 font-medium text-gray-600">
                    Service Type
                  </label>
                  <select
                    className="w-full border px-2 py-1 rounded"
                    value={serviceType}
                    onChange={(e) => {
                      setServiceType(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">All</option>
                    <option value="venue">Venue</option>
                    <option value="studio">Studio</option>
                    <option value="rentcar">Rent Car</option>
                    <option value="caters">Caters</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded">
        {loading ? (
          <div className="text-center text-gray-500 py-5 text-sm">
            Loading...
          </div>
        ) : filteredData.length > 0 ? (
          <Table data={filteredData} columns={columns} />
        ) : (
          <div className="text-center text-gray-500 py-10 text-sm">
            No asset requests found for{" "}
            <span className="capitalize font-bold">{activeTab}</span>.
          </div>
        )}
      </div>
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};
