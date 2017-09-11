import * as React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

import { inject, provideSingleton } from '../../ioc';

import 'react-virtualized/styles.css'
//import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
//import List from 'react-virtualized/dist/commonjs/List'

import { AutoSizer, List } from 'react-virtualized';

// components
import { Node, FlatNode, Flatenize, LimitTree } from '../../models/node';

export type TreeNodeElement<DATA> =  ({ node, style }: { node: FlatNode<DATA>, style: React.StyleHTMLAttributes<HTMLDivElement> }) => JSX.Element

interface TableProps<DATA> {
    tree: Node<DATA>[] | 'LOADING';
    node: TreeNodeElement<DATA>;
}

@observer
export class Tree<DATA> extends React.Component<TableProps<DATA>, {}> {
    @computed get flatTree(): FlatNode<DATA>[] {
        if (this.props.tree === 'LOADING') {
            return [];
        }
        return Flatenize(this.props.tree);
    }

    public render() {
        const { tree, node: NodeView } = this.props;
        const overscanRowCount = 10;
        const scrollToIndex = undefined; // we will use it later

        if (tree === 'LOADING') {
            return (
                <div className="table">
                    <h1 className="loading">Loading</h1>
                </div>);
        }

        const flatTree = this.flatTree;

        return (
            <div className="table">
                <AutoSizer>
                    {({ width, height }) =>
                        <List
                            ref="List"
                            className="list"
                            height={height}
                            overscanRowCount={overscanRowCount}
                            noRowsRenderer={this._noRowsRenderer}
                            rowCount={flatTree.length}
                            rowHeight={25}
                            rowRenderer={this._rowRenderer}
                            scrollToIndex={scrollToIndex}
                            width={width}
                        />}
                </AutoSizer>

            </div>
        );
    }

    
    private _noRowsRenderer() {
        return <div className="no rows">No rows</div>;
    }

    private _rowRenderer = ({ index, isScrolling, key, style }) => {
        const { node: NodeView } = this.props;
        const node = this.flatTree[index];
        return <NodeView key={key} node={node} style={style} />
    }
}