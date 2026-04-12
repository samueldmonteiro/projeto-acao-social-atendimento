"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
require("dotenv/config");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const express_1 = __importDefault(require("express"));
const app_module_1 = require("./app.module");
const expressApp = (0, express_1.default)();
let initPromise = null;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    app.enableCors({
        origin: process.env.FRONTEND_URL
            ? [process.env.FRONTEND_URL, 'http://localhost:5173']
            : 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Ação Social')
        .setDescription('API de atendimento social')
        .setVersion('1.0')
        .addTag('Ação Social')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    await app.init();
}
async function handler(req, res) {
    if (!initPromise) {
        initPromise = bootstrap();
    }
    await initPromise;
    expressApp(req, res);
}
//# sourceMappingURL=index.js.map