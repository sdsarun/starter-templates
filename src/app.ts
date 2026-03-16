import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { RawServerDefault } from 'fastify';
import { Configuration } from './infrastructure/configuration/configuration.config';
import { ConfigurationService } from './infrastructure/configuration/configuration.service';
import { LoggerService } from './infrastructure/logger/logger.service';
import fastifyCookie from '@fastify/cookie';
import compression from '@fastify/compress';

export class Application {
  private app: NestFastifyApplication<RawServerDefault>;
  private configs: Configuration;
  private logger: LoggerService;
  private readonly initPromise: Promise<void>;

  constructor() {
    this.initPromise = this.init();
  }

  private async init(): Promise<void> {
    this.app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

    await this.setupPlugins();

    this.setupFeatures();
    this.setupInjects();
  }

  private async setupPlugins() {
    await this.app.register(fastifyCookie);
    await this.app.register(compression);
  }

  private setupFeatures() {
    this.app.enableShutdownHooks();
    this.app.enableCors();
  }

  private setupInjects() {
    this.configs = this.app.get(ConfigurationService).getConfigs();
    this.logger = this.app.get(LoggerService);
  }

  private async ready() {
    return this.initPromise;
  }

  async start(): Promise<void> {
    await this.ready();
    await this.app.listen(this.configs.PORT, async () => {
      const url = await this.app.getUrl();
      this.logger.log(`Application running on ${url}`, 'bootstrap');
    });
  }
}
