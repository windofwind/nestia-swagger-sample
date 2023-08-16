import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { DTOBaseRequest, DTOBaseResponse } from './base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * nest swagger
 */
export class ReqLogin extends DTOBaseRequest {
  /**
   * 유저 아이디
   *
   * @type {string}
   * @memberof ReqLogin
   */
  @ApiProperty({ default: 'test', description: 'id' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  /**
   * 유저 패스워드
   *
   * @type {string}
   * @memberof ReqLogin
   */
  @ApiProperty({ default: '1234', description: 'password' })
  @IsNotEmpty()
  @IsString()
  userPassword: string;
}

export class LoginData {
  @ApiProperty({ default: '0001', description: 'seq' })
  @IsNotEmpty()
  @IsString()
  seq: string;

  @ApiProperty({ default: '테스트', description: 'nickname' })
  @IsNotEmpty()
  @IsString()
  nickname: string;
}

export class ResLogin extends DTOBaseResponse {
  /**
   * 로그인 데이터
   *
   * @type {LoginData}
   * @memberof ResLogin
   */
  @ApiProperty({ type: LoginData, description: '로그인 데이터' })
  @Type(() => LoginData)
  @ValidateNested()
  data: LoginData;
}

/**
 * nestia swagger
 */
export class NestiaReqLogin extends DTOBaseRequest {
  /**
   * 유저 아이디
   * @summary 유저 아이디
   * @default test
   *
   * @type {string}
   * @memberof NestiaReqLogin
   */
  @IsNotEmpty()
  @IsString()
  userId: string;

  /**
   * 유저 패스워드
   * @summary 유저 패스워드
   * @default 1234
   *
   * @type {string}
   * @memberof NestiaReqLogin
   */
  @ApiProperty({ default: '1234', description: 'password' })
  @IsNotEmpty()
  @IsString()
  userPassword: string;
}

export class NestiaLoginData {
  @ApiProperty({ default: '0001', description: 'seq' })
  @IsNotEmpty()
  @IsString()
  seq: string;

  /**
   * nickname
   *
   * @type {string}
   * @memberof NestiaResLogin
   */
  @ApiProperty({ default: '테스트', description: 'nickname' })
  @IsNotEmpty()
  @IsString()
  nickname: string;
}

export class NestiaResLogin extends DTOBaseResponse {
  /**
   * 로그인데이터
   * @summary 로그인데이터
   *
   * @type {LoginData}
   * @memberof NestiaResLogin
   */
  @Type(() => LoginData)
  @ValidateNested()
  data: LoginData;
}
