import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FaMoneyBillWave } from "react-icons/fa";
import { BsCalendar2Check } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";


const sidebarItems = [
  { icon: <AiFillHome size={22} />, label: "Home" },
  { icon: <BsCalendar2Check size={22} />, label: "Bookings" },
  { icon: <FaMoneyBillWave size={22} />, label: "Revenue" },
  { icon: <FiLogOut size={22} />, label: "Logout" },
];

const HostProfile: React.FC = () => {
  const productions = [
    { title: "Essence of the wave", length: "2:24", listens: "1,243,625" },
    { title: "Release all the fear", length: "2:54", listens: "2,143,456" },
    { title: "Echoes in the cave", length: "3:22", listens: "4,120,987" },
  ];

  const collection = [
    "Classical Symphony",
    "Neon ToneScape",
    "Funkified Fury",
    "Soulful Sessions",
    "Abyss Awakening",
    "Stream Symphony",
    "Note Masterclass",
    "Ethnic Awakening",
    "Festival Funk",
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="md:w-20 md:h-full w-full h-16 fixed bottom-0 md:static bg-[#121212] flex md:flex-col flex-row items-center justify-around md:justify-start py-4 z-50 border-t md:border-t-0 md:border-r border-gray-800">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className="group flex flex-col items-center md:mb-8 md:mt-2 text-white hover:text-pink-500 cursor-pointer"
          >
            {item.icon}
            <span className="text-[10px] md:block hidden mt-1 opacity-80">
              {item.label}
            </span>
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 md:px-10 md:ml-20 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <img
            src="/avatar.png"
            alt="Avatar"
            className="w-32 h-32 rounded-full border-2 border-gray-500 object-cover"
          />
          <div className="space-y-2 w-full">
            <div>
              <h2 className="text-2xl font-bold">Maria Fernanda</h2>
              <p className="text-gray-400 text-sm">Premium Membership</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 text-sm text-gray-300">
              <p><span className="text-white">Email:</span> maria@email.com</p>
              <p><span className="text-white">Phone:</span> +1 123 456 7890</p>
              <p><span className="text-white">Location:</span> California, USA</p>
              <p><span className="text-white">Member Since:</span> July 2023</p>
              <p><span className="text-white">Subscription:</span> Premium</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-green-700 text-xs px-2 py-1 rounded">Active</span>
              <span className="bg-gray-700 text-xs px-2 py-1 rounded">HTML</span>
              <span className="bg-gray-700 text-xs px-2 py-1 rounded">Piano</span>
            </div>

            <div className="flex gap-3 mt-3">
              <button className="bg-pink-500 p-2 rounded-full" title="Instagram">
                <i className="fab fa-instagram"></i>
              </button>
              <button className="bg-red-600 p-2 rounded-full" title="YouTube">
                <i className="fab fa-youtube"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Productions */}
        <div className="bg-[#1a1a1a] rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">My Productions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm table-auto">
              <thead className="text-gray-400 text-left">
                <tr>
                  <th className="py-2">Title</th>
                  <th className="py-2">Length</th>
                  <th className="py-2">Listens</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productions.map((item, idx) => (
                  <tr key={idx} className="border-t border-gray-700">
                    <td className="py-2">{item.title}</td>
                    <td>{item.length}</td>
                    <td>{item.listens}</td>
                    <td className="space-x-2">
                      <button className="text-green-400 hover:underline">Play</button>
                      <button className="text-blue-400 hover:underline">Edit</button>
                      <button className="text-red-400 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Collection */}
        <div className="bg-[#1a1a1a] rounded-xl p-4 mb-20 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">My Collection</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {collection.map((title, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-lg p-3 hover:scale-[1.02] transition"
              >
                <div className="bg-gray-600 h-24 rounded mb-2" />
                <p className="text-xs truncate text-gray-300">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
