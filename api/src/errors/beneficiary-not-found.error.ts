import { DomainError } from './domain.error';

export class BeneficiaryNotFoundError extends DomainError {
  readonly statusCode = 404;
  constructor(message = 'Beneficiário não encontrado') {
    super(message);
  }
}
