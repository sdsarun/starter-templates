import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  type Configuration,
  ConfigurationSchema,
} from './configuration.config';

@Injectable()
export class ConfigurationService {
  constructor(
    private readonly configService: ConfigService<Configuration, true>,
  ) {}

  getConfigs(): Configuration {
    const keys = Object.keys(
      ConfigurationSchema.shape,
    ) as (keyof Configuration)[];
    return keys.reduce<Configuration>(
      <K extends keyof Configuration>(prev: Configuration, key: K) => ({
        ...prev,
        [key]: this.configService.get<K>(key),
      }),
      {} as Configuration,
    );
  }
}
