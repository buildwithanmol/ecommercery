"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tracking_update_validation = exports.tracking_validation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.tracking_validation = zod_1.default.object({
    title: zod_1.default.string().max(255),
    description: zod_1.default.string().max(255),
    shipment_id: zod_1.default.string()
});
exports.tracking_update_validation = zod_1.default.object({
    id: zod_1.default.string().max(255),
    title: zod_1.default.string().max(255).optional(),
    description: zod_1.default.string().max(255).optional(),
    isCompleted: zod_1.default.boolean().optional()
});
//# sourceMappingURL=tracking.js.map