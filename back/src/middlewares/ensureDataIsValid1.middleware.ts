import { z } from "zod";

export const validateData = async (input: any, dataSchema: any) => {
	try {
		// Validar a entrada com o schema
		await dataSchema.parseAsync(input);
		return { message: "Data validada com sucesso" };
	} catch (error) {
		if (error instanceof z.ZodError) {
			// Caso ocorra um erro de validação, retornamos um erro personalizado
			throw {
				error_code: "INVALID_DATA",
				error_description: error.errors.map((err) => err.message).join(", "),
			};
		}
		// Lançar erro genérico caso não seja de validação
		throw { error_code: "UNKNOWN_ERROR", error_description: "Erro desconhecido" };
	}
};
