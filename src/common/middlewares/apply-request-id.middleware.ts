import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { randomPrefixUUID } from 'src/shared/utils/generators/random-prefix-uuid.generator';

@Injectable()
export class ApplyRequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: (error?: Error | any) => void) {
    req._requestId = (req.headers?.['x-request-id'] as string) ?? randomPrefixUUID('request-auto-gen');
    next();
  }
}
