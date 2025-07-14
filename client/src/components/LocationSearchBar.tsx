import { useRef, useEffect } from "react";

export default function LocationSearchBar({
  onLocationSelect,
}: {
  onLocationSelect: (loc: { lat: number; lng: number; name: string }) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (window.google && inputRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(
        inputRef.current
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        const geometry = place.geometry;
        const location = geometry?.location;
        if (!geometry || !location) return;

        onLocationSelect({
          lat: location.lat(),
          lng: location.lng(),
          name: place.formatted_address || place.name || "",
        });
      });
    }
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search location..."
      className="w-full p-2 border rounded"
    />
  );
}
