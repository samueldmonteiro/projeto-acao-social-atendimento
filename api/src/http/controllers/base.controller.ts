export interface ApiResponse<T = any> {
  code: number;
  ok: boolean;
  message: string;
  data?: T;
}

export class BaseController {
  protected success<T>(
    data: T,
    message: string = 'Operação realizada com sucesso',
    code: number = 200,
  ): ApiResponse<T> {
    return {
      code,
      ok: true,
      message,
      data,
    };
  }

  protected created<T>(
    data: T,
    message: string = 'Recurso criado com sucesso',
  ): ApiResponse<T> {
    return {
      code: 201,
      ok: true,
      message,
      data,
    };
  }

  protected error(
    message: string = 'Erro ao processar requisição',
    code: number = 400,
  ): ApiResponse {
    return {
      code,
      ok: false,
      message,
    };
  }

  protected notFound(message: string = 'Recurso não encontrado'): ApiResponse {
    return {
      code: 404,
      ok: false,
      message,
    };
  }
}
