import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { sign, verify } from "jsonwebtoken";
import { ConfigService } from '@nestjs/config';
import { AccessToken, RefreshToken } from "../common/types";
import { isRefreshToken } from "../common/typeguards";
import { uuid } from "../common/uuid";
import { EnvironmentVariables } from '../common/configuration';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(private readonly configService: ConfigService<EnvironmentVariables, true>) { }

    // ユーザー認証を行い、RefreshTokenとAccessTokenを生成する
    async createToken(username: string, password: string): Promise<{ refreshToken: string; accessToken: string }> {
        const privateKey = this.configService.get('PRIVATE_KEY');
        const refreshTokenExpiredInMs = this.configService.get("REFRESH_TOKEN_EXPIRES_IN_MS");
        const accessTokenExpiredInMs = this.configService.get("ACCESS_TOKEN_EXPIRES_IN_MS");

        // ユーザー認証
        if (await this.authenticate(username, password) === false) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        // JWTを生成
        try {
            const refreshTokenPayload: RefreshToken = { id: uuid(), username };
            const refreshToken = sign(refreshTokenPayload, privateKey, {
                algorithm: 'RS256',
                expiresIn: refreshTokenExpiredInMs,
            });
            this.logger.log(`create refreshToken: ${refreshToken}`);

            const accessTokenPayload: AccessToken = { id: uuid(), username, refreshTokenId: refreshTokenPayload.id };
            const accessToken = sign(accessTokenPayload, privateKey, {
                algorithm: 'RS256',
                expiresIn: accessTokenExpiredInMs,
            });
            this.logger.log(`create accessToken: ${accessToken}`);
            return {
                refreshToken,
                accessToken
            };
        } catch (e) {
            this.logger.error(e);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // RefreshTokenを元にAccessTokenを生成
    async createTokenByRefreshToken(token: string): Promise<{ accessToken: string }> {
        const privateKey = this.configService.get("PRIVATE_KEY");
        const accessTokenExpiredInMs = this.configService.get("ACCESS_TOKEN_EXPIRES_IN_MS");

        let refreshTokenPayload: RefreshToken;
        try {
            const payload = verify(token, privateKey, { algorithms: ['RS256'] });
            // payloadの型がRefreshTokenであるかをチェック
            if (typeof payload !== 'string' && isRefreshToken(payload)) {
                refreshTokenPayload = payload;
            } else {
                throw new Error('Invalid Token');
            }
        } catch (e) {
            this.logger.error(e);
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        // JWTを生成
        try {
            const { id, username } = refreshTokenPayload;

            const accessTokenPayload: AccessToken = { id: uuid(), username, refreshTokenId: id };
            const accessToken = sign(accessTokenPayload, privateKey, {
                algorithm: 'RS256',
                expiresIn: accessTokenExpiredInMs,
            });
            this.logger.log(`create accessToken: ${accessToken}`);
            return {
                accessToken
            };
        } catch (e) {
            this.logger.error(e);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async authenticate(username: string, password: string): Promise<boolean> {
        // TODO: ユーザー認証処理を実装
        return true;
    }
}
