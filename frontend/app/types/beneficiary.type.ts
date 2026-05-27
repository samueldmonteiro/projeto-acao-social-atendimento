import type { AppointmentListWithServiceCategory } from './appointments.type';

export type Gender = 'MALE' | 'FEMALE';

export type Beneficiary = {
  id: string;
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: Gender;
  address: string;
  createdAt: string;
  updatedAt: string;
};

export type BeneficiaryWithAppointments = Beneficiary & {
  appointments: AppointmentListWithServiceCategory[];
};

export type CreateBeneficiary = {
  fullName: string;
  cpf: string;
  email?: string;
  phone?: string;
  birthDate: string;
  gender: Gender;
  address?: string;
};

export type UpdateBeneficiary = Partial<CreateBeneficiary>;

