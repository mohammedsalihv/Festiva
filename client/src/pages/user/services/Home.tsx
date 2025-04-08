import { Images } from "@/assets";
import Header from "@/reusable-components/Landing/Header";
import ExploreButton from "@/components/ExploreButton";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect } from "react";

const images = [Images.Landing_1, Images.Landing_2];

const Home = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
    },
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
      <section className="relative w-full h-[100vh] overflow-hidden">
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
          <div className="flex flex-row justify-between items-end w-full h-full px-4 md:px-10 py-4">
            <div>
              <div className="text-main_color text-2xl sm:text-3xl md:text-4xl uppercase font-bold">
                <span className="font-mono">Festiva</span>{" "}
                <span className="text-white font-thinFont font-light">
                  Luxury
                </span>
              </div>
              <div className="text-white font-thin text-2xl sm:text-md md:text-4xl uppercase leading-tight">
                <div className="font-thin">lifestyle</div>
                <div>management</div>
              </div>
            </div>
            <div className="flex flex-col items-end text-right max-w-sm">
              <span className="text-white font-JosephicSans text-sm sm:text-base md:text-lg leading-snug mb-2 lg:whitespace-nowrap">
                Your Local Partner For an unforgettable and Effortless Luxury
                lifestyle in here.
              </span>
              <ExploreButton content={"Try it out now"} />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-black text-main_white py-10 px-4 relative z-20">
        <div className="text-center">
          <h1 className="text-[12px] md:text-2xl sm:text-2xl font-bold mb-10 leading-snug font-boldonse tracking-wide">
            Each service is thoughtfully curated to <br />
            spark connection and create lasting <br />
            memories.
          </h1>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="bg-white/20 rounded-full p-4 transition-all duration-300 group-hover:bg-white">
                <img
                  src={Images.venues}
                  alt="Venue"
                  className="h-3 w-3 sm:h-4 sm:w-4 object-contain filter invert group-hover:invert-0 transition-all duration-300"
                />
              </div>
              <span className="mt-2 text-[11px] md:text-[13px] sm:text-[13px] font-poppins">venues</span>
            </div>
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="bg-white/20 rounded-full p-4 transition-all duration-300 group-hover:bg-white">
                <img
                  src={Images.car_rent}
                  alt="Venue"
                  className="h-3 w-3 sm:h-4 sm:w-4 object-contain filter invert group-hover:invert-0 transition-all duration-300"
                />
              </div>
              <span className="mt-2 text-[11px] md:text-[13px] sm:text-[13px] font-poppins">rent cars</span>
            </div>

            <div className="flex flex-col items-center group cursor-pointer">
              <div className="bg-white/20 rounded-full p-4 transition-all duration-300 group-hover:bg-white">
                <img
                  src={Images.camera_video}
                  alt="Venue"
                  className="h-3 w-3 sm:h-4 sm:w-4 object-contain filter invert group-hover:invert-0 transition-all duration-300"
                />
              </div>
              <span className="mt-2 text-[11px] md:text-[13px] sm:text-[13px] font-poppins">photo&video</span>
            </div>
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="bg-white/20 rounded-full p-4 transition-all duration-300 group-hover:bg-white">
                <img
                  src={Images.catering}
                  alt="Venue"
                  className="h-3 w-3 sm:h-4 sm:w-4 object-contain filter invert group-hover:invert-0 transition-all duration-300"
                />
              </div>
              <span className="mt-2 text-[11px] md:text-[13px] sm:text-[13px] font-poppins">catering</span>
            </div>
          </div>
        </div>
        <div className="">
           
        </div>
      </section>
    </div>
  );
};

export default Home;
