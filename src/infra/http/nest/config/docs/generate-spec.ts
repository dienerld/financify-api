import { DocumentBuilder } from '@nestjs/swagger';
import { tags } from './tags';

export function generateOpenApiSpec(document: DocumentBuilder) {
  document
    .setTitle('Financify API Documentation')
    .setDescription('The Financify API Documentation')
    .setVersion('0.0.1')
    .addBearerAuth();

  Object.entries(tags).forEach(([, value]) => {
    document.addTag(value);
  });

  return document.build();
}
