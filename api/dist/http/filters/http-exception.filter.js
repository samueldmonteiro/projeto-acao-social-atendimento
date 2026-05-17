"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const domain_error_1 = require("../../errors/domain.error");
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    logger = new common_1.Logger(HttpExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let code = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Erro interno do servidor';
        let errors = null;
        if (exception instanceof domain_error_1.DomainError) {
            code = exception.statusCode;
            message = exception.message;
        }
        else if (exception instanceof common_1.HttpException) {
            code = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                const resMessage = exceptionResponse.message;
                if (Array.isArray(resMessage)) {
                    message = 'Erro de validação';
                    errors = resMessage;
                }
                else if (typeof resMessage === 'string') {
                    message = resMessage;
                }
                else {
                    message = exception.message;
                }
            }
            else if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            }
            else {
                message = exception.message;
            }
        }
        else if (exception instanceof Error) {
            this.logger.error(`[Unhandled Error] ${exception.message}`, exception.stack);
            if (process.env.NODE_ENV === 'development') {
                message = exception.message;
            }
        }
        else {
            this.logger.error(`[Unknown Exception] ${JSON.stringify(exception)}`);
        }
        const errorResponse = {
            code,
            ok: false,
            message,
            ...(errors && { errors }),
            path: request.url,
            timestamp: new Date().toISOString(),
        };
        response.status(code).json(errorResponse);
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map