import z from "zod";

export const product_validation = z.object({
    title: z.string().max(1000),
    description: z.string(),
    price: z.string().max(1000),
    product_sku: z.string().max(100),
    short_description: z.string(),
    return_type: z.string().max(500),
    payment_mode: z.string().max(500),
    additional_information: z.string().optional(),
    packaging: z.string().max(500)
})

export const update_product = z.object({
    id: z.string().max(255),
    title: z.string().max(1000).optional(),
    description: z.string().optional(),
    price: z.string().max(1000).optional(),
    product_sku: z.string().max(100).optional(),
    short_description: z.string().optional(),
    return_type: z.string().max(500).optional(),
    payment_mode: z.string().max(500).optional(),
    additional_information: z.string().optional(),
    packaging: z.string().max(500).optional()
})