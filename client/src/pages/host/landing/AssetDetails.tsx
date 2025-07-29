import { Images } from "@/assets";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineRefresh } from "react-icons/md";

const cn = (...classes: (string | boolean | undefined)[]): string =>
  classes.filter(Boolean).join(" ");

interface assetDetailsLocationInfo {
  city?: string;
  country?: string;
}

interface assetDetailsHostInfo {
  name?: string;
}

interface IVenue {
  _id?: string;
  venueName?: string;
  rent?: number;
  capacity?: number;
  shift?: string;
  squareFeet?: number;
  timeSlots?: string[];
  availableDates?: string[];
  about?: string;
  features: string[];
  parkingFeatures: string[];
  description?: string;
  terms: string;
  Images: string[];
  status?: string;
  typeOfAsset: string;
  location: assetDetailsLocationInfo;
  host: assetDetailsHostInfo;
}

interface IStudio {
  _id: string;
  studioName: string;
  packages: {
    packageName: string;
    payment: string;
    packageIncludes?: string[];
    manPower: string;
    equipments: string[];
    deliveryTime: string;
    validity: string;
  }[];
  timeSlots: string[];
  availableDates: string[];
  serviceFeatures: string[];
  terms: string;
  description: string;
  about: string;
  Images: string[];
  status?: string;
  typeOfAsset: string;
  location?: assetDetailsLocationInfo;
  host?: assetDetailsHostInfo;
}

interface IRentCar {
  _id: string;
  businessName?: string;
  carName?: string;
  rent?: string;
  make?: string;
  model?: string;
  timeSlots?: string[];
  availableDates?: string[];
  color?: string;
  fuel?: string;
  transmission?: string;
  seats?: string;
  deposite?: string;
  carFeatures?: string[];
  additionalFeatures?: string[];
  termsOfUse?: string[];
  about?: string;
  description?: string;
  guidelines: string;
  userDocument: string;
  Images: string[];
  status?: string;
  typeOfAsset: string;
  location: assetDetailsLocationInfo;
  host: assetDetailsHostInfo;
}

interface ICaters {
  _id: string;
  catersName?: string;
  manpower: string;
  charge: string;
  totalAmount: string;
  timeSlots?: string[];
  availableDates?: string[];
  description?: string;
  features?: string[];
  serviceTypes?: string[];
  terms?: string;
  conditions?: string;
  about: string;
  Images: string[];
  status?: string;
  typeOfAsset: string;
  location: assetDetailsLocationInfo;
  host: assetDetailsHostInfo;
}

type Asset = IVenue | IStudio | IRentCar | ICaters;

// Mock data
const mockVenue: IVenue = {
  typeOfAsset: "venue",
  venueName: "Grand Convention Hall",
  rent: 1000,
  capacity: 300,
  shift: "Evening",
  squareFeet: 5000,
  timeSlots: ["Morning", "Evening"],
  availableDates: ["2025-08-01", "2025-08-02"],
  about:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary",
  features: ["Stage", "Sound System", "Projector"],
  parkingFeatures: ["Valet Parking", "200 Parking Spaces"],
  description:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary",
  terms:
    "professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance",
  Images: [
    Images.landing_venue,
    Images.convention_space,
    Images.conventionCenter_service,
  ],
  status: "Available",
  location: { city: "Jakarta", country: "Indonesia" },
  host: { name: "John Doe" },
};

const mockStudio: IStudio = {
  typeOfAsset: "studio",
  _id: "studio123",
  studioName: "Creative Studio Pro",
  packages: [
    {
      packageName: "Basic Package",
      payment: "$200",
      packageIncludes: ["Photography", "Basic Editing"],
      manPower: "2 staff",
      equipments: ["Camera", "Lighting", "Tripod"],
      deliveryTime: "2 days",
      validity: "1 month",
    },
    {
      packageName: "Premium Package",
      payment: "$500",
      packageIncludes: ["Photography", "Video", "Advanced Editing"],
      manPower: "4 staff",
      equipments: ["Camera", "Lighting", "Drone"],
      deliveryTime: "5 days",
      validity: "3 months",
    },
  ],
  timeSlots: ["Morning", "Afternoon"],
  availableDates: ["2025-08-03", "2025-08-04"],
  serviceFeatures: ["High-quality equipment", "Professional staff"],
  terms:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary",
  description:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary",
  about: "A state-of-the-art studio for creative projects",
  Images: [Images.studio_service, Images.event_space],
  status: "Available",
  location: { city: "Jakarta", country: "Indonesia" },
  host: { name: "Jane Doe" },
};

const mockCar: IRentCar = {
  typeOfAsset: "car",
  _id: "car123",
  carName: "Innova",
  rent: "$50/day",
  make: "Toyota",
  model: "Camry",
  timeSlots: ["Full Day"],
  availableDates: ["2025-08-05", "2025-08-06"],
  color: "Black",
  fuel: "Petrol",
  transmission: "Automatic",
  seats: "5",
  deposite: "$100",
  carFeatures: ["Air Conditioning", "GPS", "Bluetooth"],
  additionalFeatures: ["Child Seat Available"],
  termsOfUse: ["No smoking", "Return with full tank"],
  about:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary",
  description:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary",
  guidelines: "Valid driver’s license required",
  userDocument: "Driver’s License, ID Proof",
  Images: [Images.carRent_sub, Images.rentCar_service],
  status: "Available",
  location: { city: "Jakarta", country: "Indonesia" },
  host: { name: "Bob Smith" },
};

const mockCaters: ICaters = {
  typeOfAsset: "caters",
  _id: "caters123",
  catersName: "Delicious Catering Co.",
  manpower: "10 staff",
  charge: "$20/person",
  totalAmount: "$2000",
  timeSlots: ["Lunch", "Dinner"],
  availableDates: ["2025-08-07", "2025-08-08"],
  description:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary",
  features: ["Vegan Options", "Gluten-Free Options"],
  serviceTypes: ["Buffet", "Plated Service"],
  terms:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary",
  conditions:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary",
  about: "Catering for all types of events",
  Images: [Images.cater_service, Images.event_space],
  status: "Available",
  location: { city: "Jakarta", country: "Indonesia" },
  host: { name: "Alice Johnson" },
};

// Mock assets array for tabs
const mockAssets: { [key: string]: Asset } = {
  venue: mockVenue,
  studio: mockStudio,
  car: mockCar,
  caters: mockCaters,
};

interface AssetDetailsProps {
  initialAsset?: Asset;
}

export const AssetDetails = ({
  initialAsset = mockVenue,
}: AssetDetailsProps) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset>(initialAsset);

  useEffect(() => {
    
  },[])

  if (!selectedAsset) {
    return (
      <div className="text-center text-red-500">Asset data is missing</div>
    );
  }

  if (
    !["venue", "studio", "car", "caters"].includes(selectedAsset.typeOfAsset)
  ) {
    return <div className="text-center text-red-500">Invalid asset type</div>;
  }

  const assetType = selectedAsset.typeOfAsset;

  const getTitle = () => {
    switch (assetType) {
      case "venue":
        return (selectedAsset as IVenue).venueName || "Venue";
      case "studio":
        return (selectedAsset as IStudio).studioName || "Studio";
      case "car":
        return (selectedAsset as IRentCar).carName || "Car";
      case "caters":
        return (selectedAsset as ICaters).catersName || "Catering Service";
      default:
        return "Asset";
    }
  };

  const getPrice = () => {
    switch (assetType) {
      case "venue":
        return (selectedAsset as IVenue).rent
          ? `$${selectedAsset.status}`
          : "N/A";
      case "studio":
        return (selectedAsset as IStudio).packages[0]?.payment || "N/A";
      case "car":
        return (selectedAsset as IRentCar).rent || "N/A";
      case "caters":
        return (selectedAsset as ICaters).totalAmount || "N/A";
      default:
        return "N/A";
    }
  };

  const getSelectableOptions = () => {
    if (assetType === "car") {
      const car = selectedAsset as IRentCar;

      return [
        {
          label: "Car name",
          options: [car.carName || "N/A"],
        },
        {
          label: "Model",
          options: [car.model || "N/A"],
        },
        {
          label: "Make",
          options: [car.make || "N/A"],
        },
        {
          label: "Fuel",
          options: [car.fuel || "N/A"],
        },
        {
          label: "Color",
          options: [car.color || "N/A"],
        },
        {
          label: "Transmission",
          options: [car.transmission || "N/A"],
        },
        {
          label: "Seats",
          options: [car.seats || "N/A"], // <-- FIXED here
        },
      ];
    }
    return null;
  };

  // 1) Type the return
  const getFeatures = (): { primary: string[]; secondary: string[] } => {
    switch (assetType) {
      case "venue":
        return {
          primary: (selectedAsset as IVenue).features || [],
          secondary: (selectedAsset as IVenue).parkingFeatures || [],
        };
      case "studio":
        return {
          primary: (selectedAsset as IStudio).serviceFeatures || [],
          secondary: [],
        };
      case "car":
        return {
          primary: (selectedAsset as IRentCar).carFeatures || [],
          secondary: (selectedAsset as IRentCar).additionalFeatures || [],
        };
      case "caters":
        return {
          primary: (selectedAsset as ICaters).features || [],
          secondary: (selectedAsset as ICaters).serviceTypes || [],
        };
      default:
        return { primary: [], secondary: [] };
    }
  };

  const { primary, secondary } = getFeatures();
  const options = getSelectableOptions();

  return (
    <div className="w-full px-4 sm:px-12 md:px-20 mx-auto py-3 font-poppins">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        {Object.keys(mockAssets).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedAsset(mockAssets[type])}
            className={cn(
              "px-4 py-2 text-sm font-medium",
              selectedAsset.typeOfAsset === type
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            )}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left - Image section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2">
          {Array.isArray(selectedAsset.Images) &&
          selectedAsset.Images.length > 0 ? (
            selectedAsset.Images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Asset Image ${i}`}
                className="w-full aspect-square object-cover rounded-lg border"
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No images available
            </p>
          )}
        </div>

        {/* Right - Details section */}
        <div className="flex flex-col gap-1 md:gap-1.5">
          {/* Title and Status Row */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-base sm:text-lg md:text-2xl font-semibold text-gray-800 m-0 p-0 leading-tight">
                {getTitle()}
              </h2>
              {selectedAsset.location && (
                <p className="flex items-center gap-2 text-gray-500 text-[14px] sm:text-sm md:text-base mt-2">
                  <MdOutlineLocationOn className="w-5 h-5" />
                  <strong className="text-black text-[11px] sm:text-sm md:text-lg">
                    House No 12B, Negugaya, Road, Mattuppetty, Ernakalum ,
                    Kerala - India
                  </strong>
                </p>
              )}
            </div>

            <div className="flex flex-col items-end">
              <span className="text-xs sm:text-sm md:text-base md:px-3 py-1 rounded-full text-blue-500">
                20-02-2025 12:35 PM
              </span>
              <span className="text-xs sm:text-sm md:text-base px-2 md:px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-300 mt-1">
                Pending
              </span>
            </div>
          </div>
          {assetType === "studio" && (
            <div className="space-y-4 mb-3">
              <p className="text-sm sm:text-sm md:text-base font-bold text-black font-sans">
                Packages:
              </p>

              {(selectedAsset as IStudio).packages.map((pkg, index) => (
                <div
                  key={index}
                  className="px-1 py-2 md:py-3 md:px-5 border rounded-xl shadow-sm bg-gray-50 space-y-3"
                >
                  <p className="text-base font-semibold text-black">
                    {pkg.packageName}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1 text-sm text-gray-700">
                    <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                      💰 <span className="font-medium">Payment:</span>{" "}
                      <span className="text-black text-xs sm:text-sm md:text-lg">
                        {pkg.payment}
                      </span>
                    </p>
                    <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                      🧍 <span className="font-medium">Manpower:</span>{" "}
                      <span className="text-black text-xs sm:text-sm md:text-lg">
                        {pkg.manPower}
                      </span>
                    </p>
                    <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                      ⏱️ <span className="font-medium">Delivery:</span>{" "}
                      <span className="text-black text-xs sm:text-sm md:text-lg">
                        {pkg.deliveryTime}
                      </span>
                    </p>
                    <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                      📅 <span className="font-medium">Validity:</span>{" "}
                      <span className="text-black text-xs sm:text-sm md:text-lg">
                        {pkg.validity}
                      </span>
                    </p>
                  </div>

                  {Array.isArray(pkg.packageIncludes) &&
                    pkg.packageIncludes.length > 0 && (
                      <div>
                        <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                          Includes:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {pkg.packageIncludes.map((item, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-black text-white rounded text-xs sm:text-sm md:text-lg"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {Array.isArray(pkg.equipments) &&
                    pkg.equipments.length > 0 && (
                      <div>
                        <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                          Equipments:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {pkg.equipments.map((item, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-white border border-black rounded text-xs sm:text-sm md:text-lg"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}

          {options && (
            <div className="mb-2">
              <p className="text-sm sm:text-sm md:text-base font-bold text-black font-sans mb-2">
                Car details:
              </p>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
                {(Array.isArray(options) ? options : [options]).map(
                  (group, groupIdx) => (
                    <div key={groupIdx} className="space-y-2">
                      <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                        {group.label}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {group.options.map((option, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs sm:text-sm md:text-base bg-black text-white rounded border border-black whitespace-nowrap"
                          >
                            {option}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <div>
            <p className="text-sm sm:text-sm md:text-base font-bold mb-1 text-black font-sans">
              Details:
            </p>
            <div className="text-sm text-gray-700">
              <div className="flex items-center gap-1 text-sm sm:text-base md:text-base">
                <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                  Amount :{" "}
                </p>
                2000/-
                {getPrice()}
              </div>
              {selectedAsset.availableDates && (
                <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                  Available Dates: {"  "}
                  <strong className="text-black text-xs sm:text-sm md:text-lg">
                    {selectedAsset.availableDates.join(", ") || "N/A"}
                  </strong>
                </p>
              )}
              {selectedAsset.timeSlots && (
                <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                  Time Slots: {"  "}
                  <strong className="text-black text-xs sm:text-sm md:text-lg">
                    {selectedAsset.timeSlots.join(", ") || "N/A"}
                  </strong>
                </p>
              )}
              {assetType === "venue" && (selectedAsset as IVenue).capacity && (
                <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                  Capacity:{" "}
                  <strong className="text-black text-xs sm:text-sm md:text-lg">
                    {(selectedAsset as IVenue).capacity} people
                  </strong>
                </p>
              )}
              {assetType === "venue" && (selectedAsset as IVenue).shift && (
                <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                  Shift type:{" "}
                  <strong className="text-black text-xs sm:text-sm md:text-lg">
                    {(selectedAsset as IVenue).shift}
                  </strong>
                </p>
              )}
              {assetType === "venue" &&
                (selectedAsset as IVenue).squareFeet && (
                  <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                    Square feet:{" "}
                    <strong className="text-black text-xs sm:text-sm md:text-lg">
                      {(selectedAsset as IVenue).squareFeet}
                    </strong>
                  </p>
                )}
            </div>

            {assetType === "car" && (
              <div className="py-2">
                <p className="text-sm sm:text-sm md:text-base font-bold mb-1 text-black font-sans">
                  Details:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3">
                  <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                    Required Docs:{" "}
                    <strong className="text-black text-xs sm:text-sm md:text-lg">
                      Licence
                    </strong>
                  </p>
                  <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                    Deposite amount:{" "}
                    <strong className="text-black text-xs sm:text-sm md:text-lg">
                      500
                    </strong>
                  </p>
                </div>
              </div>
            )}
            {assetType === "caters" && (selectedAsset as ICaters).manpower && (
              <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                Manpower:{" "}
                <strong className="text-black text-xs sm:text-sm md:text-lg">
                  {(selectedAsset as ICaters).manpower}
                </strong>
              </p>
            )}
            {assetType === "caters" && (selectedAsset as ICaters).charge && (
              <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                Per charge:{" "}
                <strong className="text-black text-xs sm:text-sm md:text-lg">
                  {(selectedAsset as ICaters).charge}
                </strong>
              </p>
            )}
          </div>
          {(primary.length > 0 || secondary.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {primary.length > 0 && (
                <div>
                  <p className="text-sm sm:text-sm md:text-base font-bold mb-1 text-black font-sans">
                    {assetType === "venue"
                      ? "Space features"
                      : assetType === "car"
                      ? "Car features"
                      : assetType === "caters"
                      ? "Features"
                      : "Service features"}
                  </p>
                  <ul className="list-disc pl-5 text-black text-xs sm:text-sm md:text-lg space-y-1">
                    {primary.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {secondary.length > 0 && (
                <div>
                  <p className="text-sm sm:text-sm md:text-base font-bold mb-1 text-black font-sans">
                    {assetType === "venue"
                      ? "Parking features"
                      : assetType === "car"
                      ? "Additional features"
                      : assetType === "caters"
                      ? "Available features"
                      : "Other features"}
                  </p>
                  <ul className="list-disc pl-5 text-black text-xs sm:text-sm md:text-lg space-y-1">
                    {secondary.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div>
            <p className="text-sm sm:text-sm md:text-base font-bold mb-1 text-black font-sans">
              Description:
            </p>
            <p className="text-black text-xs sm:text-sm md:text-lg">
              {selectedAsset.description}
            </p>
          </div>
          {selectedAsset.about && (
            <div>
              <p className="text-sm sm:text-sm md:text-base font-bold mb-1 text-black font-sans">
                About:
              </p>
              <p className="text-black text-xs sm:text-sm md:text-lg">
                {selectedAsset.about}
              </p>
            </div>
          )}
          {"terms" in selectedAsset && selectedAsset.terms && (
            <div>
              <p className="text-sm sm:text-sm md:text-base mb-1 text-black font-sans font-bold">
                Terms:
              </p>
              <p className="text-black text-xs sm:text-sm md:text-lg">
                {selectedAsset.terms}
              </p>
            </div>
          )}
          {"conditions" in selectedAsset && selectedAsset.conditions && (
            <div>
              <p className="text-sm sm:text-sm md:text-base mb-1 text-black font-sans font-bold">
                Conditions:
              </p>
              <p className="text-black text-xs sm:text-sm md:text-lg">
                {selectedAsset.conditions}
              </p>
            </div>
          )}
          {"termsOfUse" in selectedAsset &&
            Array.isArray(selectedAsset.termsOfUse) &&
            selectedAsset.termsOfUse.length > 0 && (
              <div>
                <p className="text-sm sm:text-sm md:text-base mb-1 text-black font-sans font-bold">
                  Terms of use:
                </p>
                <ul className="list-disc ml-5 text-black text-xs sm:text-sm md:text-lg">
                  {selectedAsset.termsOfUse.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            )}
          {"serviceTypes" in selectedAsset &&
            Array.isArray(selectedAsset.serviceTypes) &&
            selectedAsset.serviceTypes.length > 0 && (
              <div>
                <p className="text-sm sm:text-sm md:text-base mb-1 text-black font-sans font-bold">
                  Service types:
                </p>
                <ul className="list-disc ml-5 text-black text-xs sm:text-sm md:text-lg">
                  {selectedAsset.serviceTypes.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            )}

          {"guidelines" in selectedAsset && selectedAsset.guidelines && (
            <div>
              <p className="text-sm sm:text-sm md:text-base mb-1 text-black font-sans font-bold">
                Guidelines:
              </p>
              <p className="text-black text-xs sm:text-sm md:text-lg">
                {selectedAsset.guidelines}
              </p>
            </div>
          )}
          <div className="grid grid-cols-3 gap-2">
            <Button className="py-3 text-sm md:text-base mt-4 md:py-6 w-full md:w-auto bg-red-600 text-white font-poppins hover:bg-red-500">
              Delete
            </Button>
            <Button className="py-3 text-sm md:text-base mt-4 md:py-6 w-full md:w-auto bg-blue-600 text-white font-poppins hover:bg-blue-500">
              Un-Avaialable
            </Button>
            <Button className="mt-4  text-sm md:text-base md:py-6 w-full md:w-auto flex items-center gap-1 justify-center bg-black hover:bg-slate-800 text-white font-poppins">
              <MdOutlineRefresh className="w-5 h-5" />
              Re-Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
