import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { NestiaDefaultHeader } from './schema/header-base.dto';

import { assertPrune } from 'typia';
import { NestiaResHealth } from './schema/health.get.dto';

import { NestiaReqLogin, NestiaResLogin } from './schema/login.post.dto';

@Controller('app-nestia')
export class AppNestiaController {
  constructor(private readonly appService: AppService) {}

  /**
   * @tag app-nestia
   * @summary Get health
   * @description 서버 업타임을 가져옵니다.
   *
   * @param {NestiaDefaultHeader} header
   * @return {Promise<NestiaResHealth>}
   * @memberof AppNestiaController
   */
  @Get('/health')
  async getHealth(
    @Headers() header: NestiaDefaultHeader,
  ): Promise<NestiaResHealth> {
    return assertPrune<NestiaResHealth>({
      data: {
        uptime: this.appService.getUptime(),
        text: this.appService.getHello(),
      },
    });
  }

  /**
   * @tag app-nestia
   *
   * @param {NestiaDefaultHeader} header
   * @param {NestiaReqLogin} body
   * @return {Promise<NestiaResLogin>}
   * @memberof AppNestiaController
   */
  @Post('/login')
  async getLogin(
    @Headers() header: NestiaDefaultHeader,
    @Body() body: NestiaReqLogin,
  ): Promise<NestiaResLogin> {
    return assertPrune<NestiaResLogin>({
      data: { seq: '0001', nickname: 'test' },
    });
  }
}
