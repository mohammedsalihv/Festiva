import { userMyBookingsResponse } from "../../../types/DTO/user/dto.userBookings";
import { IBooking } from "../../../domain/entities/modelInterface/base/interface.booking";

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
      _id: booking.bookingId ? booking.bookingId.toString() : "",
      assetName,
      assetImage,
      assetType: booking.assetType,
      bookedDate: booking.createdAt ?? "",
      bookingStatus: booking.status,
    };
  });
};
