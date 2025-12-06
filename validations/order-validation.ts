import { z, ZodType } from "zod";

export class OrderValidation {

    static readonly CREATE: ZodType = z.object({
        customerId: z.number().int().positive(),
        restaurantId: z.number().int().positive(),
        itemAmount: z.number().int().positive()
    });

    static readonly LIST: ZodType = z.object({
        customerId: z.number().int().positive().optional(),
        restaurantId: z.number().int().positive().optional()
    });
}
