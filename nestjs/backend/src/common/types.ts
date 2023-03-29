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

export class RefreshToken implements JwtPayload {
    id: string;
    username: string;
}

export class AccessToken implements JwtPayload {
    id: string;
    username: string;
    refreshTokenId: string; // 発行元に使用されたRefreshTokenのid
}