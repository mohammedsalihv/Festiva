import { Images } from "@/assets";
import Header from "@/reusable-components/user/Landing/Header";

import "keen-slider/keen-slider.min.css";

import CategoryCard from "@/components/CategoryCard";
import WhoWeAre from "@/reusable-components/user/Landing/WhoWeAre";
import FAQ from "@/reusable-components/user/Landing/FAQ";
import Footer from "@/reusable-components/user/Landing/Footer";
import Supporters from "@/reusable-components/user/Landing/Supporters";

const featureCards = [
  { img: Images.service_247, label: "24/7 Availability" },
  { img: Images.unlimited, label: "Bespoke Planning" },
  { img: Images.flexible, label: "Luxury Touchpoints" },
  { img: Images.personlised, label: "Trusted Network" },
];

const Home = () => {
  return (
    <div className="relative">
      <Header />
      <section className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col justify-center items-center px-4 py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f001f] via-[#1a002f] to-black z-0" />
        <div className="absolute bottom-[-40%] left-[-20%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_#e879f9_0%,_transparent_70%)] opacity-20" />
        <div className="absolute right-0 top-[45%] w-72 h-72 bg-[#ff4de1] rounded-full blur-3xl opacity-40 z-0" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full blur-sm opacity-70 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-white rounded-full blur-sm opacity-70 animate-pulse" />
        <div className="relative z-10 max-w-6xl w-full text-center">
          <p className="text-xs sm:text-sm text-white/70 mb-4 font-pacifico">
            🧠 Smart summaries from every meeting
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            Turn talk into tasks.{" "}
            <span className="text-[#ff4de1]">Instantly.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Discover and book venues, caterers, rental cars, and studios — all
            in one place. We make planning simple, fast, and stress-free.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <button className="bg-[#ff4de1] hover:bg-[#ff77e7] text-white font-semibold px-6 py-3 rounded-full transition w-full sm:w-auto">
              Start for free
            </button>
            <button className="border border-white/30 text-white hover:bg-white hover:text-black px-6 py-3 rounded-full transition w-full sm:w-auto">
              Find services
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2 sm:px-6 max-w-5xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-2">Smarter Listings</h3>
              <p className="text-white/60 text-sm">
                Hosts can easily list their businesses with just a few steps.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-2">
                Find Services Easily
              </h3>
              <p className="text-white/60 text-sm">
                Search, match, and book services that fit your needs.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-2">
                Seamless Experience
              </h3>
              <p className="text-white/60 text-sm">
                Booking, connecting, and coordinating — all made simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-black text-main_white py-10 px-4 z-20 relative">
        <div className="text-center">
          <h2 className="text-[10px] md:text-[22px] font-bold mb-10 tracking-wide font-boldonse">
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
            <p className="mb-6 text-gray-300 font-JosephicSans">
              Our personal concierge service ensures you experience ultimate
              luxury stress-free.
            </p>
            <p className="mb-8 text-sm text-gray-400 font-bold ">
              From coordinating every step to handling every detail, our bespoke
              concierge team is at your service.
            </p>
            <button className="bg-black px-6 py-3 rounded-md text-white font-medium hover:brightness-125 transition font-JosephicSans">
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
                <p className="text-xs text-white text-center font-JosephicSans">
                  {card.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-black text-white py-16 px-4 lg:px-24">
        <FAQ />
        <Supporters />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
