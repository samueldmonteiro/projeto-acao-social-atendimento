"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./http/filters/http-exception.filter");
let cachedApp;
async function bootstrapApp() {
    if (!cachedApp) {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            transform: true,
        }));
        const allowedOrigins = [
            'http://localhost:5173',
            'https://atendimento-anhanguera.vercel.app',
        ];
        if (process.env.FRONTEND_URL) {
            allowedOrigins.push(process.env.FRONTEND_URL);
        }
        app.enableCors({
            origin: allowedOrigins,
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
        cachedApp = app;
    }
    return cachedApp;
}
async function handler(req, res) {
    const app = await bootstrapApp();
    const instance = app.getHttpAdapter().getInstance();
    return instance(req, res);
}
if (!process.env.VERCEL) {
    void bootstrapApp().then((app) => {
        void app.listen(process.env.PORT ?? 3000);
    });
}
//# sourceMappingURL=main.js.map