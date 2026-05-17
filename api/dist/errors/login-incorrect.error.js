"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginIncorrectError = void 0;
const domain_error_1 = require("./domain.error");
class LoginIncorrectError extends domain_error_1.DomainError {
    statusCode = 401;
    constructor(message = 'E-mail ou senha incorretos') {
        super(message);
    }
}
exports.LoginIncorrectError = LoginIncorrectError;
//# sourceMappingURL=login-incorrect.error.js.map