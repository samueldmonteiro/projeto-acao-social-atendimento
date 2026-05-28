import type { Beneficiary } from './beneficiary.type';
import type { ServiceCategory } from './service-category.type';

export type Appointment = {
  beneficiaryId: string;
  serviceCategoryId: string;
  callCode: string;
  priority: boolean;
  canceled: boolean;
  startedAt: string;
  finishedAt: string;
  createdAt: string;
};

export type AppointmentListWithRelations = Appointment & {
  beneficiary: Beneficiary;
  serviceCategory: ServiceCategory;
};

export type AppointmentListWithServiceCategory = Appointment & {
  serviceCategory: ServiceCategory;
};

export type CreateAppointment = {
  beneficiaryId: string;
  serviceCategoryId: string;
  priority: boolean;
};

export type UpdateAppointment = {
  beneficiaryId?: string;
  serviceCategoryId?: string;
  priority?: boolean;
  canceled?: boolean;
  startedAt?: string | null;
  finishedAt?: string | null;
  callCode?: string;
};