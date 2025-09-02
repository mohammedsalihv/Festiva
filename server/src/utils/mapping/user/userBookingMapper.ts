import { userMyBookingsResponse } from "../../../types/DTO/user/dto.userBookings";
import { IBooking } from "../../../domain/entities/modelInterface/base/interface.booking";
import { userBookingDetailsResponse } from "../../../types/DTO/user/dto.userBookings";
import { IPayment } from "../../../domain/entities/modelInterface/base/interface.payment";
import { IHostModel } from "../../../domain/entities/modelInterface/host/interface.host";
import { ILocation } from "../../../domain/entities/serviceInterface/host/interface.location";

export const userBookingsMapping = (
  bookings: IBooking[]
): userMyBookingsResponse[] => {
  return bookings.map((booking) => {
    let assetName = "Unknown";
    let assetImage = "";

    switch (booking.assetType) {
      case "venue":
        assetName = (booking.bookedData as any).venueName ?? "Unknown Venue";
        assetImage = (booking.bookedData as any).Images?.[0] ?? "";
        break;

      case "rentcar":
        assetName = (booking.bookedData as any).carName ?? "Unknown Car";
        assetImage = (booking.bookedData as any).Images?.[0] ?? "";
        break;

      case "studio":
        assetName = (booking.bookedData as any).studioName ?? "Unknown Studio";
        assetImage = (booking.bookedData as any).Images?.[0] ?? "";
        break;

      case "caters":
        assetName = (booking.bookedData as any).caterName ?? "Unknown Cater";
        assetImage = (booking.bookedData as any).Images?.[0] ?? "";
        break;
    }

    return {
      _id: booking._id ? booking._id.toString() : "",
      assetName,
      assetImage,
      assetType: booking.assetType,
      bookedDate: booking.createdAt ?? "",
      bookingStatus: booking.status,
    };
  });
};

export const mapBookingDetails = (
  booking: IBooking,
  payment: IPayment | null,
  host: IHostModel | null,
  location: ILocation | null
): userBookingDetailsResponse => {
  const asset = booking.bookedData;

  let assetName: string;

  switch (booking.assetType) {
    case "venue":
      assetName = (asset as any).venueName ?? "Unknown Venue";
      break;

    case "rentcar":
      assetName = (asset as any).carName ?? "Unknown Car";
      break;

    case "studio":
      assetName = (asset as any).studioName ?? "Unknown Studio";
      break;

    case "caters":
      assetName = (asset as any).caterName ?? "Unknown Cater";
      break;

    default:
      assetName = "Unknown Asset";
      break;
  }

  return {
    _id: booking._id ? booking._id.toString() : "",
    assetImage: asset?.Images?.[0] || "",
    assetName,
    assetType: booking.assetType,
    bookingStatus: booking.status,
    bookedDate: booking.createdAt ?? new Date(),
    bookingRejectedReason: booking.bookingRejectedReason || "",

    bookedData: {
      selectedDates: booking.selectedDates || [],
      selectedTime: booking.selectedTimeSlot || "",
      attendeesCount: booking.attendeesCount,
      manPower: booking.manpowerCout,
      selectedPackageName: booking.packageName,
      selectedPackage: booking.seletedPackage || [],
    },

    paymentDetails: {
      paymentStatus: payment?.status ?? "",
      transactionId: payment?.transactionId ?? "",
      platformFee: payment?.platformFee ?? 0,
      total: payment?.total ?? 0,
      paymentDate: payment?.paymentDate || "",
    },

    hostDetails: {
      hostName: host?.name || "",
      hostProfilePic: host?.profilePic || "",
      hostRegisteredTime: host?.timestamp || "",
    },
    servicerLocation: {
      houseNo: location?.houseNo || "",
      street: location?.street || "",
      district: location?.district || "",
      state: location?.state || "",
      country: location?.country || "",
      zip: location?.zip || "",
    },
  };
};
