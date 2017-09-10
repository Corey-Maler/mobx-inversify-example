import { action, observable, computed } from 'mobx';

import { Node } from '../models/node';

export class TreeService {
    @observable tree: Node[];
    public fileName = 'filename.elm';

    constructor() {
        const raw = [
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
        ]
        this.tree = raw.map(r => new Node(r));
    }
}