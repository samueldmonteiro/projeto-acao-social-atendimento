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
exports.ServiceCategoryController = void 0;
const common_1 = require("@nestjs/common");
const base_controller_1 = require("./base.controller");
const service_category_service_1 = require("../../services/service-category.service");
const service_category_dto_1 = require("../dtos/service-category.dto");
let ServiceCategoryController = class ServiceCategoryController extends base_controller_1.BaseController {
    serviceCategoryService;
    constructor(serviceCategoryService) {
        super();
        this.serviceCategoryService = serviceCategoryService;
    }
    async create(body) {
        const data = await this.serviceCategoryService.create(body);
        return this.created(data, 'Categoria de serviço criada com sucesso');
    }
    async update(id, body) {
        const data = await this.serviceCategoryService.update(id, body);
        return this.success(data, 'Categoria de serviço atualizada com sucesso');
    }
    async delete(id) {
        await this.serviceCategoryService.delete(id);
        return this.success(null, 'Categoria de serviço excluída com sucesso');
    }
    async findById(id) {
        const data = await this.serviceCategoryService.findById(id);
        return this.success(data, 'Categoria de serviço encontrada com sucesso');
    }
    async findMany(search) {
        const data = await this.serviceCategoryService.findMany(search);
        return this.success(data, 'Categorias de serviço listadas com sucesso');
    }
};
exports.ServiceCategoryController = ServiceCategoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [service_category_dto_1.CreateServiceCategoryDto]),
    __metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, service_category_dto_1.UpdateServiceCategoryDto]),
    __metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiceCategoryController.prototype, "findMany", null);
exports.ServiceCategoryController = ServiceCategoryController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [service_category_service_1.ServiceCategoryService])
], ServiceCategoryController);
//# sourceMappingURL=service-category.controller.js.map