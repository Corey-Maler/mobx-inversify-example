import { provideSingleton } from '../ioc';

@provideSingleton(HTTP)
export class HTTP {
    public GET(resource) {
        return fetch('/api/data').then(resp => resp.json());
    }

    // POST, PUT, etc...
}