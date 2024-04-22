import { Request, Response, Router } from "express";
import { db } from "../utils/db";
import { product_validation, update_product } from "../utils/validations/product";
import { return_statement } from "../utils/helpers";

export const product_router = Router()

product_router.get('/get', async (request: Request, response: Response) => {
    try {
        const limit = request.query.limit ? Number(request.query.limit) : 10
        const offset = request.query.offset ? Number(request.query.offset) : 0
        const products = await db.product.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                createdAt: 'desc'
            }
        })
        return response.status(200).json(products)
    } catch (error) {
        return response.status(500).json(error)
    }
}).get('/get/:id', async (request: Request, response: Response) => {
    try {
        const product = await db.product.findFirst({
            where: {
                id: request.params.id
            }
        })
        return response.status(200).json(product)
    } catch (error) {
        return response.status(500).json(error)
    }
})

product_router.post('/get/multiple', async (request: Request, response: Response) => {
    try {
        const ids = request.body;
        const products = await db.product.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        })
        return response.status(200).json(products)
    } catch (error) {
        return response.status(500).json(error)
    }
})

product_router.post('/create', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const validation = product_validation.safeParse(body)

        if (!validation.success) {
            return response.status(400).json(return_statement(false, "Invalid Inputs", validation))
        }

        const product = await db.product.create({
            data: {
                title: body.title,
                description: body.description,
                price: body.price,
                product_sku: body.product_sku,
                short_description: body.short_description,
                return_type: body.return_type,
                payment_mode: body.payment_mode,
                additional_information: body?.additional_information || '',
                packaging: body.packaging
            }
        })

        return response.status(200).json(product)

    } catch (error) {
        console.log(error)
        return response.status(500).json(error)
    }
})

product_router.patch('/patch', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const validation = update_product.safeParse(body)
        if (!validation.success) {
            return response.status(400).json(return_statement(false, "Invalid Inputs", validation))
        }

        const product = await db.product.findFirst({
            where: {
                id: body.id
            }
        })


        const updated_product_object = {
            title: body?.title || product.title,
            description: body?.description || product.description,
            price: body?.price || product.price,
            product_sku: body?.product_sku || product.product_sku,
            short_description: body?.short_description || product.short_description,
            return_type: body?.return_type || product.return_type,
            payment_mode: body?.payment_mode || product.payment_mode,
            additional_information: body?.additional_information || product.additional_information,
            packaging: body?.packaging || product.packaging
        }

        const updated_product = await db.product.update({
            where: {
                id: body.id
            },
            data: {
                ...updated_product_object
            }
        })

        return response.status(200).json(updated_product)

    } catch (error) {
        return response.status(500).json(error)
    }
})