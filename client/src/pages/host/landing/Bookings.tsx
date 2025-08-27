import { allBookings } from "@/api/host/hostAccountService";
import { Button } from "@/components/Button";
import Pagination from "@/components/Pagination";
import { setAllBookings } from "@/redux/Slice/host/common/bookingsSlice";
import { RootState } from "@/redux/store";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const mockBookings = [
  {
    id: 1,
    eventType: "Corporate Meeting",
    status: "Auto rejected",
    statusReason: "Booking canceled due to inactivity",
    attendeesRange: "1 - 5 people",
    totalHours: 10,
    bookedDate: "2025-03-17",
    startTime: "09:00 AM",
    endTime: "07:00 PM",
    totalAmount: 391.12,
    currency: "$",
    imageUrl:
      "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=600",
    bookingType: "venue",
  },
  {
    id: 2,
    eventType: "Luxury Car Rental",
    status: "Confirmed",
    statusReason: "Booking confirmed by host",
    attendeesRange: undefined,
    totalHours: 5,
    bookedDate: "2025-08-20",
    startTime: "10:00 AM",
    endTime: "03:00 PM",
    totalAmount: 250.0,
    currency: "$",
    imageUrl:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600",
    bookingType: "rentcar",
  },
];

const Bookings = () => {
  const dispatch = useDispatch();
  const recivedBookings = useSelector(
    (state: RootState) => state.hostRecivedBookings.bookings
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("All");
  const pageLimit = 8;
  console.log(recivedBookings);

  const fetchAllBookings = async (pageNumber: number, pageLimit: number) => {
    setLoading(true);
    try {
      const response = await allBookings(pageNumber, pageLimit);
      dispatch(setAllBookings(response.bookings));
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
  }, [activeTab]);

  const handlePageChange = (page: number) => {
    let status;
    if (activeTab === "Confirmed") status = "approved";
    else if (activeTab === "Pending") status = "pending";

    fetchAllBookings(page, pageLimit);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:px-10">
      <div className="container mx-auto px-4 mb-3">
        <div className="-mx-2 px-2 overflow-x-auto scrollbar-none">
          <div className="flex gap-2 whitespace-nowrap">
            {[
              { label: "All", value: "all" },
              { label: "Pendings", value: "pending" },
              { label: "Confirmed", value: "confirmed" },
              { label: "Rejected", value: "rejected" },
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
      </div>

      <div className="container mx-auto px-2">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader />
          </div>
        ) : (
          <div className="space-y-8">
            {mockBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6 space-y-6 border"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h2 className="text-xl font-semibold">{booking.eventType}</h2>
                  {booking.status && (
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        booking.status.toLowerCase().includes("reject")
                          ? "bg-red-100 text-red-600"
                          : booking.status.toLowerCase().includes("confirm")
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </div>

                {/* Reason */}
                {booking.statusReason && (
                  <p className="text-sm text-gray-500">
                    {booking.statusReason}
                  </p>
                )}

                {/* Booking details */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image */}
                  <div className="sm:w-48 flex-shrink-0">
                    <img
                      src={booking.imageUrl}
                      alt={booking.eventType}
                      className="rounded-lg w-full h-32 sm:h-40 object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Booked date:</span>{" "}
                      {new Date(booking.bookedDate).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span>{" "}
                      {booking.startTime} - {booking.endTime}
                    </p>
                    {booking.totalHours !== undefined && (
                      <p>
                        <span className="font-medium">Total hours:</span>{" "}
                        {booking.totalHours}
                      </p>
                    )}
                    {booking.attendeesRange && (
                      <p>
                        <span className="font-medium">Attendees:</span>{" "}
                        {booking.attendeesRange}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Booking type:</span>{" "}
                      {booking.bookingType.charAt(0).toUpperCase() +
                        booking.bookingType.slice(1)}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="border-t pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-lg font-semibold">
                    Total price:{" "}
                    <span className="text-green-600">
                      {booking.currency}
                      {booking.totalAmount.toFixed(2)}
                    </span>
                  </p>
                  <button className="text-sm text-green-600 hover:underline">
                    Show full price calculation
                  </button>
                </div>
              </div>
            ))}
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
};

export default Bookings;
