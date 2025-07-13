import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import { Column } from "@/utils/Options/user/tableFields";
import { getAllAssetRequests } from "@/api/host/hostAccountService";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AssetRequest } from "@/utils/Types/host/pages/assetRequests";

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

  const fetchRequests = async (page = 1) => {
    try {
      setLoading(true);
      const { data, totalPages } = await getAllAssetRequests(page, 7);
      setRequests(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Failed to fetch asset requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const filteredData =
    activeTab === "All requests"
      ? requests
      : requests.filter((item) => item.status === activeTab);

  return (
    <div className="px-4 py-3 sm:px-6 md:px-20 font-poppins">
      <h2 className="text-base sm:text-xl font-semibold mb-4">My Requests</h2>

      <div className="flex border-b border-gray-200 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "px-4 py-2 text-xs sm:text-base md:text-base",
              activeTab === tab
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded">
        {loading ? (
          <div className="text-center text-gray-500 py-10 text-sm">
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
