import express from "express";
import { adminLoginController } from "../../infrastructure/frameworks/DependencyInjection/admin/adminAuth.dependancyContainer";

const adminRoutes = express.Router();

adminRoutes.post("/login-admin", async (req, res) => {
  try {
    await adminLoginController.adminLogin(req, res);
  } catch (error) {
    console.log(error);
  }
});

export default adminRoutes;
