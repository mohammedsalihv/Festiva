import axios from "axios";

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
  const apiKey = process.env.MAPBOX_API_KEY;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${apiKey}`;

  const response = await axios.get(url);
  console.log("+++++", response.data);

  const result = response.data.features?.[0];

  if (!result || !result.geometry || !result.geometry.coordinates) {
    throw new Error("No geolocation found for the address.");
  }

  const [lng, lat] = result.geometry.coordinates;

  return { lat, lng };
}
