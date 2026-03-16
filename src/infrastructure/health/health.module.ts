import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { TerminusModule } from '@nestjs/terminus';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [
    TerminusModule.forRootAsync({
      inject: [LoggerService],
      useFactory: (logger: LoggerService) => {
        return {
          gracefulShutdownTimeoutMs: 1000,
          logger,
        };
      },
    }),
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
