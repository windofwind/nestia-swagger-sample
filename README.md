# [nestjs] nestia 가 무엇인지는 몰르지만 Swagger는 좋다. 다 같이 쓰자.

난 글쓰는 재주가 없다. 말이 좀 짧더라도 불평을 하지 말라. 이해도 바라지 않으니 빼먹을것만 빼먹고 해라.

경축! [nestia](https://nestia.io) 가 버전업이 되었다.  
내가 쓸 기능들이 9x% 이상 완성된 것이다. [삼촌](https://github.com/samchon)님 감사합니다. 그래서 이글을 남긴다.

네스티아가 무엇인고? 난 잘 몰른다. 내 설명보단 영상을 참고([이곳](https://youtu.be/VH1GTGIMHQw?t=353))을 참고하기 바란다.

명확히 내가 사용하는것은 기능에 대해서만 설명할꺼고, 그게 nestia 기능 하나 swagger 에 대해서만 설명할려고 한다.

## vscode extension 및 사전 준비물

1.  [vscode - Document This](https://marketplace.visualstudio.com/items?itemName=oouo-diogo-perdigao.docthis) - jsdoc 형태 주석을 지원함(단축키 : ctrl+alt+D + D)
2.  [nestia](https://nestia.io/docs/) - 삼촌님이 만든 nestia 문서
3.  nestjs 프로젝트

## start and test

1. 패키지 매니저는 pnpm을 사용하였다.
2. vacode 의 debug를 사용하면 된다. (F5 누르면 된다.)
3. bash 를 이용한다.

```bash
pnpm start
```

## nestia Swagger

swagger는 주로 백엔드가 제공하며 api 문서를 만들어준다.

1. 기존에 class-validator, class-transfommer 를 사용하고 있는 기준에서 아주 간단히 변경하는 방법을 이용했다.
2. DTO 는 schema 에 남겻고 "nest", "nestia" prefix 를 붙였다.
3. 파일명에 "nest", "nestia"를 남겨서 구분 했다.
4. nestia.config.ts 파일이 필요하다. (기존에는 없었음)
5. 기존에 jsdoc 주석 형태를 작성하고 있었다면 더욱더 편리하게 바꿀 수 있다. (@xxx 태그 추가만으로 금방 끝나며 "nest/swagger" 의 데코레이션을 삭제또는 주석처리만으로 해결)
   나도 단것과 안단것이 있는데 흑흑..

```ts
// main.ts
... {중략}
const useNestia: boolean = false; // useNestia 를 통해 swagger 옵션을 변경한다.
... {중략}
```

- [swagger url](localhost:3000)

## 추가 사항

- @TypedRoute, @TypedBody, @TypedParam, @TypedQuery, @TypedHeaders 을 사용면 엄격한 타입을 써야된다. - 1차 버전에서는 주석으로 변경만 해도 엄청나게 편리해진다.
- method( @TypedRoute.Get 등)를 사용 할 경우는 콘트롤러에 리턴 값이 인터셉터에서 값을 처리하면 string으로 만들어진다.  
  인터셉터를 쓰는 특별한 경우는 nestjs가 제공하는 데코레이션을 쓰자 (v4.1.12 기준 파일전송을 지원하지 않는다)  
  ex) 파일전송, 콘트롤러에 리턴 object를 인터셉터에서 오브젝트로 받을 경우  
  ps. 속도차이는 약 10배내외라고 하셧습니다. class-validator, class-transfomer 만 제거해도 충분하다고 하셧습니다.

- @default 사용법
  기본값이 undefined 면 @default 안쓴다. 빈값일때는 @default 만 써놓는다.
- @tag 사용법
  swagger 공식문에서는 tags 이다. 타입은 string[] 이다. nestia에서는 1개씩 여러 라인 적는것으로 배열처럼 표기를 하고 있다.
- @hidden 사용법  
  DTO에는 포함대상이지만 유저가 직접 보내지 않는 값들을 감추는데 사용한다. 현재는 header에만 적용 되어있다(원작자왈 쿼리, 파람등에 지원여부는 미정). 스웨거에서는 보이지 않지만 validate 대상으로 포함됩니다. (v4.1.12 기준)  
  ex) user-ajent, authorization(이값은 스웨거 상단에 authorization 버튼을 눌러서 설정 한다- 스웨거 공식문서상 빠져야된다고 되어있다.), Accept, Content-Type, dns에서 제공하는 custom headers(클라우드플레어에서는 IP국가코드도 제공한다)  
  [ [참고 표 - Parameter Object - Fixed Fields][1] ]

  [1]: https://swagger.io/specification/v3/#parameter-object

- @secuity 사용법
  인증방식을 기록하고 그 기록키 값으로 콘트롤러에 @ApiSecurity 를 설정하면 그 endpoint 에 자물쇠 표시가 된다. 키 여러개를 지원합니다.  
  config 파일(nestia.config.ts) 만 설정하여 사용할 수 있습니다.
- nestia.config.ts 파일 옵션 - decompose  
  Swagger 에 DTO 출력이 아닌 DTO 풀어주는 방법은 config파일(nest.config.ts) 옵션 “decompose: true”를 사용한다.  
  ex) 스웨거 페이지에서 파일을 추가한다던지 하면 파일 추가 관련 콤포넌트도 표기된다.
  default 는 false 이며 DTO가 Object로 표기된다.
- @throw 사용법  
  스웨거에 에러를 표기합니다.  
  “@throw 400 {}” 같이 사용합니다.
- @type 사용법
  @type {number} 일 경우 jsDoc 충돌을 일으킬 수 있다.  
  @type {"int"|"uint"} 를 사용하자  
  ps. document this 등의 jsDoc 제너레이터를 사용하는 경우에는 number 타입일 경우에는 바꿔주자\
- `assertPrune<T>(data);`  
  이거 좋다. 아무리 복잡한 데이터가 있더라도 딱 내가 원하는 타입을 만들어서 넣어주면 다 잘라준다.
- nestia swagger 에서는 response code를 method 에 따라 성공 200, 201 을 자동으로 붙여준다.

# history - deleted - 기존 작성하다가 만것을 남긴다.

어떻게 작성하느냐? @nestjs/swagger 라이브러리를 사용하면 아래와 같이 사용한다. (아니 나만 이렇게 사용한건가? 총 파일 5개를 사용했네)

```ts
// base.dto.ts - header정의와 인터셉터에서 데이터가 ResponseBase 를 상속받았는지 확인하기 위해 사용한다.
export class HeadersBase {
  @ApiProperty({ required: false, description: '인증토큰' })
  @IsOptional()
  @IsString()
  authorization?: string;
}

export class RequestBase {}

export class ResponseData {}

export class ResponseBase {
  @ApiProperty({ description: '성공 여부', example: true })
  @IsNotEmpty()
  @IsBoolean()
  success: boolean;

  @ApiProperty({ description: '호출 시간', example: 1623930000000 })
  @IsNumber()
  timestamp: number;

  constructor() {
    this.success = true;
    const t = dayjs();
    this.timestamp = t.valueOf();
  }
}

// health.dto.ts - DTO
export class ReqHealth extends RequestBase {}

export class ResHealthData extends ResponseData {
  @ApiProperty({ description: '서버 실행 시간' })
  uptime: number;
}

export class ResHealth extends ResponseBase {
  @ApiProperty({ type: ResHealthData })
  data: ResponseData;
}

// app.controller.ts
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @ApiOperation({ tags: ['default'], description: 'health check' })
  @ApiOkResponse({ type: Health.Response, description: 'success' })
  @ApiBadGatewayResponse({ description: 'Bad Gateway' })
  async health(@Headers() headers: HeadersBase, @Query() payload: ReqHealth) {
    const data = {
      uptime: this.appService.getUptime(headers, payload);
    };

    return plainToClass(ResHealth, { data }, { enableImplicitConversion: true })
  }
}

// transform.interceptor.ts - 콘트롤러에서 리턴된 데이터를 처리한다.
export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Promise<Response<T>>> {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Promise<Response<T>>> {
    const request = context.switchToHttp().getRequest();
    request.headers.startTime = dayjs().valueOf();

    return next.handle().pipe(
      map(async (data) => {
        let validateError;

        try {
          // ResponseBase 를 상속받은 클래스인지 확인한다.
          if (data instanceof ResponseBase) {
            validateError = await validate(data, {
              whitelist: true,
              validationError: { target: false },
              Transform: false,
              skipMissingProperties: false,
              disableErrorMessages: true,
              dismissDefaultMessages: false,
              stopAtFirstError: true,
              forbidUnknownValues: true,
            });

            if (validateError.length > 0) {
              throw new ResponseDataError(); // 익셉션 필터에서 처리
            }
          }
        } catch (e: any) {
          throw e;
        }

        return data;
      }),
    );
  }
}

// http-exception.filter.ts - error 가 발생하면 이곳에서 처리한다.
@Catch(CustomError)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async catch(exception: CustomError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res.status(exception.statusCode).send(sendData);
  }
}
```
