import { httpFetch } from './authFetch';

const get = async (uri: string) => {
    return await httpFetch(uri, {
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