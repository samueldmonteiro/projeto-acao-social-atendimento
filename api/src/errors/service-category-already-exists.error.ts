import { DomainError } from './domain.error';

export class ServiceCategoryAlreadyExistsError extends DomainError {
  readonly statusCode = 409;
  constructor(message = 'Categoria de serviço com este nome já existe') {
    super(message);
  }
}
