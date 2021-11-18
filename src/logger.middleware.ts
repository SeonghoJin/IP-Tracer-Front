import { NestMiddleware } from '@nestjs/common';

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): any {
    console.log('..log');
    next();
  }
}
