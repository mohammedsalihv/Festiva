import React from "react";
import Table from "@/components/Table";
import { Column } from "@/utils/Options/user/tableFields";
import { Images } from "@/assets";

type Booking = {
  id: string;
  assetType: string;
  bookedDate: string;
  timeSlot: string;
  assetName: string;
  bookedUserName: string;
  bookedUserEmail: string;
  assetImage: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  hostName: string;
  hostEmail: string;
};

const AdminBookings: React.FC = () => {
  const bookings: Booking[] = [
    {
      id: "1",
      assetType: "Venue",
      bookedDate: "2025-08-12",
      timeSlot: "10:00 AM - 02:00 PM",
      assetName: "Grand Palace Hall",
      bookedUserName: "John Doe",
      bookedUserEmail: "john@example.com",
      assetImage: "https://via.placeholder.com/60x40",
      status: "Confirmed",
      hostName: "Alice Smith",
      hostEmail: "alice@example.com",
    },
    {
      id: "2",
      assetType: "Studio",
      bookedDate: "2025-08-14",
      timeSlot: "02:00 PM - 05:00 PM",
      assetName: "Dream Studio",
      bookedUserName: "Jane Brown",
      bookedUserEmail: "jane@example.com",
      assetImage: "https://via.placeholder.com/60x40",
      status: "Pending",
      hostName: "Mark Wilson",
      hostEmail: "mark@example.com",
    },
  ];

  const columns: Column<Booking>[] = [
    {
      header: "Image",
      accessor: (row) => (
        <img
          src={Images.business_space}
          alt={row.assetName}
          className="w-12 h-12 md:w-48 md:h-28 rounded object-cover border"
        />
      ),
    },
    { header: "Type", accessor: "assetType" },
    { header: "Booked Date", accessor: "bookedDate" },
    { header: "Time Slot", accessor: "timeSlot" },
    { header: "Asset Name", accessor: "assetName" },
    { header: "Booked User", accessor: "bookedUserName" },
    { header: "Email", accessor: "bookedUserEmail" },
    {
      header: "Status",
      accessor: (row) => (
        <span
          className={`px-2 py-1 text-sm rounded ${
            row.status === "Confirmed"
              ? "bg-green-100 text-green-700"
              : row.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Host Details",
      accessor: (row) => (
        <div className="text-sm  md:text-base">
          <div className="text-sm md:text-base">{row.hostName}</div>
          <div className="text-gray-500 text-sm md:text-base">{row.hostEmail}</div>
        </div>
      ),
    },
  ];

  return (
    <div className="sm:p-6 w-full bg-white mt-3 font-prompt">
      <h1 className="text-base sm:text-xl font-bold mb-4 px-3">Admin Bookings</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden mt-3">
        <Table
          data={bookings}
          columns={columns}
          onRowClick={(row) => console.log("Clicked row:", row)}
        />
      </div>
    </div>
  );
};

export default AdminBookings;

