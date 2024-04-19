import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export interface RequestWithUser extends Request {
    user: string
}

export const auth_middleware = (request: RequestWithUser, response: Response, next: NextFunction) => {
    const token = request.header('x-auth-token')

    if (!token) {
        response.status(401).json({
            success: false,
            message: "Unauthorized"
        })
        next()
    }

    const verify_token: any = verify(token, process.env.JWT_SECRET as string);

    if (!verify_token) {
        response.status(401).json({
            success: false,
            message: "Unauthorized"
        })
        next()
    }

    const { id } = verify_token;
    request.user = id;
    next();
}