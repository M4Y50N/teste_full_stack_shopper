import { Sequelize } from "sequelize";
import { AppError } from "../../errors";
import Driver from "../../models/Driver";
import Ride from "../../models/Ride";

const fetchRides = async (customer_id: number, driver_id?: number) => {
	const whereCondition: { customer_id: number; driver_id?: number } = {
		customer_id,
	};

	if (driver_id) {
		whereCondition.driver_id = driver_id;
	}

	const rides = await Ride.findAll({
		where: whereCondition,
		order: [["createdAt", "DESC"]],
		attributes: {
			exclude: ["driver_id", "customer_id", "value", "createdAt"],
			include: [
				[Sequelize.cast(Sequelize.col("value"), "DECIMAL(10,2)"), "value"],
				[Sequelize.col("createdAt"), "date"],
			],
		},
		include: [
			{
				model: Driver,
				as: "driver",
				attributes: {
					exclude: ["description", "vehicle", "price_per_km", "min_km"],
				},
			},
		],
	});

	return rides.map((ride) => ({
		...ride.get(),
		value: Number(ride.get("value")),
	}));
};

const getRideService = async (payload: {
	customer_id: number;
	driver_id?: number;
}) => {
	try {
		if (payload.driver_id) {
			const findDriver = await Driver.findOne({
				where: { id: payload.driver_id },
			});
			if (!findDriver) {
				throw new AppError("Motorista inválido", 400);
			}
		}

		const rides = await fetchRides(payload.customer_id, payload.driver_id);

		return {
			customer_id: payload.customer_id,
			rides,
		};
	} catch (err) {
		console.error(err);
		throw err;
	}
};

export default getRideService;
