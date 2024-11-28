import Ride from "../../models/Ride";
import Driver from "../../models/Driver";
import { AppError } from "../../errors";
import { confirmCreateSchema } from "../../schemas/ride.schema";

const patchRideConfirmService = async (payload: {
	customer_id: string;
	origin: string;
	destination: string;
	distance: number;
	duration: string;
	driver: {
		id: number;
		name: string;
	};
	value: number;
}) => {
	try {
		const getDriver = await Driver.findOne({ where: { id: payload.driver.id } });

		if (!getDriver) {
			throw new AppError("Driver não encontrado", 404);
		}

		if (getDriver.min_km > payload.distance) {
			throw new AppError("Quilometragem inválida para o motorista", 406);
		}

		if (payload.destination === payload.origin) {
			throw new AppError("Origem não pode ser igual ao destino", 400);
		}

		const valitadedPayload = confirmCreateSchema.parse({
			...payload,
			driver_id: payload.driver.id,
			customer_id: Number(payload.customer_id),
		});

		console.log(valitadedPayload);
		await Ride.create(valitadedPayload);

		return { success: true };
	} catch (err) {
		console.error(err);
		throw err;
	}
};

export default patchRideConfirmService;
