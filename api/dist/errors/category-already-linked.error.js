"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryAlreadyLinkedError = void 0;
const domain_error_1 = require("./domain.error");
class CategoryAlreadyLinkedError extends domain_error_1.DomainError {
    statusCode = 409;
    constructor(message = 'Beneficiário já possui esta categoria vinculada') {
        super(message);
    }
}
exports.CategoryAlreadyLinkedError = CategoryAlreadyLinkedError;
//# sourceMappingURL=category-already-linked.error.js.map