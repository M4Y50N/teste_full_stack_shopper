import { z } from "zod";

export const confirmSchema = z.object({
	customer_id: z.string().trim().min(1),
	destination: z.string().trim().min(1),
	origin: z.string().trim().min(1),
	distance: z.number(),
	duration: z.string(),
	driver: z.object({
		id: z.number(),
		name: z.string(),
	}),
	value: z.number(),
});

export const confirmCreateSchema = z
	.object({
		customer_id: z.string().trim().min(1),
		destination: z.string().trim().min(1),
		origin: z.string().trim().min(1),
		distance: z.number(),
		duration: z.string(),
		driver: z.object({
			id: z.number(),
			name: z.string(),
		}),
		value: z.number(),
	})
	.omit({
		driver: true,
	})
	.extend({ driver_id: z.number(), customer_id: z.number() });
