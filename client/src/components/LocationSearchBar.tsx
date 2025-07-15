import { useEffect, useRef } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

export default function LocationSearchBar({
  onLocationSelect,
}: {
  onLocationSelect: (loc: { lat: number; lng: number; name: string }) => void;
}) {
  const autocompleteRef = useRef<any>(null);

  useEffect(() => {
    const autocomplete = autocompleteRef.current;
    if (!autocomplete) return;

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
    <div className="relative w-full max-w-[300px]">
      <CiLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
      <gmpx-place-autocomplete
        ref={autocompleteRef}
        fields={["geometry", "formatted_address", "name"]}
        class="block w-full"
      >
        <input
          type="text"
          placeholder="Search location..."
          className="w-full pl-10 pr-10 py-1 rounded-lg text-sm border-none"
        />
      </gmpx-place-autocomplete>
      <button
        type="button"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-main_color text-white hover:bg-main_color_hover px-2 py-2 rounded z-10"
      >
        <FaSearch className="text-base" />
      </button>
    </div>
  );
}
