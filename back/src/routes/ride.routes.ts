import { Router } from "express";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware";
import Customer from "../models/Customer";
import {
	getRideController,
	patchRideConfirmController,
	postRideEstimateController,
} from "../controllers/ride.controller";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { z } from "zod";
import { confirmSchema } from "../schemas/ride.schema";

const rideRoutes = Router();

rideRoutes.post(
	"/estimate",
	ensureDataIsValidMiddleware(
		z.object({
			customer_id: z.string().trim().min(1),
			destination: z.string().trim().min(1),
			origin: z.string().trim().min(1),
		})
	),
	postRideEstimateController
);

rideRoutes.patch(
	"/confirm",
	ensureDataIsValidMiddleware(confirmSchema),
	patchRideConfirmController
);

rideRoutes.get(
	"/:id",
	ensureExistsMiddleware(Customer, "Customer"),
	getRideController
);

export default rideRoutes;
