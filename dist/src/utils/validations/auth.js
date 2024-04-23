"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin_schema = exports.verification_schema = exports.signup_schema = void 0;
const zod_1 = require("zod");
exports.signup_schema = zod_1.z.object({
    email: zod_1.z.string().email().max(255),
    password: zod_1.z.string().min(6).max(255),
    phone: zod_1.z.string().min(10).max(255),
    name: zod_1.z.string().min(3),
});
exports.verification_schema = zod_1.z.object({
    id: zod_1.z.string().max(255),
    otp: zod_1.z.number().lte(9999)
});
exports.signin_schema = zod_1.z.object({
    email: zod_1.z.string().email().max(255),
    password: zod_1.z.string().min(6).max(255)
});
//# sourceMappingURL=auth.js.map