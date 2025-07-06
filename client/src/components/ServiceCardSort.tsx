import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Button } from "./Button";
import { Select } from "./Select";
import { RefObject } from "react";
import { MdRestartAlt } from "react-icons/md";
import { sortParams } from "@/utils/Types/user/filterSortTypes";

interface sortProps {
  type: string;
  sortOpen: (value: boolean) => void;
  sortRef: RefObject<HTMLDivElement | null>;
  onApplySort: (sorts: sortParams) => void;
}

const ServiceCardSort: React.FC<sortProps> = ({
  type,
  sortOpen,
  sortRef,
  onApplySort,
}) => {
  const [localSorts, setLocalSorts] = useState<sortParams>({});
  const resetSorts = () => setLocalSorts({});

  const handleApply = () => {
    const cleanedSorts = Object.entries(localSorts).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {} as sortParams
    );

    onApplySort(cleanedSorts);
    sortOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center">
      <div
        ref={sortRef}
        className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-3/6 max-w-2xl bg-white rounded-lg shadow-lg p-3 sm:p-4 max-h-[80vh] overflow-y-auto relative"
      >
        <h1 className="text-center text-base sm:text-lg font-bold pb-1 sm:pb-2 mb-2 sm:mb-4 font-poppins">
          Sorts
        </h1>

        <button
          onClick={() => sortOpen(false)}
          className="absolute top-1 sm:top-2 right-1 sm:right-2 text-gray-500 hover:text-gray-700"
        >
          <IoIosClose className="w-8 h-8" />
        </button>
        {type === "venue" && (
          <div className="border rounded-md shadow-sm">
            {[
              { label: "Venue Name", key: "name", type: "text" },
              { label: "Rent", key: "rent", type: "number" },
              { label: "Capacity", key: "capacity", type: "number" },
              { label: "Square Feet", key: "squareFeet", type: "number" },
              { label: "Sort by Date", key: "createdAt", type: "date" },
            ].map(({ label, key, type }) => (
              <div key={key} className="mb-2 sm:mb-4 border-t p-2 sm:p-4">
                <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                  {label}
                </h4>
                <Select
                  value={localSorts[key] || ""}
                  onChange={(e) =>
                    setLocalSorts((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  {type === "number" ? (
                    <>
                      <option value="low-high">Low to High</option>
                      <option value="high-low">High to Low</option>
                    </>
                  ) : type === "text" ? (
                    <>
                      <option value="asc">A-Z</option>
                      <option value="desc">Z-A</option>
                    </>
                  ) : (
                    <>
                      <option value="asc">Oldest First</option>
                      <option value="desc">Newest First</option>
                    </>
                  )}
                </Select>
              </div>
            ))}
          </div>
        )}

        {/* -------- RentCar -------- */}

        {type === "rentcar" && (
          <div className="border rounded-md shadow-sm">
            {[
              { label: "Business Name", key: "businessName", type: "text" },
              { label: "Car Name", key: "carName", type: "text" },
              { label: "Rent", key: "rent", type: "number" },
              { label: "Deposite", key: "deposite", type: "number" },
              { label: "Sort by Date", key: "createdAt", type: "date" },
            ].map(({ label, key, type }) => {
              const isNumberSort = type === "number";
              return (
                <div key={key} className="mb-2 sm:mb-4 border-t p-2 sm:p-4">
                  <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                    {label}
                  </h4>
                  <Select
                    value={localSorts[key] || ""}
                    onChange={(e) =>
                      setLocalSorts((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {isNumberSort ? (
                      <>
                        <option value="low-high">Low to High</option>
                        <option value="high-low">High to Low</option>
                      </>
                    ) : (
                      <>
                        <option value="asc">
                          {type === "date" ? "Oldest First" : "A-Z"}
                        </option>
                        <option value="desc">
                          {type === "date" ? "Newest First" : "Z-A"}
                        </option>
                      </>
                    )}
                  </Select>
                </div>
              );
            })}
            {/* Reset All Button */}
            <div className="flex justify-end px-4 pb-4">
              <button
                onClick={() => setLocalSorts({})}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 font-semibold"
              >
                <MdRestartAlt className="text-lg" />
                Reset All
              </button>
            </div>
          </div>
        )}

        {type === "caters" && (
          <div className="border rounded-md shadow-sm">
            {[
              {
                label: "Caters Name",
                key: "name",
                type: "text",
                options: [
                  { value: "asc", label: "A-Z" },
                  { value: "desc", label: "Z-A" },
                ],
              },
              {
                label: "Manpower",
                key: "manpower",
                type: "number",
                options: [
                  { value: "low-high", label: "Low to High" },
                  { value: "high-low", label: "High to Low" },
                ],
              },
              {
                label: "Total Amount",
                key: "totalAmount",
                type: "number",
                options: [
                  { value: "low-high", label: "Low to High" },
                  { value: "high-low", label: "High to Low" },
                ],
              },
              {
                label: "Charge per Service",
                key: "charge",
                type: "number",
                options: [
                  { value: "low-high", label: "Low to High" },
                  { value: "high-low", label: "High to Low" },
                ],
              },
              {
                label: "Sort by Date",
                key: "createdAt",
                type: "date",
                options: [
                  { value: "asc", label: "Oldest First" },
                  { value: "desc", label: "Newest First" },
                ],
              },
            ].map(({ label, key, options }) => (
              <div key={key} className="mb-2 sm:mb-4 border-t p-2 sm:p-4">
                <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                  {label}
                </h4>
                <Select
                  value={localSorts[key] || ""}
                  onChange={(e) =>
                    setLocalSorts((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {options.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </div>
            ))}

            {/* Reset All Button */}
            <div className="flex justify-end px-4 pb-4">
              <button
                onClick={resetSorts}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 font-semibold"
              >
                <MdRestartAlt className="text-lg" />
                Reset All
              </button>
            </div>
          </div>
        )}
        {type === "studio" && (
          <div className="border rounded-md shadow-sm">
            {[
              { label: "Studio Name", key: "name", type: "text" },
              { label: "Package Price", key: "packagePrice", type: "number" },
              { label: "Sort by Date", key: "createdAt", type: "date" },
              { label: "Location", key: "location", type: "text" },
            ].map(({ label, key, type }) => {
              const isPaymentField = key === "packagePrice";
              return (
                <div key={key} className="mb-2 sm:mb-4 border-b p-2 sm:p-4">
                  <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">
                    {label}
                  </h4>
                  <Select
                    value={localSorts[key] || ""}
                    onChange={(e) =>
                      setLocalSorts((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {isPaymentField ? (
                      <>
                        <option value="low-high">Low to High</option>
                        <option value="high-low">High to Low</option>
                      </>
                    ) : type === "text" ? (
                      <>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                      </>
                    ) : type === "date" ? (
                      <>
                        <option value="asc">Oldest First</option>
                        <option value="desc">Newest First</option>
                      </>
                    ) : null}
                  </Select>
                </div>
              );
            })}
            {/* Reset All Button */}
            <div className="flex justify-end px-4 pb-4">
              <button
                onClick={() => setLocalSorts({})}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 font-semibold"
              >
                <MdRestartAlt className="text-lg" />
                Reset All
              </button>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="sticky bottom-0 bg-white border-t px-2 sm:px-4 py-3 flex justify-between items-center z-10">
          <Button
            className="text-gray-600 text-xs sm:text-sm hover:text-gray-800 shadow-lg border border-black"
            onClick={() => setLocalSorts({})}
          >
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

export default ServiceCardSort;
