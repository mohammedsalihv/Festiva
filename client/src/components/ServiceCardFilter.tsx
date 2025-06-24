import { IoIosClose } from "react-icons/io";
import { RefObject } from "react";

interface serviceCardProps {
  filterRef: RefObject<HTMLDivElement | null>;
  filterOpen: (value: boolean) => void;
}

const ServiceCardFilter = ({ filterRef, filterOpen }: serviceCardProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div
        ref={filterRef}
        className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 max-w-md bg-white rounded-lg shadow-lg p-3 sm:p-4 max-h-[80vh] overflow-y-auto relative"
      >
        <h1 className="text-center text-base sm:text-lg border-b pb-1 sm:pb-2 mb-2 sm:mb-4">
          Filters
        </h1>
        <button
          onClick={() => filterOpen(false)}
          className="absolute top-1 sm:top-2 right-1 sm:right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close filters"
        >
          <IoIosClose className="w-8 h-8" />
        </button>
        <div className="mb-2 sm:mb-4 border-b p-2 sm:p-4">
          <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
            Venue Features
          </h4>
          <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
            <input type="checkbox" className="accent-blue-500" />
            Garden/Yard
          </label>
          <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
            <input type="checkbox" className="accent-blue-500" />
            High Ceiling
          </label>
          <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
            <input type="checkbox" className="accent-blue-500" />
            Light Wood/Whitewash Floor
          </label>
          <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
            <input type="checkbox" className="accent-blue-500" />
            Open Kitchen
          </label>
          <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
            <input type="checkbox" className="accent-blue-500" />
            White Walls
          </label>
          <button className="text-main_color text-xs sm:text-sm mt-1 sm:mt-2 text-left">
            Show all (349)
          </button>
        </div>
        <div className="mb-2 sm:mb-4 p-2 sm:p-4">
          <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
            Location Allows
          </h4>
          <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
            <input type="checkbox" className="accent-blue-500" />
            Adult Filming
          </label>
          <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
            <input type="checkbox" className="accent-blue-500" />
            Pets
          </label>
          <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
            <input type="checkbox" className="accent-blue-500" />
            Alcohol
          </label>
          <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
            <input type="checkbox" className="accent-blue-500" />
            Smoking
          </label>
          <label className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
            <input type="checkbox" className="accent-blue-500" />
            Loud Noises
          </label>
        </div>
        <div className="flex justify-between items-center border-t pt-2 pb-4 sm:pt-3">
          <button className="text-gray-600 text-xs sm:text-sm hover:text-gray-800">
            Clear all
          </button>
          <button className="bg-main_color text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-indigo-500">
            Show 132 listings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardFilter;
