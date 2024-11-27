import { DataTypes, Model } from "sequelize";

import sequelize from "../db/connect";
import Driver from "./Driver";

class Review extends Model<any, any> {
	declare id: number;
	declare rating: number;
	declare comment: string;
}

Review.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		comment: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	},
	{
		sequelize,
		timestamps: false,
		modelName: "Review",
	}
);

Review.belongsTo(Driver, { foreignKey: "driver_id" });

export default Review;
