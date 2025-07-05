import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { carCompanies } from "@/utils/Options/user/rentCarFilterOptions";

type filterProps = {
  type: string;
  filterOpen: (open: boolean) => void;
  filterRef: React.RefObject<HTMLDivElement | null>;
  onApplyFilter: (filters: Record<string, any>) => void;
};

// export default function ServiceCardFilter({
//   type,
//   filterOpen,
//   filterRef,
//   onApplyFilter,
// }: Props) {
//   const [localFilters, setLocalFilters] = useState<Record<string, any>>({});

//   const update = (key: string, value: any) => {
//     setLocalFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleApply = () => {
//     onApplyFilter(localFilters);
//     filterOpen(false);
//   };

//   return (
//     <div
//   ref={filterRef}
//   className="bg-white p-4 shadow-xl rounded-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 max-w-md max-h-[80vh] overflow-y-auto relative"
// >

//       <h3 className="font-semibold mb-4 text-lg">Filter Options</h3>

//       {/* VENUE Filters */}
//       {type === "venue" && (
//         <>
//           <input
//             placeholder="City"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("city", e.target.value)}
//           />
//           <input
//             placeholder="State"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("state", e.target.value)}
//           />
//           <input
//             placeholder="Country"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("country", e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Min Price"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("priceMin", Number(e.target.value))}
//           />
//           <input
//             type="number"
//             placeholder="Max Price"
//             className="mb-4 w-full border p-1"
//             onChange={(e) => update("priceMax", Number(e.target.value))}
//           />
//         </>
//       )}
//       {type === "rentcar" && (
//         <>
//           <input
//             placeholder="Make"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("make", e.target.value)}
//           />
//           <input
//             placeholder="Model"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("model", e.target.value)}
//           />
//           <input
//             placeholder="Fuel"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("fuel", e.target.value)}
//           />
//           <input
//             placeholder="Transmission"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("transmission", e.target.value)}
//           />
//           <input
//             placeholder="Color"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("color", e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Seats"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("seats", Number(e.target.value))}
//           />
//           <input
//             type="number"
//             placeholder="Min Rent"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("rentMin", Number(e.target.value))}
//           />
//           <input
//             type="number"
//             placeholder="Max Rent"
//             className="mb-4 w-full border p-1"
//             onChange={(e) => update("rentMax", Number(e.target.value))}
//           />
//         </>
//       )}

//       {/* STUDIO Filters */}
//       {type === "studio" && (
//         <>
//           <input
//             placeholder="Equipment (comma separated)"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("equipments", e.target.value.split(","))}
//           />
//           <input
//             placeholder="Feature (comma separated)"
//             className="mb-2 w-full border p-1"
//             onChange={(e) =>
//               update("serviceFeatures", e.target.value.split(","))
//             }
//           />
//           <input
//             type="number"
//             placeholder="Min Price"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("priceMin", Number(e.target.value))}
//           />
//           <input
//             type="number"
//             placeholder="Max Price"
//             className="mb-4 w-full border p-1"
//             onChange={(e) => update("priceMax", Number(e.target.value))}
//           />
//         </>
//       )}

//       {/* CATERS Filters */}
//       {type === "caters" && (
//         <>
//           <input
//             placeholder="Manpower"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("manpower", e.target.value)}
//           />
//           <input
//             placeholder="Service Types (comma separated)"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("serviceTypes", e.target.value.split(","))}
//           />
//           <input
//             placeholder="Features (comma separated)"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("features", e.target.value.split(","))}
//           />
//           <input
//             type="number"
//             placeholder="Min Charge"
//             className="mb-2 w-full border p-1"
//             onChange={(e) => update("chargeMin", Number(e.target.value))}
//           />
//           <input
//             type="number"
//             placeholder="Max Charge"
//             className="mb-4 w-full border p-1"
//             onChange={(e) => update("chargeMax", Number(e.target.value))}
//           />
//         </>
//       )}

//       <button
//         className="bg-main_color text-white w-full py-2 rounded mt-2"
//         onClick={handleApply}
//       >
//         Apply Filters
//       </button>
//     </div>
//   );
// }

const ServiceCardFilter: React.FC<filterProps> = ({
  type,
  filterOpen,
  filterRef,
  onApplyFilter,
}) => {
  const [localFilters, setLocalFilters] = useState<Record<string, any>>({});
  const [price, setPrice] = useState(5000);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const timeSlots = [
    "10 AM - 10 PM",
    "11 AM - 04 PM",
    "10:30 AM - 5:30 PM",
    "11:30 AM - 06 PM",
  ];

  const update = (key: string, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApplyFilter(localFilters);
    filterOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div
        ref={filterRef}
        className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 max-w-xl bg-white rounded-lg shadow-lg p-3 sm:p-4 max-h-[80vh] overflow-y-auto relative"
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

       {
        type 
       }
         <div className="border">
          <div className="mb-2 sm:mb-4 p-2 sm:p-4">
             <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
               Car make
            </h4>
          </div>
        </div>
        <div className="mb-2 sm:mb-4 p-2 sm:p-4">
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
                className={`px-3 py-1 text-sm rounded-md border text-center transition 
          ${
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
              min={500}
              max={10000}
              step={100}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-main_color"
            />
            <p className="text-xs sm:text-sm text-black text-center mt-1">
              Up to ₹{price}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-2 pb-4 sm:pt-3">
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
