import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Checkbox } from "./Checkbox";
import { Button } from "./Button";
import { RefObject } from "react";
import {
  carCompanies,
  transmissions,
  fuels,
  seats,
} from "@/utils/Options/user/rentCarFilterOptions";
import { Input } from "./Input";
import {
  rentCarAdditionalFeatures,
  rentCarFeatures,
} from "@/utils/Options/host/rentcar/rentcarFeatures";
import {
  venueFeaturesOptions,
  venueParkingOptions,
} from "@/utils/Options/host/venue/venueFeatures";
import { venueShifts } from "@/utils/Options/user/venueFilterOptions";
import {
  catersFeatures,
  serviceTypesOfVenues,
} from "@/utils/Options/user/catersFilterOptions";
import { timeSlots } from "@/utils/Options/user/serviceOptions";
import { studioServiceFeaturesOptions } from "@/utils/Options/host/studio/studioFeatures";
import { CiSearch } from "react-icons/ci";
import { filterParams } from "@/utils/Types/user/filterSortTypes";

interface filterProps {
  type: string;
  filterOpen: (value: boolean) => void;
  filterRef: RefObject<HTMLDivElement | null>;
  onApplyFilter: (filters: filterParams) => void;
  existingFilters: Record<string, any>; 
}

const ServiceCardFilter: React.FC<filterProps> = ({
  type,
  filterOpen,
  filterRef,
  onApplyFilter,
  existingFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<Record<string, any>>({});
  const [price, setPrice] = useState(5000);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedTranmission, setSelectedTranmission] = useState<string | null>(
    null
  );
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [selectedShift, setSelectedShift] = useState<string | null>(null);
  const [modelStart, setModelStart] = useState("");
  const [modelEnd, setModelEnd] = useState("");
  const [packageSearch, setPackageSearch] = useState("");
  const [priceTouched, setPriceTouched] = useState(false);

  const handleCheckboxChange = (key: string, value: string) => {
    setLocalFilters((prev) => {
      const current = prev[key] || [];
      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter((v: string) => v !== value)
          : [...current, value],
      };
    });
  };

  const handleApply = () => {
    const cleanedFilters = Object.entries(localFilters).reduce(
      (acc, [key, value]) => {
        const isArrayValid = Array.isArray(value) && value.length > 0;
        const isValueValid =
          value !== undefined &&
          value !== null &&
          value !== "" &&
          (!Array.isArray(value) || isArrayValid);

        if (!isValueValid) return acc;

        if (key === "venueFeaturesOptions") {
          acc["features"] = value;
        } else {
          acc[key] = value;
        }

        return acc;
      },
      {} as Record<string, any>
    );

    if (selectedShift) {
      cleanedFilters.shift = selectedShift;
    }

    if (selectedTimeSlot) {
      cleanedFilters.timeSlots = [selectedTimeSlot];
    }

    if (packageSearch.trim()) {
      cleanedFilters.packageSearch = packageSearch.trim();
    }

    if (priceTouched) {
      cleanedFilters.price = price;
    }
    onApplyFilter(cleanedFilters);
    filterOpen(false);
  };

useEffect(() => {
  if (Object.keys(existingFilters).length === 0) {
    setLocalFilters({});
    setSelectedTimeSlot(null);
    setSelectedTranmission(null);
    setSelectedFuel(null);
    setSelectedSeat(null);
    setSelectedShift(null);
    setModelStart("");
    setModelEnd("");
    setPackageSearch("");
    setPrice(5000);
    setPriceTouched(false);
  } else {
    setLocalFilters(existingFilters);
    // Optional: set other values from existingFilters if needed
  }
}, [existingFilters]);



  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center">
      <div
        ref={filterRef}
        className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-3/6 max-w-2xl bg-white rounded-lg shadow-lg p-3 sm:p-4 max-h-[80vh] overflow-y-auto relative"
      >
        <h1 className="text-center text-base sm:text-lg font-bold pb-1 sm:pb-2 mb-2 sm:mb-4 font-poppins">
          Filters
        </h1>
        <button
          onClick={() => filterOpen(false)}
          className="absolute top-1 sm:top-2 right-1 sm:right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close filters"
        >
          <IoIosClose className="w-8 h-8" />
        </button>
        {type === "venue" && (
          <div className="border">
            {/* Venue Features */}
            <div className="mb-2 sm:mb-4 p-2 sm:p-4">
              <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                Venue Features
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2">
                {venueFeaturesOptions.map((feature, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-700"
                  >
                    <Checkbox
                      className="accent-blue-500 border border-blue-500"
                      checked={localFilters.venueFeaturesOptions?.includes(
                        feature
                      )}
                      onCheckedChange={() =>
                        handleCheckboxChange("venueFeaturesOptions", feature)
                      }
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </div>

            {/* Parking Features */}
            <div className="mb-2 sm:mb-4 p-2 sm:p-4">
              <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                Parking Features
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2">
                {venueParkingOptions.map((feature, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-700"
                  >
                    <Checkbox
                      className="accent-blue-500 border border-blue-500"
                      checked={localFilters.parkingFeatures?.includes(feature)}
                      onCheckedChange={() =>
                        handleCheckboxChange("parkingFeatures", feature)
                      }
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </div>

            {/* Shifts */}
            <div className="border mb-2 sm:mb-4 p-2 sm:p-4">
              <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                Shifts
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2 cursor-pointer">
                {venueShifts.map((shift) => (
                  <p
                    key={shift}
                    onClick={() =>
                      setSelectedShift(selectedShift === shift ? null : shift)
                    }
                    className={`px-3 py-2 text-sm rounded-md border text-center transition ${
                      selectedShift === shift
                        ? "bg-main_color text-white border-main_color"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {shift}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {type === "rentcar" && (
          <div className="border">
            <div className="mb-2 sm:mb-4 p-2 sm:p-4">
              <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                Car make
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2">
                {carCompanies.map((make, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-700"
                  >
                    <Checkbox
                      className="accent-blue-500 border border-blue-500"
                      checked={localFilters.carCompanies?.includes(make)}
                      onCheckedChange={() => handleCheckboxChange("make", make)}
                    />
                    {make}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-2 sm:mb-4 p-2 sm:p-4 border-t">
              <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                Model
              </h4>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="e.g. 2011"
                  value={modelStart}
                  onChange={(e) => setModelStart(e.target.value)}
                  className="flex-1"
                />
                <span className="text-gray-600">to</span>
                <Input
                  placeholder="e.g. 2015"
                  value={modelEnd}
                  onChange={(e) => setModelEnd(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="border mb-2 sm:mb-4 p-2 sm:p-4">
              <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                Tranmission
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2 cursor-pointer">
                {transmissions.map((transmission) => (
                  <p
                    key={transmission}
                    onClick={() =>
                      setSelectedTranmission(
                        selectedTranmission === transmission
                          ? null
                          : transmission
                      )
                    }
                    className={`px-3 py-2 text-sm rounded-md border text-center transition ${
                      selectedTranmission === transmission
                        ? "bg-main_color text-white border-main_color"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {transmission}
                  </p>
                ))}
              </div>
            </div>
            <div className="border mb-2 sm:mb-4 p-2 sm:p-4">
              <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                Fuel
              </h4>
              <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-2 cursor-pointer">
                {fuels.map((fuel) => (
                  <p
                    key={fuel}
                    onClick={() =>
                      setSelectedFuel(selectedFuel === fuel ? null : fuel)
                    }
                    className={`px-3 py-2 text-sm rounded-md border text-center transition ${
                      selectedFuel === fuel
                        ? "bg-main_color text-white border-main_color"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {fuel}
                  </p>
                ))}
              </div>
            </div>

            <div className="mb-2 sm:mb-4 p-3 sm:p-4 grid grid-cols-2 gap-2">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                  Car Features
                </h4>
                {rentCarFeatures.map((feature) => (
                  <label
                    key={feature}
                    className="flex items-center gap-2 py-1 text-xs sm:text-sm text-gray-700"
                  >
                    <Checkbox
                      className="accent-blue-500 border border-blue-500"
                      checked={localFilters.rentCarFeatures?.includes(feature)}
                      onCheckedChange={() =>
                        handleCheckboxChange("rentCarFeatures", feature)
                      }
                    />
                    {feature}
                  </label>
                ))}
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                  Extra Features
                </h4>
                {rentCarAdditionalFeatures.map((feature) => (
                  <label
                    key={feature}
                    className="flex items-center gap-2 py-1 text-xs sm:text-sm text-gray-700"
                  >
                    <Checkbox
                      className="accent-blue-500 border border-blue-500"
                      checked={localFilters.rentCarFeatures?.includes(feature)}
                      onCheckedChange={() =>
                        handleCheckboxChange("rentCarFeatures", feature)
                      }
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </div>

            <div className="border mb-2 sm:mb-4 p-2 sm:p-4">
              <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                Seats
              </h4>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 gap-2 cursor-pointer">
                {seats.map((seat) => (
                  <p
                    key={seat}
                    onClick={() =>
                      setSelectedSeat(selectedSeat === seat ? null : seat)
                    }
                    className={`px-3 py-2 text-sm rounded-md border text-center transition ${
                      selectedSeat === seat
                        ? "bg-main_color text-white border-main_color"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {seat}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {type === "caters" && (
          <div className="border">
            <div className="mb-2 sm:mb-4 p-2 sm:p-4">
              <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                Caters Features
              </h4>
              {catersFeatures.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 text-xs sm:text-sm text-gray-700"
                >
                  <Checkbox
                    className="accent-blue-500 border border-blue-500"
                    checked={localFilters.catersFeatures?.includes(item)}
                    onCheckedChange={() =>
                      handleCheckboxChange("catersFeatures", item)
                    }
                  />
                  {item}
                </label>
              ))}
            </div>
            <div className="mb-2 sm:mb-4 border-b p-2 sm:p-4">
              <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                Service types
              </h4>
              {serviceTypesOfVenues.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 text-xs sm:text-sm text-gray-700"
                >
                  <Checkbox
                    className="accent-blue-500 border border-blue-500"
                    checked={localFilters.serviceTypes?.includes(item)}
                    onCheckedChange={() =>
                      handleCheckboxChange("serviceTypes", item)
                    }
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        )}

        {type === "studio" && (
          <div className="border">
            <div className="mb-2 sm:mb-4 p-2 sm:p-4">
              <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                Service Features
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2">
                {studioServiceFeaturesOptions.map((feature, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-700"
                  >
                    <Checkbox
                      className="accent-blue-500 border border-blue-500"
                      checked={localFilters.studioServiceFeaturesOptions?.includes(
                        feature
                      )}
                      onCheckedChange={() =>
                        handleCheckboxChange(
                          "studioServiceFeaturesOptions",
                          feature
                        )
                      }
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-2 sm:mb-4 p-2 sm:p-4">
              <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                Packages benefits
              </h4>

              <div className="relative w-full">
                <Input
                  placeholder="Search packages includes or equipment name..."
                  className="pl-10 pr-4 w-full"
                  value={packageSearch}
                  onChange={(e) => setPackageSearch(e.target.value)}
                />

                <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
            </div>
          </div>
        )}
        <div className="border mb-2 sm:mb-4 p-2 sm:p-4">
          <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
            Time slots
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 cursor-pointer">
            {timeSlots.map((slot) => (
              <p
                key={slot}
                onClick={() =>
                  setSelectedTimeSlot(selectedTimeSlot === slot ? null : slot)
                }
                className={`px-3 py-1 text-sm rounded-md border text-center transition ${
                  selectedTimeSlot === slot
                    ? "bg-main_color text-white border-main_color"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {slot}
              </p>
            ))}
          </div>
        </div>

        <div className="sticky top-0 bg-white z-10 p-2 sm:p-4 border-t border-b">
          <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-2">
            {type === "caters" ? "Total amount" : "Price"}
          </h4>
          <div className="px-1 sm:px-2">
            <input
              type="range"
              min={1000}
              max={100000}
              step={1000}
              value={price}
              onChange={(e) => {
                setPrice(Number(e.target.value));
                setPriceTouched(true);
              }}
              className="w-full accent-main_color"
            />
            <p className="text-xs sm:text-sm text-black text-center mt-1">
              Up to ₹{price}
            </p>
          </div>
        </div>
        <div className="sticky bottom-0 bg-white border-t px-2 sm:px-4 py-3 flex justify-between items-center z-10">
          <Button className="text-gray-600 text-xs sm:text-sm hover:text-gray-800 shadow-lg border border-black">
            Clear all
          </Button>
          <Button
            onClick={handleApply}
            className="bg-main_color text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-indigo-500"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardFilter;
