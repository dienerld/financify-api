import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { generateOpenApiSpec } from './config/docs/generate-spec';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const config = generateOpenApiSpec(new DocumentBuilder());

  const document = SwaggerModule.createDocument(app, config);
  document.tags = document.tags?.sort((a, b) => a.name.localeCompare(b.name));
  app.use(
    '/api/docs',
    apiReference({
      spec: { content: document },
      metaData: {
        title: 'Api Documentation',
        author: 'Diener',
        applicationName: 'Api Documentation',
        ogSiteName: 'Api Documentation Financify',
        ogTitle: 'Api Documentation Financify',
      },
    }),
  );

  await app.listen(8080);

  Logger.log(`Server running on http://localhost:8080`, 'Bootstrap');
}
bootstrap();
