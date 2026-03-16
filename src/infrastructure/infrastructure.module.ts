import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { LoggerModule } from './logger/logger.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ConfigurationModule, LoggerModule, HealthModule],
})
export class InfrastructureModule {}
