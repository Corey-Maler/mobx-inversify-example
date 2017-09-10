import * as React from 'react';
import { observer } from 'mobx-react';

import { inject, provideSingleton } from '../../ioc';

// components
import { Node } from '../../models/node';

interface TableProps<DATA> {
    tree: Node<DATA>[] | 'LOADING';
    node: ({node}: {node: Node<DATA>}) => JSX.Element;
    limited: boolean;
}

@observer
export class Tree<DATA> extends React.Component<TableProps<DATA>, {}> {
    public render() {
        if (this.props.tree === 'LOADING' ) {
            return (
                <div className="table">
                    <h1 className="loading">Loading</h1>
                </div>);
        }

        return (<div className="table">
            {this.props.tree.map(t => <this.props.node key={t.id} node={t} />)}
            {this.props.limited && <div className="limitation">Too much data to display. Try to filter by section or name.</div>}
        </div>);
    }
}