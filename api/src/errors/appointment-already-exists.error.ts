import { DomainError } from './domain.error';

export class AppointmentAlreadyExistsError extends DomainError {
  readonly statusCode = 409;
  constructor(message = 'Este atendimento já está cadastrado') {
    super(message);
  }
}
