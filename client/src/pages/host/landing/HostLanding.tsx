import { Images } from "@/assets";
import HostLandingHeader from "@/reusable-components/host/HostLandingHeader";
import ExploreButton from "@/components/ExploreButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import HostHeader from "@/reusable-components/host/HostHeader";

const services = [
  {
    title: "Venues",
    para: "Offer your space for creative shoots, events, and gatherings. Whether it's a cozy home, industrial loft, or scenic outdoor location — every venue brings a unique vibe to creators.",
  },
  {
    title: "Car Rental",
    para: "List your unique or luxury vehicle for productions or photoshoots. From vintage classics to modern sports cars, vehicles are in demand for cinematic visuals and brand shoots.",
  },
  {
    title: "Photo & Videographers",
    para: "If you're a photographer or videographer, showcase your skills and get booked for creative gigs. From fashion shoots to commercial projects, your lens can bring visions to life.",
  },
  {
    title: "Food Caters & Manage",
    para: "Provide catering services for on-set crews or events. Whether it’s full-course meals, snacks, or coffee bars — good food keeps creativity flowing and teams energized.",
  },
];

const infoCards = [
  {
    title: "How do I host?",
    para: "If you own a property, you can host it on Giggster. Simply create a new listing, enter basic info like price, photos and features — and then click 'Publish'.",
    icon: Images.host_icon,
  },
  {
    title: "Who can book?",
    para: "Giggster is designed for production professionals in film, TV, and advertising. Renters are required to have production insurance and filming permits for every booking.",
    icon: Images.casual_user,
  },
];

const HostLanding = () => {
  const host = useSelector((state: RootState) => state.host.hostInfo);
  return (
    <div className="relative">
      {host?.accessToken ? <HostHeader /> : <HostLandingHeader />}
      <section className="w-full h-[50vh] sm:h-screen overflow-hidden flex items-center justify-center border border-red-500 mt-4 md:mt-5">
        <img
          src={Images.host_landing}
          alt="host landing"
          className="w-full h-full object-cover animate-zoomOut"
        />
      </section>
      <section className="bg-red-500 text-white p-3">
        <h1 className="text-1xl text-center md:text-left md:text-2xl font-bold mb-4 text-black">
          Featured Host Experience
        </h1>
        <span className="block mb-2 italic text-white">
          "I’ve been hosting shoots for years and Giggster was by far the
          smoothest experience I’ve had. Their quality renters and amazing
          customer support made this as easy as can be."
        </span>
        <p className="font-semibold">Johnny C., Malibu, CA</p>
      </section>
      <section className="w-full py-10 px-4">
        <h1 className="text-black font-bold font-prompt text-md sm:text-2xl md:text-3xl text-center py-4 mb-3 lg:mb-8 px-4">
          What types of services can I host?
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10">
          {services.map(({ title, para }, i) => (
            <div key={i}>
              <h2 className="font-josefin italic font-extralight text-lg sm:text-xl mb-3">
                {title}
              </h2>
              <p className="text-sm text-gray-600 font-JosephicSans">{para}</p>
            </div>
          ))}
        </div>
        <hr className="my-12 border-gray-300  w-[80%] mx-auto" />
        <div className="flex flex-wrap justify-center items-start gap-6 px-5 py-4">
          {infoCards.map(({ title, para, icon }, i) => (
            <div key={i} className="w-full sm:w-1/2 lg:w-1/3 p-4 text-center">
              <div className="flex flex-row items-center text-center mb-4 gap-4">
                <img
                  src={icon}
                  alt={`${title} icon`}
                  className="w-12 h-12 mb-2"
                />
                <h2 className="text-lg sm:text-xl font-semibold ">{title}</h2>
              </div>
              <p className="text-sm text-gray-600 font-JosephicSans text-left">
                {para}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center py-4 px-4">
          <h1 className="text-black font-bold text-md sm:text-2xl text-center">
            Ready to get started?
          </h1>
          {host ? (
            <Link to={"/host/dashboard"}>
              <ExploreButton
                className="w-40 m-4 bg-red-500"
                content="Go"
                showIcon={false}
              />
            </Link>
          ) : (
            <Link to={"/host/login"}>
              <ExploreButton
                className="w-40 m-4 bg-red-500"
                content="Go"
                showIcon={false}
              />
            </Link>
          )}
        </div>
      </section>
      <section></section>
    </div>
  );
};

export default HostLanding;
