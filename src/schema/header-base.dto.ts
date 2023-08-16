import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * nest swagger
 */
export class DefaultHeader {
  /**
   * user-agent
   *
   * @type {string}
   * @memberof DefaultHeader
   */
  @ApiProperty({ default: 'test client', description: 'browser user-agent' })
  @IsNotEmpty()
  @IsString()
  'user-agent': string;

  /**
   * 호출 페이지 경로
   *
   * @type {string}
   * @memberof DefaultHeader
   */
  @ApiPropertyOptional({ default: '/api', description: 'call page' })
  @IsNotEmpty()
  @IsString()
  path: string;
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
   * 호출 페이지 경로
   * @summary 호출 페이지 경로
   * @default /api
   *
   * @type {string}
   * @memberof NestiaDefaultHeader
   */

  @IsNotEmpty()
  @IsString()
  path: string;
}
