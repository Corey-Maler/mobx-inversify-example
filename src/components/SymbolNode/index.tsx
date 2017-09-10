import * as React from 'react';
import { observer } from 'mobx-react';

import { Node } from '../../models/node';
import { ISymbol } from '../../models/symbol';

// node: ({node}: {node: Node<DATA>}) => JSX.Element;
export const SymbolNode = observer(({node}: {node: Node<ISymbol>}) => {
    return (
        <div>
            <div className="row" data-section={node.data.section}>
                <div className="title">{node.title} {node.childs && <span className="label">scope</span>}</div>
                <div className="desc">{node.data.address}</div>
                <div className="desc">{node.data.size}</div>
                <div className="desc">{node.data.memType}</div>
                <div className="desc">{node.data.symboltype}</div>
            </div>
            { node.childs && (
                <div className="childs">
                {
                    node.childs.map((a) => <SymbolNode key={a.id} node={a}></SymbolNode>)
                }
                </div>
            )}
        </div>
        );
});