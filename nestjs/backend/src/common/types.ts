import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

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

export class RefreshToken {
    id: string;
    username: string;
}

export class AccessToken {
    id: string;
    username: string;
    refreshTokenId: string; // 発行元に使用されたRefreshTokenのid
}