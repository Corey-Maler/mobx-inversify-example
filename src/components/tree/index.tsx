import * as React from 'react';
import { observer } from 'mobx-react';

import { inject, provideSingleton } from '../../ioc';

// components
import { Node, FlatNode, Flatenize, LimitTree } from '../../models/node';

interface TableProps<DATA> {
    tree: Node<DATA>[] | 'LOADING';
    node: ({node}: {node: FlatNode<DATA>}) => JSX.Element;
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
        
        //const limits = LimitTree(tree);
        //const limitedTree = limits.data;
        //const isTreeLimited = limits.limited;

        const flatTree = Flatenize(tree).slice(0, 100);

        return (
            <div className="table">
                {flatTree.map(node => <NodeView key={node.id} node={node} />)}
            </div>
        );
    }
}