import CardOption from "@/components/OptionCards";
import { Images } from "@/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedOption,
  setSelectedTab,
} from "@/redux/Slice/host/selectServiceSlice";
import { RootState } from "@/redux/store";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaCar } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { RiCameraAiLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";

const venueOptions = [
  {
    label: "Wedding",
    image: Images.kind_wedding,
  },
  {
    label: "Birthday, anniversary or small space",
    image: Images.kind_multipurpose,
  },
  {
    label: "Office space",
    image: Images.kind_office,
  },
  {
    label: "Events",
    image: Images.kind_event,
  },
];

const photoAndVideoOptions = [
  {
    label: "Photo and videography",
    image: Images.photography_sub,
  },
];

const carRentalOptions = [
  {
    label: "Rent Cars",
    image: Images.carRent_sub,
  },
];

const cateringOptions = [
  {
    label: "Man power",
    image: Images.catering_manpower_sub,
  },
];

const tabs = [
  {
    tab: "Venue",
    img: <BsFillBuildingsFill />,
  },
  { tab: "Car rentals", img: <FaCar /> },
  { tab: "Catering management", img: <IoFastFood /> },
  { tab: "Photo & Video services", img: <RiCameraAiLine /> },
];

const KindOfService = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedTab, selectedOption } = useSelector(
    (state: RootState) => state.selectService
  );

  const getCardOptions = () => {
    switch (selectedTab) {
      case "Car rentals":
        return carRentalOptions;
      case "Photo & Video services":
        return photoAndVideoOptions;
      case "Catering management":
        return cateringOptions;
      default:
        return venueOptions;
    }
  };

  const getInfoSection = () => {
    switch (selectedTab) {
      case "Car rentals":
        return {
          image: Images.kind_multipurpose,
          text: "Choose the best car for your trip. We have various categories for all types of needs.",
        };
      case "Studio":
        return {
          image: Images.kind_multipurpose,
          text: "Choose from photography and videography options for your needs.",
        };
      case "Catering management":
        return {
          image: Images.kind_multipurpose,
          text: "Select your preferred catering option. We offer vegetarian, vegan, and non-vegetarian dishes.",
        };
      default:
        return {
          image: Images.kind_detail_venues,
          text: "If your location is associated with more than one category, select the one that fits best. You can select up to five types.",
        };
    }
  };

  const handleNext = () => {
    if (!selectedOption) {
      setError(true);
      toast.error("Select one option");
      setTimeout(()=>{
        setError(false);
       },3000)
      return;
    }

    switch (selectedTab) {
      case "Car rentals":
        navigate("/host/car-rent-service");
        break;
      case "Photo & Video services":
        navigate("/host/photo-video-service");
        break;
      case "Catering management":
        navigate("/host/catering-service");
        break;
      default:
        navigate("/host/venue-service");
        break;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 font-prompt bg-white">
  {error && (
    <p className="text-red-600 text-sm font-medium text-center mb-3">
      Please select at least one option before continuing.
    </p>
  )}

  <div className="mb-6 px-4 sm:px-20">
    <h1 className="text-black font-bold text-xl sm:text-2xl md:text-3xl text-center sm:text-left">
      What kind of the space is it?
    </h1>
    <p className="text-gray-600 text-sm sm:text-base font-JosephicSans mt-2">
      Guests will only get your exact address once they’ve booked a reservation.
    </p>
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-4 sm:px-20">
    {tabs.map((tabItem, index) => (
      <div
        key={index}
        onClick={() => {
          dispatch(setSelectedTab(tabItem.tab));
          dispatch(setSelectedOption(""));
        }}
        className={`flex flex-col items-center justify-center border rounded-md text-center text-sm font-medium cursor-pointer transition px-4 py-3
          ${
            selectedTab === tabItem.tab
              ? "bg-main_host text-white shadow-md"
              : "hover:bg-purple-100 text-gray-700"
          }`}
      >
        <div className="text-3xl mb-1">{tabItem.img}</div>
        <span className="text-sm">{tabItem.tab}</span>
      </div>
    ))}
  </div>

  <div className="block lg:hidden px-4 sm:px-20 mt-6 mb-4">
    <div className="bg-gray-100 rounded-md p-4 text-sm text-gray-700 font-JosephicSans">
      {getInfoSection().text}
    </div>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 px-4 sm:px-20">
    <div className="grid grid-cols-1 gap-6">
      {getCardOptions().map((card) => (
        <div className="w-full" key={card.label}>
          <CardOption
            label={card.label}
            image={card.image}
            selected={selectedOption}
            onSelect={(option) => dispatch(setSelectedOption(option))}
          />
        </div>
      ))}
    </div>

    <div className="border rounded-lg p-4 hidden lg:block bg-white shadow-sm h-52">
      <img
        src={getInfoSection().image}
        alt="Info"
        className="w-14 h-14 mx-auto mb-4"
      />
      <p className="text-sm text-gray-700 text-center font-JosephicSans">
        {getInfoSection().text}
      </p>
    </div>
  </div>

  <div className="flex justify-end px-4 sm:px-20 mt-10">
    <button
      onClick={handleNext}
      className="bg-main_host text-white text-lg px-10 py-3 rounded-lg hover:bg-main_host transition"
    >
      Next
    </button>
    <CustomToastContainer />
  </div>
</div>

  );
};

export default KindOfService;
