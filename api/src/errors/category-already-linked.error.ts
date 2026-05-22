import { DomainError } from './domain.error';

export class CategoryAlreadyLinkedError extends DomainError {
  readonly statusCode = 409;
  constructor(message = 'Beneficiário já possui esta categoria vinculada') {
    super(message);
  }
}
