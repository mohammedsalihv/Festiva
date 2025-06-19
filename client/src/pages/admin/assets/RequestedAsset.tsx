import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import VenueRequestView from "./VenueRequestView";
import RentCarRequestView from "./RentCarRequestView";
import StudioRequestView from "./StudioRequestView";
import CatersRequestView from "./CatersRequestView";
import { IVenue } from "@/utils/Types/admin/assetManagement/IVenue";
import { IRentCar } from "@/utils/Types/admin/assetManagement/IRentCar";
import { ICaters } from "@/utils/Types/admin/assetManagement/ICaters";
import { IStudio } from "@/utils/Types/admin/assetManagement/IStudio";

const RequestedAsset = () => {
  const requestedAsset = useSelector(
    (state: RootState) => state.asset.singleAsset
  );

  if (!requestedAsset) return <div>Asset details not found</div>;

  switch (requestedAsset.typeOfAsset) {
    case "venue":
      return <VenueRequestView data={requestedAsset as IVenue} />;
    case "car":
      return <RentCarRequestView data={requestedAsset as IRentCar} />;
    case "studio":
      return <StudioRequestView data={requestedAsset as IStudio} />;
    case "caters":
      return <CatersRequestView data={requestedAsset as ICaters} />;
    default:
      return <div>Unsupported asset type</div>;
  }
};

export default RequestedAsset;
