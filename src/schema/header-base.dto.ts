import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIP, IsNotEmpty, IsString } from 'class-validator';

/**
 * nest swagger
 */
export class DefaultHeader {
  @ApiProperty({ default: 'test client', description: 'browser user-agent' })
  @IsNotEmpty()
  @IsString()
  'user-agent': string;

  @ApiPropertyOptional({ default: '0.0.0.0', description: 'ip address' })
  @IsIP()
  ip: string;
}

/**
 * nestia swagger
 */
export class NestiaDefaultHeader {
  /**
   * user-agent
   * @summary browser user-agent
   * @default test client
   *
   * @type {string}
   * @memberof NestiaDefaultHeader
   */
  @IsNotEmpty()
  @IsString()
  'user-agent': string;

  /**
   * call page
   * @summary call page
   * @default /api
   *
   * @type {string}
   * @memberof NestiaDefaultHeader
   */

  @IsNotEmpty()
  @IsString()
  path: string;
}
