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

    private get filteredTree() {
        const { filter, tree } = this.props;
        if (tree === 'LOADING') {
            return tree;
        }
        
        if (filter === '') {
            return tree;
        } else {
            return FilterTree(tree, node => node.title.toLowerCase().includes(filter));
        }
    }

    public render() {
        const { changeFilter, filter, tree, title } = this.props;

        return (<div className="panel">
            <div className="table-head">
                <TreeFilter filter={filter} onChange={changeFilter} />
                { this.props.additionalFilter }
                <div className="table-title">{title}</div>
            </div>
            
            <Tree node={this.props.node} tree={this.filteredTree}/>
        </div>)
    }
}