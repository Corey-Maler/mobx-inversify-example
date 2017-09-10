import * as React from 'react';
import { observer } from 'mobx-react';

import { inject, provideSingleton } from '../../ioc';

// state and services
import { ElfService } from '../../service/elf.service';
import { ElfState } from '../../state/elf.state';

// components
import { TreeNode } from '../node';
import { Node } from '../../models/node';

interface TableProps {
    tree: Node[] | 'LOADING';
}

@observer
export class Tree extends React.Component<TableProps, {}> {
    public render() {
        if (this.props.tree === 'LOADING' ) {
            return (
                <div className="table">
                    <h1 className="loading">Loading</h1>
                </div>);
        }

        return (<div className="table">
            {this.props.tree.map(t => <TreeNode key={t.id} node={t} />)}
        </div>);
    }
}