import * as React from 'react';
import { observer } from 'mobx-react';

import { Tree } from '../tree';
import { TreeFilter } from '../filter';

import { Node, FilterTree, LimitTree } from '../../models/node';

interface PanelProps<DATA> {
    tree: Node<DATA>[] | 'LOADING';
    title: string;
    filter: string;
    changeFilter: (filter: string) => void;
    node: ({node}: {node: Node<DATA>}) => JSX.Element;
    additionalFilter?: JSX.Element;
}

@observer
export class Panel<DATA> extends React.Component<PanelProps<DATA>, {}> {
    public render() {
        const { changeFilter, filter, tree, title } = this.props;

        const filteredTree = tree === 'LOADING' ? 'LOADING' : (filter === '' ? tree : FilterTree(tree, (node) => {
            return node.title.toLowerCase().includes(filter);
        })) as Node<DATA>[];

        let limitedTree: Node<DATA>[] | 'LOADING' = 'LOADING';
        let limited = false;
        if  (filteredTree !== 'LOADING') {
            const limits = LimitTree(filteredTree);
            limitedTree = limits.data;
            limited = limits.limited;
        }

        return (<div className="panel">
            <div className="table-head">
                <TreeFilter filter={filter} onChange={changeFilter} />
                { this.props.additionalFilter }
                <div className="table-title">{title}</div>
            </div>
            
            <Tree node={this.props.node} tree={limitedTree} limited={limited}/>
        </div>)
    }
}