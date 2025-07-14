import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

export const MapWithMarker = ({
  location,
}: {
  location: { lat: number; lng: number };
}) => {
  <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={14}>
    <Marker position={location} />
  </GoogleMap>;
};
