import * as React from 'react';
import { observer } from 'mobx-react';

import { Node } from '../../models/node';
import { Section } from '../../models/section';

// node: ({node}: {node: Node<DATA>}) => JSX.Element;
export const SectionNode = ({node}: {node: Node<Section>}) => {
    return (
        <div>
            <div className="row">
                <div className="title">{node.title} {node.childs && <span className="label">scope</span>}</div>
                <div className="desc">{node.data.address}</div>
            </div>
            <div className="childs">
            {
                node.childs && node.childs.map((a) => <SectionNode key={a.id} node={a}></SectionNode>)
            }
            </div>
        </div>
        );
};