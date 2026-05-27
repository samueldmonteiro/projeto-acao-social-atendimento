export type ServiceCategory = {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateServiceCategory = {
  name: string;
  prefix: string;
};

export type UpdateServiceCategory = Partial<CreateServiceCategory>;