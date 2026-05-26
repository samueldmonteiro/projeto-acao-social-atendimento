import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Beneficiary: "Beneficiary";
    readonly ServiceCategory: "ServiceCategory";
    readonly BeneficiaryCategory: "BeneficiaryCategory";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly password: "password";
    readonly role: "role";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const BeneficiaryScalarFieldEnum: {
    readonly id: "id";
    readonly fullName: "fullName";
    readonly cpf: "cpf";
    readonly email: "email";
    readonly phone: "phone";
    readonly birthDate: "birthDate";
    readonly gender: "gender";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BeneficiaryScalarFieldEnum = (typeof BeneficiaryScalarFieldEnum)[keyof typeof BeneficiaryScalarFieldEnum];
export declare const ServiceCategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly prefix: "prefix";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ServiceCategoryScalarFieldEnum = (typeof ServiceCategoryScalarFieldEnum)[keyof typeof ServiceCategoryScalarFieldEnum];
export declare const BeneficiaryCategoryScalarFieldEnum: {
    readonly beneficiaryId: "beneficiaryId";
    readonly serviceCategoryId: "serviceCategoryId";
    readonly callCode: "callCode";
    readonly createdAt: "createdAt";
};
export type BeneficiaryCategoryScalarFieldEnum = (typeof BeneficiaryCategoryScalarFieldEnum)[keyof typeof BeneficiaryCategoryScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
