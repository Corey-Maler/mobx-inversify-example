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
    },
    {
        title: 'some name',
        childs: [
            {
                title: 'planets',
                childs: [
                    {
                        title: 'Naboo'
                    },
                    {
                        title: 'Tatooine'
                    },
                    {
                        title: 'Hoth'
                    },
                    {
                        title: 'Alderaan'
                    }
                ]
            },
            {
                title: 'heroes',
                childs: [
                    { title: 'Boba Fett'},
                    { title: 'Padmé Amidala'},
                    { title: 'BB-8'},
                    { title: 'C-3PO' },
                    { title: 'Chewbacca'}
                ]
            }
        ]
    }, {
        title: 'section',
        childs: [{
            title: 'subsection',
            childs: [{
                title: 'star wars',
                childs: [{
                    title: 'vehicles',
                    childs: [
                        { title: 'Millennium Falcon'},
                        { title: 'Slave 1'},
                        { title: 'Snowspeeder'},
                        { title: 'X-Wing starfighter'}
                    ]
                }]
            }]
        }]
    }
];

@provideSingleton(HTTP)
export class HTTP {
    public Get(resource) {
        return new Promise((res, rej) => res(mockAnswer));
    }
}