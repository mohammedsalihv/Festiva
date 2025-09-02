
import { IBooking } from "../../../domain/entities/modelInterface/base/interface.booking";
import { IHostModel } from "../../../domain/entities/modelInterface/host/interface.host";
import { IUserModel } from "../../../domain/entities/modelInterface/user/interface.user";
import { adminBookingsResponse } from "../../../types/DTO/admin/dto.adminBookings";

export const adminBookingMapper = (
  booking: IBooking,
  host: IHostModel | null,
  user: IUserModel | null
): adminBookingsResponse => {
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
    _id: booking._id?.toString() ?? "",
    assetName,
    assetImage: asset?.Images?.[0] || "",
    assetType: booking.assetType,
    Date: booking.selectedDates,
    timeSlot: booking.selectedTimeSlot ?? "",
    bookedUserName: user
      ? `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim()
      : "",
    bookedUserEmail: user?.email ?? "",
    bookedDate: booking.createdAt?.toString() ?? "",
    status: booking.status ?? "",
    hostName: host?.name ?? "",
    hostEmail: host?.email ?? "",
  };
};
