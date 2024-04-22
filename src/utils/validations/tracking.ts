import z from "zod";

export const tracking_validation = z.object({
    title: z.string().max(255), 
    description: z.string().max(255)
})

export const tracking_update_validation = z.object({
    id: z.string().max(255),
    title: z.string().max(255).optional(),
    description: z.string().max(255).optional()
})