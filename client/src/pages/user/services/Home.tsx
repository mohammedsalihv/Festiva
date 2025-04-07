import { Images } from "@/assets";
import Header from "@/reusable-components/Landing/Header";
import ExploreButton from "@/components/ExploreButton";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect } from "react";

const images = [Images.Landing_1, Images.Landing_2];

const Home = () => {
  const [sliderRef , instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next(); // Go to next slide
    }, 5000); // Every 3 seconds
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <Header />

      {/* Slider Section */}
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

        {/* Overlay Layer */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Content on top of slider */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-black z-20 py-6">
          <div className="flex flex-row justify-between items-end w-full h-full px-4 md:px-10 py-4">
            <div>
              <div className="text-main_color text-2xl sm:text-3xl md:text-4xl uppercase font-bold">
                <span className="font-mono">Festiva</span>{" "}
                <span className="text-white font-thinFont font-light">
                  Luxury
                </span>
              </div>
              <div className="text-white font-thin text-2xl sm:text-3xl md:text-4xl uppercase leading-tight">
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

      {/* Bottom dummy section */}
      <div className="bg-black h-96 z-20 relative" />
    </div>
  );
};

export default Home;
