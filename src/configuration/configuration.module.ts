import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigurationService } from "./configuration.service";
import { validateEnvironmentVariables } from "src/common/validation/env.validation";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [".env", ".env.dev", ".env.prod"],
      expandVariables: true,
      validate: validateEnvironmentVariables,
    })
  ],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule { }