import VenueDetails from "../../../pages/user/service/ServiceDetails/VenueDetails";
import StudioDetails from "../../../pages/user/service/ServiceDetails/StudioDetails";
import RentCarDetails from "../../../pages/user/service/ServiceDetails/RentCarDetails";
import CatersDetails from "../../../pages/user/service/ServiceDetails/CatersDetails";
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
