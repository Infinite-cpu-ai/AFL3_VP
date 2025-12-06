import { z, ZodType } from "zod";

export class CustomerValidation {

    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(150),
        phone: z.string().min(1).max(20)
    });

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).max(150).optional(),
        phone: z.string().min(1).max(20).optional()
    });
}
