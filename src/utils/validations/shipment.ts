import z from "zod";

export const shipment_validation = z.object({
    user_id: z.string().max(255),
    order_id: z.string().max(255),
    title: z.string().max(255),
    description: z.string().max(255)
})

export const shipment_update_validation = z.object({
    order_status: z.boolean(),
    expected_date: z.string().max(255), 
    id: z.string().max(255),
})
