import { LoadScript } from "@react-google-maps/api";

const libraries: ("places" | "core")[] = ["places", "core"];

export const GoogleMapsWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
      version="beta"
    >
      {children}
    </LoadScript>
  );
};