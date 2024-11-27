import { Router } from "express";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware";
import Customer from "../models/Customer";
import {
	getRideController,
	patchRideConfirmController,
	postRideEstimateController,
} from "../controllers/ride.controller";

const rideRoutes = Router();

rideRoutes.post("/estimate", postRideEstimateController);

rideRoutes.patch("/confirm", patchRideConfirmController);

rideRoutes.get(
	"/:id",
	ensureExistsMiddleware(Customer, "Customer"),
	getRideController
);

export default rideRoutes;
