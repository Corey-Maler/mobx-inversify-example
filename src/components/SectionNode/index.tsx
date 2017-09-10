import * as React from 'react';
import { observer } from 'mobx-react';

import { Node } from '../../models/node';
import { Section } from '../../models/section';

import { AppContainer } from '../../ioc';
import { ElfState } from '../../state/elf.state';
import { ElfService } from '../../service/elf.service';

// node: ({node}: {node: Node<DATA>}) => JSX.Element;
export const SectionNode = (observer(({node}: {node: Node<Section>}) => {
    const state = AppContainer.get(ElfState);
    const service = AppContainer.get(ElfService);
    return (
        <div>
            <div className="row" data-highlight={node.data.name === state.ui.selectedSection} onClick={() => service.setFilterBySection(node.data.name)}>
                <div className="title">{node.title} {node.childs && <span className="label">scope</span>}</div>
                <div className="desc">{node.data.address}</div>
                <div className="desc">{node.data.size}</div>
                <div className="desc">{node.data.memType}</div>
            </div>
        </div>
        );
}) as any) as ({node}: {node: Node<Section>}) => JSX.Element;