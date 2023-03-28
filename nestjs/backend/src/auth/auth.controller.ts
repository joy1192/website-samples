import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/types';
import { AuthService } from './auth.service';
import { RefreshTokenRequestDto } from './dto/types';
import { RefreshTokenResponseDto } from './dto/types';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    @ApiResponse({ status: HttpStatus.OK, type: RefreshTokenResponseDto, description: '認証OK' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorResponseDto, description: '引数不正' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ErrorResponseDto, description: '認証失敗' })
    async getRefreshToken(@Body() refreshTokenDto: RefreshTokenRequestDto): Promise<RefreshTokenResponseDto> {
        const { username, password } = refreshTokenDto;
        const { refreshToken, accessToken } = await this.authService.createToken(username, password);
        return { refreshToken, accessToken };
    }
}
