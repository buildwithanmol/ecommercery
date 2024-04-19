import { Request, Response, Router } from "express";
import { db } from "../utils/db";
import { return_statement } from "../utils/helpers";
import { image_validation } from "../utils/validations/image";

export const image_router = Router()

image_router.get('/get/:id', async (request: Request, response: Response) => {
    try {
        const id = request.params.id;

        if (!id) {
            return response.status(400).json(return_statement(false, "Invalid Inputs"))
        }

        const image = await db.image.findFirst({
            where: {
                id
            }
        })

        return response.status(200).json(image)
    } catch (error) {
        return response.status(500).json(error)
    }
})

image_router.get('/get/all', async (request: Request, response: Response) => {
    try {
        const limit = request.query.limit ? Number(request.query.limit) : 10
        const offset = request.query.offset ? Number(request.query.offset) : 0
        const images = await db.image.findMany({
            skip: offset,
            take: limit
        })

        if (!images) {
            return response.status(400).json(return_statement(false, "Images not found"))
        }
        return response.status(200).json(images)
    } catch (error) {
        console.log(error)
        return response.status(500).json(error)
    }
})

image_router.post('/create', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const validation = image_validation.safeParse(body)

        if (!validation.success) {
            return response.status(400).json(return_statement(false, "Invalid Inputs", validation))
        }

        const image = await db.image.create({
            data: {
                ...body
            }
        })

        return response.status(200).json(image)
    } catch (error) {
        console.log(error)
        return response.status(500).json(error)
    }
})

image_router.delete('/delete/:id', async (request: Request, response: Response) => {
    try {
        const id = request.params.id;

        if (!id) {
            return response.status(400).json(return_statement(false, "Invalid Inputs"))
        }

        const image = await db.image.delete({
            where: {
                id
            }
        })

        return response.status(200).json(image)
    } catch (error) {
        return response.status(500).json(error)
    }
})