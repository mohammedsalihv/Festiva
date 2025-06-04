import SwitchTabs from "@/components/SwitchTabs";
import AdminLayout from "@/reusable-components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { tabOptions } from "@/utils/Options/admin/AdminService";
import { Assets } from "@/api/admin/serviceManagement.services";
import { AssetsCard } from "@/components/AssetCard";

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
      <div className="flex flex-col md:flex-row h-screen bg-main_white rounded-md font-prompt">
        <div className="transition-all duration-300 overflow-hidden p-4 w-full">
          <SwitchTabs
            options={tabOptions}
            value={selectedTab}
            onChange={setSelectedTab}
          />
          <AssetsCard
            title="Seamless Transactions,"
            subtitle="Endless Possibilities"
            imageSrc="/assets/card1.jpg"
            logoSrc="/assets/alinma-logo.png"
            bookmarked={true}
            showPagination={true}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminServices;
