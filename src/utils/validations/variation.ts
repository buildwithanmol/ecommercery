import z from "zod";

export const variation_validation = z.object({
    title: z.string().max(1000).optional(),
    price: z.string().max(1000).optional(),
    short_description: z.string().optional(),
    image_url: z.string().max(255),
    product_id: z.string().max(255)
})

export const variation_update_validation = z.object({
    id: z.string().max(255),
    title: z.string().max(1000).optional(),
    price: z.string().max(1000).optional(),
    short_description: z.string().optional(),
    image_url: z.string().max(255).optional(),
    product_id: z.string().max(255).optional()
})

export const variation_delete_validation = z.object({
    id: z.string().max(255)
})