import * as React from 'react';
import { observer } from 'mobx-react';

import { Node } from '../../models/node';
import { Section } from '../../models/section';

import { AppContainer } from '../../ioc';
import { ElfState } from '../../state/elf.state';


// node: ({node}: {node: Node<DATA>}) => JSX.Element;
export const SectionNode = observer(({node}: {node: Node<Section>}) => {
    const state = AppContainer.get(ElfState);
    /*
    if (node.data.name === state.ui.selectedSection) {
        return <div><div className="row">hl</div></div>;
    }*/
    return (
        <div>
            <div className="row" data-highlight={node.data.name === state.ui.selectedSection}>
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
});