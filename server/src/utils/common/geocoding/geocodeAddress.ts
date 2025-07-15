import axios from "axios";

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  const response = await axios.get(url);
  const result = response.data.results[0];

  if (!result || !result.geometry) {
    throw new Error("No geolocation found for the address.");
  }

  return {
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng
  };
}
