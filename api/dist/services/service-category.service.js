"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../lib/prisma");
const service_category_not_found_error_1 = require("../errors/service-category-not-found.error");
const service_category_already_exists_error_1 = require("../errors/service-category-already-exists.error");
let ServiceCategoryService = class ServiceCategoryService {
    async create(data) {
        const exists = await prisma_1.prisma.serviceCategory.findUnique({
            where: { name: data.name },
        });
        if (exists) {
            throw new service_category_already_exists_error_1.ServiceCategoryAlreadyExistsError();
        }
        const prefix = data.prefix ?? data.name
            .split(' ')
            .map(w => w[0])
            .join('')
            .toUpperCase()
            .slice(0, 5);
        return await prisma_1.prisma.serviceCategory.create({
            data: {
                name: data.name,
                prefix,
            },
        });
    }
    async update(id, data) {
        const category = await prisma_1.prisma.serviceCategory.findUnique({
            where: { id },
        });
        if (!category) {
            throw new service_category_not_found_error_1.ServiceCategoryNotFoundError();
        }
        if (data.name && data.name !== category.name) {
            const exists = await prisma_1.prisma.serviceCategory.findUnique({
                where: { name: data.name },
            });
            if (exists) {
                throw new service_category_already_exists_error_1.ServiceCategoryAlreadyExistsError();
            }
        }
        const updateData = {};
        if (data.name)
            updateData.name = data.name;
        if (data.prefix)
            updateData.prefix = data.prefix;
        return await prisma_1.prisma.serviceCategory.update({
            where: { id },
            data: updateData,
        });
    }
    async delete(id) {
        const category = await prisma_1.prisma.serviceCategory.findUnique({
            where: { id },
        });
        if (!category) {
            throw new service_category_not_found_error_1.ServiceCategoryNotFoundError();
        }
        await prisma_1.prisma.serviceCategory.delete({
            where: { id },
        });
    }
    async findById(id) {
        const category = await prisma_1.prisma.serviceCategory.findUnique({
            where: { id },
        });
        if (!category) {
            throw new service_category_not_found_error_1.ServiceCategoryNotFoundError();
        }
        return category;
    }
    async findMany(search) {
        return await prisma_1.prisma.serviceCategory.findMany({
            where: search
                ? {
                    name: {
                        contains: search,
                        mode: 'insensitive',
                    },
                }
                : undefined,
            orderBy: {
                name: 'asc',
            },
        });
    }
};
exports.ServiceCategoryService = ServiceCategoryService;
exports.ServiceCategoryService = ServiceCategoryService = __decorate([
    (0, common_1.Injectable)()
], ServiceCategoryService);
//# sourceMappingURL=service-category.service.js.map