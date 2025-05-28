import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";

const events = [
  {
    id: 1,
    name: "KAISER CARMEL EVENT CENTER",
    price: "$630/Day",
    image: "https://via.placeholder.com/300x180?text=Event+1",
    location: "Berlin, Germany",
    status: "Superhost",
    rating: 4.8,
    reviews: 190
  },

  {
    id: 2,
    name: "KAISER CARMEL EVENT CENTER",
    price: "$630/Day",
    image: "https://via.placeholder.com/300x180?text=Event+2",
    location: "Berlin, Germany",
    status: "Superhost",
    rating: 4.6,
    reviews: 204
  }
];

const Venues: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 space-y-6 font-JosephicSans">
      {/* Search + Filter Row */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Add keywords..."
          className="px-4 py-2 rounded-lg w-full max-w-md bg-gray-800 text-white placeholder-gray-400"
        />
        <button className="ml-4 bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2">
          <span>Filters</span>
        </button>
      </div>

      {/* Card List */}
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-gray-800 rounded-xl p-4 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 shadow-md"
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-full md:w-60 h-40 object-cover rounded-lg"
            />

            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold">{event.name}</h3>
              <p className="text-xl font-bold">{event.price}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <BsPeopleFill /> {event.reviews} reviews
                </span>
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" /> {event.rating}
                </span>
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt /> {event.location}
                </span>
              </div>
              <span className="bg-green-600 text-xs px-2 py-1 rounded-full inline-block">
                {event.status}
              </span>
            </div>

            <button className="w-20 h-20 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-full text-sm">
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Venues;
