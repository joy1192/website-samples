import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {

    // 現在時刻を使う箇所の為にDate.now()をモック化
    Date.now = jest.fn(() => 0);

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({
        envFilePath: [".env.local", ".env"]
      })],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("createTokenで作成したリフレッシュトークンでアクセストークンを発行できる", async () => {
    {
      const result = await service.createToken("username", "password");
      expect(result.refreshToken).toBeDefined();
      expect(result.accessToken).toBeDefined();

      const { accessToken } = await service.createTokenByRefreshToken(result.refreshToken);
      expect(accessToken).toBeDefined();

      // 同一時刻、同一鍵、同一内容で作成したアクセストークンでも署名が異なる(UUIDでIDが発行されるため)
      expect(accessToken).not.toBe(result.accessToken);
    }
  });
});
