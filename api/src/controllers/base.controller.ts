export interface ApiResponse<T = any> {
  code: number;
  status: boolean;
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
      status: true,
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
      status: true,
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
      status: false,
      message,
    };
  }

  protected notFound(message: string = 'Recurso não encontrado'): ApiResponse {
    return {
      code: 404,
      status: false,
      message,
    };
  }
}
