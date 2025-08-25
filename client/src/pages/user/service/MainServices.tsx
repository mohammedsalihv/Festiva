import React from "react";
import { services } from "@/utils/Options/user/serviceOptions";


const MainServices: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 py-8 font-poppins mt-20">
      <div className="space-y-10">
        {services.map((service) => (
          <div
            key={service.id}
            className={`flex flex-col md:flex-row ${
              service.reverse ? "md:flex-row-reverse" : ""
            } items-center gap-6 border-b pb-8`}
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full md:w-56 h-44 object-cover rounded-sm"
            />
            <div className="flex-1 space-y-2">
              <h3 className="text-base sm:text-xl md:text-xl font-semibold text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
              <a
                href={service.link}
                className="text-purple-600 hover:underline text-sm font-medium block mt-2"
              >
                Find Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainServices;