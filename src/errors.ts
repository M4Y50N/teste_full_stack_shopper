import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";

class AppError extends Error {
	statusCode;

	constructor(message: string, statusCode: number = 400) {
		super(message);
		this.statusCode = statusCode;
	}
}

const handleError = (
	err: any,
	req: Request,
	res: Response,
	_: NextFunction
) => {
	if (err instanceof AppError) {
		res.status(err.statusCode).json({ message: err.message });
	}

	if (err instanceof ZodError) {
		res.status(400).json({ message: err.flatten().fieldErrors });
	}

	res.status(500).json({
		message: "Internal server error",
	});
};

export { AppError, handleError };
