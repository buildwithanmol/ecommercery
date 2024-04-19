import z from "zod";

export const image_validation = z.object({  
    product_id: z.string().max(255).optional(),
    variation_id: z.string().max(255).optional(),
    image_url: z.string().max(255)
})