import { DocumentBuilder } from '@nestjs/swagger';
import { tags } from './tags';

export function generateOpenApiSpec(document: DocumentBuilder) {
  document
    .setTitle('Financify API Documentation')
    .setDescription('The Financify API Documentation')
    .setVersion('0.0.1')
    .addBearerAuth();

  const sortedTags = Object.entries(tags)
    .map(([, value]) => value)
    .sort((a, b) => a.localeCompare(b));
  sortedTags.forEach((tag) => {
    document.addTag(tag);
  });

  return document.build();
}
