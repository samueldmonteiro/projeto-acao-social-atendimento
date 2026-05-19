"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
require("dotenv/config");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./http/controllers/app.controller");
const app_service_1 = require("./services/app.service");
const user_controller_1 = require("./http/controllers/user.controller");
const user_service_1 = require("./services/user.service");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("./services/auth.service");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./http/controllers/auth.controller");
const jwt_guard_1 = require("./auth/jwt.guard");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const service_category_controller_1 = require("./http/controllers/service-category.controller");
const service_category_service_1 = require("./services/service-category.service");
const beneficiary_controller_1 = require("./http/controllers/beneficiary.controller");
const beneficiary_service_1 = require("./services/beneficiary.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                global: true,
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: () => ({
                    secret: process.env.JWT_TOKEN,
                    signOptions: { expiresIn: '7d' },
                }),
            }),
        ],
        controllers: [
            app_controller_1.AppController,
            user_controller_1.UserController,
            auth_controller_1.AuthController,
            service_category_controller_1.ServiceCategoryController,
            beneficiary_controller_1.BeneficiaryController,
        ],
        providers: [
            app_service_1.AppService,
            user_service_1.UserService,
            service_category_service_1.ServiceCategoryService,
            beneficiary_service_1.BeneficiaryService,
            auth_service_1.AuthService,
            jwt_guard_1.JwtGuard,
            jwt_strategy_1.JwtStrategy,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map