import React, { useState } from "react";

type AccountCategory =
  | "All"
  | "Media & Entertainment"
  | "eCommerce"
  | "Social Network";

interface Account {
  name: string;
  ctgry: AccountCategory;
  joined: string;
  icon: string;
  website: string;
}

const accounts: Account[] = [
  {
    name: "Netflix",
    ctgry: "Media & Entertainment",
    joined: "Sep 12, 2014",
    icon: "https://cdn-icons-png.flaticon.com/512/732/732228.png",
    website: "https://www.netflix.com",
  },
  {
    name: "Facebook",
    ctgry: "Social Network",
    joined: "Sep 12, 2014",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
    website: "https://www.facebook.com",
  },
  {
    name: "AirBnB",
    ctgry: "eCommerce",
    joined: "Sep 12, 2014",
    icon: "https://cdn-icons-png.flaticon.com/512/2111/2111320.png",
    website: "https://www.airbnb.com",
  },
  {
    name: "Google Drive",
    ctgry: "eCommerce",
    joined: "Sep 12, 2014",
    icon: "https://cdn-icons-png.flaticon.com/512/2702/2702602.png",
    website: "https://drive.google.com",
  },
  {
    name: "YouTube",
    ctgry: "Media & Entertainment",
    joined: "Sep 12, 2014",
    icon: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
    website: "https://youtube.com",
  },
  {
    name: "Spotify",
    ctgry: "Media & Entertainment",
    joined: "Sep 12, 2014",
    icon: "https://cdn-icons-png.flaticon.com/512/174/174872.png",
    website: "https://spotify.com",
  },
  {
    name: "Amazon",
    ctgry: "eCommerce",
    joined: "Sep 12, 2014",
    icon: "https://cdn-icons-png.flaticon.com/512/732/732229.png",
    website: "https://amazon.com",
  },
];

const categories: AccountCategory[] = [
  "All",
  "Media & Entertainment",
  "eCommerce",
  "Social Network",
];

const HostProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AccountCategory>("All");

  const filteredAccounts =
    activeTab === "All"
      ? accounts
      : accounts.filter((a) => a.ctgry === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-center font-poppins">
      <h2 className="text-xl md:text-2xl font-semibold mb-1">
        We Found Sam's Accounts
      </h2>
      <p className="text-gray-500 mb-6">
        Internet accounts related to this email
      </p>
      <p className="text-blue-600 font-medium mb-8">sam.wolters@gmail.com</p>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              activeTab === cat
                ? "bg-blue-100 text-blue-600 border-blue-400"
                : "text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAccounts.map((account) => (
          <div
            key={account.name}
            className="bg-white shadow-md rounded-lg p-5 text-left flex flex-col items-center"
          >
            <img
              src={account.icon}
              alt={account.name}
              className="w-12 h-12 mb-4"
            />
            <h3 className="text-lg font-semibold mb-1">{account.name}</h3>
            <p className="text-gray-500 text-sm mb-1">{account.ctgry}</p>
            <p className="text-gray-400 text-xs mb-4">
              Joined {account.joined}
            </p>
            <div className="flex flex-col gap-2 w-full">
              <button className="bg-green-500 hover:bg-green-600 text-white py-1.5 rounded text-sm font-medium transition">
                Send Closure Request
              </button>
              <a
                href={account.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm text-center underline hover:text-blue-700"
              >
                Go to Company Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostProfile;
