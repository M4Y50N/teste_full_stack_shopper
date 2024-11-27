import { AppError } from "../../errors";
import Customer from "../../models/Customer";

const getRideService = async (payload: any): Promise<any> => {
	console.log(payload);
	const findCustomer = await Customer.findOne({
		where: { id: payload.customer_id },
	});

	return findCustomer;
};

export default getRideService;
