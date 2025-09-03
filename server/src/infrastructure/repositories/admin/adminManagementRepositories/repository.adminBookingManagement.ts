import { IBooking } from "../../../../domain/entities/modelInterface/base/interface.booking";
import { IAdminBookingManagementRepository } from "../../../../domain/entities/repositoryInterface/admin/management/interface.adminBookingManagementRepository";
import bookingModel from "../../../../domain/models/base/booking/bookingModel";

export class AdminBookingManagementRepository
  implements IAdminBookingManagementRepository
{
  async getAllBookings(
    page: number,
    limit: number,
    sortBy?: string,
    searchBy?: string,
    tabBy?: string
  ): Promise<{ bookings: IBooking[]; totalPages: number }> {
    let match: any = {};

    if (tabBy && tabBy !== "all") {
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
        case "latest":
          sortObj = { createdAt: -1 };
          break;

        case "completed":
          match.status = "accepted";
          match["$expr"] = {
            $lte: [
              {
                $cond: [
                  { $isArray: "$selectedDates" },
                  { $toDate: { $arrayElemAt: ["$selectedDates", 0] } },
                  { $toDate: "$selectedDates" },
                ],
              },
              new Date(),
            ],
          };
          sortObj = { "selectedDates.0": -1 };
          break;

        case "upcoming":
          match.status = "pending";
          match["$expr"] = {
            $gte: [
              {
                $cond: [
                  { $isArray: "$selectedDates" },
                  { $toDate: { $arrayElemAt: ["$selectedDates", 0] } },
                  { $toDate: "$selectedDates" },
                ],
              },
              new Date(),
            ],
          };
          sortObj = { "selectedDates.0": 1 };
          break;

        case "cancelled":
          match.status = "rejected";
          sortObj = { createdAt: -1 };
          break;
      }
    }

    const skip = (page - 1) * limit;
    const [bookings, total] = await Promise.all([
      bookingModel.find(match).skip(skip).limit(limit).sort(sortObj).lean(),
      bookingModel.countDocuments(match),
    ]);

    console.log(sortBy, searchBy, tabBy, bookings);
    const totalPages = Math.ceil(total / limit);
    return { bookings: bookings as IBooking[], totalPages };
  }
}
