import { provideSingleton } from '../ioc';

const mockAnswer =  [
    {
        title: 'a1',
        childs: [
            {
                title: 'a1.1'
            },
            {
                title: 'a1.2',
                childs: [
                    {
                        title: 'a1.2.1'
                    }, {
                        title: 'a1.2.2'
                    }
                ]
            }
        ]
    },
    {
        title: 'a2'
    }
];

@provideSingleton(HTTP)
export class HTTP {
    public Get(resource) {
        return new Promise((res, rej) => res(mockAnswer));
    }
}