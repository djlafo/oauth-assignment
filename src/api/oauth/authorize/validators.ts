import { type Response } from "express";
import { type ErrorResponse } from "./types.ts";
import { type Client } from "../../../db/clients.ts";

export function checkRedirectUri(res: Response, redirect_uri: string) {
    if(!redirect_uri) res.status(400).send('Missing redirect');
    return !!redirect_uri;
}

export function checkClient(res: Response, clients: Array<Client>, id: string) {
    if(!id) {
        res.status(400).send('Missing client');
        return false;
    }
    const clientsWithId = clients.filter(c => c.id === id);
    if(clientsWithId.length === 0 || !clientsWithId.length) {
        res.status(400).send('Mismatched client ID with redirect');
        return false;
    }
    return clientsWithId;
}

export function checkResponseType(res: Response, redirect: string, respType: string) {
    if(respType !== 'code') {
        res.redirect(getErrorUrl(redirect, {
            error: 'invalid_request',
            error_description: 'Invalid response type'
        }));
        return false;
    }
    return true;
}

export function onCodeFail(res: Response, redirect: string) {
    res.redirect(getErrorUrl(redirect, {
        error: 'server_error',
        error_description: 'Failed to save code'
    }))
}

export function getErrorUrl(redirect, { error_uri, error, error_description }: ErrorResponse) {
    return `${redirect}?error=${error}&error_description=${error_description}&error_uri=${error_uri}`;
}