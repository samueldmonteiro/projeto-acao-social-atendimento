import { Gender } from '@/generated/prisma/enums';

export type DashboardCategoryRankingItem = {
  rank: number;
  id: string;
  name: string;
  totalBeneficiaries: number;
  percentage: number;
};

export type DashboardGenderDistributionItem = {
  gender: Gender;
  label: string;
  count: number;
  percentage: number;
};

export type DashboardRecentBeneficiary = {
  id: string;
  fullName: string;
  gender: Gender;
  createdAt: Date;
  appointments: {
    id: string;
    name: string;
  }[];
};

export type DashboardTopCategory = {
  id: string;
  name: string;
  totalBeneficiaries: number;
};

export type DashboardOverview = {
  totalBeneficiaries: number;
  totalCategories: number;
  totalAppointments: number;
  beneficiariesWithoutCategory: number;
  averageCategoriesPerBeneficiary: number;
};

export type DashboardSummary = {
  overview: DashboardOverview;
  topCategory: DashboardTopCategory | null;
  categoriesRanking: DashboardCategoryRankingItem[];
  genderDistribution: DashboardGenderDistributionItem[];
  recentBeneficiaries: DashboardRecentBeneficiary[];
};
