"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentNotFoundError = void 0;
const domain_error_1 = require("./domain.error");
class AppointmentNotFoundError extends domain_error_1.DomainError {
    statusCode = 404;
    constructor(message = 'Atendimento não encontrado') {
        super(message);
    }
}
exports.AppointmentNotFoundError = AppointmentNotFoundError;
//# sourceMappingURL=appointment-not-found.error.js.map