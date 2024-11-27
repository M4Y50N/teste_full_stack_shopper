import { Request, Response } from "express";
import getRideService from "../services/ride/getRide.service";

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
	const { id: customer_id } = req.params,
		{ driver_id } = req.query;

	const retrivedRide = await getRideService({
		driver_id: Number(driver_id),
		customer_id: Number(customer_id),
	});

	res.status(200).json(retrivedRide);
};

const patchRideConfirmController = async (req: Request, res: Response) => {
	const { id: customer_id } = req.params,
		{ driver_id } = req.query;

	const retrivedRide = await getRideService({
		driver_id: Number(driver_id),
		customer_id: Number(customer_id),
	});

	res.status(200).json(retrivedRide);
};

export {
	getRideController,
	postRideEstimateController,
	patchRideConfirmController,
};
