import { useEffect, useState } from "react";
import Table from "@/components/Table";
import { Column } from "@/utils/Options/user/tableFields";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createdBookings } from "@/api/admin/bookingManagement.services";
import { setAllAdminBookings } from "@/redux/Slice/admin/bookingManagementSlice";
import Pagination from "@/components/Pagination";
import { adminBookingsState } from "@/utils/Types/admin/bookingManagementTypes";
import { Loader } from "lucide-react";
import SwitchTabs from "@/components/SwitchTabs";
import { tabOptions } from "@/utils/Options/admin/adminService";
import { FaSearch, FaSort } from "react-icons/fa";
import { bookingSortOptions } from "@/utils/Types/user/userBookingsTypes";
import { Input } from "@/components/Input";

const formatDate = (dateValue: string | string[] | Date): string => {
  if (!dateValue) return "-";

  if (Array.isArray(dateValue)) {
    return dateValue.length > 0 ? formatDate(dateValue[0]) : "-";
  }

  const date = new Date(dateValue);
  return isNaN(date.getTime())
    ? "-"
    : date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

const formatDateTime = (dateValue: string | string[] | Date): string => {
  if (!dateValue) return "-";

  if (Array.isArray(dateValue)) {
    return dateValue.length > 0 ? formatDateTime(dateValue[0]) : "-";
  }

  const date = new Date(dateValue);
  return isNaN(date.getTime())
    ? "-"
    : date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
};

const AdminBookings = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(
    (state: RootState) => state.bookingManagement.bookings
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchBy, setSearchBy] = useState("");
  const [sortBy, setSortBy] = useState<bookingSortOptions>("asc");
  const [showSort, setShowSort] = useState(false);

  const pageLimit = 4;

  const fetchAllBookings = async (pageNumber: number, pageLimit: number) => {
    setLoading(true);
    try {
      const response = await createdBookings(
        pageNumber,
        pageLimit,
        sortBy || undefined,
        searchBy || undefined,
        activeTab
      );
      dispatch(setAllAdminBookings(response.bookings));
      setCurrentPage(pageNumber);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings(currentPage, pageLimit);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setSortBy("" as bookingSortOptions);
    setSearchBy("");
    fetchAllBookings(1, pageLimit);
  }, [activeTab]);

  useEffect(() => {
    setCurrentPage(1);
    fetchAllBookings(1, pageLimit);
  }, [sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchAllBookings(1, pageLimit);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchBy]);

  const handlePageChange = (page: number) => {
    fetchAllBookings(page, pageLimit);
  };

  const columns: Column<adminBookingsState>[] = [
    {
      header: "Image",
      accessor: (row) => (
        <img
          src={row.assetImage}
          className="w-12 h-12 md:w-28 md:h-28 rounded object-cover"
        />
      ),
    },
    {
      header: "Type",
      accessor: (row) => (
        <span className="text-blue-600 bg-blue-100 px-2 rounded-md">
          {row.assetType.charAt(0).toUpperCase() + row.assetType.slice(1)}
        </span>
      ),
    },
    {
      header: "Date",
      accessor: (row) => formatDate(row.Date),
    },
    { header: "Time Slot", accessor: "timeSlot" },
    { header: "Asset Name", accessor: "assetName" },
    {
      header: "Booked Date",
      accessor: (row) => formatDateTime(row.bookedDate),
    },
    {
      header: "Status",
      accessor: (row) => (
        <span
          className={`px-2 py-1 text-sm rounded ${
            row.status === "accepted"
              ? "bg-green-100 text-green-700"
              : row.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "User Details",
      accessor: (row) => (
        <div className="text-sm  md:text-base">
          <div className="text-sm md:text-base">{row.bookedUserName}</div>
          <div className="text-gray-500 text-sm md:text-base">
            {row.bookedUserEmail}
          </div>
        </div>
      ),
    },
    {
      header: "Host Details",
      accessor: (row) => (
        <div className="text-sm  md:text-base">
          <div className="text-sm md:text-base">{row.hostName}</div>
          <div className="text-gray-500 text-sm md:text-base">
            {row.hostEmail}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="sm:p-6 w-full bg-gray-50 mt-3">
      <h1 className="text-base sm:text-xl font-bold mb-4 px-3">
        Admin Bookings
      </h1>
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader />
        </div>
      ) : (
        <>
          {/* 🔹 Filters, Tabs, Search, Sort — always visible */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 mb-10">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide md:overflow-visible">
              <SwitchTabs
                options={tabOptions}
                value={activeTab}
                onChange={setActiveTab}
              />
            </div>

            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4 w-full md:w-auto mb-1">
              <div className="relative grow md:grow-0 md:w-60 min-w-[180px]">
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <Input
                  type="text"
                  placeholder="Search Product"
                  className="pr-9 pl-8 py-1 rounded border text-sm w-full"
                  value={searchBy}
                  onChange={(e) => {
                    setSearchBy(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <div className="relative hover:bg-gray-100 p-2 rounded-md">
                <div
                  className="text-xl cursor-pointer"
                  onClick={() => setShowSort((prev) => !prev)}
                >
                  <FaSort />
                </div>
                {showSort && (
                  <div className="absolute right-0 mt-2 z-10 bg-white p-3 w-48 text-sm space-y-2">
                    <select
                      className="w-full border px-2 py-1 rounded"
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value as bookingSortOptions);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="">Sort By</option>
                      <option value="latest">Latest</option>
                      <option value="earliest">Earliest</option>
                      <option value="completed">Completed</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Table
            data={bookings}
            columns={columns}
            fallback={
              <div className="flex items-center justify-center py-20 text-center gap-2">
                <p className="text-gray-500 text-lg font-semibold">
                  No bookings found
                </p>
              </div>
            }
          />
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminBookings;
