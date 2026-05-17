"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategoryNotFoundError = void 0;
const domain_error_1 = require("./domain.error");
class ServiceCategoryNotFoundError extends domain_error_1.DomainError {
    statusCode = 404;
    constructor(message = 'Categoria de serviço não encontrada') {
        super(message);
    }
}
exports.ServiceCategoryNotFoundError = ServiceCategoryNotFoundError;
//# sourceMappingURL=service-category-not-found.error.js.map