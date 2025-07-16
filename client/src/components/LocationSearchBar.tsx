import React, { useEffect } from "react";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";


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
  useEffect(() => {
    const clearButton = document.querySelector(".geoapify-close-button");
    if (clearButton) {
      clearButton.style.display = "none";
    }
  }, []);

  return (
    <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_API_KEY}>
      <div className="relative w-full cursor-pointer flex items-center">
        <div className="w-full pl-10 pr-3 py-2">
          <GeoapifyGeocoderAutocomplete
            placeholder="Search location..."
            skipIcons={true}
            placeSelect={(value) => {
              if (value?.properties?.lat && value?.properties?.lon) {
                onLocationSelect({
                  lat: value.properties.lat,
                  lng: value.properties.lon,
                  label: value.properties.formatted,
                });
              }
            }}
            inputClassName="w-full text-sm bg-transparent"
          />
        </div>
      </div>
    </GeoapifyContext>
  );
};

export default LocationSearchBar;