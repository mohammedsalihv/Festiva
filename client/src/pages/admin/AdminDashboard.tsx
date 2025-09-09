import React, { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  ChartData,
} from "chart.js";
import { Button } from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "@/api/admin/adminDashboardService";
import { AppDispatch, RootState } from "@/redux/store";
import {
  setAllReviews,
  setRecentActivities,
  setRevenueCards,
  setServiceOverviews,
  setServiceStatics,
  setTotalBookings,
  setTotalHosts,
  setTotalIncome,
  setTotalUsers,
} from "@/redux/Slice/admin/adminDashboardSlice";
import Table from "@/components/Table";
import type { allReviews } from "@/utils/Types/admin/adminDashboardTypes";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T, rowIndex?: number) => React.ReactNode);
};

const renderStars = (rating: number) => {
  const totalStars = 5;
  return (
    <div className="flex justify-center">
      {Array.from({ length: totalStars }, (_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 sm:h-5 sm:w-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.166c.969 0 1.371 1.24.588 1.81l-3.374 2.455a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.374-2.455a1 1 0 00-1.175 0l-3.374 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.067 9.384c-.783-.57-.38-1.81.588-1.81h4.166a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const revenueCards = useSelector(
    (state: RootState) => state.adminDashboard.revenueCards
  );
  const serviceStatics = useSelector(
    (state: RootState) => state.adminDashboard.serviceStatics
  );
  const serviceOverviews = useSelector(
    (state: RootState) => state.adminDashboard.serviceOverviews
  );
  const totalUsers = useSelector(
    (state: RootState) => state.adminDashboard.totalUsers
  );
  const totalHosts = useSelector(
    (state: RootState) => state.adminDashboard.totalHosts
  );
  const totalBookings = useSelector(
    (state: RootState) => state.adminDashboard.totalBookings
  );
  const totalIncome = useSelector(
    (state: RootState) => state.adminDashboard.totalIncome
  );
  const recentActivities = useSelector(
    (state: RootState) => state.adminDashboard.recentActivities
  );
  const allReviews = useSelector(
    (state: RootState) => state.adminDashboard.allReviews
  );

  const fetchAdminDashboard = async () => {
    setLoading(true);
    try {
      const response = await getDashboard();
      dispatch(setRevenueCards(response.revenues));
      dispatch(setServiceStatics(response.serviceStatistics));
      dispatch(setServiceOverviews(response.serviceOverviews));
      dispatch(setTotalUsers(response.users));
      dispatch(setTotalHosts(response.hosts));
      dispatch(setTotalBookings(response.totalBookings));
      dispatch(setTotalIncome(response.totalIncome));
      dispatch(setRecentActivities(response.recentActivities));
      dispatch(setAllReviews(response.reviews));
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminDashboard();
  }, []);

  if (loading) return <p className="text-center p-10">Loading dashboard...</p>;

  const pieColors = ["#F97316", "#3B82F6", "#10B981", "#EC4899"];

  const pieData: ChartData<"pie", number[], string> = {
    labels: serviceStatics?.assetType ?? [],
    datasets: [
      {
        data: serviceStatics?.assetCounts ?? [],
        backgroundColor: pieColors,
        hoverBackgroundColor: pieColors,
      },
    ],
  };

  const lineColors = [
    { border: "#3B82F6", background: "rgba(59, 130, 246, 0.2)" },
    { border: "#F59E0B", background: "rgba(245, 158, 11, 0.2)" },
    { border: "#10B981", background: "rgba(16, 185, 129, 0.2)" },
    { border: "#8B5CF6", background: "rgba(139, 92, 246, 0.2)" },
  ];

  const lineData: ChartData<"line", number[], string> = {
    labels: serviceOverviews?.labels ?? [],
    datasets:
      serviceOverviews?.datasets.map((dataset, idx) => ({
        label: dataset.label,
        data: dataset.data,
        borderColor: lineColors[idx % lineColors.length].border,
        backgroundColor: lineColors[idx % lineColors.length].background,
        fill: true,
        tension: 0.4,
      })) ?? [],
  };

  const reviewsData: allReviews[] = allReviews.map((r) => ({
    ReviewerName: r.ReviewerName,
    ReviewerImage: r.ReviewerImage,
    comment: r.comment,
    rating: r.rating,
    ReviewedDate: r.ReviewedDate,
  }));

  const reviewColumns: Column<allReviews>[] = [
    {
      header: "Image",
      accessor: (row) => (
        <div className="flex justify-center">
          <img
            src={row.ReviewerImage}
            alt={row.ReviewerName}
            className="w-10 h-10 rounded-full"
          />
        </div>
      ),
    },
    {
      header: "Name",
      accessor: (row) => <div className="text-left">{row.ReviewerName}</div>,
    },

    {
      header: "Comment",
      accessor: (row) => <div className="text-left">{row.comment}</div>,
    },
    {
      header: "Rating",
      accessor: (row) => renderStars(row.rating),
    },
    {
      header: "Date",
      accessor: (row) => (
        <div className="text-left">
          {new Date(row.ReviewedDate).toLocaleDateString()}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-100 font-sans min-h-screen overflow-x-hidden">
      <div className="flex flex-col lg:flex-row">
        <main className="flex-1 p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 space-y-4 md:space-y-0">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button className="bg-blue-500 text-white px-4 py-2 rounded">
                Filter data
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 max-w-full bg-gray-100">
            <div className="bg-green-500 text-white p-3 sm:p-4 rounded-lg shadow">
              <p className="text-base sm:text-lg">Total income</p>
              <p className="text-2xl md:text-3xl font-bold">
                {totalIncome?.total ?? 0}.00
              </p>
              <p className="text-xs sm:text-sm font-semibold truncate">
                Total payments : {totalIncome?.totalPayments}.00
              </p>
              <p className="text-xs sm:text-sm font-semibold truncate">
                Total platform fee : {totalIncome?.platformFee}.00
              </p>
              <p className="text-xs sm:text-sm font-semibold">
                Updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="bg-orange-500 text-white p-3 sm:p-4 rounded-lg shadow">
              <p className="text-base sm:text-lg">Total bookings</p>
              <p className="text-2xl md:text-3xl font-bold">
                {totalBookings?.bookingCount}
              </p>
              <p className="text-xs sm:text-sm font-semibold truncate">
                Top booked asset:{" "}
                {totalBookings?.topBookedAsset
                  ? totalBookings.topBookedAsset.charAt(0).toUpperCase() +
                    totalBookings.topBookedAsset.slice(1)
                  : "N/A"}
              </p>
              <p className="text-xs sm:text-sm font-semibold">
                Top booked count: {totalBookings?.topBookedAssetCount}
              </p>
              <p className="text-xs sm:text-sm font-semibold">
                Updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="bg-blue-500 text-white p-3 sm:p-4 rounded-lg shadow">
              <p className="text-base sm:text-lg">Total users</p>
              <p className="text-2xl md:text-3xl font-bold">
                {totalUsers?.personCount ?? 0}
              </p>
              <p className="text-xs sm:text-sm font-semibold">
                Updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="bg-purple-500 text-white p-3 sm:p-4 rounded-lg shadow">
              <p className="text-base sm:text-lg">Total hosts</p>
              <p className="text-2xl md:text-3xl font-bold">
                {totalHosts?.personCount ?? 0}
              </p>
              <p className="text-xs sm:text-sm font-semibold">
                Updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 max-w-full bg-gray-100">
            {revenueCards.map((card, index) => {
              const icons: Record<string, string> = {
                venue: "🏟️",
                rentcar: "🚗",
                studio: "🎥",
                caters: "🍽️",
              };

              const formattedRevenue = card.totalRevenue.toLocaleString();
              const percentage = parseFloat(card.bookingGrowthPercentage);
              const isPositive = percentage >= 0;

              return (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow flex items-center space-x-4"
                >
                  <div className="bg-gray-100 p-2 rounded-full">
                    <span className="text-xl">
                      {icons[card.serviceType] || "📊"}
                    </span>
                  </div>
                  <div>
                    <p className="text-xl font-bold">{formattedRevenue}.00</p>
                    <p
                      className={`${
                        isPositive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {card.bookingGrowthPercentage}% this week
                    </p>
                    <p className="text-sm text-gray-500">
                      {card.serviceType.charAt(0).toUpperCase() +
                        card.serviceType.slice(1)}{" "}
                      Revenue
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-bold mb-4">Statistics & Overview</h2>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/2">
                <h3 className="text-md font-semibold mb-2">
                  Current Statistics
                </h3>
                <div className="h-64">
                  <Pie
                    data={pieData}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
                <ul className="space-y-2 mt-4">
                  {serviceStatics?.assetType?.map((type, index) => {
                    const count = serviceStatics.assetCounts[index];
                    const total = serviceStatics.assetCounts.reduce(
                      (a, b) => a + b,
                      0
                    );
                    const percentage = ((count / total) * 100).toFixed(0);

                    return (
                      <li key={type} className="flex items-center">
                        <span
                          className="w-4 h-4 mr-2"
                          style={{ backgroundColor: pieColors[index] }}
                        ></span>
                        {type.charAt(0).toUpperCase() + type.slice(1)} (
                        {percentage}%) - {count}{" "}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Line Chart */}
              <div className="w-full lg:w-1/2">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-semibold">Service Overview</h3>
                  <select className="border p-2 rounded">
                    <option>Weekly (2025)</option>
                  </select>
                </div>
                <div className="h-64">
                  <Line
                    data={lineData}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ====== Recent Activities Section ====== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-gray-100">
            {(recentActivities?.bookings?.length ?? 0) > 0 ||
            (recentActivities?.registrations?.length ?? 0) > 0 ||
            (recentActivities?.listings?.length ?? 0) > 0 ||
            (recentActivities?.assetAdminUpdation?.length ?? 0) > 0 ||
            (recentActivities?.hostBoookingApproval?.length ?? 0) > 0 ? (
              <>
                {/* Bookings */}
                {(recentActivities?.bookings ?? []).map((booking, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-lg shadow mb-4 flex items-center space-x-4"
                  >
                    <span className="bg-green-100 p-2 rounded-full text-green-500">
                      🏟️
                    </span>
                    <div>
                      <p className="font-medium">{booking.bookedService}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.bookedDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <p className="ml-auto text-green-500">
                      {booking.bookingStatus === "Completed" ? "+$5.553" : ""}
                    </p>
                    <span
                      className={`px-2 py-1 rounded ${
                        booking.bookingStatus === "Completed"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </div>
                ))}

                {/* Registrations */}
                {(recentActivities?.registrations ?? []).map((reg, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-lg shadow mb-4 flex items-center space-x-4"
                  >
                    <img
                      src={reg.userImage}
                      alt={reg.userName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{reg.userName}</p>
                      <p className="text-sm text-gray-500">{reg.userEmail}</p>
                    </div>
                  </div>
                ))}

                {/* Listings */}
                {(recentActivities?.listings ?? []).map((listing, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-lg shadow mb-4 flex items-center space-x-4"
                  >
                    <img
                      src={listing.assetImage || "/placeholder.png"}
                      alt={listing.assetName || listing.assetType}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">
                        {listing.assetName || listing.assetType}
                      </p>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          listing.listedStatus === "Active"
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {listing.listedStatus}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Admin Updates */}
                {(recentActivities?.assetAdminUpdation ?? []).map(
                  (upd, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-lg shadow mb-4 flex items-center space-x-4"
                    >
                      <img
                        src={upd.adminImage}
                        alt={upd.adminName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">
                          {upd.adminName} updated {upd.assetName}
                        </p>
                        {upd.rejectionReason && (
                          <p className="text-sm text-red-500">
                            Reason: {upd.rejectionReason}
                          </p>
                        )}
                        <p className="text-sm text-gray-500">
                          {upd.assetStatus}
                        </p>
                      </div>
                    </div>
                  )
                )}

                {/* Host Booking Approvals */}
                {(recentActivities?.hostBoookingApproval ?? []).map(
                  (hb, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-lg shadow mb-4 flex items-center space-x-4"
                    >
                      <img
                        src={hb.hostImage}
                        alt={hb.hostName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">
                          {hb.hostName} {hb.bookingStatus.toLowerCase()} booking{" "}
                          {hb.bookedAssetName}
                        </p>
                        {hb.rejectionReason && (
                          <p className="text-sm text-red-500">
                            Reason: {hb.rejectionReason}
                          </p>
                        )}
                        <p className="text-sm text-gray-500">{hb.bookedDate}</p>
                      </div>
                    </div>
                  )
                )}
              </>
            ) : (
              <div className="bg-white p-4 rounded-lg shadow text-center text-gray-500">
                No recent activities.
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">Reviews</h2>
              <Table
                data={reviewsData}
                columns={reviewColumns}
                fallback={<p>No reviews available</p>}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
