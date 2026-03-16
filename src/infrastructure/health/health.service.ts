import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import {
  HealthCheckService,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { ConfigurationService } from '../configuration/configuration.service';
import { HEALTH_INDICATORS, HEALTH_THRESHOLDS } from './health.constants';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly configService: ConfigurationService,
  ) {}

  async checkReadiness() {
    try {
      const result = await this.health.check([
        () =>
          this.memory.checkHeap(
            HEALTH_INDICATORS.MEMORY_HEAP,
            HEALTH_THRESHOLDS.MEMORY_HEAP_BYTES,
          ),
      ]);

      return {
        status: result.status,
        timestamp: new Date().toISOString(),
        checks: result.details,
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'error',
        timestamp: new Date().toISOString(),
        checks: {},
      });
    }
  }

  async checkAll() {
    const configs = this.configService.getConfigs();
    // const startTime = Date.now();

    try {
      const result = await this.health.check([
        () =>
          this.memory.checkHeap(
            HEALTH_INDICATORS.MEMORY_HEAP,
            HEALTH_THRESHOLDS.MEMORY_HEAP_BYTES,
          ),
        () =>
          this.memory.checkRSS(
            HEALTH_INDICATORS.MEMORY_RSS,
            HEALTH_THRESHOLDS.MEMORY_RSS_BYTES,
          ),
        () =>
          this.disk.checkStorage(HEALTH_INDICATORS.DISK, {
            thresholdPercent: HEALTH_THRESHOLDS.DISK_THRESHOLD_PERCENT,
            path: HEALTH_THRESHOLDS.DISK_PATH,
          }),
      ]);

      return {
        status: result.status,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.npm_package_version ?? 'unknown',
        environment: configs.NODE_ENV,
        indicators: result.details,
      };
    } catch {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.npm_package_version ?? 'unknown',
        environment: configs.NODE_ENV,
        indicators: {},
      };
    }
  }
}
