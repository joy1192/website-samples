import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
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
    const result = await service.createToken("username", "password");
    expect(result.refreshToken).toBeDefined();
    expect(result.accessToken).toBeDefined();

    const { accessToken } = await service.createTokenByRefreshToken(result.refreshToken);
    expect(accessToken).toBeDefined();
  });
});
