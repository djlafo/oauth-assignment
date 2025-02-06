import { Router } from "express";
const router = Router();

import { getClientsByRedirect } from "../../../db/clients.ts";
import { saveClientCode } from "../../../db/client_codes.ts";
import { type AuthorizeParams } from "./types.ts";
import { checkClient, checkRedirectUri, checkResponseType, onCodeFail } from "./validators.ts";

router.post('/authorize', (req, res) => {
    const params: Partial<AuthorizeParams> = req.body;
    if(!checkRedirectUri(res, params.redirect_uri)) return;
    const clients = checkClient(res, 
                        getClientsByRedirect(params.redirect_uri), 
                        params.client_id);
    if(!clients) return;
    if(!checkResponseType(res, params.redirect_uri, params.response_type)) return;

    const code = crypto.randomUUID();

    saveClientCode(params.client_id, code, params.redirect_uri).then(() => {
        res.status(302).redirect(`${params.redirect_uri}?code=${code}&state=${params.state}`)
    }).catch(() => {
        onCodeFail(res, params.redirect_uri);
    });
});

export default router;