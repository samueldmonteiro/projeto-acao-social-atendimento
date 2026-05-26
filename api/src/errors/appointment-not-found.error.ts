import { DomainError } from './domain.error';

export class AppointmentNotFoundError extends DomainError {
  readonly statusCode = 404;
  constructor(message = 'Atendimento não encontrado') {
    super(message);
  }
}
