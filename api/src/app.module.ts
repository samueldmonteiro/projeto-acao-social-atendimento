import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from '@/controllers/app.controller';
import { AppService } from '@/services/app.service';
import { UserController } from '@/controllers/user.controller';
import { UserService } from '@/services/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '@/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@/controllers/auth.controller';
import { JwtGuard } from '@/auth/jwt.guard';
import { JwtStrategy } from '@/auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        secret: process.env.JWT_TOKEN,
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, AuthService, JwtGuard, JwtStrategy],
})
export class AppModule {}
