import VenueDetails from "@/pages/user/service/serviceDetails/VenueDetails";
import StudioDetails from "@/pages/user/service/serviceDetails/StudioDetails";
import RentCarDetails from "@/pages/user/service/serviceDetails/RentCarDetails";
import CatersDetails from "@/pages/user/service/serviceDetails/CatersDetails";
import { IAsset } from "@/utils/Types/user/commonDetails";

export interface serviceDetailsHelperProps {
  data: IAsset;
}

const ServiceDetailsHelper: React.FC<serviceDetailsHelperProps> = ({
  data,
}) => {
  switch (data.typeOfAsset) {
    case "venue":
      return <VenueDetails data={data} />;
    case "rentcar":
      return <RentCarDetails data={data} />;
    case "caters":
      return <CatersDetails data={data} />;
    case "studio":
      return <StudioDetails data={data} />;
    default:
      return <div>Unknown service type</div>;
  }
};

export default ServiceDetailsHelper;
