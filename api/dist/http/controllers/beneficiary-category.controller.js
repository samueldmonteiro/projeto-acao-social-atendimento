"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeneficiaryCategoryController = void 0;
const common_1 = require("@nestjs/common");
const base_controller_1 = require("./base.controller");
const beneficiary_category_service_1 = require("../../services/beneficiary-category.service");
const jwt_guard_1 = require("../../auth/jwt.guard");
let BeneficiaryCategoryController = class BeneficiaryCategoryController extends base_controller_1.BaseController {
    beneficiaryCategoryService;
    constructor(beneficiaryCategoryService) {
        super();
        this.beneficiaryCategoryService = beneficiaryCategoryService;
    }
    async findMany(search, categoryId, page, perPage) {
        const data = await this.beneficiaryCategoryService.findMany({
            search,
            categoryId,
            page: page ? Number(page) : 1,
            perPage: perPage ? Number(perPage) : 10,
        });
        return this.success(data, 'Vínculos de beneficiários e categorias listados com sucesso');
    }
};
exports.BeneficiaryCategoryController = BeneficiaryCategoryController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('categoryId')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('perPage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], BeneficiaryCategoryController.prototype, "findMany", null);
exports.BeneficiaryCategoryController = BeneficiaryCategoryController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('beneficiary-categories'),
    __metadata("design:paramtypes", [beneficiary_category_service_1.BeneficiaryCategoryService])
], BeneficiaryCategoryController);
//# sourceMappingURL=beneficiary-category.controller.js.map