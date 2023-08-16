import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

import { TypeGuardError } from 'typia';

@Catch(TypeGuardError)
export class TypiaExceptionFilter implements ExceptionFilter {
  async catch(exception: TypeGuardError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    res.status(500).send({
      success: false,
      errorCode: 'TYPE_GUARD_ERROR',
      message: `${exception.method}-${exception.path} - type is ${exception.expected} but value is ${exception.value}`,
    });
  }
}
