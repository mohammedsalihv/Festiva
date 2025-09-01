import React from "react";
import { format } from "date-fns";

const statusLabels: Record<string, string> = {
  success: "Confirmed",
  rejected: "Auto rejected",
  pending: "Pending",
  canceled: "Canceled",
};

const statusColors: Record<string, string> = {
  success: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
  canceled: "bg-red-100 text-red-700",
};

const BookingDetails: React.FC = () => {

  
  



  const bookings = [
    {
      _id: "68b095eff774e1d5be85868b",
      assetType: "venue",
      selectedDates: ["2025-09-01"],
      selectedTimeSlot: "04:00 PM - 07:00 PM",
      attendeesCount: 500,
      total: 21050,
      bookedData: {
        transactionId: "order_RAqFomA3b6MHTB",
        paymentId: "68b095d9f774e1d5be858688",
        status: "rejected",
        createdAt: "2025-08-28T17:46:23.166+00:00",
        bookingRejectedReason: "The service currently on hold",
      },
      payment: {
        status: "success",
        platformFee: 50,
        total: 21050,
        paymentDate: "2025-08-28T17:46:01.006+00:00",
      },
      asset: {
        name: "Corporate Meeting",
        image:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
      },
      host: {
        name: "Manu",
        image:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
      },
    },
  ];

  return (
    <div className="w-full mx-auto py-10 sm:px-10 mt-6 sm:mt-20">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-white rounded-xl overflow-hidden mb-10"
        >
          {/* Header */}
          <div className=" flex justify-between sm:px-10 md:px-20 px-4">
            <h1 className="text-lg font-semibold capitalize sm:mb-2">
              {booking.assetType} Booking
            </h1>
            <p className="text-base text-blue-600 cursor-pointer hover:bg-blue-50 p-1 rounded-md">
              Cancel
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 sm:px-8 py-6">
            {/* Left Column */}
            <div className="w-full md:w-1/3 space-y-6 px-3 md:px-8">
              <img
                src={booking.asset.image}
                alt={booking.asset.name}
                className="rounded-lg w-full h-44 object-cover shadow"
              />

              {/* Status */}
              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium inline-block mt-1 ${
                    statusColors[booking.bookedData.status]
                  }`}
                >
                  {statusLabels[booking.bookedData.status]}
                </span>
              </div>

              {/* Attendees */}
              <div>
                <p className="text-gray-500 text-sm">Attendees</p>
                <p className="font-medium">{booking.attendeesCount} people</p>
              </div>

              {/* Payment Details */}
              <div className="">
                <p className="text-gray-500 text-sm mb-2">Payment Details</p>
                <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-sm ">
                  <p className="py-1">
                    Transaction ID: {booking.bookedData.transactionId}
                  </p>
                  <p className="py-1">
                    Payment ID: {booking.bookedData.paymentId}
                  </p>
                  <p className="py-1">
                    Platform Fee: ₹{booking.payment.platformFee}
                  </p>
                  <p className="font-semibold py-1">
                    Total Paid: ₹{booking.payment.total}
                  </p>
                  <p className="text-gray-600 py-1">
                    Paid On:{" "}
                    {format(
                      new Date(booking.payment.paymentDate),
                      "MMM d, yyyy p"
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-6 md:px-6 px-2">
              {/* Status message */}
              {booking.bookedData.bookingRejectedReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 font-medium">
                    {statusLabels[booking.bookedData.status]}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    {booking.bookedData.bookingRejectedReason}
                  </p>
                </div>
              )}

              {/* Request Details */}
              <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                <p className="font-medium text-gray-700">Request Details</p>
                <p>
                  Date:{" "}
                  {format(new Date(booking.selectedDates[0]), "MMM d, yyyy")} ·{" "}
                  {booking.selectedTimeSlot}
                </p>
                <p>Attendees: {booking.attendeesCount}</p>
                <p>Event type: {booking.asset.name}</p>
              </div>

              {/* Host Section */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={booking.host.image}
                  alt={booking.host.name}
                />
                <div>
                  <p className="text-lg font-semibold">{booking.host.name}</p>
                  <p className="text-gray-500 text-sm">Host since 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingDetails;
