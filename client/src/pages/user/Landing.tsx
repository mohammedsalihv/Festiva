import React from 'react';
import Header from '@/reusable-components/user/Landing/Header';
import Footer from '@/reusable-components/user/Landing/Footer';
import { Images } from '@/assets';

// Interfaces for TypeScript
interface Speaker {
  name: string;
  title: string;
  image: string;
}

interface ScheduleItem {
  day: string;
  date: string;
  events: { time: string; description: string }[];
}

interface Ticket {
  type: string;
  price: number;
  features: string[];
}

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  image: string;
}

const LandingPage: React.FC = () => {
  const speakers: Speaker[] = [
    { name: "Don Carl Van Houston", title: "Senior UX Designer", image: "https://via.placeholder.com/150" },
  ];

  const schedule: ScheduleItem[] = [
    {
      day: "First Day",
      date: "02 Mar, Monday",
      events: [
        { time: "09:00 AM - 10:00 AM", description: "Registration & Coffee" },
        { time: "10:00 AM - 11:30 AM", description: "Plan Conduct User Research" },
        { time: "11:30 AM - 12:00 PM", description: "Q&A Speaker" },
        { time: "12:00 PM - 01:00 PM", description: "Lunch Break" },
        { time: "01:00 PM - 02:00 PM", description: "Research The Right Thing" },
      ],
    },
  ];

  const tickets: Ticket[] = [
    { type: "Standard", price: 120, features: ["One day pass", "Lecture", "Lunch and Snack", "Meet Event Speaker", "Front Seat"] },
    { type: "Enterprise", price: 200, features: ["One day pass", "Lecture", "Lunch and Snack", "Meet Event Speaker", "Front Seat"] },
    { type: "Premium", price: 250, features: ["One day pass", "Lecture", "Lunch and Snack", "Meet Event Speaker", "Front Seat"] },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Wahid Dwipa Santoso",
      title: "Junior UI/UX Designer",
      quote: "I would like to take this opportunity to thank Conference Design for the excellent work both pre-conference and support during the four days. As a flawless organisation, conducted with human and infinite patience. The virtual vision was easy to interact with and of future benefits.",
      image: Images.casual_user,
    },
    {
      name: "Wahid Dwipa Santoso",
      title: "Junior UI/UX Designer",
      quote: "I would like to take this opportunity to thank Conference Design for the excellent work both pre-conference and support during the four days. As a flawless organisation, conducted with human and infinite patience. The virtual vision was easy to interact with and of future benefits.",
      image: Images.casual_user,
    },
    {
      name: "Wahid Dwipa Santoso",
      title: "Junior UI/UX Designer",
      quote: "I would like to take this opportunity to thank Conference Design for the excellent work both pre-conference and support during the four days. As a flawless organisation, conducted with human and infinite patience. The virtual vision was easy to interact with and of future benefits.",
      image: Images.casual_user,
    },
    {
      name: "Wahid Dwipa Santoso",
      title: "Junior UI/UX Designer",
      quote: "I would like to take this opportunity to thank Conference Design for the excellent work both pre-conference and support during the four days. As a flawless organisation, conducted with human and infinite patience. The virtual vision was easy to interact with and of future benefits.",
      image: Images.casual_user,
    },
    {
      name: "Wahid Dwipa Santoso",
      title: "Junior UI/UX Designer",
      quote: "I would like to take this opportunity to thank Conference Design for the excellent work both pre-conference and support during the four days. As a flawless organisation, conducted with human and infinite patience. The virtual vision was easy to interact with and of future benefits.",
      image: Images.casual_user,
    },
    {
      name: "Wahid Dwipa Santoso",
      title: "Junior UI/UX Designer",
      quote: "I would like to take this opportunity to thank Conference Design for the excellent work both pre-conference and support during the four days. As a flawless organisation, conducted with human and infinite patience. The virtual vision was easy to interact with and of future benefits.",
      image: Images.casual_user,
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
       <Header />
      <section id="home" className="relative bg-gray-800 h-[80vh] flex items-center justify-center text-center">
        <div>
          <p className="text-sm"></p>
          <h1 className="text-3xl md:text-4xl mt-2 font-boldonse">DESIGN YOR NEED</h1>
          <p className="mt-4 text-lg md:text-xl">We bring together exceptional designers sharing their most exclusive learnings. Join the event & accelerate your career!</p>
          <div className="mt-6 space-x-4">
            <a href="#tickets" className="bg-cyan-400 text-black px-6 py-3 rounded font-semibold hover:bg-cyan-500 transition">PARTICIPATE</a>
            <button className="border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-black transition">WATCH THE TEASER</button>
          </div>
        </div>
      </section>
      <section id="speakers" className="py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center">MEET THE INCREDIBLE SPEAKERS</h2>
        <p className="text-center mt-2 text-gray-400">Main event professionals in the world of design and architecture</p>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {speakers.map((speaker, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg text-center w-72">
              <img src={speaker.image} alt={speaker.name} className="w-32 h-32 rounded-full mx-auto" />
              <h3 className="mt-4 font-bold text-lg">{speaker.name}</h3>
              <p className="text-sm text-gray-400">{speaker.title}</p>
              <button className="mt-4 bg-cyan-400 text-black px-4 py-2 rounded font-semibold hover:bg-cyan-500 transition">See More</button>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center">SCHEDULE AND AGENDA</h2>
        <p className="text-center mt-2 text-gray-400">A representation of the event planning of Design Conferences</p>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {schedule.map((day, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <h3 className="font-bold text-lg">{day.day}</h3>
              <p className="text-sm text-gray-400">{day.date}</p>
              <ul className="mt-4 space-y-4">
                {day.events.map((event, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    <div>
                      <p className="text-sm text-gray-400">{event.time}</p>
                      <p>{event.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button className="border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-black transition">DOWNLOAD SCHEDULE</button>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="tickets" className="py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center">PRICING TICKETS</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {tickets.map((ticket, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg text-center w-72">
              <h3 className="font-bold text-lg">{ticket.type}</h3>
              <p className="text-3xl mt-2">${ticket.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                {ticket.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button
                className={`mt-6 px-6 py-3 rounded font-semibold transition ${
                  ticket.type === "Premium"
                    ? "bg-cyan-400 text-black hover:bg-cyan-500"
                    : "border border-white hover:bg-white hover:text-black"
                }`}
              >
                GET YOUR TICKET
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center">OUR PARTICIPANTS SAY</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg flex items-start gap-4 w-full max-w-lg">
              <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="font-bold">{testimonial.name}</h3>
                <p className="text-sm text-gray-400">{testimonial.title}</p>
                <p className="mt-2 text-sm">{testimonial.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="w-full md:w-1/2">
            <img src="https://via.placeholder.com/600x300" alt="Map" className="w-full h-64 object-cover rounded-lg" />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold">WE CARRY OUT IN CASA DE LA PANADERIA BUILDING</h2>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default LandingPage;