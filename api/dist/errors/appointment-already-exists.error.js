"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentAlreadyExistsError = void 0;
const domain_error_1 = require("./domain.error");
class AppointmentAlreadyExistsError extends domain_error_1.DomainError {
    statusCode = 409;
    constructor(message = 'Este atendimento já está cadastrado') {
        super(message);
    }
}
exports.AppointmentAlreadyExistsError = AppointmentAlreadyExistsError;
//# sourceMappingURL=appointment-already-exists.error.js.map