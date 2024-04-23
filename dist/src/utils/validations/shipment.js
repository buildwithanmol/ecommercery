"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shipment_update_validation = exports.shipment_validation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.shipment_validation = zod_1.default.object({
    user_id: zod_1.default.string().max(255),
    order_id: zod_1.default.string().max(255),
    title: zod_1.default.string().max(255),
    description: zod_1.default.string().max(255)
});
exports.shipment_update_validation = zod_1.default.object({
    order_status: zod_1.default.boolean(),
    expected_date: zod_1.default.string().max(255),
    id: zod_1.default.string().max(255),
});
//# sourceMappingURL=shipment.js.map