import { Op, Sequelize } from "sequelize";
import { maps } from "../../apis/maps";
import Driver from "../../models/Driver";
import Review from "../../models/Review";
import { AppError } from "../../errors";

const postRideEstimateService = async (payload: {
	customer_id: string;
	origin: string;
	destination: string;
}) => {
	try {
		// Calcular distância e tempo
		const estimatedRide = await maps.get("/distancematrix/json", {
			params: {
				destinations: payload.destination,
				origins: payload.origin,
				key: process.env.GOOGLE_API_KEY,
				unit: "metric",
			},
		});

		const data = estimatedRide.data.rows[0].elements[0];

		const { text: distance, value } = data.distance,
			value_km = value / 1000;

		const { text: duration } = data.duration;

		if (value === 0) {
			throw new AppError("Destino e origen não podem ser os mesmos", 400);
		}

		const drivers = await Driver.findAll({
			where: {
				min_km: { [Op.lte]: value_km },
			},
			order: [["price_per_km", "ASC"]],
			include: [
				{
					model: Review,
					as: "review",
					attributes: { exclude: ["id", "driver_id"] },
				},
			],
			attributes: {
				exclude: ["price_per_km", "min_km"],
				include: [
					[
						Sequelize.literal(`ROUND(price_per_km * ${Math.ceil(value_km)}, 2)`),
						"value",
					],
				],
			},
		});

		// Converte o campo "value" para number
		const driversWithNumberValue = drivers.map((driver) => ({
			...driver.get(),
			value: Number(driver.get("value")),
		}));

		// Pegar lat e long
		const getDestGeocode = await maps.get("geocode/json", {
			params: {
				address: payload.destination,
				key: process.env.GOOGLE_API_KEY,
			},
		});
		const getOriGeocode = await maps.get("geocode/json", {
			params: {
				address: payload.origin,
				key: process.env.GOOGLE_API_KEY,
			},
		});

		const { lat: dest_lat, lng: dest_lng } =
				getDestGeocode.data.results[0].geometry.location,
			{ lat: ori_lat, lng: ori_lng } =
				getOriGeocode.data.results[0].geometry.location;

		const response = {
			origin: {
				latitude: ori_lat,
				longitude: ori_lng,
			},
			destination: {
				latitude: dest_lat,
				longitude: dest_lng,
			},
			distance: Number(distance.split(" ")[0]),
			duration: duration,
			options: driversWithNumberValue,
			routeResponse: estimatedRide.data,
		};

		return response;
	} catch (err) {
		console.error(err);

		throw err;
	}
};

export default postRideEstimateService;
