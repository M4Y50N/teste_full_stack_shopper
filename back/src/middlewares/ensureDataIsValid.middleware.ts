import { ZodTypeAny } from "zod";
import { AppError } from "../errors";
import { Request, Response, NextFunction } from "express";

const ensureDataIsValidMiddleware =
	(schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
		if (!Object.keys(req.body).length) {
			throw new AppError("Dados não podem ser nulos", 400);
		}

		const validatedData = schema.parse(req.body);

		req.body = validatedData;

		return next();
	};

export default ensureDataIsValidMiddleware;
