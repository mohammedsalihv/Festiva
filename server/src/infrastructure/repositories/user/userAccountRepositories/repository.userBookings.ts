import { IBooking } from "../../../../domain/entities/databaseModelInterfaces/baseModelInterfaces/interface.booking";
import { IUserBookingsRepository } from "../../../../domain/repositoryInterfaces/userRepositoryInterfaces/userAccountRepositoryInterfaces/interface.userBookingsRepository";
import bookingModel from "../../../../domain/entities/databaseModels/baseModels/baseBookingModels/bookingModel";

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


    const [bookings, total] = await Promise.all([
      bookingModel.find(match).skip(skip).limit(limit).sort(sortObj).lean(),
      bookingModel.countDocuments(match),
    ]);
    return { bookings, total };
  }

  async findBookingDetails(bookingId: string): Promise<IBooking | null> {
    return await bookingModel.findById(bookingId);
  }
}
