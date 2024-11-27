import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connect";

class Customer extends Model<any, any> {
	declare id: number;
}

Customer.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	},
	{
		sequelize,
		timestamps: false,
		modelName: "Customer",
	}
);

export default Customer;
