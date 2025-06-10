import SwitchTabs from "@/components/SwitchTabs";
import AdminLayout from "@/reusable-components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { tabOptions } from "@/utils/Options/admin/adminService";
import { Assets, assetDetails } from "@/api/admin/assetManagement.services";
import { AssetsCard } from "@/components/AssetCard";
import { Images } from "@/assets";
import { useDispatch } from "react-redux";
import { setAssetDetails } from "@/redux/Slice/admin/assetManagementSlice";
import { useNavigate } from "react-router-dom";

const AdminServices = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listAssets = async (selectedTab: string) => {
    setLoading(true);
    try {
      const response = await Assets(selectedTab);
      setAssets(response);
      console.log(response);
    } catch (err) {
      console.error(`Error fetching ${selectedTab}`, err);
      setAssets([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFullAssetDetails = async (id: string, typeOfAsset: string) => {
    try {
      const assetFullDetails = await assetDetails(id, typeOfAsset);
      dispatch(setAssetDetails(assetFullDetails));
      navigate("/admin/asset/request");
    } catch (err) {
      console.error("Failed to fetch full asset details:", err);
    }
  };

  useEffect(() => {
    listAssets(selectedTab);
  }, [selectedTab]);

  return (
    <AdminLayout>
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
              {assets.map((asset: any) => (
                <AssetsCard
                  key={asset._id}
                  title={asset.venueName}
                  status={asset.status}
                  host={asset.host.name}
                  reqDate={asset.createdAt}
                  imageSrc={
                    asset.venueImages?.[0]
                      ? `${import.meta.env.VITE_PROFILE_URL}${
                          asset.venueImages?.[0]
                        }`
                      : Images.imageNA
                  }
                  bookmarked={true}
                  showPagination={true}
                  id={asset._id}
                  fulldata={(id) =>
                    fetchFullAssetDetails(id, asset.typeOfAsset)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
