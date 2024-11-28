import "dotenv/config";

import { Sequelize } from "sequelize";

const sequelize = new Sequelize("db_test_full_stack", "peth", "3023", {
	host: "localhost",
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
