import VenueDetails from "./VenueDetails";
import StudioDetails from "./StudioDetails";
import RentCarDetails from "./RentCarDetails";
import CatersDetails from "./CatersDetails";
import { IAsset } from "@/utils/Types/user/commonDetails";

export interface serviceDetailsProps {
  data: IAsset;
}

const ServiceDetails: React.FC<serviceDetailsProps> = ({ data }) => {
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

export default ServiceDetails;
