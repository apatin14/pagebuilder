// Only For module alias
import 'module-alias/register';
import * as path from 'path';
import * as moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@domain': path.resolve(__dirname, 'domain'),
  '@application': path.resolve(__dirname, 'application'),
  '@infrastructure': path.resolve(__dirname, 'infrastructure'),
  '@constants': path.format({dir: __dirname, name: 'constants'}),
});

// App modules
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './constants';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('User Api')
    .setDescription('Api para revisar, organizar, testear las direcciones https y los valores que retornan')
    .setVersion('1.0')
    .addTag('User')
    .build();

  const catDocument = SwaggerModule.createDocument(app, options, {
    include: [AppModule],
  });
  SwaggerModule.setup('api', app, catDocument);

  const optionsCors = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  };

  app.enableCors(optionsCors);

  await app.listen(APP_PORT);

  console.log('Runing on port ==> ', APP_PORT);
}
bootstrap();


//https://github.com/kyrcha/websitebuilder