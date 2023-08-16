import { ApiProperty } from '@nestjs/swagger';

/**
 * nest swagger
 */
export class DTOBaseRequest {}

export class DTOBaseResponse {
  /**
   * 성공 여부
   *
   * @type {boolean}
   * @memberof DTOBaseResponse
   */
  @ApiProperty({ description: '성공 여부', default: true })
  success: boolean;

  constructor() {
    this.success = true;
  }
}

/**
 * nestia swagger
 */
export class DTONestiaBaseRequest {}

export class DTONestiaBaseResponse {
  /**
   * 성공여부
   * @summary 성공여부
   * @default true
   *
   * @type {boolean}
   * @memberof DTONeatiaBaseResponse
   */
  success: boolean;

  constructor() {
    this.success = true;
  }
}
