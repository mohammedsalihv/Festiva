import {
  revenueResponse,
  serviceStatisticsResponse,
  serviceOverviewsResponse,
  totalUsersResponse,
  totalHostsResponse,
  totalBookingsResponse,
  totalIncomeResponse,
  allReviewsResponse,
  recentActivitiesResponse,
} from "../../../types/DTO/admin/dto.adminDashboard";
import { startOfWeek, differenceInWeeks } from "date-fns";
import { IBooking } from "../../../domain/entities/modelInterface/base/interface.booking";
import { IPayment } from "../../../domain/entities/modelInterface/base/interface.payment";
import { IReview } from "../../../domain/entities/modelInterface/base/interface.review";
import { IUserModel } from "../../../domain/entities/modelInterface/user/interface.user";
import { IHostModel } from "../../../domain/entities/modelInterface/host/interface.host";
import { IVenue } from "../../../domain/entities/serviceInterface/host/interface.venue";
import { IRentCar } from "../../../domain/entities/serviceInterface/host/interface.rentCar";
import { ICaters } from "../../../domain/entities/serviceInterface/host/interface.caters";
import { IStudio } from "../../../domain/entities/serviceInterface/host/interface.studio";

const calculateHikePercentage = (current: number, previous: number): string => {
  if (previous === 0) return current > 0 ? "100%" : "0%";
  const hike = ((current - previous) / previous) * 100;
  return `${hike.toFixed(2)}%`;
};

export const mapAdminDashboard = (
  allBookings: IBooking[],
  allPayments: IPayment[],
  allReviews: IReview[],
  allUsers: IUserModel[],
  allHosts: IHostModel[],
  allVenues: IVenue[],
  allRentcars: IRentCar[],
  allCaters: ICaters[],
  allStudios: IStudio[]
): {
  revenues: revenueResponse[];
  serviceStatistics: serviceStatisticsResponse;
  serviceOverviews: serviceOverviewsResponse;
  users: totalUsersResponse;
  hosts: totalHostsResponse;
  totalBookings: totalBookingsResponse;
  totalIncome: totalIncomeResponse;
  reviews: allReviewsResponse[];
  recentActivities: recentActivitiesResponse;
} => {
  const serviceTypes = Array.from(
    new Set(allBookings.map((b) => b.assetType).filter(Boolean))
  );

  
  const today = new Date();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  const twoWeeksAgo = new Date(today);
  twoWeeksAgo.setDate(today.getDate() - 14);

  const bookingMap = new Map<string, IBooking>();
  for (const b of allBookings) {
    if (b._id) bookingMap.set(String(b._id), b);
  }


const revenues: revenueResponse[] = serviceTypes.map((type) => {
  // Link payments to bookings via bookingId
  const relatedPayments = allPayments.filter((p) => {
    const booking = bookingMap.get(String(p.bookingId));
    return booking?.assetType === type;
  });

  // Total revenue for this service type
  const totalRevenue = relatedPayments.reduce((acc, p) => acc + (p.total || 0), 0);

  // Booking growth (last 7 days vs previous 7 days)
  const currentBookings = allBookings.filter(
    (b) => b.assetType === type && b.createdAt && new Date(b.createdAt) >= oneWeekAgo
  ).length;

  const previousBookings = allBookings.filter(
    (b) =>
      b.assetType === type &&
      b.createdAt &&
      new Date(b.createdAt) >= twoWeeksAgo &&
      new Date(b.createdAt) < oneWeekAgo
  ).length;

  const bookingGrowth = calculateHikePercentage(currentBookings, previousBookings);

  return {
    serviceType: type,
    totalRevenue,
    bookingGrowthPercentage: bookingGrowth,
  };
});



  // 📊 Service statistics
  const serviceStatistics: serviceStatisticsResponse = {
    assetType: serviceTypes,
    assetCounts: serviceTypes.map((type) => {
      switch (type) {
        case "venue":
          return allVenues.length;
        case "rentcar":
          return allRentcars.length;
        case "studio":
          return allStudios.length;
        case "caters":
          return allCaters.length;
        default:
          return 0;
      }
    }),
  };

  // 📊 Service overviews (line chart weekly data)
  const now = new Date();
  const weekStart = startOfWeek(now);
  const weeks = Array.from({ length: 10 }, (_, i) => `Week ${i + 1}`);
  const getWeekIndex = (date: Date) => {
    const diff = differenceInWeeks(date, weekStart);
    return diff >= 0 && diff < 10 ? diff : null;
  };

  const datasets = serviceTypes.map((assetType) => {
    const weeklyCounts = Array(10).fill(0);
    allBookings
      .filter((b) => b.assetType === assetType && b.createdAt)
      .forEach((b) => {
        const weekIndex = getWeekIndex(new Date(b.createdAt!));
        if (weekIndex !== null) weeklyCounts[weekIndex]++;
      });

    return { label: assetType, data: weeklyCounts };
  });

  const serviceOverviews = {
    labels: weeks,
    datasets,
  };

  // 👥 Users & Hosts
  const users: totalUsersResponse = { personCount: allUsers.length };
  const hosts: totalHostsResponse = { personCount: allHosts.length };

  // 📊 Total bookings (find top booked service)
  const bookingCountsByType = allBookings.reduce<Record<string, number>>(
    (acc, b) => {
      if (!b.assetType) return acc;
      acc[b.assetType] = (acc[b.assetType] || 0) + 1;
      return acc;
    },
    {}
  );

  const [topAssetType, topCount] = Object.entries(bookingCountsByType).reduce<
    [string, number]
  >((max, curr) => (curr[1] > max[1] ? curr : max), ["", 0]);

  const totalBookings: totalBookingsResponse = {
    bookingCount: allBookings.length,
    topBookedAsset: topAssetType,
    topBookedAssetCount: topCount,
  };

  // 💰 Total income
  const totalIncome: totalIncomeResponse = {
    total: allPayments.reduce((acc, p) => acc + (p.total || 0), 0),
    totalPayments: allPayments.length,
    platformFee: allPayments.reduce((acc, p) => acc + (p.platformFee || 0), 0),
  };

  // ⭐ Reviews
  const reviews: allReviewsResponse[] = allReviews.map((r) => {
    const reviewer = allUsers.find(
      (u) => u._id?.toString() === r.createrId.toString()
    );
    return {
      ReviewerName: reviewer
        ? `${reviewer.firstname ?? ""} ${reviewer.lastname ?? ""}`.trim()
        : "Unknown User",
      ReviewerImage: reviewer?.profilePic ?? "",
      rating: r.rating,
      comment: r.comment,
      ReviewedDate: r.createdAt ?? new Date(),
    };
  });

  // 🆕 Recent activities (same as yours)
  const recentBookings = allBookings
    .filter((b) => b.createdAt && new Date(b.createdAt) >= oneWeekAgo)
    .map((b) => ({
      assetImage: b.bookedData?.Images?.[0] ?? null,
      bookedService: b.assetType ?? "",
      bookedDate: b.createdAt ?? new Date(),
      bookingStatus: b.status ?? "",
    }));

  const recentRegistrations = [
    ...allUsers
      .filter((u) => u.timestamp && new Date(u.timestamp) >= oneWeekAgo)
      .map((u) => ({
        userName: `${u.firstname ?? ""} ${u.lastname ?? ""}`.trim(),
        userImage: u.profilePic ?? "",
        userEmail: u.email ?? "",
      })),
    ...allHosts
      .filter((h) => h.timestamp && new Date(h.timestamp) >= oneWeekAgo)
      .map((h) => ({
        userName: h.name ?? "",
        userImage: h.profilePic ?? "",
        userEmail: h.email ?? "",
      })),
  ];

  const mapListing = (assetType: string, items: any[], nameKey: string) =>
    items.map((i) => ({
      assetType,
      assetImage: i.Images?.[0] ?? "",
      assetName: i[nameKey] ?? "",
      listedStatus: i.status ?? "",
      createdAt: i.createdAt!,
    }));

  const recentListings = [
    ...mapListing("venue", allVenues, "venueName"),
    ...mapListing("rentcar", allRentcars, "carName"),
    ...mapListing("studio", allStudios, "studioName"),
    ...mapListing("caters", allCaters, "catersName"),
  ].filter((a) => a.createdAt && new Date(a.createdAt) >= oneWeekAgo);

  const recentReviews = allReviews
    .filter((r) => r.createdAt && new Date(r.createdAt) >= oneWeekAgo)
    .map((r) => {
      const reviewer = allUsers.find(
        (u) => u._id?.toString() === r.createrId.toString()
      );
      return {
        reviewerName: reviewer
          ? `${reviewer.firstname ?? ""} ${reviewer.lastname ?? ""}`.trim()
          : "Unknown User",
        reviewerImage: reviewer?.profilePic ?? "",
        revieweComment: r.comment,
      };
    });

  const recentActivities: recentActivitiesResponse = {
    bookings: recentBookings,
    registrations: recentRegistrations,
    listings: recentListings,
    reviews: recentReviews,
  };

  return {
    revenues,
    serviceStatistics,
    serviceOverviews,
    users,
    hosts,
    totalBookings,
    totalIncome,
    reviews,
    recentActivities,
  };
};
