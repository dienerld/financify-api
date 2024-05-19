import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import metadata from '@/metadata';
import { apiReference } from '@scalar/nestjs-api-reference';
import { generateOpenApiSpec } from './config/docs/generate-spec';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = generateOpenApiSpec(new DocumentBuilder());

  await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, config);

  app.use('/api/docs', apiReference({ spec: { content: document } }));

  await app.listen(8080);

  Logger.log(`Server running on http://localhost:8080`, 'Bootstrap');
}
bootstrap();
