import * as React from 'react';
import { observer } from 'mobx-react';

import { inject, provideSingleton } from '../../ioc';

// state and services
import { ElfService } from '../../service/elf.service';
import { ElfState } from '../../state/elf.state';

// components
import { TreeNode } from '../node';

@observer
export class Tree extends React.Component<{}, {}> {
    @inject(ElfService) private service;
    @inject(ElfState) private elfState;
    constructor() {
        super();
        this.service.fetch();
    }
    public render() {
        if (this.elfState.tree === 'LOADING' ) {
            return (
                <div className="table">
                    <h1 className="loading">Loading</h1>
                </div>);
        }

        return (<div className="table">
            {this.elfState.tree.map(t => <TreeNode key={t.id} node={t} />)}
        </div>);
    }
}