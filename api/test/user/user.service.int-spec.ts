import { Test } from '@nestjs/testing';
import { prisma } from '@/lib/prisma';
import { UserService } from '@/services/user.service';
import { AppModule } from '@/app.module';

describe('UserService Integration', () => {
  let service: UserService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should return all users without the password field', async () => {
    await prisma.user.createMany({
      data: [
        { email: 'alice@test.com', password: 'secret1', name: 'Alice' },
        { email: 'bob@test.com', password: 'secret2', name: 'Bob' },
      ],
    });

    const users = await service.findAll();

    expect(users).toHaveLength(2);
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
    expect((users[0] as any).password).toBeUndefined();
    expect((users[1] as any).password).toBeUndefined();
  });

  it('should return an empty array when there are no users', async () => {
    const users = await service.findAll();
    expect(users).toEqual([]);
  });
});
