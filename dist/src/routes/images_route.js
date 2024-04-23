"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.image_router = void 0;
const express_1 = require("express");
const db_1 = require("../utils/db");
const helpers_1 = require("../utils/helpers");
const image_1 = require("../utils/validations/image");
exports.image_router = (0, express_1.Router)();
exports.image_router.get('/get/all', async (request, response) => {
    try {
        const limit = request.query.limit ? Number(request.query.limit) : 10;
        const offset = request.query.offset ? Number(request.query.offset) : 0;
        const images = await db_1.db.image.findMany({
            skip: offset,
            take: limit
        });
        if (!images) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Images not found"));
        }
        return response.status(200).json(images);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }
});
exports.image_router.get('/get/:id', async (request, response) => {
    try {
        const id = request.params.id;
        if (!id) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs"));
        }
        const image = await db_1.db.image.findFirst({
            where: {
                id
            }
        });
        return response.status(200).json(image);
    }
    catch (error) {
        return response.status(500).json(error);
    }
});
exports.image_router.post('/create', async (request, response) => {
    try {
        const body = request.body;
        const validation = image_1.image_validation.safeParse(body);
        if (!validation.success) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs", validation));
        }
        const image = await db_1.db.image.create({
            data: {
                ...body
            }
        });
        return response.status(200).json(image);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }
});
exports.image_router.delete('/delete/:id', async (request, response) => {
    try {
        const id = request.params.id;
        if (!id) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs"));
        }
        const image = await db_1.db.image.delete({
            where: {
                id
            }
        });
        return response.status(200).json(image);
    }
    catch (error) {
        return response.status(500).json(error);
    }
});
//# sourceMappingURL=images_route.js.map