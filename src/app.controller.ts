import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AppService } from './app.service';

import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { DefaultHeader } from './schema/header-base.dto';
import { ReqLogin, ResLogin } from './schema/login.post.dto';
import { plainToInstance } from 'class-transformer';
import { ResHealth } from './schema/health.get.dto';

@Controller('/nest-swagger')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * health check
   *
   * @param {DefaultHeader} headers
   * @return {Promise<ResHealth>}
   * @memberof AppController
   */
  @Get('/health')
  @ApiOperation({ tags: ['/nest-swagger'], description: 'health check' })
  @ApiResponse({ description: 'health success', type: ResHealth })
  async getHealth(@Headers() headers: DefaultHeader): Promise<ResHealth> {
    const data = {
      uptime: this.appService.getUptime(),
      text: this.appService.getHello(),
    };

    return plainToInstance(
      ResHealth,
      { data },
      {
        enableImplicitConversion: true,
      },
    );
  }

  /**
   * login
   *
   * @param {DefaultHeader} headers
   * @param {ReqLogin} payload
   * @return {*}
   * @memberof AppController
   */
  @Post('/login')
  @ApiOperation({ tags: ['/nest-swagger'], description: 'login' })
  @ApiBody({ type: ReqLogin })
  @ApiOkResponse({ description: 'Login success', type: ResLogin })
  async login(
    @Headers() headers: DefaultHeader,
    @Body() payload: ReqLogin,
  ): Promise<ResLogin> {
    const data = { seq: '0001', nickname: 'test' };
    return plainToInstance(
      ResLogin,
      { data },
      {
        enableImplicitConversion: true,
      },
    );
  }
}
