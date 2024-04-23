"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_routes = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const db_1 = require("../utils/db");
const helpers_1 = require("../utils/helpers");
const user_1 = require("../utils/validations/user");
exports.user_routes = (0, express_1.Router)();
exports.user_routes.get('/get', middlewares_1.auth_middleware, async (request, response) => {
    try {
        const token = request.user;
        const user = await db_1.db.user.findFirst({
            where: {
                id: token
            }
        });
        if (!user) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "User Not Found"));
        }
        return response.status(200).json(user);
    }
    catch (error) {
        return response.status(500).json(error);
    }
});
exports.user_routes.delete('/delete', middlewares_1.auth_middleware, async (request, response) => {
    try {
        const token = request.user;
        const user = await db_1.db.user.delete({
            where: {
                id: token
            },
            select: {
                id: true
            }
        });
        if (!user) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "User failed to delete"));
        }
        return response.status(200).json((0, helpers_1.return_statement)(true, "User Deleted"));
    }
    catch (error) {
        if (error.code === "P2025") {
            return response.status(400).json((0, helpers_1.return_statement)(false, "No records to delete "));
        }
        return response.status(500).json(error);
    }
});
exports.user_routes.patch('/patch', middlewares_1.auth_middleware, async (request, response) => {
    try {
        const token = request.user;
        const body = request.body;
        const validation = user_1.update_user.safeParse(body);
        if (!validation.success) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs", validation));
        }
        const user = await db_1.db.user.findFirst({
            where: {
                id: token
            }
        });
        const updated_user_object = {
            name: body?.name || user?.name,
            phone: body?.phone || user?.phone,
            shipping_address: body?.shipping_address || user?.shipping_address,
            billing_address: body?.billing_address || user?.billing_address,
            gst_no: body?.gst_no || user?.gst_no
        };
        const updated_user = await db_1.db.user.update({
            where: {
                id: token
            },
            data: {
                ...updated_user_object
            }
        });
        return response.status(200).json(updated_user);
    }
    catch (error) {
        return response.status(500).json(error);
    }
});
//# sourceMappingURL=user_routes.js.map