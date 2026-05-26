import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BeneficiaryCategoryModel = runtime.Types.Result.DefaultSelection<Prisma.$BeneficiaryCategoryPayload>;
export type AggregateBeneficiaryCategory = {
    _count: BeneficiaryCategoryCountAggregateOutputType | null;
    _min: BeneficiaryCategoryMinAggregateOutputType | null;
    _max: BeneficiaryCategoryMaxAggregateOutputType | null;
};
export type BeneficiaryCategoryMinAggregateOutputType = {
    beneficiaryId: string | null;
    serviceCategoryId: string | null;
    callCode: string | null;
    createdAt: Date | null;
};
export type BeneficiaryCategoryMaxAggregateOutputType = {
    beneficiaryId: string | null;
    serviceCategoryId: string | null;
    callCode: string | null;
    createdAt: Date | null;
};
export type BeneficiaryCategoryCountAggregateOutputType = {
    beneficiaryId: number;
    serviceCategoryId: number;
    callCode: number;
    createdAt: number;
    _all: number;
};
export type BeneficiaryCategoryMinAggregateInputType = {
    beneficiaryId?: true;
    serviceCategoryId?: true;
    callCode?: true;
    createdAt?: true;
};
export type BeneficiaryCategoryMaxAggregateInputType = {
    beneficiaryId?: true;
    serviceCategoryId?: true;
    callCode?: true;
    createdAt?: true;
};
export type BeneficiaryCategoryCountAggregateInputType = {
    beneficiaryId?: true;
    serviceCategoryId?: true;
    callCode?: true;
    createdAt?: true;
    _all?: true;
};
export type BeneficiaryCategoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BeneficiaryCategoryWhereInput;
    orderBy?: Prisma.BeneficiaryCategoryOrderByWithRelationInput | Prisma.BeneficiaryCategoryOrderByWithRelationInput[];
    cursor?: Prisma.BeneficiaryCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BeneficiaryCategoryCountAggregateInputType;
    _min?: BeneficiaryCategoryMinAggregateInputType;
    _max?: BeneficiaryCategoryMaxAggregateInputType;
};
export type GetBeneficiaryCategoryAggregateType<T extends BeneficiaryCategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateBeneficiaryCategory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBeneficiaryCategory[P]> : Prisma.GetScalarType<T[P], AggregateBeneficiaryCategory[P]>;
};
export type BeneficiaryCategoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BeneficiaryCategoryWhereInput;
    orderBy?: Prisma.BeneficiaryCategoryOrderByWithAggregationInput | Prisma.BeneficiaryCategoryOrderByWithAggregationInput[];
    by: Prisma.BeneficiaryCategoryScalarFieldEnum[] | Prisma.BeneficiaryCategoryScalarFieldEnum;
    having?: Prisma.BeneficiaryCategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BeneficiaryCategoryCountAggregateInputType | true;
    _min?: BeneficiaryCategoryMinAggregateInputType;
    _max?: BeneficiaryCategoryMaxAggregateInputType;
};
export type BeneficiaryCategoryGroupByOutputType = {
    beneficiaryId: string;
    serviceCategoryId: string;
    callCode: string;
    createdAt: Date;
    _count: BeneficiaryCategoryCountAggregateOutputType | null;
    _min: BeneficiaryCategoryMinAggregateOutputType | null;
    _max: BeneficiaryCategoryMaxAggregateOutputType | null;
};
export type GetBeneficiaryCategoryGroupByPayload<T extends BeneficiaryCategoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BeneficiaryCategoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BeneficiaryCategoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BeneficiaryCategoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BeneficiaryCategoryGroupByOutputType[P]>;
}>>;
export type BeneficiaryCategoryWhereInput = {
    AND?: Prisma.BeneficiaryCategoryWhereInput | Prisma.BeneficiaryCategoryWhereInput[];
    OR?: Prisma.BeneficiaryCategoryWhereInput[];
    NOT?: Prisma.BeneficiaryCategoryWhereInput | Prisma.BeneficiaryCategoryWhereInput[];
    beneficiaryId?: Prisma.StringFilter<"BeneficiaryCategory"> | string;
    serviceCategoryId?: Prisma.StringFilter<"BeneficiaryCategory"> | string;
    callCode?: Prisma.StringFilter<"BeneficiaryCategory"> | string;
    createdAt?: Prisma.DateTimeFilter<"BeneficiaryCategory"> | Date | string;
    beneficiary?: Prisma.XOR<Prisma.BeneficiaryScalarRelationFilter, Prisma.BeneficiaryWhereInput>;
    serviceCategory?: Prisma.XOR<Prisma.ServiceCategoryScalarRelationFilter, Prisma.ServiceCategoryWhereInput>;
};
export type BeneficiaryCategoryOrderByWithRelationInput = {
    beneficiaryId?: Prisma.SortOrder;
    serviceCategoryId?: Prisma.SortOrder;
    callCode?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    beneficiary?: Prisma.BeneficiaryOrderByWithRelationInput;
    serviceCategory?: Prisma.ServiceCategoryOrderByWithRelationInput;
};
export type BeneficiaryCategoryWhereUniqueInput = Prisma.AtLeast<{
    callCode?: string;
    beneficiaryId_serviceCategoryId?: Prisma.BeneficiaryCategoryBeneficiaryIdServiceCategoryIdCompoundUniqueInput;
    AND?: Prisma.BeneficiaryCategoryWhereInput | Prisma.BeneficiaryCategoryWhereInput[];
    OR?: Prisma.BeneficiaryCategoryWhereInput[];
    NOT?: Prisma.BeneficiaryCategoryWhereInput | Prisma.BeneficiaryCategoryWhereInput[];
    beneficiaryId?: Prisma.StringFilter<"BeneficiaryCategory"> | string;
    serviceCategoryId?: Prisma.StringFilter<"BeneficiaryCategory"> | string;
    createdAt?: Prisma.DateTimeFilter<"BeneficiaryCategory"> | Date | string;
    beneficiary?: Prisma.XOR<Prisma.BeneficiaryScalarRelationFilter, Prisma.BeneficiaryWhereInput>;
    serviceCategory?: Prisma.XOR<Prisma.ServiceCategoryScalarRelationFilter, Prisma.ServiceCategoryWhereInput>;
}, "beneficiaryId_serviceCategoryId" | "callCode">;
export type BeneficiaryCategoryOrderByWithAggregationInput = {
    beneficiaryId?: Prisma.SortOrder;
    serviceCategoryId?: Prisma.SortOrder;
    callCode?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.BeneficiaryCategoryCountOrderByAggregateInput;
    _max?: Prisma.BeneficiaryCategoryMaxOrderByAggregateInput;
    _min?: Prisma.BeneficiaryCategoryMinOrderByAggregateInput;
};
export type BeneficiaryCategoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.BeneficiaryCategoryScalarWhereWithAggregatesInput | Prisma.BeneficiaryCategoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.BeneficiaryCategoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BeneficiaryCategoryScalarWhereWithAggregatesInput | Prisma.BeneficiaryCategoryScalarWhereWithAggregatesInput[];
    beneficiaryId?: Prisma.StringWithAggregatesFilter<"BeneficiaryCategory"> | string;
    serviceCategoryId?: Prisma.StringWithAggregatesFilter<"BeneficiaryCategory"> | string;
    callCode?: Prisma.StringWithAggregatesFilter<"BeneficiaryCategory"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"BeneficiaryCategory"> | Date | string;
};
export type BeneficiaryCategoryCreateInput = {
    callCode: string;
    createdAt?: Date | string;
    beneficiary: Prisma.BeneficiaryCreateNestedOneWithoutCategoriesInput;
    serviceCategory: Prisma.ServiceCategoryCreateNestedOneWithoutBeneficiariesInput;
};
export type BeneficiaryCategoryUncheckedCreateInput = {
    beneficiaryId: string;
    serviceCategoryId: string;
    callCode: string;
    createdAt?: Date | string;
};
export type BeneficiaryCategoryUpdateInput = {
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    beneficiary?: Prisma.BeneficiaryUpdateOneRequiredWithoutCategoriesNestedInput;
    serviceCategory?: Prisma.ServiceCategoryUpdateOneRequiredWithoutBeneficiariesNestedInput;
};
export type BeneficiaryCategoryUncheckedUpdateInput = {
    beneficiaryId?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceCategoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BeneficiaryCategoryCreateManyInput = {
    beneficiaryId: string;
    serviceCategoryId: string;
    callCode: string;
    createdAt?: Date | string;
};
export type BeneficiaryCategoryUpdateManyMutationInput = {
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BeneficiaryCategoryUncheckedUpdateManyInput = {
    beneficiaryId?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceCategoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BeneficiaryCategoryListRelationFilter = {
    every?: Prisma.BeneficiaryCategoryWhereInput;
    some?: Prisma.BeneficiaryCategoryWhereInput;
    none?: Prisma.BeneficiaryCategoryWhereInput;
};
export type BeneficiaryCategoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BeneficiaryCategoryBeneficiaryIdServiceCategoryIdCompoundUniqueInput = {
    beneficiaryId: string;
    serviceCategoryId: string;
};
export type BeneficiaryCategoryCountOrderByAggregateInput = {
    beneficiaryId?: Prisma.SortOrder;
    serviceCategoryId?: Prisma.SortOrder;
    callCode?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BeneficiaryCategoryMaxOrderByAggregateInput = {
    beneficiaryId?: Prisma.SortOrder;
    serviceCategoryId?: Prisma.SortOrder;
    callCode?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BeneficiaryCategoryMinOrderByAggregateInput = {
    beneficiaryId?: Prisma.SortOrder;
    serviceCategoryId?: Prisma.SortOrder;
    callCode?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BeneficiaryCategoryCreateNestedManyWithoutBeneficiaryInput = {
    create?: Prisma.XOR<Prisma.BeneficiaryCategoryCreateWithoutBeneficiaryInput, Prisma.BeneficiaryCategoryUncheckedCreateWithoutBeneficiaryInput> | Prisma.BeneficiaryCategoryCreateWithoutBeneficiaryInput[] | Prisma.BeneficiaryCategoryUncheckedCreateWithoutBeneficiaryInput[];
    connectOrCreate?: Prisma.BeneficiaryCategoryCreateOrConnectWithoutBeneficiaryInput | Prisma.BeneficiaryCategoryCreateOrConnectWithoutBeneficiaryInput[];
    createMany?: Prisma.BeneficiaryCategoryCreateManyBeneficiaryInputEnvelope;
    connect?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
};
export type BeneficiaryCategoryUncheckedCreateNestedManyWithoutBeneficiaryInput = {
    create?: Prisma.XOR<Prisma.BeneficiaryCategoryCreateWithoutBeneficiaryInput, Prisma.BeneficiaryCategoryUncheckedCreateWithoutBeneficiaryInput> | Prisma.BeneficiaryCategoryCreateWithoutBeneficiaryInput[] | Prisma.BeneficiaryCategoryUncheckedCreateWithoutBeneficiaryInput[];
    connectOrCreate?: Prisma.BeneficiaryCategoryCreateOrConnectWithoutBeneficiaryInput | Prisma.BeneficiaryCategoryCreateOrConnectWithoutBeneficiaryInput[];
    createMany?: Prisma.BeneficiaryCategoryCreateManyBeneficiaryInputEnvelope;
    connect?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
};
export type BeneficiaryCategoryUpdateManyWithoutBeneficiaryNestedInput = {
    create?: Prisma.XOR<Prisma.BeneficiaryCategoryCreateWithoutBeneficiaryInput, Prisma.BeneficiaryCategoryUncheckedCreateWithoutBeneficiaryInput> | Prisma.BeneficiaryCategoryCreateWithoutBeneficiaryInput[] | Prisma.BeneficiaryCategoryUncheckedCreateWithoutBeneficiaryInput[];
    connectOrCreate?: Prisma.BeneficiaryCategoryCreateOrConnectWithoutBeneficiaryInput | Prisma.BeneficiaryCategoryCreateOrConnectWithoutBeneficiaryInput[];
    upsert?: Prisma.BeneficiaryCategoryUpsertWithWhereUniqueWithoutBeneficiaryInput | Prisma.BeneficiaryCategoryUpsertWithWhereUniqueWithoutBeneficiaryInput[];
    createMany?: Prisma.BeneficiaryCategoryCreateManyBeneficiaryInputEnvelope;
    set?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
    disconnect?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
    delete?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
    connect?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
    update?: Prisma.BeneficiaryCategoryUpdateWithWhereUniqueWithoutBeneficiaryInput | Prisma.BeneficiaryCategoryUpdateWithWhereUniqueWithoutBeneficiaryInput[];
    updateMany?: Prisma.BeneficiaryCategoryUpdateManyWithWhereWithoutBeneficiaryInput | Prisma.BeneficiaryCategoryUpdateManyWithWhereWithoutBeneficiaryInput[];
    deleteMany?: Prisma.BeneficiaryCategoryScalarWhereInput | Prisma.BeneficiaryCategoryScalarWhereInput[];
};
export type BeneficiaryCategoryUncheckedUpdateManyWithoutBeneficiaryNestedInput = {
    create?: Prisma.XOR<Prisma.BeneficiaryCategoryCreateWithoutBeneficiaryInput, Prisma.BeneficiaryCategoryUncheckedCreateWithoutBeneficiaryInput> | Prisma.BeneficiaryCategoryCreateWithoutBeneficiaryInput[] | Prisma.BeneficiaryCategoryUncheckedCreateWithoutBeneficiaryInput[];
    connectOrCreate?: Prisma.BeneficiaryCategoryCreateOrConnectWithoutBeneficiaryInput | Prisma.BeneficiaryCategoryCreateOrConnectWithoutBeneficiaryInput[];
    upsert?: Prisma.BeneficiaryCategoryUpsertWithWhereUniqueWithoutBeneficiaryInput | Prisma.BeneficiaryCategoryUpsertWithWhereUniqueWithoutBeneficiaryInput[];
    createMany?: Prisma.BeneficiaryCategoryCreateManyBeneficiaryInputEnvelope;
    set?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
    disconnect?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
    delete?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
    connect?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
    update?: Prisma.BeneficiaryCategoryUpdateWithWhereUniqueWithoutBeneficiaryInput | Prisma.BeneficiaryCategoryUpdateWithWhereUniqueWithoutBeneficiaryInput[];
    updateMany?: Prisma.BeneficiaryCategoryUpdateManyWithWhereWithoutBeneficiaryInput | Prisma.BeneficiaryCategoryUpdateManyWithWhereWithoutBeneficiaryInput[];
    deleteMany?: Prisma.BeneficiaryCategoryScalarWhereInput | Prisma.BeneficiaryCategoryScalarWhereInput[];
};
export type BeneficiaryCategoryCreateNestedManyWithoutServiceCategoryInput = {
    create?: Prisma.XOR<Prisma.BeneficiaryCategoryCreateWithoutServiceCategoryInput, Prisma.BeneficiaryCategoryUncheckedCreateWithoutServiceCategoryInput> | Prisma.BeneficiaryCategoryCreateWithoutServiceCategoryInput[] | Prisma.BeneficiaryCategoryUncheckedCreateWithoutServiceCategoryInput[];
    connectOrCreate?: Prisma.BeneficiaryCategoryCreateOrConnectWithoutServiceCategoryInput | Prisma.BeneficiaryCategoryCreateOrConnectWithoutServiceCategoryInput[];
    createMany?: Prisma.BeneficiaryCategoryCreateManyServiceCategoryInputEnvelope;
    connect?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
};
export type BeneficiaryCategoryUncheckedCreateNestedManyWithoutServiceCategoryInput = {
    create?: Prisma.XOR<Prisma.BeneficiaryCategoryCreateWithoutServiceCategoryInput, Prisma.BeneficiaryCategoryUncheckedCreateWithoutServiceCategoryInput> | Prisma.BeneficiaryCategoryCreateWithoutServiceCategoryInput[] | Prisma.BeneficiaryCategoryUncheckedCreateWithoutServiceCategoryInput[];
    connectOrCreate?: Prisma.BeneficiaryCategoryCreateOrConnectWithoutServiceCategoryInput | Prisma.BeneficiaryCategoryCreateOrConnectWithoutServiceCategoryInput[];
    createMany?: Prisma.BeneficiaryCategoryCreateManyServiceCategoryInputEnvelope;
    connect?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
};
export type BeneficiaryCategoryUpdateManyWithoutServiceCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.BeneficiaryCategoryCreateWithoutServiceCategoryInput, Prisma.BeneficiaryCategoryUncheckedCreateWithoutServiceCategoryInput> | Prisma.BeneficiaryCategoryCreateWithoutServiceCategoryInput[] | Prisma.BeneficiaryCategoryUncheckedCreateWithoutServiceCategoryInput[];
    connectOrCreate?: Prisma.BeneficiaryCategoryCreateOrConnectWithoutServiceCategoryInput | Prisma.BeneficiaryCategoryCreateOrConnectWithoutServiceCategoryInput[];
    upsert?: Prisma.BeneficiaryCategoryUpsertWithWhereUniqueWithoutServiceCategoryInput | Prisma.BeneficiaryCategoryUpsertWithWhereUniqueWithoutServiceCategoryInput[];
    createMany?: Prisma.BeneficiaryCategoryCreateManyServiceCategoryInputEnvelope;
    set?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
    disconnect?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
    delete?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
    connect?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
    update?: Prisma.BeneficiaryCategoryUpdateWithWhereUniqueWithoutServiceCategoryInput | Prisma.BeneficiaryCategoryUpdateWithWhereUniqueWithoutServiceCategoryInput[];
    updateMany?: Prisma.BeneficiaryCategoryUpdateManyWithWhereWithoutServiceCategoryInput | Prisma.BeneficiaryCategoryUpdateManyWithWhereWithoutServiceCategoryInput[];
    deleteMany?: Prisma.BeneficiaryCategoryScalarWhereInput | Prisma.BeneficiaryCategoryScalarWhereInput[];
};
export type BeneficiaryCategoryUncheckedUpdateManyWithoutServiceCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.BeneficiaryCategoryCreateWithoutServiceCategoryInput, Prisma.BeneficiaryCategoryUncheckedCreateWithoutServiceCategoryInput> | Prisma.BeneficiaryCategoryCreateWithoutServiceCategoryInput[] | Prisma.BeneficiaryCategoryUncheckedCreateWithoutServiceCategoryInput[];
    connectOrCreate?: Prisma.BeneficiaryCategoryCreateOrConnectWithoutServiceCategoryInput | Prisma.BeneficiaryCategoryCreateOrConnectWithoutServiceCategoryInput[];
    upsert?: Prisma.BeneficiaryCategoryUpsertWithWhereUniqueWithoutServiceCategoryInput | Prisma.BeneficiaryCategoryUpsertWithWhereUniqueWithoutServiceCategoryInput[];
    createMany?: Prisma.BeneficiaryCategoryCreateManyServiceCategoryInputEnvelope;
    set?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
    disconnect?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
    delete?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
    connect?: Prisma.BeneficiaryCategoryWhereUniqueInput | Prisma.BeneficiaryCategoryWhereUniqueInput[];
    update?: Prisma.BeneficiaryCategoryUpdateWithWhereUniqueWithoutServiceCategoryInput | Prisma.BeneficiaryCategoryUpdateWithWhereUniqueWithoutServiceCategoryInput[];
    updateMany?: Prisma.BeneficiaryCategoryUpdateManyWithWhereWithoutServiceCategoryInput | Prisma.BeneficiaryCategoryUpdateManyWithWhereWithoutServiceCategoryInput[];
    deleteMany?: Prisma.BeneficiaryCategoryScalarWhereInput | Prisma.BeneficiaryCategoryScalarWhereInput[];
};
export type BeneficiaryCategoryCreateWithoutBeneficiaryInput = {
    callCode: string;
    createdAt?: Date | string;
    serviceCategory: Prisma.ServiceCategoryCreateNestedOneWithoutBeneficiariesInput;
};
export type BeneficiaryCategoryUncheckedCreateWithoutBeneficiaryInput = {
    serviceCategoryId: string;
    callCode: string;
    createdAt?: Date | string;
};
export type BeneficiaryCategoryCreateOrConnectWithoutBeneficiaryInput = {
    where: Prisma.BeneficiaryCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.BeneficiaryCategoryCreateWithoutBeneficiaryInput, Prisma.BeneficiaryCategoryUncheckedCreateWithoutBeneficiaryInput>;
};
export type BeneficiaryCategoryCreateManyBeneficiaryInputEnvelope = {
    data: Prisma.BeneficiaryCategoryCreateManyBeneficiaryInput | Prisma.BeneficiaryCategoryCreateManyBeneficiaryInput[];
    skipDuplicates?: boolean;
};
export type BeneficiaryCategoryUpsertWithWhereUniqueWithoutBeneficiaryInput = {
    where: Prisma.BeneficiaryCategoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.BeneficiaryCategoryUpdateWithoutBeneficiaryInput, Prisma.BeneficiaryCategoryUncheckedUpdateWithoutBeneficiaryInput>;
    create: Prisma.XOR<Prisma.BeneficiaryCategoryCreateWithoutBeneficiaryInput, Prisma.BeneficiaryCategoryUncheckedCreateWithoutBeneficiaryInput>;
};
export type BeneficiaryCategoryUpdateWithWhereUniqueWithoutBeneficiaryInput = {
    where: Prisma.BeneficiaryCategoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.BeneficiaryCategoryUpdateWithoutBeneficiaryInput, Prisma.BeneficiaryCategoryUncheckedUpdateWithoutBeneficiaryInput>;
};
export type BeneficiaryCategoryUpdateManyWithWhereWithoutBeneficiaryInput = {
    where: Prisma.BeneficiaryCategoryScalarWhereInput;
    data: Prisma.XOR<Prisma.BeneficiaryCategoryUpdateManyMutationInput, Prisma.BeneficiaryCategoryUncheckedUpdateManyWithoutBeneficiaryInput>;
};
export type BeneficiaryCategoryScalarWhereInput = {
    AND?: Prisma.BeneficiaryCategoryScalarWhereInput | Prisma.BeneficiaryCategoryScalarWhereInput[];
    OR?: Prisma.BeneficiaryCategoryScalarWhereInput[];
    NOT?: Prisma.BeneficiaryCategoryScalarWhereInput | Prisma.BeneficiaryCategoryScalarWhereInput[];
    beneficiaryId?: Prisma.StringFilter<"BeneficiaryCategory"> | string;
    serviceCategoryId?: Prisma.StringFilter<"BeneficiaryCategory"> | string;
    callCode?: Prisma.StringFilter<"BeneficiaryCategory"> | string;
    createdAt?: Prisma.DateTimeFilter<"BeneficiaryCategory"> | Date | string;
};
export type BeneficiaryCategoryCreateWithoutServiceCategoryInput = {
    callCode: string;
    createdAt?: Date | string;
    beneficiary: Prisma.BeneficiaryCreateNestedOneWithoutCategoriesInput;
};
export type BeneficiaryCategoryUncheckedCreateWithoutServiceCategoryInput = {
    beneficiaryId: string;
    callCode: string;
    createdAt?: Date | string;
};
export type BeneficiaryCategoryCreateOrConnectWithoutServiceCategoryInput = {
    where: Prisma.BeneficiaryCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.BeneficiaryCategoryCreateWithoutServiceCategoryInput, Prisma.BeneficiaryCategoryUncheckedCreateWithoutServiceCategoryInput>;
};
export type BeneficiaryCategoryCreateManyServiceCategoryInputEnvelope = {
    data: Prisma.BeneficiaryCategoryCreateManyServiceCategoryInput | Prisma.BeneficiaryCategoryCreateManyServiceCategoryInput[];
    skipDuplicates?: boolean;
};
export type BeneficiaryCategoryUpsertWithWhereUniqueWithoutServiceCategoryInput = {
    where: Prisma.BeneficiaryCategoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.BeneficiaryCategoryUpdateWithoutServiceCategoryInput, Prisma.BeneficiaryCategoryUncheckedUpdateWithoutServiceCategoryInput>;
    create: Prisma.XOR<Prisma.BeneficiaryCategoryCreateWithoutServiceCategoryInput, Prisma.BeneficiaryCategoryUncheckedCreateWithoutServiceCategoryInput>;
};
export type BeneficiaryCategoryUpdateWithWhereUniqueWithoutServiceCategoryInput = {
    where: Prisma.BeneficiaryCategoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.BeneficiaryCategoryUpdateWithoutServiceCategoryInput, Prisma.BeneficiaryCategoryUncheckedUpdateWithoutServiceCategoryInput>;
};
export type BeneficiaryCategoryUpdateManyWithWhereWithoutServiceCategoryInput = {
    where: Prisma.BeneficiaryCategoryScalarWhereInput;
    data: Prisma.XOR<Prisma.BeneficiaryCategoryUpdateManyMutationInput, Prisma.BeneficiaryCategoryUncheckedUpdateManyWithoutServiceCategoryInput>;
};
export type BeneficiaryCategoryCreateManyBeneficiaryInput = {
    serviceCategoryId: string;
    callCode: string;
    createdAt?: Date | string;
};
export type BeneficiaryCategoryUpdateWithoutBeneficiaryInput = {
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serviceCategory?: Prisma.ServiceCategoryUpdateOneRequiredWithoutBeneficiariesNestedInput;
};
export type BeneficiaryCategoryUncheckedUpdateWithoutBeneficiaryInput = {
    serviceCategoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BeneficiaryCategoryUncheckedUpdateManyWithoutBeneficiaryInput = {
    serviceCategoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BeneficiaryCategoryCreateManyServiceCategoryInput = {
    beneficiaryId: string;
    callCode: string;
    createdAt?: Date | string;
};
export type BeneficiaryCategoryUpdateWithoutServiceCategoryInput = {
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    beneficiary?: Prisma.BeneficiaryUpdateOneRequiredWithoutCategoriesNestedInput;
};
export type BeneficiaryCategoryUncheckedUpdateWithoutServiceCategoryInput = {
    beneficiaryId?: Prisma.StringFieldUpdateOperationsInput | string;
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BeneficiaryCategoryUncheckedUpdateManyWithoutServiceCategoryInput = {
    beneficiaryId?: Prisma.StringFieldUpdateOperationsInput | string;
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BeneficiaryCategorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    beneficiaryId?: boolean;
    serviceCategoryId?: boolean;
    callCode?: boolean;
    createdAt?: boolean;
    beneficiary?: boolean | Prisma.BeneficiaryDefaultArgs<ExtArgs>;
    serviceCategory?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["beneficiaryCategory"]>;
export type BeneficiaryCategorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    beneficiaryId?: boolean;
    serviceCategoryId?: boolean;
    callCode?: boolean;
    createdAt?: boolean;
    beneficiary?: boolean | Prisma.BeneficiaryDefaultArgs<ExtArgs>;
    serviceCategory?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["beneficiaryCategory"]>;
export type BeneficiaryCategorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    beneficiaryId?: boolean;
    serviceCategoryId?: boolean;
    callCode?: boolean;
    createdAt?: boolean;
    beneficiary?: boolean | Prisma.BeneficiaryDefaultArgs<ExtArgs>;
    serviceCategory?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["beneficiaryCategory"]>;
export type BeneficiaryCategorySelectScalar = {
    beneficiaryId?: boolean;
    serviceCategoryId?: boolean;
    callCode?: boolean;
    createdAt?: boolean;
};
export type BeneficiaryCategoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"beneficiaryId" | "serviceCategoryId" | "callCode" | "createdAt", ExtArgs["result"]["beneficiaryCategory"]>;
export type BeneficiaryCategoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    beneficiary?: boolean | Prisma.BeneficiaryDefaultArgs<ExtArgs>;
    serviceCategory?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
};
export type BeneficiaryCategoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    beneficiary?: boolean | Prisma.BeneficiaryDefaultArgs<ExtArgs>;
    serviceCategory?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
};
export type BeneficiaryCategoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    beneficiary?: boolean | Prisma.BeneficiaryDefaultArgs<ExtArgs>;
    serviceCategory?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
};
export type $BeneficiaryCategoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BeneficiaryCategory";
    objects: {
        beneficiary: Prisma.$BeneficiaryPayload<ExtArgs>;
        serviceCategory: Prisma.$ServiceCategoryPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        beneficiaryId: string;
        serviceCategoryId: string;
        callCode: string;
        createdAt: Date;
    }, ExtArgs["result"]["beneficiaryCategory"]>;
    composites: {};
};
export type BeneficiaryCategoryGetPayload<S extends boolean | null | undefined | BeneficiaryCategoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BeneficiaryCategoryPayload, S>;
export type BeneficiaryCategoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BeneficiaryCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BeneficiaryCategoryCountAggregateInputType | true;
};
export interface BeneficiaryCategoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BeneficiaryCategory'];
        meta: {
            name: 'BeneficiaryCategory';
        };
    };
    findUnique<T extends BeneficiaryCategoryFindUniqueArgs>(args: Prisma.SelectSubset<T, BeneficiaryCategoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryCategoryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BeneficiaryCategoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BeneficiaryCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryCategoryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BeneficiaryCategoryFindFirstArgs>(args?: Prisma.SelectSubset<T, BeneficiaryCategoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryCategoryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BeneficiaryCategoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BeneficiaryCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryCategoryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BeneficiaryCategoryFindManyArgs>(args?: Prisma.SelectSubset<T, BeneficiaryCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BeneficiaryCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BeneficiaryCategoryCreateArgs>(args: Prisma.SelectSubset<T, BeneficiaryCategoryCreateArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryCategoryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BeneficiaryCategoryCreateManyArgs>(args?: Prisma.SelectSubset<T, BeneficiaryCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BeneficiaryCategoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BeneficiaryCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BeneficiaryCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BeneficiaryCategoryDeleteArgs>(args: Prisma.SelectSubset<T, BeneficiaryCategoryDeleteArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryCategoryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BeneficiaryCategoryUpdateArgs>(args: Prisma.SelectSubset<T, BeneficiaryCategoryUpdateArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryCategoryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BeneficiaryCategoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, BeneficiaryCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BeneficiaryCategoryUpdateManyArgs>(args: Prisma.SelectSubset<T, BeneficiaryCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BeneficiaryCategoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BeneficiaryCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BeneficiaryCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BeneficiaryCategoryUpsertArgs>(args: Prisma.SelectSubset<T, BeneficiaryCategoryUpsertArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryCategoryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BeneficiaryCategoryCountArgs>(args?: Prisma.Subset<T, BeneficiaryCategoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BeneficiaryCategoryCountAggregateOutputType> : number>;
    aggregate<T extends BeneficiaryCategoryAggregateArgs>(args: Prisma.Subset<T, BeneficiaryCategoryAggregateArgs>): Prisma.PrismaPromise<GetBeneficiaryCategoryAggregateType<T>>;
    groupBy<T extends BeneficiaryCategoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BeneficiaryCategoryGroupByArgs['orderBy'];
    } : {
        orderBy?: BeneficiaryCategoryGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BeneficiaryCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBeneficiaryCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BeneficiaryCategoryFieldRefs;
}
export interface Prisma__BeneficiaryCategoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    beneficiary<T extends Prisma.BeneficiaryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BeneficiaryDefaultArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    serviceCategory<T extends Prisma.ServiceCategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ServiceCategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__ServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BeneficiaryCategoryFieldRefs {
    readonly beneficiaryId: Prisma.FieldRef<"BeneficiaryCategory", 'String'>;
    readonly serviceCategoryId: Prisma.FieldRef<"BeneficiaryCategory", 'String'>;
    readonly callCode: Prisma.FieldRef<"BeneficiaryCategory", 'String'>;
    readonly createdAt: Prisma.FieldRef<"BeneficiaryCategory", 'DateTime'>;
}
export type BeneficiaryCategoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiaryCategorySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryCategoryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryCategoryInclude<ExtArgs> | null;
    where: Prisma.BeneficiaryCategoryWhereUniqueInput;
};
export type BeneficiaryCategoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiaryCategorySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryCategoryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryCategoryInclude<ExtArgs> | null;
    where: Prisma.BeneficiaryCategoryWhereUniqueInput;
};
export type BeneficiaryCategoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiaryCategorySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryCategoryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryCategoryInclude<ExtArgs> | null;
    where?: Prisma.BeneficiaryCategoryWhereInput;
    orderBy?: Prisma.BeneficiaryCategoryOrderByWithRelationInput | Prisma.BeneficiaryCategoryOrderByWithRelationInput[];
    cursor?: Prisma.BeneficiaryCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BeneficiaryCategoryScalarFieldEnum | Prisma.BeneficiaryCategoryScalarFieldEnum[];
};
export type BeneficiaryCategoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiaryCategorySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryCategoryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryCategoryInclude<ExtArgs> | null;
    where?: Prisma.BeneficiaryCategoryWhereInput;
    orderBy?: Prisma.BeneficiaryCategoryOrderByWithRelationInput | Prisma.BeneficiaryCategoryOrderByWithRelationInput[];
    cursor?: Prisma.BeneficiaryCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BeneficiaryCategoryScalarFieldEnum | Prisma.BeneficiaryCategoryScalarFieldEnum[];
};
export type BeneficiaryCategoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiaryCategorySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryCategoryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryCategoryInclude<ExtArgs> | null;
    where?: Prisma.BeneficiaryCategoryWhereInput;
    orderBy?: Prisma.BeneficiaryCategoryOrderByWithRelationInput | Prisma.BeneficiaryCategoryOrderByWithRelationInput[];
    cursor?: Prisma.BeneficiaryCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BeneficiaryCategoryScalarFieldEnum | Prisma.BeneficiaryCategoryScalarFieldEnum[];
};
export type BeneficiaryCategoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiaryCategorySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryCategoryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryCategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BeneficiaryCategoryCreateInput, Prisma.BeneficiaryCategoryUncheckedCreateInput>;
};
export type BeneficiaryCategoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BeneficiaryCategoryCreateManyInput | Prisma.BeneficiaryCategoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BeneficiaryCategoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiaryCategorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BeneficiaryCategoryOmit<ExtArgs> | null;
    data: Prisma.BeneficiaryCategoryCreateManyInput | Prisma.BeneficiaryCategoryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BeneficiaryCategoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BeneficiaryCategoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiaryCategorySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryCategoryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryCategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BeneficiaryCategoryUpdateInput, Prisma.BeneficiaryCategoryUncheckedUpdateInput>;
    where: Prisma.BeneficiaryCategoryWhereUniqueInput;
};
export type BeneficiaryCategoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BeneficiaryCategoryUpdateManyMutationInput, Prisma.BeneficiaryCategoryUncheckedUpdateManyInput>;
    where?: Prisma.BeneficiaryCategoryWhereInput;
    limit?: number;
};
export type BeneficiaryCategoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiaryCategorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BeneficiaryCategoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BeneficiaryCategoryUpdateManyMutationInput, Prisma.BeneficiaryCategoryUncheckedUpdateManyInput>;
    where?: Prisma.BeneficiaryCategoryWhereInput;
    limit?: number;
    include?: Prisma.BeneficiaryCategoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BeneficiaryCategoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiaryCategorySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryCategoryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryCategoryInclude<ExtArgs> | null;
    where: Prisma.BeneficiaryCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.BeneficiaryCategoryCreateInput, Prisma.BeneficiaryCategoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BeneficiaryCategoryUpdateInput, Prisma.BeneficiaryCategoryUncheckedUpdateInput>;
};
export type BeneficiaryCategoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiaryCategorySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryCategoryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryCategoryInclude<ExtArgs> | null;
    where: Prisma.BeneficiaryCategoryWhereUniqueInput;
};
export type BeneficiaryCategoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BeneficiaryCategoryWhereInput;
    limit?: number;
};
export type BeneficiaryCategoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiaryCategorySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryCategoryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryCategoryInclude<ExtArgs> | null;
};
