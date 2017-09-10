import * as React from 'react';
import { observer } from 'mobx-react';

import { inject, provideSingleton } from '../../ioc';

// components
import { Node, LimitTree } from '../../models/node';

interface TableProps<DATA> {
    tree: Node<DATA>[] | 'LOADING';
    node: ({node}: {node: Node<DATA>}) => JSX.Element;
}

@observer
export class Tree<DATA> extends React.Component<TableProps<DATA>, {}> {
    public render() {
        const { tree, node: NodeView } = this.props;

        if (tree === 'LOADING' ) {
            return (
                <div className="table">
                    <h1 className="loading">Loading</h1>
                </div>);
        }
        
        const limits = LimitTree(tree);
        const limitedTree = limits.data;
        const isTreeLimited = limits.limited;

        return (
            <div className="table">
                {tree.map(node => <NodeView key={node.id} node={node} />)}
                {isTreeLimited && <div className="limitation">Too much data to display. Try to filter by section or name.</div>}
            </div>
        );
    }
}