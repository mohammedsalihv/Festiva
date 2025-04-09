import { Images } from "@/assets";
import Header from "@/reusable-components/Landing/Header";
import ExploreButton from "@/components/ExploreButton";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect } from "react";
import CategoryCard from "@/components/CategoryCard";
import WhoWeAre from "@/reusable-components/Landing/WhoWeAre";

const images = [Images.Landing_1, Images.Landing_2];
const featureCards = [
  { img: Images.service_247, label: "24/7 Availability" },
  { img: Images.unlimited, label: "Bespoke Planning" },
  { img: Images.flexible, label: "Luxury Touchpoints" },
  { img: Images.personlised, label: "Trusted Network" },
];

const Home = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <Header />
      <section className="relative w-full h-screen overflow-hidden">
        <div ref={sliderRef} className="keen-slider w-full h-full">
          {images.map((img, index) => (
            <div key={index} className="keen-slider__slide">
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-black z-20 py-6">
          <div className="flex flex-row justify-between items-end w-full px-4 md:px-10 py-4">
            <div>
              <h1 className="text-main_color text-2xl sm:text-3xl md:text-4xl uppercase font-bold font-mono">
                Festiva <span className="text-white font-light">Luxury</span>
              </h1>
              <div className="text-white font-thin text-2xl md:text-4xl uppercase leading-tight">
                <div>lifestyle</div>
                <div>management</div>
              </div>
            </div>
            <div className="flex flex-col items-end text-right max-w-sm">
              <p className="text-white font-JosephicSans text-sm md:text-lg mb-2">
                Your local partner for an unforgettable and effortless luxury
                lifestyle.
              </p>
              <ExploreButton content="Try it out now" />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-black text-main_white py-10 px-4 z-20 relative">
        <div className="text-center">
          <h2 className="text-md md:text-2xl font-bold mb-10 tracking-wide">
            Each service is thoughtfully curated to <br /> spark connection and
            create lasting memories.
          </h2>
          <div className="flex flex-wrap justify-center gap-10">
            {[
              { icon: Images.venues, label: "venues" },
              { icon: Images.car_rent, label: "rent cars" },
              { icon: Images.camera_video, label: "photo&video" },
              { icon: Images.catering, label: "catering" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="bg-white/20 rounded-full p-4 group-hover:bg-white transition-all duration-300">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="h-4 w-4 object-contain filter invert group-hover:invert-0"
                  />
                </div>
                <span className="mt-2 text-[11px] md:text-[13px] font-poppins">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <section className="py-10 px-6 flex flex-col items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:overflow-x-auto">
            <CategoryCard title="VENUES" imageUrl={Images.venue} />
            <CategoryCard title="CAR RENTALS" imageUrl={Images.car} />
            <CategoryCard
              title="PHOTOGRAPHERS & VIDEOGRAPHERS"
              imageUrl={Images.photography}
            />
            <CategoryCard title="CATERS" imageUrl={Images.caters} />
          </div>
          <button className="flex items-center gap-2 px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition rounded-md mt-4">
            VIEW MORE <span className="text-xl">→</span>
          </button>
        </section>
      </section>
      <WhoWeAre />
      <section className="bg-main_color text-white px-6 py-16 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              BOOK YOUR PERSONAL CONCIERGE SERVICE IN FESTIVA
            </h2>
            <p className="mb-6 text-gray-300">
              Our personal concierge service ensures you experience ultimate
              luxury stress-free.
            </p>
            <p className="mb-8 text-sm text-gray-400">
              From coordinating every step to handling every detail, our bespoke
              concierge team is at your service.
            </p>
            <button className="bg-black px-6 py-3 rounded-md text-white font-medium hover:brightness-125 transition">
              ENQUIRE HERE →
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
            {featureCards.map((card, index) => (
              <div
                key={index}
                className="bg-gray-900 p-4 rounded-md flex flex-col items-center"
              >
                <img
                  src={card.img}
                  alt={card.label}
                  className="w-12 h-12 object-contain mb-2"
                />
                <p className="text-xs text-white text-center">{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
