import { provideSingleton } from '../ioc';

const mockAnswer =  [
    {
        title: 'a1',
        address: 123123,
        symboltype: 'data',
        childs: [
            {
                title: 'a1.1',
                symboltype: 'data',
                address: 123123,
            },
            {
                title: 'a1.2',
                symboltype: 'data',
                address: 123123,
                childs: [
                    {
                        title: 'a1.2.1',
                        symboltype: 'data',
                        address: 123123,
                    }, {
                        title: 'a1.2.2',
                        symboltype: 'data',
                        address: 123123,
                    }
                ]
            }
        ]
    },
    {
        title: 'a2',
        symboltype: 'data',
        address: 123123,
    },
    {
        title: 'some name',
        symboltype: 'data',
        address: 123123,
        childs: [
            {
                title: 'planets',
                symboltype: 'data',
                address: 123123,
            },
            {
                title: 'heroes',
                symboltype: 'data',
                address: 123123,
            }
        ]
    }, {
        title: 'section',
        symboltype: 'data',
        address: 123123,
        childs: [{
            title: 'subsection',
            symboltype: 'data',
            address: 123123,
            childs: [{
                title: 'star wars',
                symboltype: 'data',
                address: 123123,
                childs: [{
                    title: 'vehicles',
                    symboltype: 'data',
                    address: 123123,
                    childs: [
                        { title: 'Millennium Falcon',symboltype: 'data', address: 123123,},
                        { title: 'Slave 1', symboltype: 'data',address: 123123,},
                        { title: 'Snowspeeder', symboltype: 'data',address: 123123,},
                        { title: 'X-Wing starfighter',symboltype: 'data', address: 123123,}
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