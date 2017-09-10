import * as React from 'react';
import { observer } from 'mobx-react';

import { Tree } from '../tree';
import { TreeFilter } from '../filter';

import { Node, FilterTree } from '../../models/node';

interface PanelProps<DATA> {
    tree: Node<DATA>[] | 'LOADING';
    title: string;
    filter: string;
    changeFilter: (filter: string) => void;
    node: ({node}: {node: Node<DATA>}) => JSX.Element;
}

@observer
export class Panel<DATA> extends React.Component<PanelProps<DATA>, {}> {
    public render() {
        const { changeFilter, filter, tree, title } = this.props;
        if (tree === 'LOADING') {
            return (<div className="panel">
                <div className="table">
                <h1 className="loading">Loading</h1>
            </div></div>);
        }

        const filteredTree = (filter === '' ? tree : FilterTree(tree, (node) => {
            return node.title.toLowerCase().includes(filter);
        })) as Node<DATA>[];

        return (<div className="panel">
            <div className="table-head">
                <TreeFilter filter={filter} onChange={changeFilter} />
                <div className="table-title">{title}</div>
            </div>
            <Tree node={this.props.node} tree={filteredTree}/>
        </div>)
    }
}