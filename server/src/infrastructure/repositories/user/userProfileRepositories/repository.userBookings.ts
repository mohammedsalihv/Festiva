import { IBooking } from "../../../../domain/entities/modelInterface/base/interface.booking";
import { IUserBookingsRepository } from "../../../../domain/entities/repositoryInterface/user/account/interface.userBookingsRepository";
import bookingModel from "../../../../domain/models/base/booking/bookingModel";

export class UserBookingsRepository implements IUserBookingsRepository {
  async findBookings(
    userId: string,
    skip: number,
    limit: number,
    sortBy?: string,
    searchBy?: string,
    tabBy?: string
  ): Promise<{ bookings: IBooking[]; total: number }> {
    const match: any = { userId: userId };

    if (tabBy) {
      match.assetType = tabBy;
    }

    if (searchBy) {
      const assetNameKeys = [
        "venueName",
        "carName",
        "catersName",
        "studioName",
        "businessName",
      ];
      match["$or"] = assetNameKeys.map((key) => ({
        [`bookedData.${key}`]: { $regex: searchBy, $options: "i" },
      }));
    }

    let sortObj: any = { createdAt: -1 };

    if (sortBy) {
      switch (sortBy) {
        case "asc":
          sortObj = { createdAt: 1 };
          break;
        case "desc":
          sortObj = { createdAt: -1 };
          break;
        case "completed":
          match.status = "accepted";
          match["$expr"] = {
            $lte: [
              {
                $cond: [
                  { $isArray: "$bookedData.selectedDates" },
                  { $arrayElemAt: ["$bookedData.selectedDates", 0] },
                  "$bookedData.selectedDates",
                ],
              },
              new Date().toISOString(),
            ],
          };
          sortObj = { "bookedData.selectedDates.0": -1 };
          break;
        case "upcoming":
          match.status = "accepted";
          match["$expr"] = {
            $gte: [
              {
                $cond: [
                  { $isArray: "$bookedData.selectedDates" },
                  { $arrayElemAt: ["$bookedData.selectedDates", 0] },
                  "$bookedData.selectedDates",
                ],
              },
              new Date().toISOString(),
            ],
          };
          sortObj = { "bookedData.selectedDates.0": 1 };
          break;
        case "cancelled":
          match.status = "cancelled";
          sortObj = { createdAt: -1 };
          break;
      }
    }

    const [bookings, total] = await Promise.all([
      bookingModel.find(match).skip(skip).limit(limit).sort(sortObj).lean(),
      bookingModel.countDocuments(match),
    ]);
    return { bookings, total };
  }
}
