import { Router } from "express";
const router = Router();

import { type TokenParams, type TokenResponse } from './types.ts';
import { onJWTFail, validateCode, validateExistence } from "./validators.ts";
import { encryptNewJWT, EXPIRATION } from "./jwt.ts";

router.post('/token', (req, res) => {
    const params: Partial<TokenParams> = req.body;
    const checkedParams = validateExistence(res, params);
    if(!checkedParams) return;
    validateCode(res, checkedParams).then(c => {
        if(!c) return;
        encryptNewJWT(params.client_id, params.redirect_uri).then(jwt => {
            const ret: TokenResponse = {
                access_token:  jwt,
                token_type: 'bearer',
                expires_in: EXPIRATION/1000
            };
            res.status(200).json(ret);
        }).catch(e => {
            console.log(e);
            onJWTFail(res);
        });
    })
});

export default router;