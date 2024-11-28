import app from "./app";
import connect from "./db/connect";

// Servidor e conexão com banco
app.listen(3000, () => {
	console.log("Server rodando na porta 3000");
});
connect
	// .sync({ force: true })
	.sync()
	.then()
	.catch((error: any) => {
		console.log(error);
	});
