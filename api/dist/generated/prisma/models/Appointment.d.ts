import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AppointmentModel = runtime.Types.Result.DefaultSelection<Prisma.$AppointmentPayload>;
export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null;
    _min: AppointmentMinAggregateOutputType | null;
    _max: AppointmentMaxAggregateOutputType | null;
};
export type AppointmentMinAggregateOutputType = {
    beneficiaryId: string | null;
    serviceCategoryId: string | null;
    callCode: string | null;
    priority: boolean | null;
    canceled: boolean | null;
    startedAt: Date | null;
    finishedAt: Date | null;
    createdAt: Date | null;
};
export type AppointmentMaxAggregateOutputType = {
    beneficiaryId: string | null;
    serviceCategoryId: string | null;
    callCode: string | null;
    priority: boolean | null;
    canceled: boolean | null;
    startedAt: Date | null;
    finishedAt: Date | null;
    createdAt: Date | null;
};
export type AppointmentCountAggregateOutputType = {
    beneficiaryId: number;
    serviceCategoryId: number;
    callCode: number;
    priority: number;
    canceled: number;
    startedAt: number;
    finishedAt: number;
    createdAt: number;
    _all: number;
};
export type AppointmentMinAggregateInputType = {
    beneficiaryId?: true;
    serviceCategoryId?: true;
    callCode?: true;
    priority?: true;
    canceled?: true;
    startedAt?: true;
    finishedAt?: true;
    createdAt?: true;
};
export type AppointmentMaxAggregateInputType = {
    beneficiaryId?: true;
    serviceCategoryId?: true;
    callCode?: true;
    priority?: true;
    canceled?: true;
    startedAt?: true;
    finishedAt?: true;
    createdAt?: true;
};
export type AppointmentCountAggregateInputType = {
    beneficiaryId?: true;
    serviceCategoryId?: true;
    callCode?: true;
    priority?: true;
    canceled?: true;
    startedAt?: true;
    finishedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type AppointmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput | Prisma.AppointmentOrderByWithRelationInput[];
    cursor?: Prisma.AppointmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AppointmentCountAggregateInputType;
    _min?: AppointmentMinAggregateInputType;
    _max?: AppointmentMaxAggregateInputType;
};
export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
    [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAppointment[P]> : Prisma.GetScalarType<T[P], AggregateAppointment[P]>;
};
export type AppointmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithAggregationInput | Prisma.AppointmentOrderByWithAggregationInput[];
    by: Prisma.AppointmentScalarFieldEnum[] | Prisma.AppointmentScalarFieldEnum;
    having?: Prisma.AppointmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AppointmentCountAggregateInputType | true;
    _min?: AppointmentMinAggregateInputType;
    _max?: AppointmentMaxAggregateInputType;
};
export type AppointmentGroupByOutputType = {
    beneficiaryId: string;
    serviceCategoryId: string;
    callCode: string;
    priority: boolean;
    canceled: boolean;
    startedAt: Date | null;
    finishedAt: Date | null;
    createdAt: Date;
    _count: AppointmentCountAggregateOutputType | null;
    _min: AppointmentMinAggregateOutputType | null;
    _max: AppointmentMaxAggregateOutputType | null;
};
export type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AppointmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AppointmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AppointmentGroupByOutputType[P]>;
}>>;
export type AppointmentWhereInput = {
    AND?: Prisma.AppointmentWhereInput | Prisma.AppointmentWhereInput[];
    OR?: Prisma.AppointmentWhereInput[];
    NOT?: Prisma.AppointmentWhereInput | Prisma.AppointmentWhereInput[];
    beneficiaryId?: Prisma.StringFilter<"Appointment"> | string;
    serviceCategoryId?: Prisma.StringFilter<"Appointment"> | string;
    callCode?: Prisma.StringFilter<"Appointment"> | string;
    priority?: Prisma.BoolFilter<"Appointment"> | boolean;
    canceled?: Prisma.BoolFilter<"Appointment"> | boolean;
    startedAt?: Prisma.DateTimeNullableFilter<"Appointment"> | Date | string | null;
    finishedAt?: Prisma.DateTimeNullableFilter<"Appointment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Appointment"> | Date | string;
    beneficiary?: Prisma.XOR<Prisma.BeneficiaryScalarRelationFilter, Prisma.BeneficiaryWhereInput>;
    serviceCategory?: Prisma.XOR<Prisma.ServiceCategoryScalarRelationFilter, Prisma.ServiceCategoryWhereInput>;
};
export type AppointmentOrderByWithRelationInput = {
    beneficiaryId?: Prisma.SortOrder;
    serviceCategoryId?: Prisma.SortOrder;
    callCode?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    canceled?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    finishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    beneficiary?: Prisma.BeneficiaryOrderByWithRelationInput;
    serviceCategory?: Prisma.ServiceCategoryOrderByWithRelationInput;
};
export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    callCode?: string;
    beneficiaryId_serviceCategoryId?: Prisma.AppointmentBeneficiaryIdServiceCategoryIdCompoundUniqueInput;
    AND?: Prisma.AppointmentWhereInput | Prisma.AppointmentWhereInput[];
    OR?: Prisma.AppointmentWhereInput[];
    NOT?: Prisma.AppointmentWhereInput | Prisma.AppointmentWhereInput[];
    beneficiaryId?: Prisma.StringFilter<"Appointment"> | string;
    serviceCategoryId?: Prisma.StringFilter<"Appointment"> | string;
    priority?: Prisma.BoolFilter<"Appointment"> | boolean;
    canceled?: Prisma.BoolFilter<"Appointment"> | boolean;
    startedAt?: Prisma.DateTimeNullableFilter<"Appointment"> | Date | string | null;
    finishedAt?: Prisma.DateTimeNullableFilter<"Appointment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Appointment"> | Date | string;
    beneficiary?: Prisma.XOR<Prisma.BeneficiaryScalarRelationFilter, Prisma.BeneficiaryWhereInput>;
    serviceCategory?: Prisma.XOR<Prisma.ServiceCategoryScalarRelationFilter, Prisma.ServiceCategoryWhereInput>;
}, "beneficiaryId_serviceCategoryId" | "callCode">;
export type AppointmentOrderByWithAggregationInput = {
    beneficiaryId?: Prisma.SortOrder;
    serviceCategoryId?: Prisma.SortOrder;
    callCode?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    canceled?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    finishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AppointmentCountOrderByAggregateInput;
    _max?: Prisma.AppointmentMaxOrderByAggregateInput;
    _min?: Prisma.AppointmentMinOrderByAggregateInput;
};
export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.AppointmentScalarWhereWithAggregatesInput | Prisma.AppointmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.AppointmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AppointmentScalarWhereWithAggregatesInput | Prisma.AppointmentScalarWhereWithAggregatesInput[];
    beneficiaryId?: Prisma.StringWithAggregatesFilter<"Appointment"> | string;
    serviceCategoryId?: Prisma.StringWithAggregatesFilter<"Appointment"> | string;
    callCode?: Prisma.StringWithAggregatesFilter<"Appointment"> | string;
    priority?: Prisma.BoolWithAggregatesFilter<"Appointment"> | boolean;
    canceled?: Prisma.BoolWithAggregatesFilter<"Appointment"> | boolean;
    startedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Appointment"> | Date | string | null;
    finishedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Appointment"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Appointment"> | Date | string;
};
export type AppointmentCreateInput = {
    callCode: string;
    priority?: boolean;
    canceled?: boolean;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    createdAt?: Date | string;
    beneficiary: Prisma.BeneficiaryCreateNestedOneWithoutAppointmentsInput;
    serviceCategory: Prisma.ServiceCategoryCreateNestedOneWithoutAppointmentsInput;
};
export type AppointmentUncheckedCreateInput = {
    beneficiaryId: string;
    serviceCategoryId: string;
    callCode: string;
    priority?: boolean;
    canceled?: boolean;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AppointmentUpdateInput = {
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canceled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    beneficiary?: Prisma.BeneficiaryUpdateOneRequiredWithoutAppointmentsNestedInput;
    serviceCategory?: Prisma.ServiceCategoryUpdateOneRequiredWithoutAppointmentsNestedInput;
};
export type AppointmentUncheckedUpdateInput = {
    beneficiaryId?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceCategoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canceled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppointmentCreateManyInput = {
    beneficiaryId: string;
    serviceCategoryId: string;
    callCode: string;
    priority?: boolean;
    canceled?: boolean;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AppointmentUpdateManyMutationInput = {
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canceled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppointmentUncheckedUpdateManyInput = {
    beneficiaryId?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceCategoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canceled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppointmentListRelationFilter = {
    every?: Prisma.AppointmentWhereInput;
    some?: Prisma.AppointmentWhereInput;
    none?: Prisma.AppointmentWhereInput;
};
export type AppointmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AppointmentBeneficiaryIdServiceCategoryIdCompoundUniqueInput = {
    beneficiaryId: string;
    serviceCategoryId: string;
};
export type AppointmentCountOrderByAggregateInput = {
    beneficiaryId?: Prisma.SortOrder;
    serviceCategoryId?: Prisma.SortOrder;
    callCode?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    canceled?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AppointmentMaxOrderByAggregateInput = {
    beneficiaryId?: Prisma.SortOrder;
    serviceCategoryId?: Prisma.SortOrder;
    callCode?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    canceled?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AppointmentMinOrderByAggregateInput = {
    beneficiaryId?: Prisma.SortOrder;
    serviceCategoryId?: Prisma.SortOrder;
    callCode?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    canceled?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AppointmentCreateNestedManyWithoutBeneficiaryInput = {
    create?: Prisma.XOR<Prisma.AppointmentCreateWithoutBeneficiaryInput, Prisma.AppointmentUncheckedCreateWithoutBeneficiaryInput> | Prisma.AppointmentCreateWithoutBeneficiaryInput[] | Prisma.AppointmentUncheckedCreateWithoutBeneficiaryInput[];
    connectOrCreate?: Prisma.AppointmentCreateOrConnectWithoutBeneficiaryInput | Prisma.AppointmentCreateOrConnectWithoutBeneficiaryInput[];
    createMany?: Prisma.AppointmentCreateManyBeneficiaryInputEnvelope;
    connect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
};
export type AppointmentUncheckedCreateNestedManyWithoutBeneficiaryInput = {
    create?: Prisma.XOR<Prisma.AppointmentCreateWithoutBeneficiaryInput, Prisma.AppointmentUncheckedCreateWithoutBeneficiaryInput> | Prisma.AppointmentCreateWithoutBeneficiaryInput[] | Prisma.AppointmentUncheckedCreateWithoutBeneficiaryInput[];
    connectOrCreate?: Prisma.AppointmentCreateOrConnectWithoutBeneficiaryInput | Prisma.AppointmentCreateOrConnectWithoutBeneficiaryInput[];
    createMany?: Prisma.AppointmentCreateManyBeneficiaryInputEnvelope;
    connect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
};
export type AppointmentUpdateManyWithoutBeneficiaryNestedInput = {
    create?: Prisma.XOR<Prisma.AppointmentCreateWithoutBeneficiaryInput, Prisma.AppointmentUncheckedCreateWithoutBeneficiaryInput> | Prisma.AppointmentCreateWithoutBeneficiaryInput[] | Prisma.AppointmentUncheckedCreateWithoutBeneficiaryInput[];
    connectOrCreate?: Prisma.AppointmentCreateOrConnectWithoutBeneficiaryInput | Prisma.AppointmentCreateOrConnectWithoutBeneficiaryInput[];
    upsert?: Prisma.AppointmentUpsertWithWhereUniqueWithoutBeneficiaryInput | Prisma.AppointmentUpsertWithWhereUniqueWithoutBeneficiaryInput[];
    createMany?: Prisma.AppointmentCreateManyBeneficiaryInputEnvelope;
    set?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    disconnect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    delete?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    connect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    update?: Prisma.AppointmentUpdateWithWhereUniqueWithoutBeneficiaryInput | Prisma.AppointmentUpdateWithWhereUniqueWithoutBeneficiaryInput[];
    updateMany?: Prisma.AppointmentUpdateManyWithWhereWithoutBeneficiaryInput | Prisma.AppointmentUpdateManyWithWhereWithoutBeneficiaryInput[];
    deleteMany?: Prisma.AppointmentScalarWhereInput | Prisma.AppointmentScalarWhereInput[];
};
export type AppointmentUncheckedUpdateManyWithoutBeneficiaryNestedInput = {
    create?: Prisma.XOR<Prisma.AppointmentCreateWithoutBeneficiaryInput, Prisma.AppointmentUncheckedCreateWithoutBeneficiaryInput> | Prisma.AppointmentCreateWithoutBeneficiaryInput[] | Prisma.AppointmentUncheckedCreateWithoutBeneficiaryInput[];
    connectOrCreate?: Prisma.AppointmentCreateOrConnectWithoutBeneficiaryInput | Prisma.AppointmentCreateOrConnectWithoutBeneficiaryInput[];
    upsert?: Prisma.AppointmentUpsertWithWhereUniqueWithoutBeneficiaryInput | Prisma.AppointmentUpsertWithWhereUniqueWithoutBeneficiaryInput[];
    createMany?: Prisma.AppointmentCreateManyBeneficiaryInputEnvelope;
    set?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    disconnect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    delete?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    connect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    update?: Prisma.AppointmentUpdateWithWhereUniqueWithoutBeneficiaryInput | Prisma.AppointmentUpdateWithWhereUniqueWithoutBeneficiaryInput[];
    updateMany?: Prisma.AppointmentUpdateManyWithWhereWithoutBeneficiaryInput | Prisma.AppointmentUpdateManyWithWhereWithoutBeneficiaryInput[];
    deleteMany?: Prisma.AppointmentScalarWhereInput | Prisma.AppointmentScalarWhereInput[];
};
export type AppointmentCreateNestedManyWithoutServiceCategoryInput = {
    create?: Prisma.XOR<Prisma.AppointmentCreateWithoutServiceCategoryInput, Prisma.AppointmentUncheckedCreateWithoutServiceCategoryInput> | Prisma.AppointmentCreateWithoutServiceCategoryInput[] | Prisma.AppointmentUncheckedCreateWithoutServiceCategoryInput[];
    connectOrCreate?: Prisma.AppointmentCreateOrConnectWithoutServiceCategoryInput | Prisma.AppointmentCreateOrConnectWithoutServiceCategoryInput[];
    createMany?: Prisma.AppointmentCreateManyServiceCategoryInputEnvelope;
    connect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
};
export type AppointmentUncheckedCreateNestedManyWithoutServiceCategoryInput = {
    create?: Prisma.XOR<Prisma.AppointmentCreateWithoutServiceCategoryInput, Prisma.AppointmentUncheckedCreateWithoutServiceCategoryInput> | Prisma.AppointmentCreateWithoutServiceCategoryInput[] | Prisma.AppointmentUncheckedCreateWithoutServiceCategoryInput[];
    connectOrCreate?: Prisma.AppointmentCreateOrConnectWithoutServiceCategoryInput | Prisma.AppointmentCreateOrConnectWithoutServiceCategoryInput[];
    createMany?: Prisma.AppointmentCreateManyServiceCategoryInputEnvelope;
    connect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
};
export type AppointmentUpdateManyWithoutServiceCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.AppointmentCreateWithoutServiceCategoryInput, Prisma.AppointmentUncheckedCreateWithoutServiceCategoryInput> | Prisma.AppointmentCreateWithoutServiceCategoryInput[] | Prisma.AppointmentUncheckedCreateWithoutServiceCategoryInput[];
    connectOrCreate?: Prisma.AppointmentCreateOrConnectWithoutServiceCategoryInput | Prisma.AppointmentCreateOrConnectWithoutServiceCategoryInput[];
    upsert?: Prisma.AppointmentUpsertWithWhereUniqueWithoutServiceCategoryInput | Prisma.AppointmentUpsertWithWhereUniqueWithoutServiceCategoryInput[];
    createMany?: Prisma.AppointmentCreateManyServiceCategoryInputEnvelope;
    set?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    disconnect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    delete?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    connect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    update?: Prisma.AppointmentUpdateWithWhereUniqueWithoutServiceCategoryInput | Prisma.AppointmentUpdateWithWhereUniqueWithoutServiceCategoryInput[];
    updateMany?: Prisma.AppointmentUpdateManyWithWhereWithoutServiceCategoryInput | Prisma.AppointmentUpdateManyWithWhereWithoutServiceCategoryInput[];
    deleteMany?: Prisma.AppointmentScalarWhereInput | Prisma.AppointmentScalarWhereInput[];
};
export type AppointmentUncheckedUpdateManyWithoutServiceCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.AppointmentCreateWithoutServiceCategoryInput, Prisma.AppointmentUncheckedCreateWithoutServiceCategoryInput> | Prisma.AppointmentCreateWithoutServiceCategoryInput[] | Prisma.AppointmentUncheckedCreateWithoutServiceCategoryInput[];
    connectOrCreate?: Prisma.AppointmentCreateOrConnectWithoutServiceCategoryInput | Prisma.AppointmentCreateOrConnectWithoutServiceCategoryInput[];
    upsert?: Prisma.AppointmentUpsertWithWhereUniqueWithoutServiceCategoryInput | Prisma.AppointmentUpsertWithWhereUniqueWithoutServiceCategoryInput[];
    createMany?: Prisma.AppointmentCreateManyServiceCategoryInputEnvelope;
    set?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    disconnect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    delete?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    connect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    update?: Prisma.AppointmentUpdateWithWhereUniqueWithoutServiceCategoryInput | Prisma.AppointmentUpdateWithWhereUniqueWithoutServiceCategoryInput[];
    updateMany?: Prisma.AppointmentUpdateManyWithWhereWithoutServiceCategoryInput | Prisma.AppointmentUpdateManyWithWhereWithoutServiceCategoryInput[];
    deleteMany?: Prisma.AppointmentScalarWhereInput | Prisma.AppointmentScalarWhereInput[];
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type AppointmentCreateWithoutBeneficiaryInput = {
    callCode: string;
    priority?: boolean;
    canceled?: boolean;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    createdAt?: Date | string;
    serviceCategory: Prisma.ServiceCategoryCreateNestedOneWithoutAppointmentsInput;
};
export type AppointmentUncheckedCreateWithoutBeneficiaryInput = {
    serviceCategoryId: string;
    callCode: string;
    priority?: boolean;
    canceled?: boolean;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AppointmentCreateOrConnectWithoutBeneficiaryInput = {
    where: Prisma.AppointmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.AppointmentCreateWithoutBeneficiaryInput, Prisma.AppointmentUncheckedCreateWithoutBeneficiaryInput>;
};
export type AppointmentCreateManyBeneficiaryInputEnvelope = {
    data: Prisma.AppointmentCreateManyBeneficiaryInput | Prisma.AppointmentCreateManyBeneficiaryInput[];
    skipDuplicates?: boolean;
};
export type AppointmentUpsertWithWhereUniqueWithoutBeneficiaryInput = {
    where: Prisma.AppointmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.AppointmentUpdateWithoutBeneficiaryInput, Prisma.AppointmentUncheckedUpdateWithoutBeneficiaryInput>;
    create: Prisma.XOR<Prisma.AppointmentCreateWithoutBeneficiaryInput, Prisma.AppointmentUncheckedCreateWithoutBeneficiaryInput>;
};
export type AppointmentUpdateWithWhereUniqueWithoutBeneficiaryInput = {
    where: Prisma.AppointmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.AppointmentUpdateWithoutBeneficiaryInput, Prisma.AppointmentUncheckedUpdateWithoutBeneficiaryInput>;
};
export type AppointmentUpdateManyWithWhereWithoutBeneficiaryInput = {
    where: Prisma.AppointmentScalarWhereInput;
    data: Prisma.XOR<Prisma.AppointmentUpdateManyMutationInput, Prisma.AppointmentUncheckedUpdateManyWithoutBeneficiaryInput>;
};
export type AppointmentScalarWhereInput = {
    AND?: Prisma.AppointmentScalarWhereInput | Prisma.AppointmentScalarWhereInput[];
    OR?: Prisma.AppointmentScalarWhereInput[];
    NOT?: Prisma.AppointmentScalarWhereInput | Prisma.AppointmentScalarWhereInput[];
    beneficiaryId?: Prisma.StringFilter<"Appointment"> | string;
    serviceCategoryId?: Prisma.StringFilter<"Appointment"> | string;
    callCode?: Prisma.StringFilter<"Appointment"> | string;
    priority?: Prisma.BoolFilter<"Appointment"> | boolean;
    canceled?: Prisma.BoolFilter<"Appointment"> | boolean;
    startedAt?: Prisma.DateTimeNullableFilter<"Appointment"> | Date | string | null;
    finishedAt?: Prisma.DateTimeNullableFilter<"Appointment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Appointment"> | Date | string;
};
export type AppointmentCreateWithoutServiceCategoryInput = {
    callCode: string;
    priority?: boolean;
    canceled?: boolean;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    createdAt?: Date | string;
    beneficiary: Prisma.BeneficiaryCreateNestedOneWithoutAppointmentsInput;
};
export type AppointmentUncheckedCreateWithoutServiceCategoryInput = {
    beneficiaryId: string;
    callCode: string;
    priority?: boolean;
    canceled?: boolean;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AppointmentCreateOrConnectWithoutServiceCategoryInput = {
    where: Prisma.AppointmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.AppointmentCreateWithoutServiceCategoryInput, Prisma.AppointmentUncheckedCreateWithoutServiceCategoryInput>;
};
export type AppointmentCreateManyServiceCategoryInputEnvelope = {
    data: Prisma.AppointmentCreateManyServiceCategoryInput | Prisma.AppointmentCreateManyServiceCategoryInput[];
    skipDuplicates?: boolean;
};
export type AppointmentUpsertWithWhereUniqueWithoutServiceCategoryInput = {
    where: Prisma.AppointmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.AppointmentUpdateWithoutServiceCategoryInput, Prisma.AppointmentUncheckedUpdateWithoutServiceCategoryInput>;
    create: Prisma.XOR<Prisma.AppointmentCreateWithoutServiceCategoryInput, Prisma.AppointmentUncheckedCreateWithoutServiceCategoryInput>;
};
export type AppointmentUpdateWithWhereUniqueWithoutServiceCategoryInput = {
    where: Prisma.AppointmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.AppointmentUpdateWithoutServiceCategoryInput, Prisma.AppointmentUncheckedUpdateWithoutServiceCategoryInput>;
};
export type AppointmentUpdateManyWithWhereWithoutServiceCategoryInput = {
    where: Prisma.AppointmentScalarWhereInput;
    data: Prisma.XOR<Prisma.AppointmentUpdateManyMutationInput, Prisma.AppointmentUncheckedUpdateManyWithoutServiceCategoryInput>;
};
export type AppointmentCreateManyBeneficiaryInput = {
    serviceCategoryId: string;
    callCode: string;
    priority?: boolean;
    canceled?: boolean;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AppointmentUpdateWithoutBeneficiaryInput = {
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canceled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    serviceCategory?: Prisma.ServiceCategoryUpdateOneRequiredWithoutAppointmentsNestedInput;
};
export type AppointmentUncheckedUpdateWithoutBeneficiaryInput = {
    serviceCategoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canceled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppointmentUncheckedUpdateManyWithoutBeneficiaryInput = {
    serviceCategoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canceled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppointmentCreateManyServiceCategoryInput = {
    beneficiaryId: string;
    callCode: string;
    priority?: boolean;
    canceled?: boolean;
    startedAt?: Date | string | null;
    finishedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AppointmentUpdateWithoutServiceCategoryInput = {
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canceled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    beneficiary?: Prisma.BeneficiaryUpdateOneRequiredWithoutAppointmentsNestedInput;
};
export type AppointmentUncheckedUpdateWithoutServiceCategoryInput = {
    beneficiaryId?: Prisma.StringFieldUpdateOperationsInput | string;
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canceled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppointmentUncheckedUpdateManyWithoutServiceCategoryInput = {
    beneficiaryId?: Prisma.StringFieldUpdateOperationsInput | string;
    callCode?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canceled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppointmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    beneficiaryId?: boolean;
    serviceCategoryId?: boolean;
    callCode?: boolean;
    priority?: boolean;
    canceled?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    createdAt?: boolean;
    beneficiary?: boolean | Prisma.BeneficiaryDefaultArgs<ExtArgs>;
    serviceCategory?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["appointment"]>;
export type AppointmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    beneficiaryId?: boolean;
    serviceCategoryId?: boolean;
    callCode?: boolean;
    priority?: boolean;
    canceled?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    createdAt?: boolean;
    beneficiary?: boolean | Prisma.BeneficiaryDefaultArgs<ExtArgs>;
    serviceCategory?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["appointment"]>;
export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    beneficiaryId?: boolean;
    serviceCategoryId?: boolean;
    callCode?: boolean;
    priority?: boolean;
    canceled?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    createdAt?: boolean;
    beneficiary?: boolean | Prisma.BeneficiaryDefaultArgs<ExtArgs>;
    serviceCategory?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["appointment"]>;
export type AppointmentSelectScalar = {
    beneficiaryId?: boolean;
    serviceCategoryId?: boolean;
    callCode?: boolean;
    priority?: boolean;
    canceled?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    createdAt?: boolean;
};
export type AppointmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"beneficiaryId" | "serviceCategoryId" | "callCode" | "priority" | "canceled" | "startedAt" | "finishedAt" | "createdAt", ExtArgs["result"]["appointment"]>;
export type AppointmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    beneficiary?: boolean | Prisma.BeneficiaryDefaultArgs<ExtArgs>;
    serviceCategory?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
};
export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    beneficiary?: boolean | Prisma.BeneficiaryDefaultArgs<ExtArgs>;
    serviceCategory?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
};
export type AppointmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    beneficiary?: boolean | Prisma.BeneficiaryDefaultArgs<ExtArgs>;
    serviceCategory?: boolean | Prisma.ServiceCategoryDefaultArgs<ExtArgs>;
};
export type $AppointmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Appointment";
    objects: {
        beneficiary: Prisma.$BeneficiaryPayload<ExtArgs>;
        serviceCategory: Prisma.$ServiceCategoryPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        beneficiaryId: string;
        serviceCategoryId: string;
        callCode: string;
        priority: boolean;
        canceled: boolean;
        startedAt: Date | null;
        finishedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["appointment"]>;
    composites: {};
};
export type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AppointmentPayload, S>;
export type AppointmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AppointmentCountAggregateInputType | true;
};
export interface AppointmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Appointment'];
        meta: {
            name: 'Appointment';
        };
    };
    findUnique<T extends AppointmentFindUniqueArgs>(args: Prisma.SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AppointmentClient<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AppointmentClient<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AppointmentFindFirstArgs>(args?: Prisma.SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__AppointmentClient<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AppointmentClient<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AppointmentFindManyArgs>(args?: Prisma.SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AppointmentCreateArgs>(args: Prisma.SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma.Prisma__AppointmentClient<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AppointmentCreateManyArgs>(args?: Prisma.SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AppointmentDeleteArgs>(args: Prisma.SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma.Prisma__AppointmentClient<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AppointmentUpdateArgs>(args: Prisma.SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma.Prisma__AppointmentClient<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AppointmentUpdateManyArgs>(args: Prisma.SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AppointmentUpsertArgs>(args: Prisma.SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma.Prisma__AppointmentClient<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AppointmentCountArgs>(args?: Prisma.Subset<T, AppointmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AppointmentCountAggregateOutputType> : number>;
    aggregate<T extends AppointmentAggregateArgs>(args: Prisma.Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>;
    groupBy<T extends AppointmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AppointmentGroupByArgs['orderBy'];
    } : {
        orderBy?: AppointmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AppointmentFieldRefs;
}
export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    beneficiary<T extends Prisma.BeneficiaryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BeneficiaryDefaultArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    serviceCategory<T extends Prisma.ServiceCategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ServiceCategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__ServiceCategoryClient<runtime.Types.Result.GetResult<Prisma.$ServiceCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AppointmentFieldRefs {
    readonly beneficiaryId: Prisma.FieldRef<"Appointment", 'String'>;
    readonly serviceCategoryId: Prisma.FieldRef<"Appointment", 'String'>;
    readonly callCode: Prisma.FieldRef<"Appointment", 'String'>;
    readonly priority: Prisma.FieldRef<"Appointment", 'Boolean'>;
    readonly canceled: Prisma.FieldRef<"Appointment", 'Boolean'>;
    readonly startedAt: Prisma.FieldRef<"Appointment", 'DateTime'>;
    readonly finishedAt: Prisma.FieldRef<"Appointment", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Appointment", 'DateTime'>;
}
export type AppointmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    where: Prisma.AppointmentWhereUniqueInput;
};
export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    where: Prisma.AppointmentWhereUniqueInput;
};
export type AppointmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput | Prisma.AppointmentOrderByWithRelationInput[];
    cursor?: Prisma.AppointmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AppointmentScalarFieldEnum | Prisma.AppointmentScalarFieldEnum[];
};
export type AppointmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput | Prisma.AppointmentOrderByWithRelationInput[];
    cursor?: Prisma.AppointmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AppointmentScalarFieldEnum | Prisma.AppointmentScalarFieldEnum[];
};
export type AppointmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput | Prisma.AppointmentOrderByWithRelationInput[];
    cursor?: Prisma.AppointmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AppointmentScalarFieldEnum | Prisma.AppointmentScalarFieldEnum[];
};
export type AppointmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AppointmentCreateInput, Prisma.AppointmentUncheckedCreateInput>;
};
export type AppointmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AppointmentCreateManyInput | Prisma.AppointmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AppointmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    data: Prisma.AppointmentCreateManyInput | Prisma.AppointmentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AppointmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AppointmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AppointmentUpdateInput, Prisma.AppointmentUncheckedUpdateInput>;
    where: Prisma.AppointmentWhereUniqueInput;
};
export type AppointmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AppointmentUpdateManyMutationInput, Prisma.AppointmentUncheckedUpdateManyInput>;
    where?: Prisma.AppointmentWhereInput;
    limit?: number;
};
export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AppointmentUpdateManyMutationInput, Prisma.AppointmentUncheckedUpdateManyInput>;
    where?: Prisma.AppointmentWhereInput;
    limit?: number;
    include?: Prisma.AppointmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AppointmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    where: Prisma.AppointmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.AppointmentCreateInput, Prisma.AppointmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AppointmentUpdateInput, Prisma.AppointmentUncheckedUpdateInput>;
};
export type AppointmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    where: Prisma.AppointmentWhereUniqueInput;
};
export type AppointmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AppointmentWhereInput;
    limit?: number;
};
export type AppointmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
};
