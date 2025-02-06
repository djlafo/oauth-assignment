import { type Response } from "express";
import { type ErrorResponse, type TokenParams } from "./types.ts";
import { getClientCode, removeCodes } from "../../../db/client_codes.ts";

export function validateExistence(res: Response, { code, client_id, redirect_uri, grant_type }: Partial<TokenParams>) {
    if(!client_id) {
        sendError(res, {
            error: 'invalid_request',
            error_description: 'Missing client id'
        });
    } else if (!code) {
        sendError(res, {
            error: 'invalid_request',
            error_description: 'Missing code'
        });
    } else if(!redirect_uri) {
        sendError(res, {
            error: 'invalid_request',
            error_description: 'Missing redirect'
        });
    } else if(grant_type !== 'authorization_code') {
        sendError(res, {
            error: 'unsupported_grant_type',
            error_description: 'Invalid grant type'
        });
    } else {
        const newParams: TokenParams = {
            code, client_id, redirect_uri, grant_type
        }
        return newParams;
    }
}

export async function validateCode(res: Response, { code, client_id, redirect_uri}: TokenParams) {
    const c = await getClientCode(client_id, code, redirect_uri);
    if(!c) {
        sendError(res, {
            error: 'invalid_client',
            error_description: 'Code not found'
        });
        return false;
    } else {
        removeCodes(client_id, redirect_uri);
        return true;
    }
}

export function onJWTFail(res: Response) {
    // there isn't a server error flag in the doc for this, so for now
    sendError(res, {
        error: 'invalid_request',
        error_description: 'Error creating auth token'
    });
}


function sendError(res: Response, error: ErrorResponse) {
    res.status(400).json(error);
}