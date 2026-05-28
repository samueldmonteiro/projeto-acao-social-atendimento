import { DomainError } from './domain.error';

export class LoginIncorrectError extends DomainError {
  readonly statusCode = 401;
  constructor(message = 'E-mail ou senha incorretos') {
    super(message);
  }
}
