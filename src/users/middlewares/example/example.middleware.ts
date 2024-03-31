import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('exmaple middleware')
    console.log(req.headers.authorization)
    const { authorization } = req.headers
    if (!authorization)
      throw new HttpException('No authorization Token', HttpStatus.FORBIDDEN)

    next()
  }
}
