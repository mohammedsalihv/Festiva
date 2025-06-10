import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import VenueRequestView from "./VenueRequestView";
import RentCarRequestView from "./RentCarRequestView";
import StudioRequestView from "./StudioRequestView";
import CatersRequestView from "./CatersRequestView";

const RequestedAsset = () => {
  const requestedAsset = useSelector(
    (state: RootState) => state.asset.assetDetails
  );

  if (!requestedAsset) return <div>Asset details not found</div>;

  const { typeOfAsset } = requestedAsset;

  switch (typeOfAsset) {
    case "venue":
      return <VenueRequestView data={requestedAsset} />;
    case "car":
      return <RentCarRequestView data={requestedAsset} />;
    case "studio":
      return <StudioRequestView data={requestedAsset} />;
    case "caters":
      return <CatersRequestView data={requestedAsset} />;
    default:
      return <div>Unsupported asset type</div>;
  }
};

export default RequestedAsset;
