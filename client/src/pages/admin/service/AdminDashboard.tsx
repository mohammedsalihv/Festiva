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
import AdminLayout from "../AdminLayout";

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
    <AdminLayout>
      <div className="p-4 md:p-8 bg-white min-h-screen rounded-md font-prompt">
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
    </AdminLayout>
  );
}
