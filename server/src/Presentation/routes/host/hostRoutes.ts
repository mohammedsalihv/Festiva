import express from "express";
import { VenueController } from "../../../infrastructure/frameworks/DependencyInjection/host/Service.dependancyContainer";
import logger from "../../../utils/logger";

const hostRoutes = express.Router();

hostRoutes.post("/addVenue", async (req, res) => {
  try {
    await VenueController.addVenue(req, res);
  } catch (error) {
    logger.info(error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the venue" });
  }
});

export default hostRoutes;
