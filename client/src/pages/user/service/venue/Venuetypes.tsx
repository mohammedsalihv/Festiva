import { Images } from "@/assets";
import { useNavigate } from "react-router-dom";

const Venuetypes = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-10 md:px-12 lg:px-24 max-w-screen-xl mx-auto font-JosephicSans mt-10">
      <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12">
        LAST-MINUTE DEALS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        {[
          {
            title: "Premium Comfort",
            description:
              "A curated list of luxurious experiences tailored for your needs.",
          },
          {
            title: "The Ultimate Buyer's Compass",
            description:
              "A selection of trusted resources to help you make informed decisions.",
          },
          {
            title: "Easy Cancellations",
            description:
              "A hassle-free process for sudden changes in your travel plans.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            image: Images.convention_space,
            title: "Convention centers",
            description:
              "Versatile venues for any event type like wedding , birthday.",
            link: "/user/assets/venue",
          },
          {
            image: Images.multiPurpose_space,
            title: "Multipurpose event space",
            description: "Spacious halls for large-scale gatherings.",
            link: "/user/assets/venue",
          },
          {
            image: Images.business_space,
            title: "Business Meetings",
            description: "Professional setups for corporate events.",
            link: "/user/assets/venue",
          },
          {
            image: Images.event_space,
            title: "Event party spaces",
            description: "Elegant venues for unforgettable parties.",
            link: "/user/assets/venue",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="overflow-hidden shadow hover:shadow-xl transition-shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-base mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <button
                onClick={() => navigate(item.link)}
                className="bg-purple-600 text-white px-4 py-2 text-sm rounded hover:bg-purple-700"
              >
                View more
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Venuetypes;
