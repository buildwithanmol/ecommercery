"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.variation_delete_validation = exports.variation_update_validation = exports.variation_validation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.variation_validation = zod_1.default.object({
    title: zod_1.default.string().max(1000).optional(),
    price: zod_1.default.string().max(1000).optional(),
    short_description: zod_1.default.string().optional(),
    image_url: zod_1.default.string().max(255),
    product_id: zod_1.default.string().max(255)
});
exports.variation_update_validation = zod_1.default.object({
    id: zod_1.default.string().max(255),
    title: zod_1.default.string().max(1000).optional(),
    price: zod_1.default.string().max(1000).optional(),
    short_description: zod_1.default.string().optional(),
    image_url: zod_1.default.string().max(255).optional(),
    product_id: zod_1.default.string().max(255).optional()
});
exports.variation_delete_validation = zod_1.default.object({
    id: zod_1.default.string().max(255)
});
//# sourceMappingURL=variation.js.map