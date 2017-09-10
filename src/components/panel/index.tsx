import * as React from 'react';
import { observer } from 'mobx-react';

import { Tree } from '../tree';
import { TreeFilter } from '../filter';

import { Node, TreeWalk, FilterTree } from '../../models/node';

interface PanelProps {
    tree: Node[] | 'LOADING';
    title: string;
    filter: string;
    changeFilter: (filter: string) => void;
}

@observer
export class Panel extends React.Component<PanelProps, {}> {
    public render() {
        const { changeFilter, filter, tree, title } = this.props;
        if (tree === 'LOADING') {
            return (<div className="panel">
                <div className="table">
                <h1 className="loading">Loading</h1>
            </div></div>);
        }

        const filteredTree = filter === '' ? tree : FilterTree(tree, (node) => {
            return node.title.toLowerCase().includes(filter);
        });

        return (<div className="panel">
            <div className="table-head">
                <TreeFilter filter={filter} onChange={changeFilter} />
                <div className="table-title">{title}</div>
            </div>
            <Tree tree={filteredTree}/>
        </div>)
    }
}