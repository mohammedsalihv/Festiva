import SwitchTabs from "@/components/SwitchTabs";
import { useEffect, useState } from "react";
import { tabOptions } from "@/utils/Options/admin/adminService";
import {
  allAssets,
  singleAssetDetails,
} from "@/api/admin/assetManagement.services";
import { AssetsCard } from "@/components/AssetCard";
import { useDispatch } from "react-redux";
import { setSingleAssetDetails } from "@/redux/Slice/admin/assetManagementSlice";
import { useNavigate } from "react-router-dom";
import { normalizeAssetData } from "@/utils/Types/admin/assetManagement/commonAssets";
import { Images } from "@/assets";

const AdminServices = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listAssets = async (selectedTab: string) => {
    setLoading(true);
    try {
      const response = await allAssets(selectedTab);
      console.log(response);
      setAssets(response);
    } catch (err) {
      console.error(`Error fetching ${selectedTab}`, err);
      setAssets([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFullAssetDetails = async (id: string, typeOfAsset: string) => {
    try {
      const assetFullDetails = await singleAssetDetails(id, typeOfAsset);
      dispatch(setSingleAssetDetails(assetFullDetails));
      navigate("/admin/asset/request");
    } catch (err) {
      console.error("Failed to fetch full asset details:", err);
    }
  };

  useEffect(() => {
    listAssets(selectedTab);
  }, [selectedTab]);

  return (
    <div className="flex flex-col bg-main_white rounded-md font-prompt overflow-hidden w-full h-full">
      <h2 className="text-lg md:text-xl font-semibold mt-5 px-6 py-3">
        Assets
      </h2>
      <div className="px-4 pt-4">
        <SwitchTabs
          options={tabOptions}
          value={selectedTab}
          onChange={setSelectedTab}
        />
      </div>
      <div className="mt-4 overflow-y-auto pb-10 px-6">
        {loading ? (
          <div className="text-center py-10">Loading assets...</div>
        ) : assets.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No assets found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 px-4">
            {assets.map((asset: any) => {
              const { name, image, hostName } = normalizeAssetData(asset);
              return (
                <AssetsCard
                  id={asset._id}
                  key={asset._id}
                  name={name}
                  status={asset.status}
                  host={hostName}
                  reqDate={asset.createdAt}
                  imageSrc={image ? image : Images.imageNA}
                  bookmarked={true}
                  showPagination={true}
                  fulldata={(id) =>
                    fetchFullAssetDetails(id, asset.typeOfAsset)
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminServices;
