import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { JwtPayload } from "jsonwebtoken"

export class ErrorResponseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    message: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    code: string;
}

export class TokenBase implements JwtPayload {
    iss?: string | undefined;
    sub?: string | undefined;
    aud?: string | string[] | undefined;
    exp?: number | undefined;
    nbf?: number | undefined;
    iat?: number | undefined;
    jti?: string | undefined;
}

export class RefreshToken extends TokenBase {
    id: string;
    username: string;
}

export class AccessToken extends TokenBase {
    id: string;
    username: string;
    refreshTokenId: string; // 発行元に使用されたRefreshTokenのid
}