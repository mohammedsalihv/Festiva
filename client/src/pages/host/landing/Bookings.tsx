import { allBookings, updateBooking } from "@/api/host/hostAccountService";
import { Button } from "@/components/Button";
import Pagination from "@/components/Pagination";
import { setAllBookings } from "@/redux/Slice/host/common/bookingsSlice";
import { RootState } from "@/redux/store";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCheckmarkDone } from "react-icons/io5";
import { VscClose } from "react-icons/vsc";
import { IoIosRefresh } from "react-icons/io";
import { MdMore } from "react-icons/md";
import ConfirmDialog from "@/reusable-components/user/Landing/ConfirmDialog";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { toast } from "react-toastify";

const Bookings = () => {
  const dispatch = useDispatch();
  const recivedBookings = useSelector(
    (state: RootState) => state.hostRecivedBookings.bookings
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [confirmAction, setConfirmAction] = useState(false);
  const [actionType, setActionType] = useState<"accepted" | "rejected" | null>(
    null
  );
  const [rejectReason, setRejectReason] = useState("");
  const [reasonError, setReasonError] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  const pageLimit = 2;

  const fetchAllBookings = async (
    pageNumber: number,
    pageLimit: number,
    status?: string
  ) => {
    setLoading(true);
    try {
      const response = await allBookings(pageNumber, pageLimit, status);
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

  useEffect(() => {
    fetchAllBookings(1, pageLimit, activeTab === "all" ? undefined : activeTab);
  }, [activeTab]);

  const handlePageChange = (page: number) => {
    fetchAllBookings(page, pageLimit);
  };

  const handleBookingAction = async (
    id: string,
    action: "accepted" | "rejected",
    reason?: string
  ) => {
    try {
      await updateBooking(id, action, reason);
      toast.success(
        action === "accepted"
          ? "Booking approved successfully"
          : "Booking rejected successfully"
      );
      fetchAllBookings(
        currentPage,
        pageLimit,
        activeTab === "all" ? undefined : activeTab
      );
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:px-10">
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader />
        </div>
      ) : recivedBookings.length === 0 ? (
        <div className="flex items-center justify-center py-20 text-center gap-2">
          <p className="text-gray-500 text-lg font-semibold">
            No bookings found{" "}
          </p>
          <IoIosRefresh
            onClick={() => {
              setActiveTab("all");
              fetchAllBookings(currentPage, pageLimit);
            }}
            className="w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer"
          />
        </div>
      ) : (
        <div className="container mx-auto px-4 mb-3">
          <div className="-mx-2 px-2 overflow-x-auto scrollbar-none py-3">
            <div className="flex gap-2 whitespace-nowrap">
              {[
                { label: "All", value: "all" },
                { label: "Pendings", value: "pending" },
                { label: "Accepted", value: "accepted" },
                { label: "Rejected", value: "rejected" },
              ].map((tab) => (
                <Button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`p-3 text-xs sm:text-sm md:text-base rounded font-poppins ${
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
          <div className="space-y-8">
            {recivedBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6 space-y-6 border"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {booking.assetType} service
                  </h2>
                  {booking.status && (
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        booking.status.toLowerCase().includes("rejected")
                          ? "bg-red-100 text-red-600"
                          : booking.status.toLowerCase().includes("accepted")
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </div>
                {booking.status && <p className="text-sm text-gray-500">{}</p>}

                {/* Booking details */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image */}
                  <div className="sm:w-48 flex-shrink-0">
                    <img
                      src={booking.bookedData.Images?.[0]}
                      className="rounded-lg w-full h-32 sm:h-40 object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Booked date:</span>{" "}
                      {Array.isArray(booking.selectedDates)
                        ? booking.selectedDates.map((date, i) => (
                            <span key={i}>
                              {new Date(date).toLocaleDateString()}
                              {i < booking.selectedDates.length - 1 && ", "}
                            </span>
                          ))
                        : new Date(booking.selectedDates).toLocaleDateString()}
                    </p>

                    <p>
                      <span className="font-medium">Time:</span>{" "}
                      {booking.selectedTimeSlot}
                    </p>
                    {booking.transactionId && (
                      <p>
                        <span className="font-medium">Attendees:</span>{" "}
                        {booking.transactionId}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Booking type:</span>{" "}
                      {booking.assetType.charAt(0).toUpperCase() +
                        booking.assetType.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4 flex items-center justify-between gap-4">
                  <p className="text-base md:text-lg font-semibold">
                    Total price:{" "}
                    <span className="text-green-600 text-sm">
                      {booking.total.toFixed(2)}
                    </span>
                  </p>
                  {booking.status === "pending" ? (
                    <div className="flex items-center gap-3">
                      <VscClose
                        onClick={() => {
                          setActionType("rejected");
                          setSelectedBookingId(booking._id);
                          setConfirmAction(true);
                        }}
                        className="w-8 h-8 text-red-600 hover:text-red-700 cursor-pointer bg-red-100 rounded-md p-1"
                      />
                      <IoCheckmarkDone
                        onClick={() => {
                          setActionType("accepted");
                          setSelectedBookingId(booking._id);
                          setConfirmAction(true);
                        }}
                        className="w-8 h-8 text-blue-600 hover:text-blue-700 cursor-pointer bg-blue-100 rounded-md p-1"
                      />
                    </div>
                  ) : (
                    <MdMore className="w-8 h-8 text-black hover:text-gray-700 cursor-pointer bg-gray-100 rounded-full p-1 transition" />
                  )}
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
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmAction}
        title={
          actionType === "accepted" ? "Confirm Approval" : "Confirm Rejection"
        }
        description={
          actionType === "accepted"
            ? "Are you sure you want to approve this booking?"
            : "Are you sure you want to reject this booking? Please provide a reason."
        }
        confirmText={actionType === "accepted" ? "Yes, Approve" : "Yes, Reject"}
        cancelText="Cancel"
        onConfirm={async () => {
          if (!selectedBookingId) return;
          if (actionType === "accepted") {
            await handleBookingAction(selectedBookingId, actionType);
          } else if (actionType === "rejected") {
            if (!rejectReason.trim()) {
              toast.error("Please provide a rejection reason");
              setReasonError(true);
              return;
            }
            await handleBookingAction(
              selectedBookingId,
              actionType,
              rejectReason
            );
          }

          setConfirmAction(false);
          setActionType(null);
          setRejectReason("");
        }}
        onCancel={() => {
          setConfirmAction(false);
          setActionType(null);
          setRejectReason("");
        }}
      >
        {actionType === "rejected" && (
          <textarea
            value={rejectReason}
            onChange={(e) => {
              setRejectReason(e.target.value);
              if (e.target.value.trim()) {
                setReasonError(false);
              }
            }}
            placeholder="Enter reason for rejection"
            className={`w-full mt-4 border rounded-md p-2 text-sm ${
              reasonError ? "border-red-500" : "border-gray-300"
            }`}
            rows={4}
          />
        )}
      </ConfirmDialog>

      <CustomToastContainer />
    </div>
  );
};

export default Bookings;
