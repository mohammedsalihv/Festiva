import { Images } from "@/assets";
import React from "react";

const services = [
  {
    id: 1,
    title: "INTERACTIVE AND AFFORDABLE VENUES",
    description:
      "Find unique venues tailored to your needs. From corporate spaces to party halls, our options are budget-friendly and designed for engagement.",
    image: Images.conventionCenter_service,
    reverse: false,
    link:"/user/venues/types"
  },
  {
    id: 2,
    title: "PREMIUM STYLE RENTAL CARS",
    description:
      "Drive in luxury with our curated selection of rental cars suited for every kind of event — whether for style or logistics.",
    image: Images.rentCar_service,
    reverse: true,
    link:"/user/venues/types"
  },
  {
    id: 3,
    title: "CATERING TEAMS",
    description:
      "Experienced chefs and staff ready to serve mouthwatering dishes that suit all tastes and dietary requirements.",
    image: Images.cater_service,
    reverse: false,
    link:"/user/venues/types"
  },
  {
    id: 4,
    title: "WEDDING, PARTY CAMERA AND VIDEOGRAPHERS",
    description:
      "Capture every unforgettable moment with our top-rated photographers and videographers for weddings and parties alike.",
    image: Images.studio_service,
    reverse: true,
    link:"/user/venues/types"
  }
];

const MainServices: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-JosephicSans">
      {/* Banner */}
      <div className="mb-10">
        <img
          src={Images.main_service}
          alt="Event Service Banner"
          className="w-full h-96 object-cover rounded-md"
        />
      </div>

      {/* Service Cards */}
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
              className="w-full md:w-56 h-36 object-cover rounded-md"
            />
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
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