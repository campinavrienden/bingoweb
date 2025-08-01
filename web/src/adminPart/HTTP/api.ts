import useHTTP from './http'

const BASE_URI = "/api/";

const createURL = (path: string) => {
    return new URL(BASE_URI + path.replace(/^\//, '').replace(/\/$/, ''), window.location.origin).toString();
}

const get = async () => {
    const {get} = useHTTP();
    return (await get(createURL("/"))).text();
}

export default function useAPI() {
    return { get }
}