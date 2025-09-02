import { useEffect, useState } from "react";
import Table from "@/components/Table";
import { Column } from "@/utils/Options/user/tableFields";
import SwitchTabs from "@/components/SwitchTabs";
import { tabOptions } from "@/utils/Options/admin/adminService";
import { FaSearch, FaSort } from "react-icons/fa";
import { Input } from "@/components/Input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setAllMyBookings, setBookingDetails } from "@/redux/Slice/user/bookingSlice";
import { fetchBookingDetails, myAllBookings } from "@/api/user/base/bookingService";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";
import {
  myBookings,
  bookingSortOptions,
  bookingDetails,
} from "@/utils/Types/user/userBookingsTypes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
dayjs.extend(relativeTime);

const MyBookings = () => {
  const Bookings = useSelector(
    (state: RootState) => state.booking?.bookings ?? []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchBy, setSearchBy] = useState("");
  const [sortBy, setSortBy] = useState<bookingSortOptions>("asc");
  const [showSort, setShowSort] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const pageLimit = 6;

  const fetchAllBookings = async (pageNumber: number, pageLimit: number) => {
  setLoading(true);
  try {
    const response = await myAllBookings(
      pageNumber,
      pageLimit,
      sortBy || undefined,
      searchBy || undefined,
      activeTab === "all" ? undefined : activeTab 
    );

    dispatch(setAllMyBookings(response.bookings));
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

   const handleRowClick = async (row: myBookings) => {
  if (!row._id) {
    console.error("Booking ID missing for row:", row);
    return;
  }
  try {
    setLoading(true);
    const details: bookingDetails = await fetchBookingDetails(row._id);
    dispatch(setBookingDetails(details)); 
    navigate(`/user/bookings/detail/${row._id}`);
  } catch (error) {
    console.error("Failed to fetch booking details", error);
  } finally {
    setLoading(false);
  }
};



  const columns: Column<myBookings>[] = [
    {
      header: "No",
      accessor: (_row, index) => (index !== undefined ? index + 1 : "-"),
    },
    {
      header: "Image",
      accessor: (row) => (
        <img
          src={row.assetImage}
          alt={row.assetName}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border"
        />
      ),
    },
    { header: "Asset Name", accessor: "assetName" },
    { header: "Asset Type", accessor: "assetType" },
    {
      header: "Booked Date",
      accessor: (row) =>
        row.bookedDate ? dayjs(row.bookedDate).fromNow() : "Not yet",
    },
    {
      header: "Status",
      accessor: (row) => (
        <span
          className={`px-2 py-1 text-sm rounded ${
            row.bookingStatus === "accepted"
              ? "bg-green-100 text-green-700"
              : row.bookingStatus === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.bookingStatus}
        </span>
      ),
    },
  ];

  return (
  <div className="sm:p-6 px-3 w-full bg-white mt-16 sm:mt-14 font-poppins sm:px-10">
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
          data={Bookings}
          columns={columns}
          onRowClick={handleRowClick}   
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

export default MyBookings;
