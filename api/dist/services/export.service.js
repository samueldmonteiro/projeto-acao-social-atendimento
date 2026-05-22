"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../lib/prisma");
const ExcelJS = __importStar(require("exceljs"));
let ExportService = class ExportService {
    async generateBeneficiariesExcel() {
        const beneficiaries = await prisma_1.prisma.beneficiary.findMany({
            include: {
                categories: {
                    select: {
                        serviceCategory: {
                            select: { name: true },
                        },
                    },
                },
            },
            orderBy: { fullName: 'asc' },
        });
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Sistema de Atendimento Social';
        workbook.created = new Date();
        const worksheet = workbook.addWorksheet('Beneficiários');
        worksheet.columns = [
            { header: 'Nome Completo', key: 'fullName', width: 35 },
            { header: 'CPF', key: 'cpf', width: 18 },
            { header: 'E-mail', key: 'email', width: 35 },
            { header: 'Telefone', key: 'phone', width: 18 },
            { header: 'Data de Nascimento', key: 'birthDate', width: 18 },
            { header: 'Gênero', key: 'gender', width: 12 },
            { header: 'Categorias', key: 'categories', width: 40 },
        ];
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF2F5496' },
        };
        headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
        headerRow.height = 25;
        const genderMap = {
            MALE: 'Masculino',
            FEMALE: 'Feminino',
            OTHER: 'Outro',
        };
        for (const beneficiary of beneficiaries) {
            const categoryNames = beneficiary.categories
                .map((c) => c.serviceCategory.name)
                .join(', ');
            worksheet.addRow({
                fullName: beneficiary.fullName,
                cpf: beneficiary.cpf,
                email: beneficiary.email || '',
                phone: beneficiary.phone || '',
                birthDate: beneficiary.birthDate.toLocaleDateString('pt-BR'),
                gender: genderMap[beneficiary.gender] || beneficiary.gender,
                categories: categoryNames,
            });
        }
        worksheet.autoFilter = {
            from: { row: 1, column: 1 },
            to: { row: 1, column: 7 },
        };
        return workbook.xlsx.writeBuffer();
    }
};
exports.ExportService = ExportService;
exports.ExportService = ExportService = __decorate([
    (0, common_1.Injectable)()
], ExportService);
//# sourceMappingURL=export.service.js.map