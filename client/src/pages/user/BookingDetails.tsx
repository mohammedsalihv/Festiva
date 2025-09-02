import React from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { PiWarningCircle } from "react-icons/pi";

const bookingStatusLabels: Record<string, string> = {
  success: "accepted",
  rejected: "rejected",
  pending: "pending",
  canceled: "cancelled",
};

const bookingStatusColors: Record<string, string> = {
  success: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
  canceled: "bg-red-100 text-red-700",
};


const paymentStatusLabels: Record<string, string> = {
  success: "success",
  failed: "failed",
};

const paymentStatusColors: Record<string, string> = {
  success: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
};

const BookingDetails: React.FC = () => {
  const bookingDetails = useSelector(
    (state: RootState) => state.booking.bookingDetails
  );

  console.log(bookingDetails);
  return (
    <div className="w-full mx-auto py-14 sm:px-10 mt-6 sm:mt-20 font-poppins">
      {bookingDetails && (
        <div
          key={bookingDetails._id}
          className="bg-white rounded-xl overflow-hidden mb-10"
        >
          <div className=" flex justify-between sm:px-10 md:px-20 px-4">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold capitalize sm:mb-2">
              {bookingDetails?.assetType} Booking
            </h1>
            <div className="flex items-center">
              <p className="text-sm sm:text-base text-blue-600 cursor-pointer hover:bg-blue-50 p-1 rounded-md">
                Cancel?
              </p>
              <PiWarningCircle className="w-6 h-6 text-neonPink cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 sm:px-8 py-6">
            <div className="w-full md:w-1/3 space-y-6 px-3 md:px-8">
              <div className="rounded-lg shadow bg-white overflow-hidden">
                <div className="w-full aspect-[16/9] bg-gray-100">
                  <img
                    src={bookingDetails?.assetImage}
                    alt="Booked Asset"
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                  {/* Payment Details */}
                  <div>
                    <p className="text-black  text-sm font-medium mb-2">
                      Payment Details
                    </p>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-3 text-sm">
                      {/* Payment Status */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Payment Status</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            paymentStatusColors[
                              bookingDetails?.paymentDetails.paymentStatus
                            ]
                          }`}
                        >
                          {
                            paymentStatusLabels[
                              bookingDetails?.paymentDetails.paymentStatus
                            ]
                          }
                        </span>
                      </div>

                      {/* Transaction ID */}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction ID</span>
                        <span className="text-black font-medium">
                          {bookingDetails?.paymentDetails.transactionId}
                        </span>
                      </div>

                      {/* Paid On */}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Paid On</span>
                        <span className="text-black font-medium">
                          {bookingDetails?.paymentDetails.paymentDate
                            ? format(
                                new Date(
                                  bookingDetails.paymentDetails.paymentDate
                                ),
                                "MMM d, yyyy p"
                              )
                            : "N/A"}
                        </span>
                      </div>

                      {/* Platform Fee */}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Platform Fee</span>
                        <span className="text-black font-medium">
                          {bookingDetails?.paymentDetails.platformFee}.00
                        </span>
                      </div>

                      {/* Total Paid */}
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-800 font-semibold">
                          Total Paid
                        </span>
                        <span className="text-black font-bold">
                          {bookingDetails?.paymentDetails.total}.00
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-6 md:px-6 px-3">
              <div
                className={`rounded-md px-2 py-2 border ${
                  bookingStatusColors[bookingDetails?.bookingStatus]
                }`}
              >
                <p className="font-semibold flex items-center gap-2">
                  {bookingStatusLabels[
                    bookingDetails?.bookingStatus.charAt(0).toUpperCase() +
                      bookingDetails.bookingStatus.slice(1)
                  ] ??
                    bookingDetails?.bookingStatus.charAt(0).toUpperCase() +
                      bookingDetails.bookingStatus.slice(1)}
                </p>
                {bookingDetails?.bookingStatus === "pending" && (
                  <p className="text-sm mt-1 text-gray-600 italic">
                    Waiting for host response
                  </p>
                )}
                {bookingDetails?.bookingRejectedReason && (
                  <p className="text-sm mt-1">
                    {bookingDetails.bookingRejectedReason}
                  </p>
                )}
              </div>

              {/* Request Details */}
              <div className="border-b pb-4 px-3">
                <p className="text-black  text-sm font-medium mb-2">
                  Request Details
                </p>
                <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Servicer Name</span>
                    <span className="text-black font-medium">
                      {bookingDetails?.assetName}
                    </span>
                  </div>
                  {bookingDetails?.servicerLocation && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 block mb-1">
                        Servicer Location
                      </span>
                      <div className="text-black font-medium">
                        {bookingDetails.servicerLocation.houseNo},{" "}
                        {bookingDetails.servicerLocation.street} <br />
                        {bookingDetails.servicerLocation.district},{" "}
                        {bookingDetails.servicerLocation.state} <br />
                        {bookingDetails.servicerLocation.country} -{" "}
                        {bookingDetails.servicerLocation.zip}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="text-black font-medium">
                      {Array.isArray(bookingDetails?.bookedData.selectedDates)
                        ? bookingDetails?.bookedData.selectedDates
                            .map((d: string) =>
                              format(new Date(d), "MMM d, yyyy")
                            )
                            .join(", ")
                        : bookingDetails?.bookedData.selectedDates
                        ? format(
                            new Date(bookingDetails.bookedData.selectedDates),
                            "MMM d, yyyy"
                          )
                        : ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time</span>
                    <span className="text-black font-medium">
                      {bookingDetails?.bookedData.selectedTime}
                    </span>
                  </div>
                  {bookingDetails?.bookedData.attendeesCount && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Attendees</span>
                      <span className="text-black font-medium">
                        {bookingDetails.bookedData.attendeesCount}
                      </span>
                    </div>
                  )}
                  {bookingDetails?.bookedData.manPower && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Requested manpower</span>
                      <span className="text-black font-medium">
                        {bookingDetails.bookedData.manPower}
                      </span>
                    </div>
                  )}
                  {bookingDetails?.bookedData.selectedPackage && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Selected package</span>
                      <span className="text-black font-medium">
                        {bookingDetails.bookedData.selectedPackage}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service type</span>
                    <span className="text-black font-medium">
                      {bookingDetails?.assetType.charAt(0).toUpperCase() +
                        bookingDetails.assetType.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Host Details */}
              <div className="border-b pb-4 px-3">
                <p className="text-black text-sm font-medium mb-2">
                  Host Details
                </p>
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                  <img
                    className="w-12 h-12 rounded-full object-cover border"
                    src={bookingDetails?.hostDetails.hostProfilePic}
                    alt="Host"
                  />
                  <div>
                    <p className="text:sm sm:text-lg font-semibold text-black">
                      {bookingDetails?.hostDetails.hostName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Since{" "}
                      <span className="text-blue-600 text-xs sm:font-medium">
                        {format(
                          new Date(
                            bookingDetails.hostDetails.hostRegisteredTime
                          ),
                          "MMM d, yyyy"
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
