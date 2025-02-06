
import fsp from 'fs/promises';
import fs from 'fs';

const CODEFILE = './src/db/client_codes.txt';
fs.writeFileSync(CODEFILE, '');

export const TIMEOUT = 1000 * 60 * 10;

export interface ClientCode {
    client_id: string;
    code: string;
    redirect: string;
    time: number;
}

export async function getClientCode(id: string, code: string, redirect: string) {
    const currentTime = Date.now();
    const codes = await readCodeFile();
    const c = codes.find(c => {
        return c.client_id === id
            && c.code === code
            && c.redirect === redirect
            && c.time + TIMEOUT > currentTime;
    });
    return c;
}

export async function saveClientCode(id: string, code: string, redirect: string) {
    await fsp.appendFile(CODEFILE, `${id} ${code} ${redirect} ${Date.now()}\n`);
}

export async function removeCodes(id: string, redirect: string) {
    const codes = await readCodeFile();
    const filtered = codes.filter(c => {
        return c.client_id !== id && c.redirect !== redirect
    });
    let outString = '';
    filtered.forEach(f => {
        outString += `${f.client_id} ${f.code} ${f.redirect} ${f.time}\n`;
    });
    await fsp.writeFile(CODEFILE, outString);
}


async function readCodeFile(): Promise<Array<ClientCode>> {
    const codes = await fsp.readFile(CODEFILE, { encoding: 'utf8' });
    const split = codes.split('\n').filter(c => !!c);
    return split.map(c => {
        const parts = c.split(' ');
        return {
            client_id: parts[0],
            code: parts[1],
            redirect: parts[2],
            time: Number(parts[3])
        };
    });
}