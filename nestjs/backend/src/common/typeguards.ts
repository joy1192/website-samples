import { RefreshToken, AccessToken } from './types';
import { JwtPayload } from 'jsonwebtoken';

export const isRefreshToken = (value: JwtPayload): value is RefreshToken => {
    return value && value.id && value.username;
}

export const isAccessToken = (value: JwtPayload): value is AccessToken => {
    return value && value.id && value.username && value.refreshTokenId;
}