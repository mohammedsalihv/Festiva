import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const HostDashboard: React.FC = () => {
  // Mock Data Arrays
  const bookings = [
    { id: 1, user: "Emma Ryan Jr.", type: "Venue", status: "Pending", date: "2025-02-19", amount: 3892 },
    { id: 2, user: "Adrian Daren", type: "RentCar", status: "Done", date: "2025-02-18", amount: 1073 },
    { id: 3, user: "Roxanne Hills", type: "Studio", status: "Done", date: "2025-04-16", amount: 2790 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 3000 },
    { month: "Feb", revenue: 4500 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 4000 },
  ];

  const bookingStatusData = [
    { name: "Pending", value: 2 },
    { name: "Accepted", value: 5 },
    { name: "Rejected", value: 1 },
  ];

  const assetCounts = [
    { type: "Venue", count: 3 },
    { type: "RentCar", count: 4 },
    { type: "Studio", count: 2 },
    { type: "Caters", count: 1 },
  ];

  const COLORS = ["#FFB946", "#4CAF50", "#F87171"];

  return (
    <div className="p-4 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl shadow bg-white">
          <h2 className="text-lg font-semibold">Total Bookings</h2>
          <p className="text-2xl font-bold">{bookings.length}</p>
        </div>
        <div className="p-4 rounded-2xl shadow bg-white">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-2xl font-bold">
            ${bookings.reduce((acc, b) => acc + b.amount, 0).toLocaleString()}
          </p>
        </div>
        <div className="p-4 rounded-2xl shadow bg-white">
          <h2 className="text-lg font-semibold">Platform Fee</h2>
          <p className="text-2xl font-bold">
            ${(bookings.reduce((acc, b) => acc + b.amount, 0) * 0.1).toFixed(0)}
          </p>
        </div>
        <div className="p-4 rounded-2xl shadow bg-white">
          <h2 className="text-lg font-semibold">Net Income</h2>
          <p className="text-2xl font-bold">
            ${(bookings.reduce((acc, b) => acc + b.amount, 0) * 0.9).toFixed(0)}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl shadow bg-white">
          <h2 className="text-lg font-semibold mb-2">Booking Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={bookingStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {bookingStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 rounded-2xl shadow bg-white">
          <h2 className="text-lg font-semibold mb-2">Revenue Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#4F46E5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Asset Counts */}
      <div className="p-4 rounded-2xl shadow bg-white">
        <h2 className="text-lg font-semibold mb-2">Assets by Type</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={assetCounts}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#60A5FA" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Transactions Table */}
      <div className="p-4 rounded-2xl shadow bg-white overflow-x-auto">
        <h2 className="text-lg font-semibold mb-2">Transactions</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">User</th>
              <th className="p-2">Type</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b">
                <td className="p-2">{booking.user}</td>
                <td className="p-2">{booking.type}</td>
                <td
                  className={`p-2 font-semibold ${
                    booking.status === "Done"
                      ? "text-green-600"
                      : booking.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {booking.status}
                </td>
                <td className="p-2">{booking.date}</td>
                <td className="p-2 font-bold">${booking.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HostDashboard;
