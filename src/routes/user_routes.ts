import { Response, Router } from "express";
import { RequestWithUser, auth_middleware } from "../middlewares";
import { db } from "../utils/db";
import { return_statement } from "../utils/helpers";
import { update_user } from "../utils/validations/user";

export const user_routes = Router();

user_routes.get('/get', auth_middleware, async (request: RequestWithUser, response: Response) => {
    try {
        const token = request.user
        
        const user = await db.user.findFirst({
            where: {
                id: token
            }
        })

        if(!user) {
            return response.status(400).json(return_statement(false, "User Not Found"))
        }

        return response.status(200).json(user)

    } catch (error) {
        return response.status(500).json(error)
    }
})

user_routes.delete('/delete', auth_middleware, async (request: RequestWithUser, response: Response) => {
    try {
        const token = request.user;

        const user = await db.user.delete({
            where: {
                id: token
            },
            select: {
                id: true
            }
        })
    
        if(!user) {
            return response.status(400).json(return_statement(false, "User failed to delete"))
        }

        return response.status(200).json(return_statement(true, "User Deleted"))

    } catch (error) {
        if(error.code === "P2025") {
            return response.status(400).json(return_statement(false, "No records to delete "))
        }
        return response.status(500).json(error)
    }
})

user_routes.patch('/patch', auth_middleware, async (request: RequestWithUser, response: Response) => {
    try {
        const token = request.user;
        const body = request.body;
        const validation = update_user.safeParse(body)

        if(!validation.success) {
            return response.status(400).json(return_statement(false, "Invalid Inputs", validation))
        }

        const user = await db.user.findFirst({
            where: {
                id: token
            }
        })

        const updated_user_object = {
            name: body?.name || user?.name,
            phone: body?.phone || user?.phone,
            shipping_address: body?.shipping_address || user?.shipping_address,
            billing_address: body?.billing_address || user?.billing_address,
            gst_no: body?.gst_no || user?.gst_no 
        }

        const updated_user = await db.user.update({
            where: {
                id: token
            }, 
            data: {
                ...updated_user_object
            }
        })

        return response.status(200).json(updated_user)

    } catch (error) {
        return response.status(500).json(error)
    }
})