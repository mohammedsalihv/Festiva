import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ServicesCard from "@/reusable-components/user/Landing/ServiceCard";
import { getRentcars } from "@/api/user/services/userRentcarServices";
import { getCaters } from "@/api/user/services/userCatersServices";
import { getVenues } from "@/api/user/services/userVenueServices";
import { getStudios } from "@/api/user/services/userStudioServices";
import { useDispatch } from "react-redux";
import { setVenues } from "@/redux/Slice/user/userVenueSlice";
import { setRentCars } from "@/redux/Slice/user/userRentCarSlice";
import { setStudios } from "@/redux/Slice/user/userStudioSlice";
import { setCaters } from "@/redux/Slice/user/userCatersSlice";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const ServicesPage = () => {
  const { type } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assets, setAssets] = useState([]);
  const dispatch = useDispatch();
  const normalizedType = type?.toLowerCase();

  const fetchAssets = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      switch (normalizedType) {
        case "venue": {
          const venues = await getVenues();
          setAssets(venues);
          dispatch(setVenues(venues));
          break;
        }
        case "rentcar": {
          const rentcars = await getRentcars();
          setAssets(rentcars);
          dispatch(setRentCars(rentcars));
          break;
        }
        case "caters": {
          const caters = await getCaters();
          setAssets(caters);
          dispatch(setStudios(caters));
          break;
        }
        case "studio": {
          const studio = await getStudios();
          setAssets(studio);
          dispatch(setCaters(studio));
          break;
        }
        default:
          setAssets([]);
          setError("Invalid asset type.");
          toast.error("Invalid asset type.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch assets.");
        toast.error(err.response?.data?.message || "Request failed.");
      } else {
        setError("Unexpected error occurred.");
        toast.error("Unexpected error occurred.");
      }
      setAssets([]);
    } finally {
      setLoading(false);
    }
  }, [normalizedType, dispatch]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  if (loading) {
    return (
      <p className="text-center py-8 text-gray-500">
        <Loader />
      </p>
    );
  }

  return (
    <ServicesCard
      assets={assets}
      loading={loading}
      error={error}
      onRetry={fetchAssets}
    />
  );
};

export default ServicesPage;
