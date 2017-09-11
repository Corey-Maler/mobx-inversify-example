import * as React from 'react';
import { observer } from 'mobx-react';

import { FlatNode } from '../../models/node';
import { Section } from '../../models/section';

import { AppContainer } from '../../ioc';
import { ElfState } from '../../state/elf.state';
import { ElfService } from '../../service/elf.service';

import { TreeNodeElement } from '../tree';


export const SectionNode = (observer(({node, style}) => {
    const state = AppContainer.get(ElfState);
    const service = AppContainer.get(ElfService);
    return (
            <div className="row" style={style} data-highlight={node.data.name === state.ui.highlightedSection} onClick={() => service.setFilterBySection(node.data.name)}>
                <div className="title">{node.title}</div>
                <div className="desc">{node.data.address}</div>
                <div className="desc">{node.data.size}</div>
                <div className="mem-label" data-type={node.data.memType}>{node.data.memType}</div>
            </div>
        );
}) as any) as TreeNodeElement<Section>; // strange bug in mobx-react defenitions