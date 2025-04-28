import React, { useState } from "react";

interface Client {
  name: string;
  revenue: string;
  change: string;
}

const KPICard: React.FC<{
  title: string;
  value: string;
  change: string;
  changeColor: string;
}> = ({ title, value, change, changeColor }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
    <p className={`text-sm ${changeColor}`}>{change}</p>
  </div>
);

const Graph: React.FC = () => (
  <div className="bg-black text-white p-4 rounded-lg shadow-md flex items-center justify-center h-48">
    <p>Graph Placeholder (KPIs Over Time)</p>
  </div>
);

const TopClientsTable: React.FC = () => {
  const clients: Client[] = [
    { name: "Client A", revenue: "$50K", change: "+10%" },
    { name: "Client B", revenue: "$40K", change: "-5%" },
    { name: "Client C", revenue: "$30K", change: "+15%" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Top 5 Clients</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500">
            <th className="pb-2">Client</th>
            <th className="pb-2">Revenue</th>
            <th className="pb-2">Change</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index} className="border-t">
              <td className="py-2">{client.name}</td>
              <td className="py-2">{client.revenue}</td>
              <td
                className={`py-2 ${
                  client.change.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {client.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const HostDashboard = () => {
  const [activeTab, setActiveTab] = useState<"CashFlow" | "ProfitLoss">(
    "CashFlow"
  );

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Financial Overview</h1>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full bg-gray-200">Export</button>
            <button className="p-2 rounded-full bg-gray-200">Settings</button>
          </div>
        </div>
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "CashFlow"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("CashFlow")}
          >
            Cash Flow
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "ProfitLoss"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("ProfitLoss")}
          >
            Profit & Loss
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <KPICard
            title="Net Income"
            value="$1.2M"
            change="+12%"
            changeColor="text-green-500"
          />
          <KPICard
            title="ARR"
            value="$3.5M"
            change="-3%"
            changeColor="text-red-500"
          />
          <KPICard
            title="MRR"
            value="$290K"
            change="+8%"
            changeColor="text-green-500"
          />
          <div className="lg:col-span-2">
            <Graph />
          </div>
          <div className="lg:col-span-1">
            <TopClientsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
