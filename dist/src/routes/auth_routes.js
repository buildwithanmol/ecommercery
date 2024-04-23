"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../utils/validations/auth");
const helpers_1 = require("../utils/helpers");
const db_1 = require("../utils/db");
const bcryptjs_1 = require("bcryptjs");
const verification_mail_1 = require("../utils/mail/verification_mail");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_routes = (0, express_1.Router)();
auth_routes.post('/sign-up', async (request, response) => {
    try {
        const body = request.body;
        const { email, password, phone, name } = body;
        const validation = auth_1.signup_schema.safeParse(body);
        if (!validation.success) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs"));
        }
        const user_exists = await db_1.db.user.findFirst({
            where: {
                email
            }
        });
        if (user_exists) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "User Already Exists"));
        }
        const encrypted_password = await (0, bcryptjs_1.hash)(password, 10);
        const user = await db_1.db.user.create({
            data: {
                email,
                password: encrypted_password,
                phone,
                name
            }
        });
        const mail = await (0, verification_mail_1.verification_email)(email);
        await db_1.db.user.update({
            where: {
                id: user.id
            },
            data: {
                verification_code: mail.otp
            }
        });
        return response.status(200).json((0, helpers_1.return_statement)(true, "User Created", { ...user, mail_status: mail.sent ? "Sent" : "Not Sent", verification_code: mail.otp }));
    }
    catch (error) {
        return response.status(500).json(error);
    }
});
auth_routes.patch('/verify-email', async (request, response) => {
    try {
        const body = request.body;
        const validation = auth_1.verification_schema.safeParse(body);
        console.log(validation);
        if (!validation.success) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs"));
        }
        const user = await db_1.db.user.findFirst({
            where: {
                id: body.id
            },
            select: {
                verification_code: true
            }
        });
        if (!user) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "User Not Found"));
        }
        const same_otp = user.verification_code === body.otp;
        if (!same_otp) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Code"));
        }
        const update_user = await db_1.db.user.update({
            where: {
                id: body.id
            },
            data: {
                verification_code: 0,
                is_verified: true
            }
        });
        return response.status(200).json((0, helpers_1.return_statement)(true, "User Verified", update_user));
    }
    catch (error) {
        return response.status(500).json(error);
    }
});
auth_routes.post('/sign-in', async (request, response) => {
    try {
        const body = request.body;
        const validation = auth_1.signin_schema.safeParse(body);
        if (!validation.success) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs"));
        }
        const user_exists = await db_1.db.user.findFirst({
            where: {
                email: body.email
            },
            select: {
                id: true,
                email: true,
                password: true
            }
        });
        const same_password = await (0, bcryptjs_1.compare)(body.password, user_exists.password);
        if (!same_password) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Password"));
        }
        const token = (0, jsonwebtoken_1.sign)({ id: user_exists.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        return response.status(200).json((0, helpers_1.return_statement)(true, "User Signed In", { jwt: token }));
    }
    catch (error) {
        return response.status(500).json(error);
    }
});
exports.default = auth_routes;
//# sourceMappingURL=auth_routes.js.map