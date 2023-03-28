import { RefreshToken, AccessToken } from './types';

export const isRefreshToken = (value: any): value is RefreshToken => {
    return value && value.id && value.username;
}

export const isAccessToken = (value: any): value is AccessToken => {
    return value && value.id && value.username;
}