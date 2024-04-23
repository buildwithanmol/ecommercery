import z from "zod";

export const order_validation = z.object({
    product_id: z.string().max(255),
    quantity: z.string().max(255),
    signature_id: z.string().max(255),
    transaction_id: z.string().max(255),
    order_total: z.string().max(255),
    user_id: z.string().max(255),
    expected_delivery_date: z.any(), 
    email: z.string().email().max(255)
})

export const multiple_order_validation = z.object({
    data: z.array(
        z.object({
            product_id: z.string().max(255),
            quantity: z.string().max(255),
            signature_id: z.string().max(255),
            transaction_id: z.string().max(255),
            order_total: z.string().max(255),
            user_id: z.string().max(255),
            expected_delivery_date: z.any()
        })
    )
})