import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configurationService = app.get(ConfigurationService);

  app.use(helmet());
  app.enableCors(configurationService.corsConfig);
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });

  if (configurationService.isDevelopment) {
    const config = new DocumentBuilder()
      .setTitle(configurationService.swaggerConfig.title)
      .setDescription(configurationService.swaggerConfig.description)
      .setVersion(configurationService.swaggerConfig.version)
      .addBearerAuth()
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(configurationService.swaggerConfig.endpointName, app, documentFactory);
  }

  await app.listen(configurationService.appConfig.port);
}

bootstrap();
