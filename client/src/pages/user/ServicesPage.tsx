import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServicesCard from "@/reusable-components/user/Landing/ServiceCard";
import { getRentcars, getVenues } from "@/api/user/userService";
import { useDispatch } from "react-redux";
import { setVenues } from "@/redux/Slice/user/userVenueSlice";
import { setRentCars } from "@/redux/Slice/user/userRentCarSlice";
import { toast } from "react-toastify";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";

const ServicesPage = () => {
  const { type } = useParams();
  const [assets, setAssets] = useState([]);
  const dispatch = useDispatch();
  const normalizedType = type?.toLowerCase();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        switch (normalizedType) {
          case "venue": {
            const venues = await getVenues();
            setAssets(venues);
            dispatch(setVenues(venues));
            console.log(venues);
            break;
          }
          case "rentcar": {
            const rentcars = await getRentcars();
            setAssets(rentcars);
            dispatch(setRentCars(rentcars));
            console.log(rentcars);
            break;
          }
          default:
            toast.error("Please check the asset type");
        }
      } catch (error) {
        console.error("Error loading assets:", error);
        setAssets([]);
      }
    };

    fetchAssets();
  }, [normalizedType, dispatch]);
  <CustomToastContainer />;
  return <ServicesCard assets={assets} />;
};

export default ServicesPage;
