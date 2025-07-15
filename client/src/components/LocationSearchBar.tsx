import { useEffect, useRef } from "react";
import { Input } from "./Input";
import { CiLocationOn } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

export default function LocationSearchBar({
  onLocationSelect,
}: {
  onLocationSelect: (loc: { lat: number; lng: number; name: string }) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<PlaceAutocompleteElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    const autocomplete = autocompleteRef.current;

    if (!input || !autocomplete) return;

    autocomplete.inputElement = input;

    const handlePlaceSelect = () => {
      const place = autocomplete.getPlace();
      const location = place?.geometry?.location;

      if (location) {
        onLocationSelect({
          lat: location.lat(),
          lng: location.lng(),
          name: place.formatted_address || place.name || "",
        });
      }
    };

    autocomplete.addEventListener("gmpx-placechange", handlePlaceSelect);

    return () => {
      autocomplete.removeEventListener("gmpx-placechange", handlePlaceSelect);
    };
  }, [onLocationSelect]);

  return (
    <div>
      <div className="relative w-full max-w-[300px]">
        {/* Left Icon */}
        <CiLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />

        {/* Input Field */}
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search location..."
          className="w-full pl-10 pr-10 py-1 rounded-lg text-sm border-none"
        />

        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-main_color text-white hover:bg-main_color_hover px-2 py-1 rounded z-10 font-boldonse"
        >
          <FaSearch className="text-base" />
        </button>

        {/* Google Autocomplete Element */}
        <gmpx-place-autocomplete
          ref={autocompleteRef}
          fields={["geometry", "formatted_address", "name"]}
        ></gmpx-place-autocomplete>
      </div>
    </div>
  );
}
