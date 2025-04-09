import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const stats = [
  { count: "150+", label: "Luxury agencies" },
  { count: "350+", label: "Luxury assets" },
  { count: "5+", label: "Years of Experience" },
  { count: "550+", label: "Happy Customers", highlight: true },
];

const infoBlocks = [
  {
    title: "OUR PLATFORM",
    text: "Our platform connects users with a variety of luxury event services through a seamless digital experience. Whether you're looking to host or book, we provide an all-in-one solution to list, discover, and secure premium services for any occasion. Empowering service providers and delighting users, we make planning effortless and exceptional.",
  },
  {
    title: "FOR USERS",
    text: "Discover and book the perfect services for your event in just a few clicks. Our user-friendly interface and verified listings ensure a reliable and enjoyable experience from planning to celebration.",
  },
  {
    title: "FOR HOSTS",
    text: "As a service provider, you can easily list your offerings, reach a wider audience, and grow your business through our intuitive management dashboard and real-time booking system.",
  },
  {
    title: "EFFICIENT & SEAMLESS",
    text: "From discovery to booking, everything happens in one place. Save time, avoid hassle, and make informed decisions with transparent pricing and detailed service insights.",
  },
  {
    title: "TRUST & QUALITY",
    text: "We emphasize quality, trust, and customer satisfaction. All listings go through a thorough verification process to ensure reliability and professionalism.",
  },
];


interface AnimatedCounterProps {
  end: string;
  duration?: number;
}

const AnimatedCounter = ({ end, duration = 1500 }: AnimatedCounterProps) => {
  const [ref, inView] = useInView({ triggerOnce:true });
  const [count, setCount] = useState<number | string>(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const final = parseInt(end);
    const increment = final / (duration / 30); 
    let rafId: number;

    const step = () => {
      start += Math.ceil(Math.random() * increment);
      if (start >= final) {
        setCount(`${end}+`);
      } else {
        setCount(start);
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [inView, end, duration]);

  return <div ref={ref}>{count}</div>;
};



const WhoWeAre = () => {
  return (
    <section className="w-full px-8 py-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 flex items-start justify-center md:w-1/4">
          <div className="text-3xl font-medium leading-tight">
            <span className="block">WHO</span>
            <span className="block text-purple-600">WE</span>
            <span className="block">ARE?</span>
          </div>
        </div>
        <div className="flex flex-col gap-10 md:w-3/4">
          {infoBlocks.map((block, index) => (
            <div key={index} className="border-b pb-4">
              <h3 className="text-lg font-semibold uppercase mb-2">
                {block.title}
              </h3>
              <p className="text-sm text-gray-600 max-w-xl">{block.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl p-8 text-center border shadow-md ${
              stat.highlight ? "bg-purple-600 text-white" : "bg-white"
            }`}
          >
            <div className="text-3xl font-bold">
              <AnimatedCounter end={stat.count.replace(/\D/g, "")} />
            </div>
            <div className="text-base mt-2">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhoWeAre;
