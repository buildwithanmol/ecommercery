"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product_router = void 0;
const express_1 = require("express");
const db_1 = require("../utils/db");
const product_1 = require("../utils/validations/product");
const helpers_1 = require("../utils/helpers");
exports.product_router = (0, express_1.Router)();
exports.product_router.get('/get', async (request, response) => {
    try {
        const limit = request.query.limit ? Number(request.query.limit) : 10;
        const offset = request.query.offset ? Number(request.query.offset) : 0;
        const products = await db_1.db.product.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                createdAt: 'desc'
            }
        });
        return response.status(200).json(products);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}).get('/get/:id', async (request, response) => {
    try {
        const product = await db_1.db.product.findFirst({
            where: {
                id: request.params.id
            }
        });
        return response.status(200).json(product);
    }
    catch (error) {
        return response.status(500).json(error);
    }
});
exports.product_router.post('/get/multiple', async (request, response) => {
    try {
        const ids = request.body;
        const products = await db_1.db.product.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
        return response.status(200).json(products);
    }
    catch (error) {
        return response.status(500).json(error);
    }
});
exports.product_router.post('/create', async (request, response) => {
    try {
        const body = request.body;
        const validation = product_1.product_validation.safeParse(body);
        if (!validation.success) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs", validation));
        }
        const product = await db_1.db.product.create({
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
        });
        return response.status(200).json(product);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }
});
exports.product_router.patch('/patch', async (request, response) => {
    try {
        const body = request.body;
        const validation = product_1.update_product.safeParse(body);
        if (!validation.success) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs", validation));
        }
        const product = await db_1.db.product.findFirst({
            where: {
                id: body.id
            }
        });
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
        };
        const updated_product = await db_1.db.product.update({
            where: {
                id: body.id
            },
            data: {
                ...updated_product_object
            }
        });
        return response.status(200).json(updated_product);
    }
    catch (error) {
        return response.status(500).json(error);
    }
});
//# sourceMappingURL=product_routes.js.map