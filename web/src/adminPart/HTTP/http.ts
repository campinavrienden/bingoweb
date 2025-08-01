import { httpFetch } from './authFetch';

const get = async (uri: string | URL) => {
    return await httpFetch(uri?.toString() || "", {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const useHTTP = function () {
    return { get };
}
export default useHTTP