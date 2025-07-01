import React from "react";

const ServiceDetails: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-4 grid lg:grid-cols-3 gap-6">
      {/* Left: Images + Info */}
      <div className="lg:col-span-2 space-y-4">
        {/* Image Gallery */}
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <img
              src="/main-image.jpg"
              alt="Main"
              className="w-full h-64 object-cover rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <img src="/img1.jpg" alt="img1" className="h-31 object-cover rounded" />
            <img src="/img2.jpg" alt="img2" className="h-31 object-cover rounded" />
            <img src="/img3.jpg" alt="img3" className="h-31 object-cover rounded" />
          </div>
        </div>

        {/* Title & Tags */}
        <div>
          <h1 className="text-2xl font-bold">
            Dark Retro Dive Bar With Booths and Liquor Wall
          </h1>
          <p className="text-sm text-gray-500">Studio • Los Angeles, CA</p>

          <div className="flex flex-wrap gap-2 mt-2 text-xs text-white">
            <span className="bg-gray-700 px-2 py-1 rounded">Bar</span>
            <span className="bg-gray-700 px-2 py-1 rounded">Clubhouse</span>
            <span className="bg-gray-700 px-2 py-1 rounded">Retro</span>
            <span className="bg-gray-700 px-2 py-1 rounded">Indoor</span>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold mb-1">About the Space</h2>
          <p className="text-sm text-gray-700">
            Step into a neon-lit wonderland — a barroom that oozes moody vibes with vintage
            furniture, a richly decorated liquor wall, and ambient colored lighting.
          </p>
        </div>

        {/* Details */}
        <div>
          <h3 className="font-semibold text-gray-800">Details</h3>
          <div className="grid grid-cols-2 text-sm text-gray-600 mt-1">
            <div>Style:</div>
            <div>Clubhouse, Industrial</div>
            <div>Property size:</div>
            <div>1,000 sq ft</div>
          </div>
        </div>

        {/* Parking */}
        <div>
          <h3 className="font-semibold text-gray-800">Parking & Accessibility</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            <li>Street level access</li>
            <li>Free onsite parking</li>
          </ul>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="font-semibold text-gray-800">Amenities</h3>
          <div className="flex gap-4 flex-wrap text-sm text-gray-600">
            <span>Wi-Fi</span>
            <span>Restrooms</span>
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="font-semibold text-gray-800">Features</h3>
          <div className="flex gap-4 flex-wrap text-sm text-gray-600">
            <span>Color Walls</span>
            <span>Exposed Brick</span>
            <span>Wood Beams</span>
            <span>Decorative Lighting</span>
          </div>
        </div>

        {/* Catering */}
        <div>
          <h3 className="font-semibold text-gray-800">Catering & Drinks</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>BYO alcohol allowed</p>
            <p>Bar menu available</p>
            <p>Full kitchen access</p>
          </div>
        </div>
      </div>

      {/* Right: Pricing and Host */}
      <div className="lg:col-span-1 space-y-4">
        <div className="border p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold">$80/hr</h2>
          <p className="text-sm text-gray-500">2 hr minimum</p>
          <button className="w-full mt-3 bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Request to Book
          </button>
        </div>

        <div className="border p-4 rounded shadow-sm">
          <p className="text-gray-700 text-sm mb-2">Hosted by: Timothy A.</p>
          <button className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300">
            Message Host
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
