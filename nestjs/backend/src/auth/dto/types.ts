import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

// ユーザー名とパスワードを受け取るためのDTO
export class RefreshTokenRequestDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}

export class RefreshTokenResponseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    refreshToken: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    accessToken: string;
}

export class AccessTokenRequestDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    refreshToken: string;
}

export class AccessTokenResponseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    accessToken: string;
}