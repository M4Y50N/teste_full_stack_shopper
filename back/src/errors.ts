import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";

class AppError extends Error {
	statusCode: number;

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
	// Se for um erro de AppError, enviar status conforme o erro
	if (err instanceof AppError) {
		res.status(err.statusCode).json({
			error_code: "INVALID_DATA",
			error_description: err.message,
		});
	}

	// Se for um erro do Zod (validação de dados)
	if (err instanceof ZodError) {
		res.status(400).json({
			error_code: "INVALID_DATA",
			error_description: err.flatten().fieldErrors,
		});
	}

	// Caso contrário, retornar um erro genérico
	res.status(500).json({
		error_code: "INTERNAL_SERVER_ERROR",
		error_description: "Internal server error",
	});
};

export { AppError, handleError };
