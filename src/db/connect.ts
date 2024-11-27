import "dotenv/config";

const dbHost = process.env.PGHOST!;
const dbName = process.env.PGDATABASE!;
const dbUser = process.env.PGUSER!;
const dbPassword = process.env.PGPASSWORD!;

import { Sequelize } from "sequelize";
import Driver from "../models/Driver";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
	host: dbHost,
	dialect: "postgres",
});

(async () => {
	try {
		await sequelize.authenticate();
		console.log("Conectado com o banco!");
	} catch (error) {
		console.error(`Não foi possível conectar: ${error}`);
	}
})();

export default sequelize;
