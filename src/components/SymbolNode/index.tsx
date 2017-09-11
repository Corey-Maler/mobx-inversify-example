import * as React from 'react';
import { observer } from 'mobx-react';

import { FlatNode } from '../../models/node';
import { ISymbol } from '../../models/symbol';

import { TreeNodeElement } from '../tree';


export const SymbolNode = (observer(({node, style}: {node: FlatNode<ISymbol>, style: React.StyleHTMLAttributes<HTMLDivElement> }) => {
    return (
            <div style={style} className="row" data-section={node.data.section}>
                <div style={{paddingLeft: node.marginLeft * 10}} className="title">{node.title} {<span className="label">{node.data.symboltype}</span>}</div>
                <div className="desc">{node.data.address}</div>
                <div className="desc">{node.data.size}</div>
                <div className="mem-label" data-type={node.data.memType}>{node.data.memType}</div>
            </div>
        );
}) as any) as TreeNodeElement<ISymbol>; // strange bug in mobx-react defenitions;