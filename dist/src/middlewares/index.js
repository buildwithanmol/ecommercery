"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_middleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_middleware = (request, response, next) => {
    const token = request.header('x-auth-token');
    if (!token) {
        response.status(401).json({
            success: false,
            message: "Unauthorized"
        });
        next();
    }
    const verify_token = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
    if (!verify_token) {
        response.status(401).json({
            success: false,
            message: "Unauthorized"
        });
        next();
    }
    const { id } = verify_token;
    request.user = id;
    next();
};
exports.auth_middleware = auth_middleware;
//# sourceMappingURL=index.js.map