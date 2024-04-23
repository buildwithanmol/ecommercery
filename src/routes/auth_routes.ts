import { Request, Response, Router } from "express";
import { signin_schema, signup_schema, verification_schema } from "../utils/validations/auth";
import { return_statement } from "../utils/helpers";
import { db } from "../utils/db";
import { compare, hash } from "bcryptjs";
import { verification_email } from "../utils/mail/verification_mail";
import { sign } from "jsonwebtoken";

const auth_routes = Router();

auth_routes.post('/sign-up', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const { email, password, phone, name } = body;
        const validation = signup_schema.safeParse(body)

        if (!validation.success) {
            return response.status(400).json(return_statement(false, "Invalid Inputs"))
        }

        const user_exists = await db.user.findFirst({
            where: {
                email
            }
        })

        if (user_exists) {
            return response.status(400).json(return_statement(false, "User Already Exists"))
        }

        const encrypted_password = await hash(password, 10)

        const user = await db.user.create({
            data: {
                email,
                password: encrypted_password,
                phone,
                name
            }
        })

        const mail = await verification_email(email)

        await db.user.update({
            where: {
                id: user.id
            },
            data: {
                verification_code: mail.otp
            }
        })

        return response.status(200).json(return_statement(true, "User Created", { ...user, mail_status: mail.sent ? "Sent" : "Not Sent", verification_code: mail.otp }))
    } catch (error) {
        return response.status(500).json(error)
    }
})

auth_routes.patch('/verify-email', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const validation = verification_schema.safeParse(body)

        console.log(validation)

        if (!validation.success) {
            return response.status(400).json(return_statement(false, "Invalid Inputs"))
        }

        const user = await db.user.findFirst({
            where: {
                id: body.id
            },
            select: {
                verification_code: true
            }
        })

        if (!user) {
            return response.status(400).json(return_statement(false, "User Not Found"))
        }

        const same_otp = user.verification_code === body.otp

        if (!same_otp) {
            return response.status(400).json(return_statement(false, "Invalid Code"))
        }

        const update_user = await db.user.update({
            where: {
                id: body.id
            },
            data: {
                verification_code: 0,
                is_verified: true
            }
        })

        return response.status(200).json(return_statement(true, "User Verified", update_user))

    } catch (error) {
        return response.status(500).json(error)
    }
})

auth_routes.post('/sign-in', async (request: Request, response: Response) => {
    try {
        const body = request.body;
        const validation = signin_schema.safeParse(body)

        if (!validation.success) {
            return response.status(400).json(return_statement(false, "Invalid Inputs"))
        }

        const user_exists = await db.user.findFirst({
            where: {
                email: body.email
            },
            select: {
                id: true,
                email: true,
                password: true, 
                is_admin: true
            }
        })

        const same_password = await compare(body.password, user_exists.password)

        if (!same_password) {
            return response.status(400).json(return_statement(false, "Invalid Password"))
        }

        const token = sign({ id: user_exists.id, is_admin: user_exists.is_admin }, process.env.JWT_SECRET as string, { expiresIn: '2h' })

        return response.status(200).json(return_statement(true, "User Signed In", {jwt: token} ))

    } catch (error) {
        return response.status(500).json(error)
    }
})

export default auth_routes;