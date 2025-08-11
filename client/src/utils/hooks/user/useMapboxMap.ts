
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

export default function useMapboxMap({
  mapContainerRef,
  selectedLocation,
  assets,
}: {
  mapContainerRef: React.RefObject<HTMLDivElement>;
  selectedLocation: { label: string; lat: number; lng: number } | null;
  assets: any[];
}) {
  useEffect(() => {
    if (!mapContainerRef.current || !selectedLocation) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [selectedLocation.lng, selectedLocation.lat],
      zoom: 12,
    });

    new mapboxgl.Marker({ color: "#FF0000" })
      .setLngLat([selectedLocation.lng, selectedLocation.lat])
      .setPopup(new mapboxgl.Popup().setText(selectedLocation.label))
      .addTo(map);

    // Other assets
    assets.forEach((asset) => {
      if (asset.location?.lng && asset.location?.lat) {
        new mapboxgl.Marker()
          .setLngLat([asset.location.lng, asset.location.lat])
          .setPopup(new mapboxgl.Popup().setText(asset.name || "Service"))
          .addTo(map);
      }
    });

    return () => map.remove();
  }, [mapContainerRef, selectedLocation, assets]);
}
