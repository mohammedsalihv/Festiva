import axios from "axios";

const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export const getPlaceSuggestions = async (query: string) => {
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
    query
  )}&limit=5&apiKey=${GEOAPIFY_KEY}`;
  const response = await axios.get(url);
  return response.data.features;
};
