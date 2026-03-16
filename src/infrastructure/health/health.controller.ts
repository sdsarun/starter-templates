import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/live')
  liveness() {
    return {
      status: 'ok',
      timestamp: Date.now(),
    };
  }

  @Get('/ready')
  readiness() {
    return this.healthService.checkReadiness();
  }

  @Get()
  health() {
    return this.healthService.checkAll();
  }
}
