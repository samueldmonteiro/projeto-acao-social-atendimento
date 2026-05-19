"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeneficiaryNotFoundError = void 0;
const domain_error_1 = require("./domain.error");
class BeneficiaryNotFoundError extends domain_error_1.DomainError {
    statusCode = 404;
    constructor(message = 'Beneficiário não encontrado') {
        super(message);
    }
}
exports.BeneficiaryNotFoundError = BeneficiaryNotFoundError;
//# sourceMappingURL=beneficiary-not-found.error.js.map