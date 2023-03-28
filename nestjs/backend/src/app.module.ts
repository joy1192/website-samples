import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env.local', '.env'], // 環境変数を読み込むファイルを指定
    isGlobal: true, // 全てのモジュールで利用可能にする
  }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
