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
exports.AppointmentController = void 0;
const common_1 = require("@nestjs/common");
const base_controller_1 = require("./base.controller");
const appointment_service_1 = require("../../services/appointment.service");
const export_service_1 = require("../../services/export.service");
const jwt_guard_1 = require("../../auth/jwt.guard");
const appointment_dto_1 = require("../dtos/appointment.dto");
let AppointmentController = class AppointmentController extends base_controller_1.BaseController {
    appointmentService;
    exportService;
    constructor(appointmentService, exportService) {
        super();
        this.appointmentService = appointmentService;
        this.exportService = exportService;
    }
    async export(res) {
        const buffer = await this.exportService.generateAppointmentsExcel();
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="atendimentos.xlsx"');
        res.send(buffer);
    }
    async findMany(search, categoryId, page, perPage, priority, canceled, started, finished) {
        const data = await this.appointmentService.findMany({
            search,
            categoryId,
            page: page ? Number(page) : 1,
            perPage: perPage ? Number(perPage) : 10,
            priority: priority !== undefined ? priority === 'true' : undefined,
            canceled: canceled !== undefined ? canceled === 'true' : undefined,
            started: started !== undefined ? started === 'true' : undefined,
            finished: finished !== undefined ? finished === 'true' : undefined,
        });
        return this.success(data, 'Atendimentos listados com sucesso');
    }
    async create(body) {
        const data = await this.appointmentService.create(body);
        return this.created(data, 'Atendimento criado com sucesso');
    }
    async update(beneficiaryId, serviceCategoryId, body) {
        const data = await this.appointmentService.update(beneficiaryId, serviceCategoryId, {
            ...body,
            startedAt: body.startedAt ? new Date(body.startedAt) : undefined,
            finishedAt: body.finishedAt ? new Date(body.finishedAt) : undefined,
        });
        return this.success(data, 'Atendimento atualizado com sucesso');
    }
    async delete(beneficiaryId, serviceCategoryId) {
        await this.appointmentService.delete(beneficiaryId, serviceCategoryId);
        return this.success(null, 'Atendimento excluído com sucesso');
    }
};
exports.AppointmentController = AppointmentController;
__decorate([
    (0, common_1.Get)('export'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "export", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('categoryId')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('perPage')),
    __param(4, (0, common_1.Query)('priority')),
    __param(5, (0, common_1.Query)('canceled')),
    __param(6, (0, common_1.Query)('started')),
    __param(7, (0, common_1.Query)('finished')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "findMany", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointment_dto_1.CreateAppointmentDto]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':beneficiaryId/:serviceCategoryId'),
    __param(0, (0, common_1.Param)('beneficiaryId')),
    __param(1, (0, common_1.Param)('serviceCategoryId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, appointment_dto_1.UpdateAppointmentDto]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':beneficiaryId/:serviceCategoryId'),
    __param(0, (0, common_1.Param)('beneficiaryId')),
    __param(1, (0, common_1.Param)('serviceCategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "delete", null);
exports.AppointmentController = AppointmentController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('appointments'),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService,
        export_service_1.ExportService])
], AppointmentController);
//# sourceMappingURL=appointment.controller.js.map