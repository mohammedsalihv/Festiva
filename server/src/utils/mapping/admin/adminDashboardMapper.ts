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

import { IBooking } from "../../../domain/entities/modelInterface/base/interface.booking";
import { IPayment } from "../../../domain/entities/modelInterface/base/interface.payment";
import { IReview } from "../../../domain/entities/modelInterface/base/interface.review";
import { IUserModel } from "../../../domain/entities/modelInterface/user/interface.user";
import { IHostModel } from "../../../domain/entities/modelInterface/host/interface.host";
import { IVenue } from "../../../domain/entities/serviceInterface/host/interface.venue";
import { IRentCar } from "../../../domain/entities/serviceInterface/host/interface.rentCar";
import { ICaters } from "../../../domain/entities/serviceInterface/host/interface.caters";
import { IStudio } from "../../../domain/entities/serviceInterface/host/interface.studio";

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
  revenues: revenueResponse;
  serviceStatistics: serviceStatisticsResponse;
  serviceOverviews: serviceOverviewsResponse;
  users: totalUsersResponse;
  hosts: totalHostsResponse;
  totalBookings: totalBookingsResponse;
  totalIncome: totalIncomeResponse;
  reviews: allReviewsResponse[];
  recentActivities: recentActivitiesResponse;
} => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // 1. Revenues
  const revenues: revenueResponse = {
    totalRevenue: allPayments.reduce((acc, p) => acc + (p.total || 0), 0),
    revenueService: "All Services",
    hikePercentage: "12%",
  };

  // 2. Service statistics
  const serviceStatistics: serviceStatisticsResponse = {
    assetType: ["venue", "rentcar", "studio", "caters"],
    assetCounts: [
      allVenues.length,
      allRentcars.length,
      allStudios.length,
      allCaters.length,
    ],
  };

  // 3. Service overviews
  const allOverviews: serviceOverviewsResponse[] = [
    {
      assetType: "venue",
      assetCount: [allVenues.length],
      bookedTimes: [allBookings.filter((b) => b.assetType === "venue").length],
    },
    {
      assetType: "rentcar",
      assetCount: [allRentcars.length],
      bookedTimes: [
        allBookings.filter((b) => b.assetType === "rentcar").length,
      ],
    },
    {
      assetType: "studio",
      assetCount: [allStudios.length],
      bookedTimes: [allBookings.filter((b) => b.assetType === "studio").length],
    },
    {
      assetType: "caters",
      assetCount: [allCaters.length],
      bookedTimes: [allBookings.filter((b) => b.assetType === "caters").length],
    },
  ];

  const serviceOverviews: serviceOverviewsResponse = allOverviews.reduce(
  (prev, curr) => (curr.bookedTimes[0] > prev.bookedTimes[0] ? curr : prev),
  allOverviews[0]
);

  // 4. Users
  const users: totalUsersResponse = { personCount: allUsers.length };

  // 5. Hosts
  const hosts: totalHostsResponse = { personCount: allHosts.length };

  const totalBookings: totalBookingsResponse = {
    bookingCount: allBookings.length,
    bookingAsset: "All",
  };

  const totalIncome: totalIncomeResponse = {
    total: allPayments.reduce((acc, p) => acc + (p.total || 0), 0),
    totalPayments: allPayments.length,
    platformFee: allPayments.reduce((acc, p) => acc + (p.platformFee || 0), 0),
  };

  const reviews: allReviewsResponse[] = allReviews.map((r) => {
    const reviewer = allUsers.find(
      (u) => u.id?.toString() === r.createrId.toString()
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

  const recentListings = [
    ...allVenues.map((v) => ({
      assetType: "venue",
      assetImage: v.Images?.[0] ?? "",
      assetName: v.venueName ?? "",
      listedStatus: v.status ?? "",
      createdAt: v.createdAt!,
    })),
    ...allRentcars.map((r) => ({
      assetType: "rentcar",
      assetImage: r.Images?.[0] ?? "",
      assetName: r.carName ?? "",
      listedStatus: r.status ?? "",
      createdAt: r.createdAt!,
    })),
    ...allStudios.map((s) => ({
      assetType: "studio",
      assetImage: s.Images?.[0] ?? "",
      assetName: s.studioName ?? "",
      listedStatus: s.status ?? "",
      createdAt: s.createdAt!,
    })),
    ...allCaters.map((c) => ({
      assetType: "caters",
      assetImage: c.Images?.[0] ?? "",
      assetName: c.catersName ?? "",
      listedStatus: c.status ?? "",
      createdAt: c.createdAt!,
    })),
  ].filter((a) => a.createdAt && new Date(a.createdAt) >= oneWeekAgo);

  const recentReviews = allReviews
    .filter((r) => r.createdAt && new Date(r.createdAt) >= oneWeekAgo)
    .map((r) => {
      const reviewer = allUsers.find(
        (u) => u.id?.toString() === r.createrId.toString()
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
    booking: recentBookings[0],
    registrations: recentRegistrations[0],
    listings: recentListings[0],
    reviews: recentReviews[0],
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
