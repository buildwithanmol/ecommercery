"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiple_order_validation = exports.order_validation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.order_validation = zod_1.default.object({
    product_id: zod_1.default.string().max(255),
    quantity: zod_1.default.string().max(255),
    signature_id: zod_1.default.string().max(255),
    transaction_id: zod_1.default.string().max(255),
    order_total: zod_1.default.string().max(255),
    user_id: zod_1.default.string().max(255),
    expected_delivery_date: zod_1.default.any()
});
exports.multiple_order_validation = zod_1.default.object({
    data: zod_1.default.array(zod_1.default.object({
        product_id: zod_1.default.string().max(255),
        quantity: zod_1.default.string().max(255),
        signature_id: zod_1.default.string().max(255),
        transaction_id: zod_1.default.string().max(255),
        order_total: zod_1.default.string().max(255),
        user_id: zod_1.default.string().max(255),
        expected_delivery_date: zod_1.default.any()
    }))
});
//# sourceMappingURL=order.js.map