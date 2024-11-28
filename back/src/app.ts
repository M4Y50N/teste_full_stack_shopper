import "express-async-errors";
import express, { Application, json } from "express";
import cors from "cors";
import { handleError } from "./errors";
import rideRoutes from "./routes/ride.routes";

const app: Application = express();
app.use(json());
app.use(cors());

app.use("/ride", rideRoutes);

app.use(handleError);

export default app;
