import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BeneficiaryModel = runtime.Types.Result.DefaultSelection<Prisma.$BeneficiaryPayload>;
export type AggregateBeneficiary = {
    _count: BeneficiaryCountAggregateOutputType | null;
    _min: BeneficiaryMinAggregateOutputType | null;
    _max: BeneficiaryMaxAggregateOutputType | null;
};
export type BeneficiaryMinAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    cpf: string | null;
    email: string | null;
    phone: string | null;
    birthDate: Date | null;
    gender: $Enums.Gender | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BeneficiaryMaxAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    cpf: string | null;
    email: string | null;
    phone: string | null;
    birthDate: Date | null;
    gender: $Enums.Gender | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BeneficiaryCountAggregateOutputType = {
    id: number;
    fullName: number;
    cpf: number;
    email: number;
    phone: number;
    birthDate: number;
    gender: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BeneficiaryMinAggregateInputType = {
    id?: true;
    fullName?: true;
    cpf?: true;
    email?: true;
    phone?: true;
    birthDate?: true;
    gender?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BeneficiaryMaxAggregateInputType = {
    id?: true;
    fullName?: true;
    cpf?: true;
    email?: true;
    phone?: true;
    birthDate?: true;
    gender?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BeneficiaryCountAggregateInputType = {
    id?: true;
    fullName?: true;
    cpf?: true;
    email?: true;
    phone?: true;
    birthDate?: true;
    gender?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BeneficiaryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BeneficiaryWhereInput;
    orderBy?: Prisma.BeneficiaryOrderByWithRelationInput | Prisma.BeneficiaryOrderByWithRelationInput[];
    cursor?: Prisma.BeneficiaryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BeneficiaryCountAggregateInputType;
    _min?: BeneficiaryMinAggregateInputType;
    _max?: BeneficiaryMaxAggregateInputType;
};
export type GetBeneficiaryAggregateType<T extends BeneficiaryAggregateArgs> = {
    [P in keyof T & keyof AggregateBeneficiary]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBeneficiary[P]> : Prisma.GetScalarType<T[P], AggregateBeneficiary[P]>;
};
export type BeneficiaryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BeneficiaryWhereInput;
    orderBy?: Prisma.BeneficiaryOrderByWithAggregationInput | Prisma.BeneficiaryOrderByWithAggregationInput[];
    by: Prisma.BeneficiaryScalarFieldEnum[] | Prisma.BeneficiaryScalarFieldEnum;
    having?: Prisma.BeneficiaryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BeneficiaryCountAggregateInputType | true;
    _min?: BeneficiaryMinAggregateInputType;
    _max?: BeneficiaryMaxAggregateInputType;
};
export type BeneficiaryGroupByOutputType = {
    id: string;
    fullName: string;
    cpf: string;
    email: string | null;
    phone: string | null;
    birthDate: Date;
    gender: $Enums.Gender;
    createdAt: Date;
    updatedAt: Date;
    _count: BeneficiaryCountAggregateOutputType | null;
    _min: BeneficiaryMinAggregateOutputType | null;
    _max: BeneficiaryMaxAggregateOutputType | null;
};
export type GetBeneficiaryGroupByPayload<T extends BeneficiaryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BeneficiaryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BeneficiaryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BeneficiaryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BeneficiaryGroupByOutputType[P]>;
}>>;
export type BeneficiaryWhereInput = {
    AND?: Prisma.BeneficiaryWhereInput | Prisma.BeneficiaryWhereInput[];
    OR?: Prisma.BeneficiaryWhereInput[];
    NOT?: Prisma.BeneficiaryWhereInput | Prisma.BeneficiaryWhereInput[];
    id?: Prisma.StringFilter<"Beneficiary"> | string;
    fullName?: Prisma.StringFilter<"Beneficiary"> | string;
    cpf?: Prisma.StringFilter<"Beneficiary"> | string;
    email?: Prisma.StringNullableFilter<"Beneficiary"> | string | null;
    phone?: Prisma.StringNullableFilter<"Beneficiary"> | string | null;
    birthDate?: Prisma.DateTimeFilter<"Beneficiary"> | Date | string;
    gender?: Prisma.EnumGenderFilter<"Beneficiary"> | $Enums.Gender;
    createdAt?: Prisma.DateTimeFilter<"Beneficiary"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Beneficiary"> | Date | string;
    categories?: Prisma.BeneficiaryCategoryListRelationFilter;
};
export type BeneficiaryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    cpf?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    birthDate?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    categories?: Prisma.BeneficiaryCategoryOrderByRelationAggregateInput;
};
export type BeneficiaryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    cpf?: string;
    email?: string;
    AND?: Prisma.BeneficiaryWhereInput | Prisma.BeneficiaryWhereInput[];
    OR?: Prisma.BeneficiaryWhereInput[];
    NOT?: Prisma.BeneficiaryWhereInput | Prisma.BeneficiaryWhereInput[];
    fullName?: Prisma.StringFilter<"Beneficiary"> | string;
    phone?: Prisma.StringNullableFilter<"Beneficiary"> | string | null;
    birthDate?: Prisma.DateTimeFilter<"Beneficiary"> | Date | string;
    gender?: Prisma.EnumGenderFilter<"Beneficiary"> | $Enums.Gender;
    createdAt?: Prisma.DateTimeFilter<"Beneficiary"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Beneficiary"> | Date | string;
    categories?: Prisma.BeneficiaryCategoryListRelationFilter;
}, "id" | "cpf" | "email">;
export type BeneficiaryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    cpf?: Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    birthDate?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BeneficiaryCountOrderByAggregateInput;
    _max?: Prisma.BeneficiaryMaxOrderByAggregateInput;
    _min?: Prisma.BeneficiaryMinOrderByAggregateInput;
};
export type BeneficiaryScalarWhereWithAggregatesInput = {
    AND?: Prisma.BeneficiaryScalarWhereWithAggregatesInput | Prisma.BeneficiaryScalarWhereWithAggregatesInput[];
    OR?: Prisma.BeneficiaryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BeneficiaryScalarWhereWithAggregatesInput | Prisma.BeneficiaryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Beneficiary"> | string;
    fullName?: Prisma.StringWithAggregatesFilter<"Beneficiary"> | string;
    cpf?: Prisma.StringWithAggregatesFilter<"Beneficiary"> | string;
    email?: Prisma.StringNullableWithAggregatesFilter<"Beneficiary"> | string | null;
    phone?: Prisma.StringNullableWithAggregatesFilter<"Beneficiary"> | string | null;
    birthDate?: Prisma.DateTimeWithAggregatesFilter<"Beneficiary"> | Date | string;
    gender?: Prisma.EnumGenderWithAggregatesFilter<"Beneficiary"> | $Enums.Gender;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Beneficiary"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Beneficiary"> | Date | string;
};
export type BeneficiaryCreateInput = {
    id?: string;
    fullName: string;
    cpf: string;
    email?: string | null;
    phone?: string | null;
    birthDate: Date | string;
    gender: $Enums.Gender;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.BeneficiaryCategoryCreateNestedManyWithoutBeneficiaryInput;
};
export type BeneficiaryUncheckedCreateInput = {
    id?: string;
    fullName: string;
    cpf: string;
    email?: string | null;
    phone?: string | null;
    birthDate: Date | string;
    gender: $Enums.Gender;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.BeneficiaryCategoryUncheckedCreateNestedManyWithoutBeneficiaryInput;
};
export type BeneficiaryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    birthDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.BeneficiaryCategoryUpdateManyWithoutBeneficiaryNestedInput;
};
export type BeneficiaryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    birthDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.BeneficiaryCategoryUncheckedUpdateManyWithoutBeneficiaryNestedInput;
};
export type BeneficiaryCreateManyInput = {
    id?: string;
    fullName: string;
    cpf: string;
    email?: string | null;
    phone?: string | null;
    birthDate: Date | string;
    gender: $Enums.Gender;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BeneficiaryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    birthDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BeneficiaryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    birthDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BeneficiaryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    cpf?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    birthDate?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BeneficiaryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    cpf?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    birthDate?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BeneficiaryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    cpf?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    birthDate?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BeneficiaryScalarRelationFilter = {
    is?: Prisma.BeneficiaryWhereInput;
    isNot?: Prisma.BeneficiaryWhereInput;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender;
};
export type BeneficiaryCreateNestedOneWithoutCategoriesInput = {
    create?: Prisma.XOR<Prisma.BeneficiaryCreateWithoutCategoriesInput, Prisma.BeneficiaryUncheckedCreateWithoutCategoriesInput>;
    connectOrCreate?: Prisma.BeneficiaryCreateOrConnectWithoutCategoriesInput;
    connect?: Prisma.BeneficiaryWhereUniqueInput;
};
export type BeneficiaryUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: Prisma.XOR<Prisma.BeneficiaryCreateWithoutCategoriesInput, Prisma.BeneficiaryUncheckedCreateWithoutCategoriesInput>;
    connectOrCreate?: Prisma.BeneficiaryCreateOrConnectWithoutCategoriesInput;
    upsert?: Prisma.BeneficiaryUpsertWithoutCategoriesInput;
    connect?: Prisma.BeneficiaryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BeneficiaryUpdateToOneWithWhereWithoutCategoriesInput, Prisma.BeneficiaryUpdateWithoutCategoriesInput>, Prisma.BeneficiaryUncheckedUpdateWithoutCategoriesInput>;
};
export type BeneficiaryCreateWithoutCategoriesInput = {
    id?: string;
    fullName: string;
    cpf: string;
    email?: string | null;
    phone?: string | null;
    birthDate: Date | string;
    gender: $Enums.Gender;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BeneficiaryUncheckedCreateWithoutCategoriesInput = {
    id?: string;
    fullName: string;
    cpf: string;
    email?: string | null;
    phone?: string | null;
    birthDate: Date | string;
    gender: $Enums.Gender;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BeneficiaryCreateOrConnectWithoutCategoriesInput = {
    where: Prisma.BeneficiaryWhereUniqueInput;
    create: Prisma.XOR<Prisma.BeneficiaryCreateWithoutCategoriesInput, Prisma.BeneficiaryUncheckedCreateWithoutCategoriesInput>;
};
export type BeneficiaryUpsertWithoutCategoriesInput = {
    update: Prisma.XOR<Prisma.BeneficiaryUpdateWithoutCategoriesInput, Prisma.BeneficiaryUncheckedUpdateWithoutCategoriesInput>;
    create: Prisma.XOR<Prisma.BeneficiaryCreateWithoutCategoriesInput, Prisma.BeneficiaryUncheckedCreateWithoutCategoriesInput>;
    where?: Prisma.BeneficiaryWhereInput;
};
export type BeneficiaryUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: Prisma.BeneficiaryWhereInput;
    data: Prisma.XOR<Prisma.BeneficiaryUpdateWithoutCategoriesInput, Prisma.BeneficiaryUncheckedUpdateWithoutCategoriesInput>;
};
export type BeneficiaryUpdateWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    birthDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BeneficiaryUncheckedUpdateWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    cpf?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    birthDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: Prisma.EnumGenderFieldUpdateOperationsInput | $Enums.Gender;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BeneficiaryCountOutputType = {
    categories: number;
};
export type BeneficiaryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    categories?: boolean | BeneficiaryCountOutputTypeCountCategoriesArgs;
};
export type BeneficiaryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiaryCountOutputTypeSelect<ExtArgs> | null;
};
export type BeneficiaryCountOutputTypeCountCategoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BeneficiaryCategoryWhereInput;
};
export type BeneficiarySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    cpf?: boolean;
    email?: boolean;
    phone?: boolean;
    birthDate?: boolean;
    gender?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    categories?: boolean | Prisma.Beneficiary$categoriesArgs<ExtArgs>;
    _count?: boolean | Prisma.BeneficiaryCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["beneficiary"]>;
export type BeneficiarySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    cpf?: boolean;
    email?: boolean;
    phone?: boolean;
    birthDate?: boolean;
    gender?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["beneficiary"]>;
export type BeneficiarySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    cpf?: boolean;
    email?: boolean;
    phone?: boolean;
    birthDate?: boolean;
    gender?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["beneficiary"]>;
export type BeneficiarySelectScalar = {
    id?: boolean;
    fullName?: boolean;
    cpf?: boolean;
    email?: boolean;
    phone?: boolean;
    birthDate?: boolean;
    gender?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BeneficiaryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "fullName" | "cpf" | "email" | "phone" | "birthDate" | "gender" | "createdAt" | "updatedAt", ExtArgs["result"]["beneficiary"]>;
export type BeneficiaryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    categories?: boolean | Prisma.Beneficiary$categoriesArgs<ExtArgs>;
    _count?: boolean | Prisma.BeneficiaryCountOutputTypeDefaultArgs<ExtArgs>;
};
export type BeneficiaryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type BeneficiaryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $BeneficiaryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Beneficiary";
    objects: {
        categories: Prisma.$BeneficiaryCategoryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        fullName: string;
        cpf: string;
        email: string | null;
        phone: string | null;
        birthDate: Date;
        gender: $Enums.Gender;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["beneficiary"]>;
    composites: {};
};
export type BeneficiaryGetPayload<S extends boolean | null | undefined | BeneficiaryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BeneficiaryPayload, S>;
export type BeneficiaryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BeneficiaryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BeneficiaryCountAggregateInputType | true;
};
export interface BeneficiaryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Beneficiary'];
        meta: {
            name: 'Beneficiary';
        };
    };
    findUnique<T extends BeneficiaryFindUniqueArgs>(args: Prisma.SelectSubset<T, BeneficiaryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BeneficiaryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BeneficiaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BeneficiaryFindFirstArgs>(args?: Prisma.SelectSubset<T, BeneficiaryFindFirstArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BeneficiaryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BeneficiaryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BeneficiaryFindManyArgs>(args?: Prisma.SelectSubset<T, BeneficiaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BeneficiaryCreateArgs>(args: Prisma.SelectSubset<T, BeneficiaryCreateArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BeneficiaryCreateManyArgs>(args?: Prisma.SelectSubset<T, BeneficiaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BeneficiaryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BeneficiaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BeneficiaryDeleteArgs>(args: Prisma.SelectSubset<T, BeneficiaryDeleteArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BeneficiaryUpdateArgs>(args: Prisma.SelectSubset<T, BeneficiaryUpdateArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BeneficiaryDeleteManyArgs>(args?: Prisma.SelectSubset<T, BeneficiaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BeneficiaryUpdateManyArgs>(args: Prisma.SelectSubset<T, BeneficiaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BeneficiaryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BeneficiaryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BeneficiaryUpsertArgs>(args: Prisma.SelectSubset<T, BeneficiaryUpsertArgs<ExtArgs>>): Prisma.Prisma__BeneficiaryClient<runtime.Types.Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BeneficiaryCountArgs>(args?: Prisma.Subset<T, BeneficiaryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BeneficiaryCountAggregateOutputType> : number>;
    aggregate<T extends BeneficiaryAggregateArgs>(args: Prisma.Subset<T, BeneficiaryAggregateArgs>): Prisma.PrismaPromise<GetBeneficiaryAggregateType<T>>;
    groupBy<T extends BeneficiaryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BeneficiaryGroupByArgs['orderBy'];
    } : {
        orderBy?: BeneficiaryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BeneficiaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBeneficiaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BeneficiaryFieldRefs;
}
export interface Prisma__BeneficiaryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    categories<T extends Prisma.Beneficiary$categoriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Beneficiary$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BeneficiaryCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BeneficiaryFieldRefs {
    readonly id: Prisma.FieldRef<"Beneficiary", 'String'>;
    readonly fullName: Prisma.FieldRef<"Beneficiary", 'String'>;
    readonly cpf: Prisma.FieldRef<"Beneficiary", 'String'>;
    readonly email: Prisma.FieldRef<"Beneficiary", 'String'>;
    readonly phone: Prisma.FieldRef<"Beneficiary", 'String'>;
    readonly birthDate: Prisma.FieldRef<"Beneficiary", 'DateTime'>;
    readonly gender: Prisma.FieldRef<"Beneficiary", 'Gender'>;
    readonly createdAt: Prisma.FieldRef<"Beneficiary", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Beneficiary", 'DateTime'>;
}
export type BeneficiaryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiarySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryInclude<ExtArgs> | null;
    where: Prisma.BeneficiaryWhereUniqueInput;
};
export type BeneficiaryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiarySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryInclude<ExtArgs> | null;
    where: Prisma.BeneficiaryWhereUniqueInput;
};
export type BeneficiaryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiarySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryInclude<ExtArgs> | null;
    where?: Prisma.BeneficiaryWhereInput;
    orderBy?: Prisma.BeneficiaryOrderByWithRelationInput | Prisma.BeneficiaryOrderByWithRelationInput[];
    cursor?: Prisma.BeneficiaryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BeneficiaryScalarFieldEnum | Prisma.BeneficiaryScalarFieldEnum[];
};
export type BeneficiaryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiarySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryInclude<ExtArgs> | null;
    where?: Prisma.BeneficiaryWhereInput;
    orderBy?: Prisma.BeneficiaryOrderByWithRelationInput | Prisma.BeneficiaryOrderByWithRelationInput[];
    cursor?: Prisma.BeneficiaryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BeneficiaryScalarFieldEnum | Prisma.BeneficiaryScalarFieldEnum[];
};
export type BeneficiaryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiarySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryInclude<ExtArgs> | null;
    where?: Prisma.BeneficiaryWhereInput;
    orderBy?: Prisma.BeneficiaryOrderByWithRelationInput | Prisma.BeneficiaryOrderByWithRelationInput[];
    cursor?: Prisma.BeneficiaryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BeneficiaryScalarFieldEnum | Prisma.BeneficiaryScalarFieldEnum[];
};
export type BeneficiaryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiarySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BeneficiaryCreateInput, Prisma.BeneficiaryUncheckedCreateInput>;
};
export type BeneficiaryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BeneficiaryCreateManyInput | Prisma.BeneficiaryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BeneficiaryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiarySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BeneficiaryOmit<ExtArgs> | null;
    data: Prisma.BeneficiaryCreateManyInput | Prisma.BeneficiaryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BeneficiaryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiarySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BeneficiaryUpdateInput, Prisma.BeneficiaryUncheckedUpdateInput>;
    where: Prisma.BeneficiaryWhereUniqueInput;
};
export type BeneficiaryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BeneficiaryUpdateManyMutationInput, Prisma.BeneficiaryUncheckedUpdateManyInput>;
    where?: Prisma.BeneficiaryWhereInput;
    limit?: number;
};
export type BeneficiaryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiarySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BeneficiaryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BeneficiaryUpdateManyMutationInput, Prisma.BeneficiaryUncheckedUpdateManyInput>;
    where?: Prisma.BeneficiaryWhereInput;
    limit?: number;
};
export type BeneficiaryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiarySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryInclude<ExtArgs> | null;
    where: Prisma.BeneficiaryWhereUniqueInput;
    create: Prisma.XOR<Prisma.BeneficiaryCreateInput, Prisma.BeneficiaryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BeneficiaryUpdateInput, Prisma.BeneficiaryUncheckedUpdateInput>;
};
export type BeneficiaryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiarySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryInclude<ExtArgs> | null;
    where: Prisma.BeneficiaryWhereUniqueInput;
};
export type BeneficiaryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BeneficiaryWhereInput;
    limit?: number;
};
export type Beneficiary$categoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type BeneficiaryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BeneficiarySelect<ExtArgs> | null;
    omit?: Prisma.BeneficiaryOmit<ExtArgs> | null;
    include?: Prisma.BeneficiaryInclude<ExtArgs> | null;
};
