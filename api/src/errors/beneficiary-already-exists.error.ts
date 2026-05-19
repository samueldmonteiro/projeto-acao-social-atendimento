import { DomainError } from './domain.error';

export class BeneficiaryAlreadyExistsError extends DomainError {
  readonly statusCode = 409;
  constructor(message = 'Beneficiário já cadastrado') {
    super(message);
  }
}
