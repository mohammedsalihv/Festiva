import { useEffect } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useDispatch } from "react-redux";
import { setFilters } from "@/redux/Slice/user/assetSearchSlice";

export default function useMapboxGeocoder({
  containerRef,
  filters,
  setGeocoderResult,
  setSelectedLocation,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  filters: Record<string, any>;
  setGeocoderResult: (val: any) => void;
  setSelectedLocation: (val: any) => void;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!containerRef.current) return;

    const geocoder = new MapboxGeocoder({
      accessToken: import.meta.env.VITE_MAPBOX_API_KEY,
      types: "place,locality,neighborhood,address",
      placeholder: "Search location...",
      container: containerRef.current,
    } as any);

    geocoder.on("result", (e) => {
      setGeocoderResult({
        text: e.result.text,
        geometry: e.result.geometry,
      });
    });

    geocoder.on("clear", () => {
      setSelectedLocation(null);
      setGeocoderResult(null);
      const { lat, lng, radius, ...rest } = filters;
      dispatch(setFilters(rest));
    });

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [containerRef, filters, dispatch]);
}
