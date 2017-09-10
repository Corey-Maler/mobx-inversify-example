import * as React from 'react';

import { Node } from '../node';
import { TreeService } from '../../service/tree.service';

export class Tree extends React.Component<{}, {}> {
    constructor() {
        super();
        this.store = new TreeService();
    }
    public render() {
        return (<div className="table">
            {this.store.tree.map(t => <Node key={t.id} node={t} />)}
        </div>);
    }
}