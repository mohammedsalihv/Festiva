import React from "react";
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
        path="dashboard"
        element={
          <LoaderPage>
            <AdminDashboard />
          </LoaderPage>
        }
      />
      <Route
        path="users"
        element={
          <LoaderPage>
            <AdminUsers />
          </LoaderPage>
        }
      />
      <Route
        path="hosts"
        element={
          <LoaderPage>
            <AdminHosts />
          </LoaderPage>
        }
      />
      <Route
        path="assets"
        element={
          <LoaderPage>
            <AdminServices />
          </LoaderPage>
        }
      />
      <Route
        path="asset/request"
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
