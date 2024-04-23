"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.order_router = void 0;
const express_1 = require("express");
const order_1 = require("../utils/validations/order");
const helpers_1 = require("../utils/helpers");
const db_1 = require("../utils/db");
const shipment_1 = require("../utils/validations/shipment");
const tracking_1 = require("../utils/validations/tracking");
const order_placed_1 = require("../utils/mail/order_placed");
exports.order_router = (0, express_1.Router)();
// Order Routes
exports.order_router.post('/create', async (request, response) => {
    try {
        const body = request.body;
        const validation = order_1.order_validation.safeParse(body);
        if (!validation.success) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs", validation));
        }
        const order = await db_1.db.order.create({
            data: {
                user_id: body.user_id,
                quantity: body.quantity,
                product_id: body.product_id,
                order_total: body.order_total,
                signature_id: body.signature_id,
                transaction_id: body.transaction_id,
                shipment_initiated: true,
                shipment: {
                    create: {
                        expected_date: body.expected_delivery_date,
                        user_id: body.user_id,
                        tracking_state: {
                            create: {
                                title: `Order created for product id #${body.product_id}`,
                                description: "Thankyou for purchasing from us. We hope your best experience!"
                            }
                        }
                    }
                }
            }
        });
        await (0, order_placed_1.orderConfirmationEmail)(body.email, body.product_id);
        return response.status(200).json(order);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }
});
exports.order_router.post('/create/many', async (request, response) => {
    try {
        const body = request.body;
        const validation = order_1.multiple_order_validation.safeParse(body);
        if (!validation.success) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs", validation));
        }
        const order = await db_1.db.order.createMany({
            data: body.data.map((item) => ({
                user_id: item.user_id,
                quantity: item.quantity,
                product_id: item.product_id,
                order_total: item.order_total,
                signature_id: item.signature_id,
                transaction_id: item.transaction_id,
            })),
            skipDuplicates: true,
        });
        // Create Manual Shipment and Tracking State
        return response.status(200).json(order);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }
});
exports.order_router.get('/get/:id', async (request, response) => {
    try {
        const id = request.params.id;
        if (!id) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs"));
        }
        const order = await db_1.db.order.findMany({
            where: {
                user_id: id,
                shipment: {
                    some: {
                        user_id: id
                    }
                }
            },
            include: {
                shipment: true
            }
        });
        return response.status(200).json(order);
    }
    catch (error) {
        return response.status(500).json(error);
    }
});
// Shipment Routes
exports.order_router.post('/shipment/create', async (request, response) => {
    try {
        const body = request.body;
        const validation = shipment_1.shipment_validation.safeParse(body);
        if (!validation.success) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs", validation));
        }
        const shipment = await db_1.db.shipment.create({
            data: {
                order_id: body.order_id,
                user_id: body.user_id,
                tracking_state: {
                    create: {
                        title: body.title,
                        description: body.description
                    }
                }
            }
        });
        return response.status(200).json(shipment);
    }
    catch (error) {
        console.log('[Shipment_Create]: ', error);
        return response.status(500).json(error);
    }
});
exports.order_router.patch('/shipment/update', async (request, response) => {
    try {
        const body = await request.body;
        const validation = shipment_1.shipment_update_validation.safeParse(body);
        if (!validation.success) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs", validation));
        }
        const shipment_object = await db_1.db.shipment.findFirst({
            where: {
                id: body.id
            }
        });
        const new_object = {
            user_id: shipment_object.user_id,
            order_id: shipment_object.order_id,
            is_delivered: body?.order_status || shipment_object.is_delivered,
            expected_date: body?.expected_date || shipment_object?.expected_date || null
        };
        const shipment = await db_1.db.shipment.update({
            where: {
                id: body.id
            },
            data: {
                ...new_object
            }
        });
        return response.status(200).json(shipment);
    }
    catch (error) {
        console.log('[Shipment_Update]: ', error);
        return response.status(500).json(error);
    }
});
// Tracking Routes
exports.order_router.post('/tracking/create', async (request, response) => {
    try {
        const body = request.body;
        const validation = tracking_1.tracking_validation.safeParse(body);
        if (!validation.success) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs", validation));
        }
        const tracking = await db_1.db.trackingState.create({
            data: {
                ...body
            }
        });
        return response.status(200).json(tracking);
    }
    catch (error) {
        console.log('[Tracking_Create]: ', error);
        return response.status(500).json(error);
    }
});
exports.order_router.patch('/tracking/update', async (request, response) => {
    try {
        const body = request.body;
        const validation = tracking_1.tracking_update_validation.safeParse(body);
        if (!validation.success) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs", validation));
        }
        const prev_data = await db_1.db.trackingState.findFirst({
            where: {
                id: body.id
            }
        });
        const new_object = {
            title: body.title || prev_data?.title,
            description: body.description || prev_data?.description,
            isCompleted: body?.isCompleted || prev_data?.isCompleted
        };
        const tracking = await db_1.db.trackingState.update({
            where: {
                id: body.id
            },
            data: {
                ...new_object
            }
        });
        return response.status(200).json(tracking);
    }
    catch (error) {
        console.log('[Tracking_Update]: ', error);
        return response.status(500).json(error);
    }
});
exports.order_router.delete('/tracking/delete/:id', async (request, response) => {
    try {
        const id = request.params.id;
        if (!id) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs"));
        }
        const tracking = await db_1.db.trackingState.delete({
            where: {
                id
            }
        });
        return response.status(200).json(tracking);
    }
    catch (error) {
        console.log('[Tracking_Delete]: ', error);
        return response.status(500).json(error);
    }
});
exports.order_router.get('/tracking/get/:shipment_id', async (request, response) => {
    try {
        const shipment_id = request.params.shipment_id;
        if (!shipment_id) {
            return response.status(400).json((0, helpers_1.return_statement)(false, "Invalid Inputs"));
        }
        const tracking = await db_1.db.trackingState.findMany({
            where: {
                shipment_id: shipment_id
            }
        });
        return response.status(200).json(tracking);
    }
    catch (error) {
        console.log('[Tracking_Get]: ', error);
        return response.status(500).json(error);
    }
});
//# sourceMappingURL=order_route.js.map