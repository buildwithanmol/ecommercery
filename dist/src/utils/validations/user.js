"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_user = void 0;
const zod_1 = __importDefault(require("zod"));
exports.update_user = zod_1.default.object({
    name: zod_1.default.string().min(3).optional(),
    phone: zod_1.default.string().min(10).max(255).optional(),
    shipping_address: zod_1.default.string().max(255).optional(),
    billing_address: zod_1.default.string().max(255).optional(),
    gst_no: zod_1.default.string().max(255).optional()
});
//# sourceMappingURL=user.js.map