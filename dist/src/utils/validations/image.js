"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.image_validation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.image_validation = zod_1.default.object({
    product_id: zod_1.default.string().max(255).optional(),
    variation_id: zod_1.default.string().max(255).optional(),
    image_url: zod_1.default.string().max(255)
});
//# sourceMappingURL=image.js.map