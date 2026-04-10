import { Role } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import argon2 from 'argon2';
import 'dotenv/config';


async function main() {
  console.log('Seeding database (upsert mode)...');

  /**const serviceTypes = [
    {
      name: 'Atendimento Veterinário (Consulta)',
      description: 'Atendimento veterinário (Consulta)',
    },
    {
      name: 'Atendimento Veterinário (Vacina)',
      description: 'Atendimento veterinário (Vacina)',
    },
    {
      name: 'Atendimento Médico',
      description: 'Atendimento Médico',
    },
    {
      name: 'Atendimento de Vacinas',
      description: 'Atendimento de Vacinas',
    },
    {
      name: 'Atendimento Jurídico',
      description: 'Atendimento Jurídico',
    },
    {
      name: 'Atendimento SNI',
      description: 'Atendimento SNI',
    },
    {
      name: 'Atendimento Imposto de Renda',
      description: 'Atendimento Imposto de Renda',
    },
    {
      name: 'Atendimento Manutenção de PC',
      description: 'Atendimento Manutenção de PC',
    },
  ];

  for (const serviceTypeData of serviceTypes) {
    const serviceType = await prisma.serviceType.upsert({
      where: { name: serviceTypeData.name },
      update: {
        name: serviceTypeData.name,
        description: serviceTypeData.description,
      },
      create: {
        ...serviceTypeData,
      },
    });

    console.log(`- Upserted service type: ${serviceType.name}`);
  }**/

  const userPassword = await argon2.hash('12345678');
  const users = [
    {
      name: 'Admin',
      email: 'admin@example.com',
      password: userPassword,
      role: 'ADMIN' as Role,
    },
    {
      name: 'User',
      email: 'user@example.com',
      password: userPassword,
      role: 'ATTENDANT' as Role,
    },
  ];

  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
      },
      create: {
        ...userData,
      },
    });

    console.log(`- Upserted user: ${user.name}`);
  }

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error while seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });