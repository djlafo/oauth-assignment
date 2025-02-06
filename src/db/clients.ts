export interface Client {
    id: string;
    redirect: string;
}
export const getClients = (): Array<Client> => {
    return [
        {
            id: 'upfirst',
            redirect: 'http://localhost:8081/process'
        }
    ];
}

export function getClient(id: string) {
    return getClients().find(c => c.id === id);
}

export function getClientsByRedirect(uri: string) {
    return getClients().filter(c => c.redirect === uri);
}