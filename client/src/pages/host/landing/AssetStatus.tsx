import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Table from "@/components/Table";
import { Column } from "@/utils/Options/user/tableFields";
import { getAllAssetRequests } from "@/api/host/hostAccountService";

type RequestStatus = "Approved" | "Rejected" | "Pending";

interface AssetRequest {
  id: number;
  hostName: string;
  hostRole: string;
  reqDate: string;
  service: string;
  status: RequestStatus;
}

const columns: Column<AssetRequest>[] = [
  { header: "No", accessor: "id" },
  {
    header: "Asset",
    accessor: (row, index) => (
      <div className="flex items-center gap-2">
        <img
          src={`https://i.pravatar.cc/30?img=${index! + 1}`}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <div>
          <div className="font-medium text-gray-800">{row.hostName}</div>
          <div className="text-xs text-gray-500">{row.hostRole}</div>
        </div>
      </div>
    ),
  },
  { header: "Service type", accessor: "service" },
  { header: "Req Date", accessor: "reqDate" },
  { header: "Action Date", accessor: "reqDate" },
  {
    header: "Status",
    accessor: (row) => (
      <span
        className={clsx("px-3 py-2 rounded-md text-xs font-medium", {
          "bg-red-100 text-red-600": row.status === "Rejected",
          "bg-green-100 text-green-600": row.status === "Approved",
          "bg-yellow-100 text-yellow-700": row.status === "Pending",
        })}
      >
        {row.status}
      </span>
    ),
  },
];

const tabs = ["All requests", "Pending", "Approved", "Rejected"] as const;
type TabType = (typeof tabs)[number];

export const AssetStatus: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("All requests");
  const [requests, setRequests] = useState<AssetRequest[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getAllAssetRequests();
      console.log("Fetched requests:", data);
      setRequests(data);
    })();
  }, []);

  const filteredData =
    activeTab === "All requests"
      ? requests
      : requests.filter((item) => item.status === activeTab);

  return (
    <div className="px-4 py-3 sm:px-6 md:px-20 font-poppins">
      <h2 className="text-xl font-semibold mb-4">My Requests</h2>

      <div className="flex border-b border-gray-200 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "px-4 py-2 text-sm font-medium",
              activeTab === tab
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded shadow">
        <Table data={filteredData} columns={columns} />
      </div>
    </div>
  );
};
