import { IPayment } from "../../../domain/entities/modelInterface/base/interface.payment";
import { IBooking } from "../../../domain/entities/modelInterface/base/interface.booking";
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
} from "../../../types/DTO/host/dto.hostDashbaord";

export function mapPaymentsToRevenue(
  payments: IPayment[]
): RevenueAndPaymentsResponse {
  const revenueByMonth: { [key: string]: number } = {};

  payments.forEach((payment) => {
    const month = payment.paymentDate.toLocaleString("default", {
      month: "short",
    });
    revenueByMonth[month] = (revenueByMonth[month] || 0) + payment.total;
  });

  return {
    revenueByMonth: Object.entries(revenueByMonth).map(([month, revenue]) => ({
      month,
      revenue,
    })),
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

  return Object.entries(counts).map(([status, count]) => ({
    status,
    count,
  }));
}

// ---------------- Recent Bookings ----------------
export function mapBookingsToRecent(bookings: IBooking[]): RecentBooking[] {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return bookings
    .filter((b) => b.createdAt && b.createdAt >= oneWeekAgo) 
    .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)) 
    .slice(0, 6) // limit to 6
    .map((b) => ({
      id: b._id?.toString() || "",
      user: b.userId.toString(),
      service: b.bookedData?.about || "",
      amount: b.total,
      status: b.status as "accepted" | "pending" | "rejected",
    }));
}
// ---------------- Booking Table ----------------
export function mapBookingsToTable(
  bookings: IBooking[],
  payments: IPayment[]
): BookingTableRow[] {
  return bookings.map((b) => {
    const relatedPayment = payments.find(
      (p) => p.bookingId?.toString() === b._id?.toString()
    );
    return {
      id: b._id?.toString() || "",
      user: b.userId.toString(),
      service: b.bookedData?.about || "",
      type: b.assetType,
      status: b.status as "accepted" | "pending" | "rejected",
      date: b.createdAt?.toISOString() || "",
      amount: relatedPayment?.total || b.total,
      platformFee: relatedPayment?.platformFee || 0,
    };
  });
}
