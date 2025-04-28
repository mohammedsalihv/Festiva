import express from "express";
import {
  hostRegisterController,
  hostLoginController,
} from "../../infrastructure/frameworks/DependencyInjection/host/Auth.dependancyContainer";
import { VenueController } from "../../infrastructure/frameworks/DependencyInjection/host/Service.dependancyContainer";

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

hostRoutes.post("/addVenue", async (req, res) => {
  try {
    await VenueController.addVenue(req, res); 
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the venue" });
  }
});

export default hostRoutes;
