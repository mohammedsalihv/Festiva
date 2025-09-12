import { IPayment } from "../../../domain/entities/databaseModelInterfaces/baseModelInterfaces/interface.payment";
import { IBooking } from "../../../domain/entities/databaseModelInterfaces/baseModelInterfaces/interface.booking";
import { ICaters } from "../../../domain/entities/serviceInterface/host/interface.caters";
import { IVenue } from "../../../domain/entities/serviceInterface/host/interface.venue";
import { IStudio } from "../../../domain/entities/serviceInterface/host/interface.studio";
import { IRentCar } from "../../../domain/entities/serviceInterface/host/interface.rentCar";
import {
  RevenueAndPaymentsResponse,
  AssetOverviewItem,
  BookingStatsResponse,
  RecentBooking,
  BookingTableRow,
} from "../../../types/DTO's/hostDTO's/hostAccountDTO's/dto.hostDashbaord";
import { IUserModel } from "../../../domain/entities/databaseModelInterfaces/userModelInterfaces/interface.user";

export function mapPaymentsToRevenue(
  payments: IPayment[]
): RevenueAndPaymentsResponse {
  const revenueByMonth: { [key: string]: number } = {};

  payments.forEach((payment) => {
    const monthYear = payment.paymentDate.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    revenueByMonth[monthYear] =
      (revenueByMonth[monthYear] || 0) + payment.total;
  });

  // Find unique years in the payments
  const years = [...new Set(payments.map((p) => p.paymentDate.getFullYear()))];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const filledRevenue: { month: string; revenue: number }[] = [];

  years.forEach((year) => {
    months.forEach((m) => {
      const key = `${m} ${year}`;
      filledRevenue.push({
        month: key,
        revenue: revenueByMonth[key] || 0,
      });
    });
  });

  return {
    revenueByMonth: filledRevenue,
    total: payments.reduce((sum, p) => sum + p.total, 0),
    platformFee: payments.reduce((sum, p) => sum + p.platformFee, 0),
    gross: payments.reduce((sum, p) => sum + (p.total - p.platformFee), 0),
  };
}

// ---------------- Asset Overview ----------------
export function mapAssetsToOverview(
  venues: IVenue[],
  cars: IRentCar[],
  caters: ICaters[],
  studios: IStudio[]
): AssetOverviewItem[] {
  return [
    { assetType: "venue", assetCount: venues.length },
    { assetType: "rentcar", assetCount: cars.length },
    { assetType: "caters", assetCount: caters.length },
    { assetType: "studio", assetCount: studios.length },
  ];
}

// ---------------- Booking Statistics ----------------
export function mapBookingsToStats(bookings: IBooking[]): BookingStatsResponse {
  const counts: { [key: string]: number } = {};

  bookings.forEach((b) => {
    counts[b.status] = (counts[b.status] || 0) + 1;
  });

  // Ensure all statuses exist with at least 0 count
  const statuses: string[] = ["accepted", "pending", "rejected"];

  return statuses.map((status) => ({
    status,
    count: counts[status] || 0,
  }));
}

// ---------------- Recent Bookings ----------------

export function mapBookingsToRecent(
  bookings: IBooking[],
  users: IUserModel[]
): RecentBooking[] {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return bookings
    .filter(
      (b) =>
        b.createdAt && new Date(b.createdAt).getTime() >= oneWeekAgo.getTime()
    )
    .sort(
      (a, b) =>
        (b.createdAt ? new Date(b.createdAt).getTime() : 0) -
        (a.createdAt ? new Date(a.createdAt).getTime() : 0)
    )
    .slice(0, 6)
    .map((b) => {
      const user = users.find(
        (u) => u._id?.toString() === b.userId?.toString()
      );

      return {
        id: b._id?.toString() || "",
        userProfile: user?.profilePic || "",
        userName: user ? `${user.firstname} ${user.lastname ?? ""}` : "",
        serviceType: b.bookedData?.typeOfAsset || "",
        totalAmount: Number(b.total) || 0,
        bookingStatus: (["accepted", "pending", "rejected"].includes(b.status)
          ? b.status
          : "pending") as "accepted" | "pending" | "rejected",
      };
    });
}


// ---------------- Booking Table ----------------
export function mapBookingsToTable(
  bookings: IBooking[],
  payments: IPayment[],
  users: IUserModel[]
): BookingTableRow[] {
  return bookings.map((b) => {
    const relatedPayment = payments.find(
      (p) => p.bookingId?.toString() === b._id?.toString()
    );

    const user = users.find((u) => u._id?.toString() === b.userId.toString());

    return {
      _id: b._id?.toString() || "",
      userName: user
        ? `${user.firstname || ""} ${user.lastname || ""}`.trim()
        : "Unknown User",
      profilePic: user?.profilePic || "",
      type: b.assetType,
      status: b.status as "accepted" | "pending" | "rejected",
      date: b.createdAt?.toISOString() || "",
      amount: relatedPayment?.total || b.total,
      platformFee: relatedPayment?.platformFee || 0,
    };
  });
}
