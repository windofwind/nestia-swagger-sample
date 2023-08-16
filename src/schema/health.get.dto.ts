import { Type } from 'class-transformer';
import {
  DTOBaseRequest,
  DTOBaseResponse,
  DTONestiaBaseResponse as DTONestiaBaseRequest,
  DTONestiaBaseResponse,
} from './base.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * nest swagger typo
 */
export class ReqHealth extends DTOBaseRequest {}

export class HealthCheck extends DTOBaseRequest {
  @ApiProperty({ description: 'uptime in seconds' })
  @IsNotEmpty()
  @Min(0)
  @IsNumber()
  uptime: number;

  @ApiProperty({ description: 'hello world' })
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class ResHealth extends DTOBaseResponse {
  @ApiProperty({ type: HealthCheck, description: 'health data' })
  @Type(() => HealthCheck)
  @ValidateNested({})
  data: HealthCheck;
}

/**
 * nestia swagger typo
 */
export class NestiaReqHealth extends DTONestiaBaseRequest {}

export class NestiaHealthCheck {
  /**
   * uptime in seconds
   * @summary uptime in seconds
   *
   * @type {number}
   * @memberof NestiaHealthCheck
   */
  @IsNotEmpty()
  @Min(0)
  @IsNumber()
  uptime: number;

  /**
   * text
   * @summary hello world
   *
   * @type {string}
   * @memberof NestiaHealthCheck
   */
  @IsString()
  text: string;
}

export class NestiaResHealth extends DTONestiaBaseResponse {
  /**
   * health data
   * @summary health data
   *
   * @type {HealthCheck}
   * @memberof NestiaResHealth
   */
  @Type(() => HealthCheck)
  @ValidateNested({})
  data: HealthCheck;
}
