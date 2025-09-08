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

  console.log("revenueCards", revenueCards);
  console.log("serviceStatics", serviceStatics);
  console.log("serviceOverviews", serviceOverviews);
  console.log("totalUsers", totalUsers);
  console.log("totalHosts", totalHosts);
  console.log("totalBookings", totalBookings);
  console.log("totalIncome", totalIncome);
  console.log("recentActivities", recentActivities);
  console.log("allReviews", allReviews);

  const fetchAdminDashboard = async () => {
    setLoading(true);
    try {
      const response = await getDashboard();
      console.log(response);
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

  if (loading) return <p>Loading dashboard...</p>;

  const pieData = {
    labels: ["Venue", "RentCar", "Studio", "Caters"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const lineData = {
    labels: [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
      "Week 8",
      "Week 9",
      "Week 10",
    ],
    datasets: [
      {
        label: "Venue",
        data: [200, 300, 250, 400, 350, 500, 450, 600, 550, 700],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
      {
        label: "RentCar",
        data: [150, 250, 200, 300, 250, 400, 350, 500, 450, 600],
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        fill: true,
      },
    ],
  };

  const reviews = [
    {
      id: 1,
      name: "John Doe",
      image: "https://i.pravatar.cc/40?img=1",
      comment: "Great venue, really enjoyed the event!",
      assetType: "Venue",
      rating: 5,
      date: "2025-08-28",
    },
    {
      id: 2,
      name: "Sophia Smith",
      image: "https://i.pravatar.cc/40?img=2",
      comment: "Car was clean and on time.",
      assetType: "RentCar",
      rating: 4,
      date: "2025-08-25",
    },
    {
      id: 3,
      name: "Alex Johnson",
      image: "https://i.pravatar.cc/40?img=3",
      comment: "Studio had excellent facilities.",
      assetType: "Studio",
      rating: 5,
      date: "2025-08-22",
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
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 max-w-full bg-gray-100">
            <div className="bg-green-500 text-white p-4 rounded-lg shadow">
              <p className="text-lg">Total income</p>
              <p className="text-xl sm:text-3xl font-bold">
                {totalIncome?.total ?? 0}.00
              </p>
              <p className="text-sm font-semibold">
                Total payments : {totalIncome?.totalPayments}.00
              </p>
              <p className="text-sm font-semibold">
                Total platform fee : {totalIncome?.platformFee}.00
              </p>
              <p className="text-sm font-semibold">
                Updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="bg-orange-500 text-white p-4 rounded-lg shadow">
              <p className="text-lg">Total bookings</p>
              <p className="text-xl sm:text-3xl font-bold">
                {totalBookings?.bookingCount}
              </p>
              <p className="text-sm font-semibold">
                Top booked asset:{" "}
                {totalBookings?.topBookedAsset
                  ? totalBookings.topBookedAsset.charAt(0).toUpperCase() +
                    totalBookings.topBookedAsset.slice(1)
                  : "N/A"}
              </p>

              <p className="text-sm font-semibold">
                Top booked count: {totalBookings?.topBookedAssetCount}
              </p>
              <p className="text-sm font-semibold">
                Updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
              <p className="text-lg">Total users</p>
              <p className="text-xl sm:text-3xl font-bold">
                {totalUsers?.personCount ?? 0}
              </p>
              <p className="text-sm font-semibold">
                Updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="bg-purple-500 text-white p-4 rounded-lg shadow">
              <p className="text-lg">Total hosts</p>
              <p className="text-xl sm:text-3xl font-bold">
                {totalHosts?.personCount ?? 0}
              </p>
              <p className="text-sm font-semibold">
                Updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
          {/* Revenue Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 max-w-full bg-gray-100">
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
              <div className="bg-orange-100 p-2 rounded-full">
                <span className="text-orange-500 text-xl">🏟️</span>
              </div>
              <div>
                <p className="text-xl font-bold">$984</p>
                <p className="text-green-500">+4.5% this week</p>
                <p className="text-sm text-gray-500">Venue Revenue</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
              <div className="bg-orange-100 p-2 rounded-full">
                <span className="text-orange-500 text-xl">🚗</span>
              </div>
              <div>
                <p className="text-xl font-bold">$22,567</p>
                <p className="text-green-500">+4.5% this week</p>
                <p className="text-sm text-gray-500">RentCar Revenue</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <span className="text-blue-500 text-xl">🎥</span>
              </div>
              <div>
                <p className="text-xl font-bold">$168,331.09</p>
                <p className="text-red-500">-4.5% this week</p>
                <p className="text-sm text-gray-500">Studio Revenue</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <span className="text-blue-500 text-xl">🍽️</span>
              </div>
              <div>
                <p className="text-xl font-bold">$7.784</p>
                <p className="text-red-500">-4.5% this week</p>
                <p className="text-sm text-gray-500">Caters Revenue</p>
              </div>
            </div>
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
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-orange-500 mr-2"></span> Venue
                    (40%) - $167,184
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-blue-500 mr-2"></span> RentCar
                    (30%) - $56,411.33
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-green-500 mr-2"></span> Studio
                    (20%) - $9,181.22
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-pink-500 mr-2"></span> Caters
                    (10%) - $12,422.51
                  </li>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-gray-100">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">
                Recent Booking Activities
              </h2>
              <div className="flex space-x-4 mb-4">
                <button className="text-blue-500">Monthly</button>
                <button>Weekly</button>
                <button>Today</button>
              </div>
              <div className="flex items-center space-x-4">
                <span className="bg-green-100 p-2 rounded-full text-green-500">
                  🏟️
                </span>
                <div>
                  <p>Venue Booking</p>
                  <p className="text-sm text-gray-500">06:45 AM</p>
                </div>
                <p className="ml-auto text-green-500">+$5.553</p>
                <span className="bg-green-500 text-white px-2 py-1 rounded">
                  Completed
                </span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4">Reviews</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border">Reviewer</th>
                      <th className="px-4 py-2 border">Comment</th>
                      <th className="px-4 py-2 border">Asset Type</th>
                      <th className="px-4 py-2 border">Rating</th>
                      <th className="px-4 py-2 border">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review) => (
                      <tr key={review.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border flex items-center space-x-2">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span>{review.name}</span>
                        </td>
                        <td className="px-4 py-2 border">{review.comment}</td>
                        <td className="px-4 py-2 border">{review.assetType}</td>
                        <td className="px-4 py-2 border">
                          {"⭐".repeat(review.rating)}
                        </td>
                        <td className="px-4 py-2 border">{review.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
