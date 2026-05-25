export type User = {
  id: string;
  name: string;
  email: string;
  password: string
  role: 'ADMIN' | 'ATTENDANT';
  createdAt: string;
  updatedAt: string;
}

export type UserSafe = Omit<User, 'password'>

