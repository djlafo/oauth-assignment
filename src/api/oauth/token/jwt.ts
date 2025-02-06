import * as jose from 'jose';
import { SECRET } from '../../../env.ts';
import { createSecretKey } from 'crypto';

export const EXPIRATION = 1000 * 60 * 60 * 24; // 24 hours

export async function encryptNewJWT(clientId: string, redirectUri: string) {
    const key = createSecretKey(SECRET, 'ascii');
    return await new jose.EncryptJWT({
            client_id: clientId,
            redirect_uri: redirectUri
        })
        .setProtectedHeader({alg: 'A128GCMKW', enc: 'A128GCM'})
        .setIssuedAt()
        .setExpirationTime(Date.now() + EXPIRATION)
        .encrypt(key);
}