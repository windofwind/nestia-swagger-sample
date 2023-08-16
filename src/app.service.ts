import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * system uptime
   *
   * @return {Number}
   * @memberof AppService
   */
  getUptime(): number {
    return process.uptime();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
