import { useEffect, useRef, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import {
  setAssetOverview,
  setBookingStats,
  setBookingTableRows,
  setRecentBookings,
  setRevenue,
} from "@/redux/Slice/host/common/hostDashboard";
import { getDashboard } from "@/api/host/hostAccountService";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const HostDashboard = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const revenues =
    useSelector((state: RootState) => state.hostDashboard.revenue) || [];

  const overViews =
    useSelector((state: RootState) => state.hostDashboard.assetOverview) || [];

  const bookingStatsData =
    useSelector((state: RootState) => state.hostDashboard.bookingStats) || [];

    console.log('44444444',bookingStatsData)

  const recentAllBookings =
    useSelector((state: RootState) => state.hostDashboard.recentBookings) || [];

  const allBookings =
    useSelector((state: RootState) => state.hostDashboard.bookingTableRows) ||
    [];

  const fetchHostDashboard = async () => {
    setLoading(true);
    try {
      const response = await getDashboard();
      dispatch(setRevenue(response.revenue));
      dispatch(setAssetOverview(response.assetOverview));
      dispatch(setBookingStats(response.bookingStatistics));
      dispatch(setRecentBookings(response.recentBookings));
      dispatch(setBookingTableRows(response.bookingTableRows));
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostDashboard();
  }, []);

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (ref) ref.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // Revenue Bar

  const revenueItem =
    Array.isArray(revenues) && revenues.length > 0 ? revenues[0] : null;
  const revenueData = {
    labels: revenueItem?.revenueByMonth.map((item) => item.month) || [],
    datasets: [
      {
        label: "Revenue ($)",
        data: revenueItem?.revenueByMonth.map((item) => item.revenue) || [],
        backgroundColor: "#3B82F6",
        borderRadius: 6,
      },
    ],
  };

  const totalRevenue = revenueItem?.total ?? 0;
  const platformFee = revenueItem?.platformFee ?? 0;
  const grossRevenue = revenueItem?.gross ?? 0;

  const pieData = {
    labels: overViews.map((a) => a.assetType),
    datasets: [
      {
        data: overViews.map((a) => a.assetCount),
        backgroundColor: ["#14B8A6", "#A78BFA", "#F472B6", "#F97316"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const statusOrder = ["accepted", "pending", "rejected"];
  const statusColors: Record<string, string> = {
    accepted: "#10B981",
    pending: "#FACC15",
    rejected: "#EF4444",
  };

  const bookingStats = {
    labels: statusOrder.map((s) => s.charAt(0).toUpperCase() + s.slice(1)),
    datasets: [
      {
        label: "Bookings",
        data: statusOrder.map(
          (s) => bookingStatsData.find((b) => b.status === s)?.count ?? 0
        ),
        backgroundColor: statusOrder.map((s) => statusColors[s]),
        borderRadius: 6,
      },
    ],
  };

  // const bookingStats = {
  //     labels: ["Accepted", "Pending", "Rejected"],
  //     datasets: [
  //       {
  //         label: "Bookings",
  //         data: [10, 5, 2],
  //         backgroundColor: ["#10B981", "#FACC15", "#EF4444"],
  //         borderRadius: 6,
  //       },
  //     ],
  //   };

  if (loading) return <p className="text-center p-10">Loading dashboard...</p>;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  const assetTypes = { venue: 3, rentcar: 2, studio: 4, caters: 1 };
  const pieOptions = {
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: { size: 12 },
          color: "#374151",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-gray-100 min-h-screen px-3 py-4 sm:py-3 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">My Assets</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <div className="w-52 h-52">
                <Pie data={pieData} options={pieOptions} />
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex justify-between border-b pb-1">
                <span>Venue</span>
                <span>{assetTypes.venue}</span>
              </li>
              <li className="flex justify-between border-b pb-1">
                <span>Rent Car</span>
                <span>{assetTypes.rentcar}</span>
              </li>
              <li className="flex justify-between border-b pb-1">
                <span>Studio</span>
                <span>{assetTypes.studio}</span>
              </li>
              <li className="flex justify-between">
                <span>Caters</span>
                <span>{assetTypes.caters}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Revenue & Payments</h2>
          <div className="flex-1">
            <Bar
              data={revenueData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">{totalRevenue}.00</p>
            <p className="text-sm">Platform Fees: {platformFee}.00</p>
            <p className="text-sm">Gross: {grossRevenue}.00</p>
          </div>
        </div>

        <div className="flex-1">
          {loading ? (
            <div className="animate-pulse h-40 bg-gray-100 rounded-lg" />
          ) : bookingStatsData.length > 0 ? (
            <Bar
              data={bookingStats}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          ) : (
            <p className="text-gray-500 text-center py-10 bg-white">
              No booking data available
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl shadow p-6 text-center">
          <p className="text-3xl font-bold">${grossRevenue}</p>
          <p className="text-lg">Total Earnings This Month</p>
          <Button className="mt-3 bg-white text-indigo-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition">
            Upgrade Plan
          </Button>
        </div>

        <div className="relative">
          <h2 className="text-xl font-semibold mb-4">
            Recently Received Bookings
          </h2>

          {showLeft && (
            <Button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white shadow rounded-full p-2 z-10"
            >
              <FaAngleLeft />
            </Button>
          )}

          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide scroll-smooth"
          >
            {recentAllBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow p-4 min-w-[235px] flex-shrink-0 hover:shadow-md transition"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full" />
                  <div className="ml-3">
                    <p className="font-semibold">{booking.user}</p>
                    <p className="text-sm text-gray-500">{booking.service}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <p className="font-bold">${booking.amount}</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {showRight && (
            <Button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black text-white shadow rounded-full p-2 z-10"
            >
              <FaAngleRight />
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row justify-between md:items-center">
          <h2 className="text-xl font-semibold mb-2 md:mb-0">
            All Bookings & Invoices
          </h2>
          <Input
            type="text"
            placeholder="Search bookings..."
            className="w-full md:w-64 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Platform Fee</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allBookings.map((booking, idx) => (
                <tr
                  key={booking.id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="p-3 flex items-center">
                    <div className="w-8 h-8 bg-indigo-300 rounded-full mr-2" />
                    {booking.user}
                  </td>
                  <td className="p-3">{booking.service}</td>
                  <td className="p-3">{booking.type}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-3">{booking.date}</td>
                  <td className="p-3 font-semibold">${booking.amount}</td>
                  <td className="p-3 text-gray-600">${booking.platformFee}</td>
                  <td className="p-3">
                    <button className="text-indigo-600 hover:underline">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
