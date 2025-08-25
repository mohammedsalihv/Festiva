import React, { useEffect, useState } from "react";
import { Images } from "@/assets";
import { X } from "lucide-react";
import { IStudio } from "@/utils/Types/user/studioTypes";
import { Button } from "@/components/Button";
import { IoClose } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { VscDebugBreakpointData } from "react-icons/vsc";
import { FaRegHandPointRight } from "react-icons/fa6";
import TimeSlotPicker from "@/components/TimeSlotPicker";
import { toast } from "react-toastify";
import {
  bookingErrorState,
  bookingState,
} from "@/utils/validations/user/bookings/serviceBooking";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IBookingBase } from "@/utils/Types/user/commonDetails";
import { setBooking } from "@/redux/Slice/user/bookingSlice";
import Calendar from "@/components/Calendar";
import { Input } from "@/components/Input";
import Spinner from "@/components/Spinner";

interface studioDetailsProps {
  data: IStudio & { typeOfAsset: "studio" };
}

const StudioDetails: React.FC<studioDetailsProps> = ({ data }) => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [showGallery, setShowGallery] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [bookingForm, setBookingForm] = useState<bookingState>({
    time: "",
    date: "",
  });
  const [errors, setErrors] = useState<bookingErrorState>({
    time: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDates) {
      setBookingForm((prev) => ({
        ...prev,
        date: selectedDates.map((d) => d.toISOString()).join(", "),
      }));
    }
  }, [selectedDates]);

  useEffect(() => {
    if (selectedSlot) {
      setBookingForm((prev) => ({
        ...prev,
        time: selectedSlot,
      }));
    }
  }, [selectedSlot]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const highlightError = (field: keyof bookingErrorState) => {
    setErrors((prev) => ({ ...prev, [field]: "Required" }));
    setTimeout(() => {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }, 3000);
  };

  const handleBooking = () => {
    setLoading(true);
    let hasError = false;

    if (!selectedDates.length) {
      highlightError("date");
      hasError = true;
    }
    if (!selectedSlot) {
      highlightError("time");
      hasError = true;
    }
    if (selectedPackage === null) {
      toast.error("Please select a package.");
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    if (!areDatesConsecutive(selectedDates)) {
      toast.error("Please select consecutive dates only.");
      setLoading(false);
      return;
    }

    const chosenPkg =
      selectedPackage != null ? data.packages[selectedPackage] : undefined;

    if (!chosenPkg) {
      throw new Error("Package must be selected before booking");
    }

    const bookingPayload: IBookingBase = {
      userId: user?.id,
      assetId: data._id,
      assetType: data.typeOfAsset,
      selectedDates: selectedDates.map((d) => d.toISOString()),
      selectedTimeSlot: selectedSlot,
      total: Number(chosenPkg.payment),
      serviceData: {
        ...data,
        packages: data.packages,
      },
      packageName: data.packages[0]?.packageName,
    };

    dispatch(setBooking(bookingPayload));
    toast.success("Processing...");
    setLoading(false);
    navigate("/user/payment");
  };

  const areDatesConsecutive = (dates: Date[]) => {
    if (dates.length <= 1) return true;
    dates.sort((a, b) => a.getTime() - b.getTime());
    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1]);
      const curr = new Date(dates[i]);
      const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
      if (diff !== 1) return false;
    }
    return true;
  };

  return (
    <div className="relative mt-16 sm:mt-20 md:mt-24 font-poppins">
      <div className="w-full max-w-[1350px] mx-auto p-1">
        <div className="grid lg:grid-cols-3 gap-2">
          <div className="lg:col-span-2">
            <img
              src={
                data.Images && data.Images.length > 0
                  ? data.Images[0]
                  : Images.imageNA
              }
              alt="Main"
              onClick={() => setShowGallery(true)}
              className="w-full sm:h-[510px] object-cover rounded-md cursor-pointer"
            />
          </div>
          {data.Images && data.Images.length > 1 ? (
            <div className="hidden lg:grid grid-cols-2 gap-2 h-full">
              {data.Images.slice(1, 5).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`img${i}`}
                  onClick={() => setShowGallery(true)}
                  className="w-full h-[250px] object-cover rounded-md cursor-pointer"
                />
              ))}
            </div>
          ) : (
            <div className="hidden lg:grid grid-cols-2 gap-2 h-full">
              <img
                src={Images.imageNA}
                alt="Fallback"
                className="w-full h-[250px] object-cover rounded-md col-span-2"
              />
            </div>
          )}
        </div>
      </div>

      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 p-4 overflow-y-auto">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowGallery(false)}
              className="text-white"
            >
              <X size={30} />
            </button>
          </div>
          {data.Images && data.Images.length > 1 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {data.Images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`gallery-${i}`}
                  className="sm:h-96 sm:w-96 aspect-square object-cover rounded-md"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <img
                src={Images.imageNA}
                className="w-full aspect-square object-cover rounded-md"
              />
            </div>
          )}
        </div>
      )}
      <div className="w-full max-w-[1350px] mx-auto grid lg:grid-cols-3 gap-6 p-4 pb-28">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold">
            {data.studioName?.toUpperCase()}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <div className="flex items-start sm:items-center gap-1">
              <CiLocationOn className="text-black shrink-0 mt-[2px]" />
              <p className="text-xs sm:text-base text-gray-500 font-poppins font-bold break-words">
                {[
                  data?.location?.houseNo,
                  data?.location?.street,
                  data?.location?.district,
                  data?.location?.state,
                  data?.location?.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
                {data?.location?.zip ? ` - ${data.location.zip}` : ""}
              </p>
            </div>
          </div>
          <div className="border-b py-4">
            <h3 className="text-2xl font-semibold mb-4">Packages</h3>

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              {data.packages.map((pkg, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPackage(i)}
                  className={`bg-gray-50 p-4 rounded-md shadow-xl hover:border-main_color border space-y-2 cursor-pointer
                    ${selectedPackage === i ? "border-main_color border-2" : ""}`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gray-600 mb-1 font-serif font-bold">
                        <FaRegHandPointRight className="text-main_color text-base" />
                        <span>Package Name</span>
                      </label>
                      <p className="text-base font-semibold text-gray-800">
                        {pkg.packageName}
                      </p>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gray-600 mb-1 font-serif font-bold">
                        <FaRegHandPointRight className="text-main_color text-base" />
                        <span>Payment</span>
                      </label>
                      <p className="text-base text-gray-800">{pkg.payment}/-</p>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gray-600 mb-1 font-serif font-bold">
                        <FaRegHandPointRight className="text-main_color text-base" />
                        <span>Man Power</span>
                      </label>
                      <p className="text-base text-gray-800">{pkg.manPower}</p>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gray-600 mb-1 font-serif font-bold">
                        <FaRegHandPointRight className="text-main_color text-base" />
                        <span>Delivery time</span>
                      </label>
                      <p className="text-base text-gray-800">
                        {pkg.deliveryTime}
                      </p>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gray-600 mb-1 font-serif font-bold">
                        <FaRegHandPointRight className="text-main_color text-base" />
                        <span>Validity</span>
                      </label>
                      <p className="text-base text-gray-800">{pkg.validity}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 text-sm text-gray-600 mb-1 font-serif font-bold">
                        <FaRegHandPointRight className="text-main_color text-base" />
                        <span>Package Includes</span>
                      </label>
                      <ul className="list-inside text-base text-gray-800 space-y-1">
                        {pkg.packageIncludes?.map((Includes, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <VscDebugBreakpointData className="text-black text-xs" />
                            {Includes}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 text-sm text-gray-600 mb-1 font-serif font-bold">
                        <FaRegHandPointRight className="text-main_color text-base" />
                        <span>Equipments</span>
                      </label>
                      <ul className="list-inside text-base text-gray-800 space-y-1">
                        {pkg.equipments.map((equipment, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <VscDebugBreakpointData className="text-black text-xs" />
                            {equipment}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-b py-3">
            <h2 className="text-xl font-semibold mb-1">About</h2>
            <p className="text-base text-gray-700">{data.about}</p>
          </div>
          <div className="border-b py-3">
            <h3 className="text-xl font-semibold mb-2">Features of studio</h3>
            <ul className="list-inside text-base text-gray-600">
              {data.serviceFeatures &&
                data.serviceFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <VscDebugBreakpointData className="text-black text-xs" />
                    <li>{feature}</li>
                  </div>
                ))}
            </ul>
          </div>

          <div className="py-3 border-b">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-base text-gray-700">{data.description}</p>
          </div>
          <div className="py-3 border-b">
            <h2 className="text-xl font-semibold mb-2">Terms & Conditions</h2>
            <p className="text-base text-gray-700">{data.terms}</p>
          </div>

          <div className=" pt-6 mt-6 border border-gray-300 p-4 rounded-md bg-gray-100">
            <h3 className="text-base font-bold text-gray-800 mb-2">
              Hosted by <span className="font-bold">{data.host?.name}</span>
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-600">
              <div>
                <p>Member since December 2022</p>
                <p className="text-xs mt-1 text-main_color">
                  Responds within a few hours
                </p>
              </div>
              <Button className="text-base mt-2 sm:mt-0 bg-gray-200 hover:bg-deepPurple text-gray-800 px-4 py-3 rounded border hover:text-white">
                Message Host
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block space-y-4 rounded-md">
          <div className="border p-4 rounded-lg shadow-md w-full max-w-md space-y-4">
         

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-center gap-6 pb-3 cursor-pointer">
                <div
                  onClick={() => setShowCalendar(!showCalendar)}
                  className={`border-b-2 ${
                    errors.date
                      ? "border-red-500 text-red-500"
                      : showCalendar
                      ? "border-deepPurple/80"
                      : "border-gray-300"
                  } px-4 py-4 w-full text-center text-sm font-medium text-deepPurple hover:border-deepPurple/80 transition ${
                    selectedDates
                      ? "border-deepPurple text-deepPurple"
                      : "border-gray-300"
                  }`}
                >
                  <Input
                    type="text"
                    name="date"
                    value={bookingForm.date}
                    className="hidden"
                    onChange={handleChange}
                  />
                  {selectedDates.length
                    ? selectedDates
                        .map((d) => d.toLocaleDateString())
                        .join(", ")
                    : "Pick a date"}
                </div>
                {errors?.date && (
                  <p className="text-red-600 text-xs mt-1">{errors.date}</p>
                )}
                <div
                  onClick={() => setShowTimeSlots(!showTimeSlots)}
                  className={`border-b-2 px-4 py-4 w-full text-center text-sm font-medium transition
                  ${
                    errors.date
                      ? "border-red-500 text-red-500"
                      : selectedSlot
                      ? "border-neonPink text-neonPink"
                      : showCalendar
                      ? "border-deepPurple/80 text-deepPurple hover:border-deepPurple/80"
                      : "border-gray-300 text-deepPurple hover:border-deepPurple/80"
                  }
                                 `}
                >
                  <Input
                    type="text"
                    name="time"
                    value={bookingForm.time}
                    className="hidden"
                    onChange={handleChange}
                  />
                  {selectedSlot ? selectedSlot : "Pick a time"}
                </div>
              </div>
              {errors?.time && (
                <p className="text-red-600 text-xs text-end mt-1">
                  {errors.time}
                </p>
              )}
              {showCalendar && (
                <div className="flex justify-center">
                  <Calendar
                    selectedDates={selectedDates}
                    onChange={setSelectedDates}
                    availableDates={(data.availableDates || []).map(
                      (d) => new Date(d)
                    )}
                  />
                </div>
              )}
              {showTimeSlots && (
                <div className="flex justify-center">
                  <TimeSlotPicker
                    timeSlots={data.timeSlots || []}
                    onSelect={(slot) => setSelectedSlot(slot)}
                  />
                </div>
              )}
            </div>
            <Button
              onClick={handleBooking}
              className="w-full bg-main_gradient text-white font-semibold py-3 rounded transition"
            >
              {loading ? <Spinner text="Booking started..." /> : "Reserve"}
            </Button>

            <p className="text-xs text-gray-400 text-center">
              Cancel for free within 24 hours <span className="ml-1">ℹ️</span>
            </p>
          </div>
          <div className="border p-4 rounded-lg shadow-md w-full max-w-md space-y-2 text-sm text-gray-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3">
              <img
                src={data.host?.profilePic}
                alt="Host Profile"
                className="w-14 h-14 border rounded-full p-1 object-cover"
              />
              <p className="text-gray-700 text-base font-bold">
                Hosted by: {data.host?.name}
              </p>
            </div>
            <Button className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition">
              Message Host
            </Button>
          </div>
        </div>
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center">
              <Button className="border">Select a package</Button>
            </h2>
          </div>
          <Button
            onClick={() => setShowOverlay(true)}
            className="bg-main_gradient text-white px-4 py-2 rounded"
          >
            Instant Book
          </Button>
        </div>
      </div>

      {showOverlay && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white p-4 overflow-y-auto">
          <div className="flex justify-end">
            <button onClick={() => setShowOverlay(false)}>
              <IoClose className="text-2xl text-gray-600" />
            </button>
          </div>

          <div className="space-y-4 mt-2">

            <div className="space-y-2 text-sm text-gray-700">
              <div className="w-full border-b pb-3">
                <div className="flex justify-center gap-6 cursor-pointer mb-3">
                  <div
                    onClick={() => setShowCalendar(!showCalendar)}
                    className={`border-b-2 px-4 py-2 w-full text-center text-sm font-medium transition
                     ${
                       errors.date
                         ? "border-red-500"
                         : showCalendar
                         ? "border-deepPurple/80"
                         : "border-gray-300"
                     }
                           text-deepPurple hover:border-deepPurple/80
                            `}
                  >
                    <Input
                      type="text"
                      name="date"
                      className="hidden"
                      value={bookingForm.date}
                      onChange={handleChange}
                    />
                    {selectedDates.length
                      ? selectedDates
                          .map((d) => d.toLocaleDateString())
                          .join(", ")
                      : "Pick a date"}
                  </div>
                  <div
                    onClick={() => setShowTimeSlots(!showTimeSlots)}
                    className={`border-b-2 ${
                      showCalendar ? "border-deepPurple/80" : "border-gray-300"
                    } px-4 py-2 w-full text-center text-sm font-medium text-deepPurple hover:border-deepPurple/80 transition`}
                  >
                    <Input
                      type="text"
                      name="time"
                      className="hidden"
                      value={bookingForm.time}
                      onChange={handleChange}
                    />
                    {selectedSlot ? selectedSlot : "Pick a time"}
                  </div>
                </div>
                {showCalendar && (
                  <div className="flex justify-center">
                    <Calendar
                      selectedDates={selectedDates}
                      onChange={setSelectedDates}
                      availableDates={(data.availableDates || []).map(
                        (d) => new Date(d)
                      )}
                    />
                  </div>
                )}
                {showTimeSlots && (
                  <div className="flex justify-center">
                    <TimeSlotPicker
                      timeSlots={data.timeSlots || []}
                      onSelect={(slot) => setSelectedSlot(slot)}
                    />
                  </div>
                )}
              </div>
            </div>
            <Button
              onClick={handleBooking}
              className="w-full bg-main_gradient text-white ..."
            >
              {loading ? <Spinner text="Booking started..." /> : "Reserve"}
            </Button>

            <p className="text-xs text-gray-400 text-center">
              Cancel for free within 24 hours <span className="ml-1">ℹ️</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudioDetails;
