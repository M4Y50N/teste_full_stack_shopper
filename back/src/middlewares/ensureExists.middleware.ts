import { AppError } from "../errors";
import { NextFunction, Request, Response } from "express";

const ensureExistsMiddleware =
	(model: any, tableName: string) =>
	async (req: Request, res: Response, next: NextFunction) => {
		const id = parseInt(req.params.id);

		const search: any = await model.findOne({
			where: { id: id },
		});

		if (!search || search?.deletedAt) {
			throw new AppError(`${tableName} não encontrado(a)`, 404);
		}

		return next();
	};

export default ensureExistsMiddleware;
