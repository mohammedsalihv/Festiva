import React from "react";
import { ADMIN_ROUTES } from "@/utils/constants/routes/admin.routes";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminHosts from "@/pages/admin/AdminHosts";
import AdminServices from "@/pages/admin/assets/AdminAssets";
import LoaderPage from "@/reusable-components/Messages/LoaderPage";
import RequestedAsset from "@/pages/admin/assets/RequestedAsset";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path={ADMIN_ROUTES.adminPages.dashboard}
        element={
          <LoaderPage>
            <AdminDashboard />
          </LoaderPage>
        }
      />
      <Route
        path={ADMIN_ROUTES.adminPages.users}
        element={
          <LoaderPage>
            <AdminUsers />
          </LoaderPage>
        }
      />
      <Route
        path={ADMIN_ROUTES.adminPages.hosts}
        element={
          <LoaderPage>
            <AdminHosts />
          </LoaderPage>
        }
      />
      <Route
        path={ADMIN_ROUTES.adminPages.assets}
        element={
          <LoaderPage>
            <AdminServices />
          </LoaderPage>
        }
      />
      <Route
        path={ADMIN_ROUTES.adminPages.assetRequests}
        element={
          <LoaderPage>
            <RequestedAsset />
          </LoaderPage>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
