// httpFetch.ts
import { useFirebase } from '../../../firebase/firebase';
import { getToken } from 'firebase/app-check';

export const httpFetch = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    const { appcheck } = useFirebase();
    const { token } = await getToken(appcheck);
    const headers = new Headers(init?.headers || {});
    if (token) headers.set('X-Firebase-AppCheck', token);

    return fetch(input, {
        ...init,
        headers,
    });
};