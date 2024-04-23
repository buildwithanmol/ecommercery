"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.return_statement = void 0;
const return_statement = (success, message, data) => {
    if (data) {
        return {
            success,
            message,
            data
        };
    }
    return {
        success, message
    };
};
exports.return_statement = return_statement;
//# sourceMappingURL=helpers.js.map