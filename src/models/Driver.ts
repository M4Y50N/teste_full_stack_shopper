import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connect";

class Driver extends Model<any, any> {
	declare id: number;
	declare name: string;
	declare description: string;
	declare vehicle: string;
	declare icon: string;
	declare price_per_km: number;
	declare min_km: number;
}

Driver.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [3, 255],
			},
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		vehicle: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [3, 50],
			},
		},
		price_per_km: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
		min_km: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: false,
		modelName: "Driver",
	}
);

export default Driver;
