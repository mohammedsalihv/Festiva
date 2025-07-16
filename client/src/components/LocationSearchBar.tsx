import React, { useEffect } from "react";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import { FaLocationArrow } from "react-icons/fa";

type Location = {
  lat: number;
  lng: number;
  label: string;
};

interface LocationSearchBarProps {
  onLocationSelect: (location: Location) => void;
}

const LocationSearchBar: React.FC<LocationSearchBarProps> = ({
  onLocationSelect,
}) => {
  // Optional: JavaScript fallback to hide the clear icon
  useEffect(() => {
    const clearButton = document.querySelector(".geoapify-close-button");
    if (clearButton) {
      clearButton.style.display = "none";
    }
  }, []);

  return (
    <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_API_KEY}>
      <div className="relative w-full max-w-[300px] flex items-center">
        {/* Location Icon */}
        <FaLocationArrow className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none" />
        {/* Input Wrapper */}
        <div className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md">
          <GeoapifyGeocoderAutocomplete
            placeholder="Search location..."
            skipIcons={true} // Attempt to suppress Geoapify icons
            placeSelect={(value) => {
              if (value?.properties?.lat && value?.properties?.lon) {
                onLocationSelect({
                  lat: value.properties.lat,
                  lng: value.properties.lon,
                  label: value.properties.formatted,
                });
              }
            }}
            inputClassName="w-full text-sm focus:outline-none bg-transparent"
          />
        </div>
      </div>
    </GeoapifyContext>
  );
};

export default LocationSearchBar;