import { httpFetch } from './authFetch';

const get = async (uri: string | URL) => {
    return await httpFetch(uri?.toString() || "", {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const post = async <T>(uri: string | URL, payload: T) => {
    return await httpFetch(uri?.toString() || "", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json'
        }
    });
}


const useHTTP = function () {
    return { get, post };
}
export default useHTTP