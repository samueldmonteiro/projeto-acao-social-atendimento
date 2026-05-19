"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeneficiaryAlreadyExistsError = void 0;
const domain_error_1 = require("./domain.error");
class BeneficiaryAlreadyExistsError extends domain_error_1.DomainError {
    statusCode = 409;
    constructor(message = 'Beneficiário já cadastrado') {
        super(message);
    }
}
exports.BeneficiaryAlreadyExistsError = BeneficiaryAlreadyExistsError;
//# sourceMappingURL=beneficiary-already-exists.error.js.map