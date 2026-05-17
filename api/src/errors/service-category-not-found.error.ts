import { DomainError } from './domain.error';

export class ServiceCategoryNotFoundError extends DomainError {
  readonly statusCode = 404;
  constructor(message = 'Categoria de serviço não encontrada') {
    super(message);
  }
}
