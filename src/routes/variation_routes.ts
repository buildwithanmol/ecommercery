import { Request, Response, Router } from "express";
import { variation_delete_validation, variation_update_validation, variation_validation } from "../utils/validations/variation";
import { return_statement } from "../utils/helpers";
import { db } from "../utils/db";

export const variation_router = Router()

variation_router.get('/get/product/:product_id', async (request: Request, response: Response) => {
    try {
        const product_id = request.params.product_id
        if(!product_id) {
            return response.status(400).json(return_statement(false, "Invalid Inputs"))
        }
        const variations = await db.variation.findMany({
            where: {
                product_id
            }
        })
        return response.status(200).json(variations)
    } catch (error) {
        return response.status(500).json(error)
    }
}).get('/get/:id', async (request: Request, response: Response) => {
    try {
        const variation_id = request.params.id;
        
        if(!variation_id) {
            return response.status(400).json(return_statement(false, "Invalid Inputs"))
        }

        const variation = await db.variation.findFirst({
            where: {
                id: variation_id
            }
        })

        return response.status(200).json(variation)
    } catch (error) {
        return response.status(500).json(error)
    }
})

variation_router.post('/create', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const validation = variation_validation.safeParse(body);

        if (!validation.success) {
            return response.status(400).json(return_statement(false, "Invalid Inputs", validation))
        }

        const variation = await db.variation.create({
            data: {
                ...body
            }
        })

        return response.status(200).json(variation)

    } catch (error) {
        return response.status(500).json(error)
    }
})

variation_router.delete('/delete/:id', async (request: Request, response: Response) => {
    try {
        const variation_id = request.params.id;

        const variation = await db.variation.delete({
            where: {
                id: variation_id
            }
        })

        return response.status(200).json(variation)
    } catch (error) {
        return response.status(500).json(error)
    }
})

variation_router.patch('/patch', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const validation = variation_update_validation.safeParse(body);

        if (!validation.success) {
            return response.status(400).json(return_statement(false, "Invalid Inputs", validation))
        }

        const prev_data = await db.variation.findFirst({
            where: {
                id: body.id
            }
        })

        const updated_data = {
            title: body?.title || prev_data?.title,
            price: body?.price || prev_data?.title,
            short_description: body?.short_description || prev_data?.title,
            image_url: body?.image_url || prev_data?.title,
            product_id: body?.product_id || prev_data?.title,
        }

        const variation = await db.variation.update({
            where: {
                id: body.id
            },
            data: {
                ...updated_data
            }
        })

        return response.status(200).json(variation)
    } catch (error) {
        return response.status(500).json(error)
    }
})