"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    success(data, message = 'Operação realizada com sucesso', code = 200) {
        return {
            code,
            ok: true,
            message,
            data,
        };
    }
    created(data, message = 'Recurso criado com sucesso') {
        return {
            code: 201,
            ok: true,
            message,
            data,
        };
    }
    error(message = 'Erro ao processar requisição', code = 400) {
        return {
            code,
            ok: false,
            message,
        };
    }
    notFound(message = 'Recurso não encontrado') {
        return {
            code: 404,
            ok: false,
            message,
        };
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map