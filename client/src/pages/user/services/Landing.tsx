import { Images } from "@/assets";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Landing = () => {
  return (
    <motion.div
      className="w-full bg-white text-black"
      initial="hidden"
      animate="show"
      variants={fadeInUp} // Fix applied here
    >
      {/* Hero Section */}
      <motion.section
        variants={fadeInUp}
        className="w-full bg-black text-white p-6 md:p-12 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Get The Tickets Now Or Never
        </h1>
        <img
          src={Images.landing_lady_sing}
          alt="Hero Artist"
          className="mx-auto rounded-lg shadow-lg mb-6 w-25 h-21"
        />
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Buy Now</Button>
      </motion.section>

      {/* Event Timeline Section */}
      <motion.section
        variants={fadeInUp}
        className="flex flex-wrap justify-around items-center py-6 border-t border-b"
      >
        {["11/02", "11/03", "11/04", "11/05"].map((date, i) => (
          <div key={i} className="text-center text-sm md:text-lg py-2">
            <p className="font-bold">{date}</p>
            <p>Live Concert</p>
          </div>
        ))}
      </motion.section>

      {/* Featured Concert */}
      <motion.section variants={fadeInUp} className="text-center p-6 md:p-12">
        <h2 className="text-xl md:text-3xl font-semibold mb-4">
          NF The 1st Single Album Live Concert
        </h2>
        <img
          src="https://via.placeholder.com/700x300"
          alt="Featured Group"
          className="mx-auto mb-4 rounded-lg"
        />
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Book Ticket</Button>
      </motion.section>

      {/* Upcoming Events */}
      <motion.section variants={fadeInUp} className="p-6 md:p-12">
        <h3 className="text-lg md:text-2xl font-semibold mb-6 text-center">
          Our Next Events
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((event) => (
            <motion.div
              key={event}
              variants={fadeInUp}
              className="bg-gray-100 p-2 rounded shadow"
            >
              <img
                src={Images.landing_venue}
                alt={`Event ${event}`}
                className="rounded mb-2"
              />
              <p className="text-center font-medium">Event Title {event}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call To Action */}
      <motion.section variants={fadeInUp} className="text-center p-6 md:p-12 bg-gray-100">
        <h4 className="text-xl md:text-2xl font-bold mb-4">
          Meet All Your Friends for Watching Concerts
        </h4>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Join Now</Button>
      </motion.section>
    </motion.div>
  );
};

export default Landing;

