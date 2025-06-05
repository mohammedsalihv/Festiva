import SwitchTabs from "@/components/SwitchTabs";
import AdminLayout from "@/reusable-components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { tabOptions } from "@/utils/Options/admin/adminService";
import { Assets } from "@/api/admin/serviceManagement.services";
import { AssetsCard } from "@/components/AssetCard";
import { Images } from "@/assets";

const AdminServices = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  const listAssets = async (selectedTab: string) => {
    try {
      const response = await Assets(selectedTab);
      setAssets(response);
    } catch (err) {
      console.error(`Error fetching ${selectedTab}`, err);
      setAssets([]);
    } finally {
      setLoading(false);
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
        <div className="mt-4 overflow-y-auto pb-10 px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-7 px-4">
            {[...Array(8)].map((_, i) => (
              <AssetsCard
                key={i}
                title="Seamless Transactions"
                subtitle="Endless Possibilities"
                imageSrc={Images.business_space}
                logoSrc="/assets/alinma-logo.png"
                bookmarked={true}
                showPagination={true}
              />
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
