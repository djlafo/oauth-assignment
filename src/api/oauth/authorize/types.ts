export interface AuthorizeParams {
    response_type: 'code';
    redirect_uri: string;
    client_id: string;
    state: string;
}
export interface ErrorResponse {
    error: ErrorString;
    error_description: string;
    error_uri?: string;
    state?: string;
}
export type ErrorString = 'invalid_request' | 
    'unauthorized_client' | 
    'access_denied' | 
    'unsupported_response_type' |
    'invalid_scope' |
    'server_error' |
    'temporarily_unavailable';