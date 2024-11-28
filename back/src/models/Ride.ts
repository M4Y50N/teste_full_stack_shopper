import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connect";
import Driver from "./Driver";
import Customer from "./Customer";

class Ride extends Model<any, any> {
	declare id: number;
	declare origin: string;
	declare destination: string;
	declare distance: number;
	declare duration: string;
	declare value: number;
}

Ride.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		origin: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		destination: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		distance: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
		duration: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		value: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
	},
	{
		sequelize,
		updatedAt: false,
		deletedAt: false,
		modelName: "Ride",
	}
);

Ride.belongsTo(Driver, { as: "driver", foreignKey: "driver_id" });
Ride.belongsTo(Customer, { foreignKey: "customer_id" });

export default Ride;
