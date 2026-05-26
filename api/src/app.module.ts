import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from '@/http/controllers/app.controller';
import { AppService } from '@/services/app.service';
import { UserController } from '@/http/controllers/user.controller';
import { UserService } from '@/services/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '@/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@/http/controllers/auth.controller';
import { JwtGuard } from '@/auth/jwt.guard';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { ServiceCategoryController } from '@/http/controllers/service-category.controller';
import { ServiceCategoryService } from '@/services/service-category.service';
import { BeneficiaryController } from '@/http/controllers/beneficiary.controller';
import { BeneficiaryService } from '@/services/beneficiary.service';
import { ExportService } from '@/services/export.service';
import { DashboardController } from '@/http/controllers/dashboard.controller';
import { DashboardService } from '@/services/dashboard.service';
import { AppointmentController } from '@/http/controllers/appointment.controller';
import { AppointmentService } from '@/services/appointment.service';

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
        signOptions: { expiresIn: '30min' },
      }),
    }),
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
    ServiceCategoryController,
    BeneficiaryController,
    DashboardController,
    AppointmentController,
  ],
  providers: [
    AppService,
    UserService,
    ServiceCategoryService,
    BeneficiaryService,
    ExportService,
    DashboardService,
    AuthService,
    JwtGuard,
    JwtStrategy,
    AppointmentService,
  ],
})
export class AppModule { }

