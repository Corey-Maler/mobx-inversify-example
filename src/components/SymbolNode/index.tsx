import * as React from 'react';
import { observer } from 'mobx-react';

import { Node } from '../../models/node';
import { ISymbol } from '../../models/symbol';

// node: ({node}: {node: Node<DATA>}) => JSX.Element;
export const SymbolNode = ({node}: {node: Node<ISymbol>}) => {
    return (
        <div>
            <div className="row" data-section={node.data.section}>
                <div className="title">{node.title} {node.childs && <span className="label">scope</span>}</div>
                <div className="desc">{node.data.symboltype}</div>
            </div>
            <div className="childs">
            {
                node.childs && node.childs.map((a) => <SymbolNode key={a.id} node={a}></SymbolNode>)
            }
            </div>
        </div>
        );
};