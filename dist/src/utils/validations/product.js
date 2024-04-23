"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_product = exports.product_validation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.product_validation = zod_1.default.object({
    title: zod_1.default.string().max(1000),
    description: zod_1.default.string(),
    price: zod_1.default.string().max(1000),
    product_sku: zod_1.default.string().max(100),
    short_description: zod_1.default.string(),
    return_type: zod_1.default.string().max(500),
    payment_mode: zod_1.default.string().max(500),
    additional_information: zod_1.default.string().optional(),
    packaging: zod_1.default.string().max(500)
});
exports.update_product = zod_1.default.object({
    id: zod_1.default.string().max(255),
    title: zod_1.default.string().max(1000).optional(),
    description: zod_1.default.string().optional(),
    price: zod_1.default.string().max(1000).optional(),
    product_sku: zod_1.default.string().max(100).optional(),
    short_description: zod_1.default.string().optional(),
    return_type: zod_1.default.string().max(500).optional(),
    payment_mode: zod_1.default.string().max(500).optional(),
    additional_information: zod_1.default.string().optional(),
    packaging: zod_1.default.string().max(500).optional()
});
//# sourceMappingURL=product.js.map