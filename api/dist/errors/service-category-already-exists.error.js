"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategoryAlreadyExistsError = void 0;
const domain_error_1 = require("./domain.error");
class ServiceCategoryAlreadyExistsError extends domain_error_1.DomainError {
    statusCode = 409;
    constructor(message = 'Categoria de serviço com este nome já existe') {
        super(message);
    }
}
exports.ServiceCategoryAlreadyExistsError = ServiceCategoryAlreadyExistsError;
//# sourceMappingURL=service-category-already-exists.error.js.map