"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variation_router = void 0;
const express_1 = require("express");
const variation_1 = require("../utils/validations/variation");
const helpers_1 = require("../utils/helpers");
const db_1 = require("../utils/db");
exports.variation_router = (0, express_1.Router)();
exports.variation_router.get('/get/product/:product_id', async (request, response) => {
    try {
        const product_id = request.params.product_id;
        if (!product_id) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs"));
        }
        const variations = await db_1.db.variation.findMany({
            where: {
                product_id
            }
        });
        return response.status(200).json(variations);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}).get('/get/:id', async (request, response) => {
    try {
        const variation_id = request.params.id;
        if (!variation_id) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs"));
        }
        const variation = await db_1.db.variation.findFirst({
            where: {
                id: variation_id
            }
        });
        return response.status(200).json(variation);
    }
    catch (error) {
        return response.status(500).json(error);
    }
});
exports.variation_router.post('/create', async (request, response) => {
    try {
        const body = request.body;
        const validation = variation_1.variation_validation.safeParse(body);
        if (!validation.success) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs", validation));
        }
        const variation = await db_1.db.variation.create({
            data: {
                ...body
            }
        });
        return response.status(200).json(variation);
    }
    catch (error) {
        return response.status(500).json(error);
    }
});
exports.variation_router.delete('/delete/:id', async (request, response) => {
    try {
        const variation_id = request.params.id;
        const variation = await db_1.db.variation.delete({
            where: {
                id: variation_id
            }
        });
        return response.status(200).json(variation);
    }
    catch (error) {
        return response.status(500).json(error);
    }
});
exports.variation_router.patch('/patch', async (request, response) => {
    try {
        const body = request.body;
        const validation = variation_1.variation_update_validation.safeParse(body);
        if (!validation.success) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs", validation));
        }
        const prev_data = await db_1.db.variation.findFirst({
            where: {
                id: body.id
            }
        });
        const updated_data = {
            title: body?.title || prev_data?.title,
            price: body?.price || prev_data?.title,
            short_description: body?.short_description || prev_data?.title,
            image_url: body?.image_url || prev_data?.title,
            product_id: body?.product_id || prev_data?.title,
        };
        const variation = await db_1.db.variation.update({
            where: {
                id: body.id
            },
            data: {
                ...updated_data
            }
        });
        return response.status(200).json(variation);
    }
    catch (error) {
        return response.status(500).json(error);
    }
});
//# sourceMappingURL=variation_routes.js.map