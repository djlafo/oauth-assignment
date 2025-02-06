export interface TokenParams {
    grant_type: 'authorization_code';
    code: string;
    client_id: string;
    redirect_uri: string;
}
export interface TokenResponse {
    access_token: string;
    token_type: 'bearer';
    expires_in: number;
    refresh_token?: string;
}
export interface ErrorResponse {
    error: ErrorString;
    error_description?: string;
    error_uri?: string;
}
export type ErrorString = 'invalid_request' | 
    'invalid_client' | 
    'invalid_grant' | 
    'unauthorized_client' |
    'unsupported_grant_type' |
    'invalid_scope';