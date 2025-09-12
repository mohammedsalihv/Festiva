
import axios from "axios";
import CustomError from "../utils/baseUtilities/errors/CustomError";
import { statusCodes } from "../utils/baseUtilities/messages/constantResponses";

export const geocodeAddress = async (
  address: string
): Promise<{ lat: number; lng: number }> => {
  const encodedAddress = encodeURIComponent(address);
  const mapboxToken = process.env.MAPBOX_API_KEY;

  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}`
  );

  const [lng, lat] = response.data.features[0]?.center || [];

  if (!lat || !lng)
    throw new CustomError(
      "Unable to geocode location from Mapbox.",
      statusCodes.badRequest
    );

  return { lat, lng };
};
