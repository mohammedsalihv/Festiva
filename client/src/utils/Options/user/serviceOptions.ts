import { Images } from "@/assets"

export const serviceOptions = [
  { label: "Venues", value: "venue", icon: Images.venueTab },
  { label: "Rent Cars", value: "rentcar", icon: Images.rentcarTab },
  { label: "Studios", value: "studio", icon: Images.studioTab },
  { label: "Caters", value: "caters", icon: Images.catersTab },
];

export const timeSlots = [
  "10:30 AM - 05:30 PM",
  "11:30 AM - 06:00 PM",
  "11:00 AM - 05:00 PM",
  "04:00 AM - 09:00 PM"
];


export const services = [
  {
    id: 1,
    title: "INTERACTIVE AND AFFORDABLE VENUES",
    description:
      "Find unique venues tailored to your needs. From corporate spaces to party halls, our options are budget-friendly and designed for engagement.",
    image: Images.conventionCenter_service,
    reverse: false,
    link:"/user/assets/venue"
  },
  {
    id: 2,
    title: "PREMIUM STYLE RENTAL CARS",
    description:
      "Drive in luxury with our curated selection of rental cars suited for every kind of event — whether for style or logistics.",
    image: Images.rentCar_service,
    reverse: true,
    link:"/user/assets/rentcar"
  },
  {
    id: 3,
    title: "CATERING TEAMS",
    description:
      "Experienced chefs and staff ready to serve mouthwatering dishes that suit all tastes and dietary requirements.",
    image: Images.cater_service,
    reverse: false,
    link:"/user/assets/caters"
  },
  {
    id: 4,
    title: "WEDDING, PARTY CAMERA AND VIDEOGRAPHERS",
    description:
      "Capture every unforgettable moment with our top-rated photographers and videographers for weddings and parties alike.",
    image: Images.studio_service,
    reverse: true,
    link:"/user/assets/studio"
  }
];