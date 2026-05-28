import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from './http/filters/http-exception.filter';
import { Request, Response } from 'express';

let cachedApp: INestApplication;

async function bootstrapApp(): Promise<INestApplication> {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    const allowedOrigins = [
      'http://localhost:5173',
      'https://atendimento-anhanguera.vercel.app',
    ];

    if (process.env.FRONTEND_URL) {
      allowedOrigins.push(process.env.FRONTEND_URL);
    }

    app.enableCors({
      origin: allowedOrigins,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    const config = new DocumentBuilder()
      .setTitle('Ação Social')
      .setDescription('API de atendimento social')
      .setVersion('1.0')
      .addTag('Ação Social')
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.init();
    cachedApp = app;
  }
  return cachedApp;
}

// Serverless Handler para o Vercel
export default async function handler(req: Request, res: Response) {
  const app = await bootstrapApp();
   
  const instance = app.getHttpAdapter().getInstance();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return instance(req, res);
}

// Inicia o servidor normalmente se não estiver no Vercel (ex: localhost)
if (!process.env.VERCEL) {
  void bootstrapApp().then((app) => {
    void app.listen(process.env.PORT ?? 3000);
  });
}
