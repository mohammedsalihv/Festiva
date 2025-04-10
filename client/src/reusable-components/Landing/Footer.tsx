import { Images } from "@/assets";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ToastContainer from "@/reusable-components/Messages/ToastContainer";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill out all fields.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email is invalid.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      toast.success("Form submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <footer className="bg-[#2a2a2a] text-gray-300 px-6 py-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <div className="flex flex-col gap-12 w-full lg:w-3/4">
            <div className="flex items-center gap-2 uppercase">
              <img
                src={Images.logo_png}
                alt="Logo"
                className="h-6 w-6 md:h-8 md:w-9"
              />
              <span className="text-main_color font-lilita text-2xl sm:text-3xl">
                Festiva.
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 py-6 sm:px-0">
              {[
                {
                  title: "Explore",
                  links: ["Home", "About", "Events", "View All"],
                },
                {
                  title: "Support",
                  links: ["FAQs", "Privacy Policy", "Terms", "Contact Us"],
                },
                {
                  title: "Resources",
                  links: ["Docs", "Guides", "API", "Community"],
                },
                {
                  title: "Company",
                  links: ["Careers", "Blog", "Press", "Team"],
                },
              ].map((section, idx) => (
                <div key={idx} className="text-center sm:text-left">
                  <h4 className="text-sm font-semibold text-white mb-3 uppercase">
                    {section.title}
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a href="#" className="hover:text-white">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-2/4">
            <h4 className="text-sm text-center sm:text-left font-semibold text-[#7B61FF] mb-4 uppercase">
              We’d love to hear from you!
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  name="name"
                  type="text"
                  placeholder="Name*"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full sm:w-1/2 p-2 bg-transparent border-b border-gray-500 outline-none"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full sm:w-1/2 p-2 bg-transparent border-b border-gray-500 outline-none"
                />
              </div>
              <textarea
                name="message"
                placeholder="Message*"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 bg-transparent border-b border-gray-500 outline-none"
              />
              <button
                type="submit"
                className="bg-[#7B61FF] w-full hover:bg-[#6f56e9] transition text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-8 text-sm">
          <p className="text-center sm:text-right">
            <a href="#" className="hover:underline hover:text-white">
              Terms & Conditions
            </a>{" "}
            ·{" "}
            <a href="#" className="hover:underline hover:text-white">
              Privacy
            </a>{" "}
            ·{" "}
            <a href="#" className="hover:underline hover:text-white">
              Contact
            </a>
          </p>
          <div className="flex justify-center gap-4">
            {[
              { src: Images.instagram, alt: "Instagram" },
              { src: Images.facebook, alt: "Facebook" },
              { src: Images.twitter, alt: "Twitter" },
              { src: Images.linkedin, alt: "LinkedIn" },
            ].map((icon, idx) => (
              <div
                key={idx}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 hover:bg-white transition duration-300 transform hover:scale-110 shadow-md"
              >
                <img src={icon.src} alt={icon.alt} className="w-5 h-5" />
              </div>
            ))}
          </div>
          <p>© {new Date().getFullYear()} Festiva. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
