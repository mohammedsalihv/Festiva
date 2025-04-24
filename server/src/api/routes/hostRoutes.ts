import express from "express";
import {
  hostRegisterController,
  hostLoginController,
} from "../../infrastructure/frameworks/DependencyInjection/host/Auth.dependancyContainer";

const hostRoutes = express.Router();

hostRoutes.post("/register", async (req, res) => {
  try {
    await hostRegisterController.hostRegister(req, res);
  } catch (error) {
    console.log(error);
  }
});

hostRoutes.post("/login-host", async (req, res) => {
  try {
    await hostLoginController.hostLogin(req, res);
  } catch (error) {
    console.log(error);
  }
});

export default hostRoutes;
