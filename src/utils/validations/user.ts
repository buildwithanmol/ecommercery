import z from "zod";

export const update_user = z.object({
    name: z.string().min(3).optional(),
    phone: z.string().min(10).max(255).optional(),
    shipping_address: z.string().max(255).optional(),
    billing_address: z.string().max(255).optional(),
    gst_no: z.string().max(255).optional()
})