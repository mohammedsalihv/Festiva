import { useEffect, useMemo, useRef, useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
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
import { BookingTableRow } from "@/utils/Types/host/pages/hostDashboard";
import Table from "@/components/Table";
import Loader from "@/components/Loader";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const bookingColumns = [
  {
    header: "Image",
    accessor: (row: BookingTableRow) =>
      row.profilePic ? (
        <img
          src={row.profilePic}
          alt={row.userName}
          className="w-8 h-8 rounded-full mx-auto"
        />
      ) : (
        <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto" />
      ),
  },
  {
    header: "Username",
    accessor: (row: BookingTableRow) => (
      <span>
        {row.userName.charAt(0).toUpperCase() + row.userName.slice(1)}
      </span>
    ),
  },
  {
    header: "Service type",
    accessor: (row: BookingTableRow) =>
      row.type.charAt(0).toUpperCase() + row.type.slice(1),
  },
  {
    header: "Status",
    accessor: (row: BookingTableRow) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          row.status === "accepted"
            ? "bg-green-100 text-green-700"
            : row.status === "pending"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
      </span>
    ),
  },
  {
    header: "Date",
    accessor: (row: BookingTableRow) =>
      new Date(row.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
  },
  {
    header: "Amount",
    accessor: (row: BookingTableRow) => (
      <span className="font-semibold">{row.amount}.00</span>
    ),
  },
  {
    header: "Platform Fee",
    accessor: (row: BookingTableRow) => (
      <span className="text-gray-600">{row.platformFee}.00</span>
    ),
  },
];

const HostDashboard = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const revenues =
    useSelector((state: RootState) => state.hostDashboard.revenue) || [];
  const overViews =
    useSelector((state: RootState) => state.hostDashboard.assetOverview) || [];

  const bookingStatsData =
    useSelector((state: RootState) => state.hostDashboard.bookingStats) || [];

  const recentAllBookings =
    useSelector((state: RootState) => state.hostDashboard.recentBookings) || [];

  console.log(recentAllBookings);

  const allBookings = useSelector(
    (state: RootState) => state.hostDashboard.bookingTableRows ?? []
  );

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

  const filteredBookings = useMemo(() => {
    if (!searchTerm.trim()) return allBookings;

    return allBookings.filter((row: BookingTableRow) => {
      const search = searchTerm.toLowerCase();
      return (
        row.userName.toLowerCase().includes(search) ||
        row.type.toLowerCase().includes(search) ||
        row.status.toLowerCase().includes(search) ||
        row.amount.toString().includes(search) ||
        new Date(row.date)
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .toLowerCase()
          .includes(search)
      );
    });
  }, [allBookings, searchTerm]);

  const fetchHostDashboard = async () => {
    setLoading(true);
    try {
      const response = await getDashboard();
      dispatch(setRevenue(response.revenues));
      dispatch(setAssetOverview(response.assetOverview));
      dispatch(setBookingStats(response.bookingStatistics));
      dispatch(setRecentBookings(response.recentBookings));
      dispatch(setBookingTableRows(response.bookingTable));
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const revenueItem =
    Array.isArray(revenues) && revenues.length > 0 ? revenues[0] : null;
  const revenueData = {
    labels: revenueItem?.revenueByMonth.map((item) => item.month) || [],
    datasets: [
      {
        label: "Revenue ($)",
        data: revenueItem?.revenueByMonth.map((item) => item.revenue) || [],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3B82F6",
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const revenueLineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    layout: {
      padding: { top: 10, bottom: 10, left: 5, right: 5 },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } },
      },
      y: {
        grid: { color: "#E5E7EB" },
        ticks: { font: { size: 12 } },
      },
    },
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
    labels: ["Status"],
    datasets: statusOrder.map((s) => ({
      label: s.charAt(0).toUpperCase() + s.slice(1),
      data: [bookingStatsData.find((b) => b.status === s)?.count ?? 0],
      backgroundColor: statusColors[s],
    })),
  };

  const bookingStatsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
    },
  };

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

  if (loading)
    return (
      <p className="text-center p-10">
        <Loader />
      </p>
    );

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
            <Line data={revenueData} options={revenueLineChartOptions} />
          </div>

          <div className="mt-4">
            <p className="text-2xl font-bold">{totalRevenue}.00</p>
            <p className="text-sm">Platform Fees: {platformFee}.00</p>
            <p className="text-sm">Gross: {grossRevenue}.00</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-2">My Bookings</h2>
          <div className="flex-1">
            <Bar data={bookingStats} options={bookingStatsOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl shadow p-6 text-center">
          <p className="text-3xl font-bold">{grossRevenue}</p>
          <p className="text-lg">Total Earnings This Month</p>
          <Button className="mt-3 bg-white text-indigo-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition">
            Upgrade Plan
          </Button>
        </div>

        <div className="relative">
          <h2 className="text-xl font-semibold mb-4">
            Recently Received Bookings
          </h2>

          {showLeft && recentAllBookings.length > 0 && (
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
            {recentAllBookings.length > 0 ? (
              recentAllBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl shadow p-4 min-w-[235px] flex-shrink-0 hover:shadow-md transition"
                >
                  <div className="flex items-center">
                    <img
                      src={booking.userProfile || "/fallback-profile.png"}
                      alt={booking.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <p className="font-semibold">
                        {booking.userName || "Unknown User"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.serviceType.charAt(0).toUpperCase() + booking.serviceType.slice(1) || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <p className="font-bold">
                      {booking.totalAmount.toFixed(2)}
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.bookingStatus === "accepted"
                          ? "bg-green-100 text-green-700"
                          : booking.bookingStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.bookingStatus.charAt(0).toUpperCase() +
                        booking.bookingStatus.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">
                No recent bookings available.
              </p>
            )}
          </div>

          {showRight && recentAllBookings.length > 0 && (
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>
        <div className="overflow-x-auto">
          <Table
            data={filteredBookings}
            columns={bookingColumns}
            fallback={<p>No bookings found</p>}
          />
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
