import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('CRUP API')
    .setDescription('CRUD API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
};
