import { z, ZodType } from "zod";

export class RestaurantValidation {

    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(150),
        description: z.string().min(1),
        isOpened: z.boolean().optional()
    });

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).max(150).optional(),
        description: z.string().min(1).optional(),
        isOpened: z.boolean().optional()
    });
}
