import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import {
  Building2,
  Car,
  Utensils,
  Camera,
  User,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { title: "Venues", icon: Building2, desc: "Book event spaces for weddings, parties & more." },
  { title: "Rent Cars", icon: Car, desc: "Find cars for travel, weddings, or business trips." },
  { title: "Caterers", icon: Utensils, desc: "Delicious catering services for your special day." },
  { title: "Studios", icon: Camera, desc: "Book photo & film studios for shoots & events." },
];

const LandingPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <section className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col justify-center items-center text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl"
        >
          Find & Book Services Easily. <br />
          <span className="text-yellow-300">Or Host & Earn Money.</span>
        </motion.h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          Whether you're looking for venues, cars, catering, or studios —
          we’ve got you covered.
        </p>
        <div className="flex gap-4 mt-8 flex-wrap justify-center">
          <Link to={'/login'}>
          <Button
           
          size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-2xl px-6 py-3">
            Book a Service
          </Button>
          </Link>
             
       
       <Link to={'/host/landing'}>
   <Button size="lg" variant="outline" className="border-white text-white rounded-2xl px-6 py-3">
            Become a Host
          </Button>
       </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center"
            >
              <service.icon className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* User Type Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Who Are You?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Casual User */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-indigo-50 rounded-2xl p-8 shadow-md"
          >
            <User className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Casual User</h3>
            <p className="text-gray-600 mb-4">
              Explore services, book venues, rent cars, and hire caterers or studios with ease.
            </p>
           <Link to={'/login'}>
            <Button className="bg-indigo-600 text-white rounded-xl">Start Booking</Button>
           </Link>
          </motion.div>

          {/* Host */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-yellow-50 rounded-2xl p-8 shadow-md"
          >
            <Wallet className="w-12 h-12 text-yellow-600 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Host / Asset Owner</h3>
            <p className="text-gray-600 mb-4">
              List your venue, cars, catering, or studio services. Accept bookings and earn money.
            </p>
            <Link to={'/host/landing'}>
            <Button className="bg-yellow-500 text-black rounded-xl">Become a Host</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
