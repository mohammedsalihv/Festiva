
import {
  Card,
  CardContent,
} from "@/components/Card";
import { Button } from "@/components/Button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { UserCircle } from "lucide-react";

const barData = [
  { name: "Mon", complete: 60 },
  { name: "Tue", complete: 90 },
  { name: "Wed", complete: 30 },
  { name: "Thu", complete: 70 },
  { name: "Fri", complete: 50 },
  { name: "Sat", complete: 90 },
  { name: "Sun", complete: 40 },
];

const lineData = [
  { date: "Mon", value: 40 },
  { date: "Tue", value: 70 },
  { date: "Wed", value: 50 },
  { date: "Thu", value: 80 },
  { date: "Fri", value: 65 },
  { date: "Sat", value: 90 },
  { date: "Sun", value: 100 },
];

export default function AdminDashboard() {
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Welcome!</h1>
          <p className="text-gray-500">26 Feb 2025 10:00 AM</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Card className="p-4 text-center">
            <p className="text-sm text-gray-500">Total Earning</p>
            <h2 className="text-xl font-bold text-green-600">₹194,00,020</h2>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-sm text-gray-500">Properties</p>
            <h2 className="text-xl font-bold text-blue-600">25</h2>
          </Card>
        </div>
        <div className="flex items-center space-x-2">
          <UserCircle className="w-10 h-10" />
          <div>
            <p className="text-sm">Tatiana Herwitz</p>
            <p className="text-xs text-gray-500">Program Manager</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Total bookings</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="complete" fill="#3b82f6" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Data Activity</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Top Customers</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th>ID</th>
                  <th>Date</th>
                  <th>Party Name</th>
                  <th>Type</th>
                  <th>Spending</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(4)].map((_, i) => (
                  <tr key={i} className="border-t">
                    <td>#HE1234</td>
                    <td>Aug 20, 2024</td>
                    <td>John</td>
                    <td>Wedding</td>
                    <td>$4730.00</td>
                    <td>
                      <Button variant="outline" size="sm">Approved</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Usages</h2>
            <ul className="space-y-2">
              {[
                { name: "Advertisers", count: 20 },
                { name: "Auction", count: 30 },
                { name: "Auctioners", count: 15 },
              ].map((item, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                    {item.count}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
