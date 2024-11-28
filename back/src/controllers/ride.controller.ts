import { Request, Response } from "express";
import getRideService from "../services/ride/getRide.service";
import postRideEstimateService from "../services/ride/postRideEstimate.service";
import patchRideConfirmService from "../services/ride/patchRideConfirm.service";
import { validateData } from "../middlewares/ensureDataIsValid1.middleware";
import { z } from "zod";

const getRideController = async (req: Request, res: Response) => {
	const { id: customer_id } = req.params,
		{ driver_id } = req.query;

	const retrivedRide = await getRideService({
		driver_id: Number(driver_id),
		customer_id: Number(customer_id),
	});

	res.status(200).json(retrivedRide);
};

const postRideEstimateController = async (req: Request, res: Response) => {
	const data = req.body;

	const estimatedRide = await postRideEstimateService(data);

	res.status(200).json(estimatedRide);
};

const patchRideConfirmController = async (req: Request, res: Response) => {
	const data = req.body;

	await validateData(
		data,
		z.object({
			customer_id: z.string().trim().min(1),
			destination: z.string().trim().min(1),
			origin: z.string().trim().min(1),
			distance: z.number(),
			duration: z.string(),
			driver: z.object({
				id: z.number(),
				name: z.string(),
			}),
			value: z.number(),
		})
	);

	const returnData = await patchRideConfirmService(data);

	res.status(200).json(returnData);
};

export {
	getRideController,
	postRideEstimateController,
	patchRideConfirmController,
};
