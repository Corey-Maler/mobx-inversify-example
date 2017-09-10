import * as React from 'react';
import { observer } from 'mobx-react';

import { inject } from '../../ioc';

import { Panel } from '../panel';
import { Header } from '../header';

import { ElfService } from '../../service/elf.service';
import { ElfState } from '../../state/elf.state';

import { SectionNode } from '../SectionNode';
import { SymbolNode } from '../SymbolNode'
import { FilterBySection } from '../filterBySection';

import { FilterTree } from '../../models/node';
import { ISymbol } from '../../models/symbol';

@observer
export class Page extends React.PureComponent<{}, {}> {
    @inject(ElfService) private elfService: ElfService;
    @inject(ElfState) private elfState: ElfState;

    private onMouseOver = (e) => {
        const target = e.target;
        const section = target.getAttribute('data-section');
        if (section) {
            this.elfService.highlightSection(section);
        }
    }

    private onMouseOut = (e) => {
        if (e.target.className === 'table') {
            this.elfService.highlightSection(undefined);
        }
    }

    constructor() {
        super();
        this.elfService.fetch();
    }

    public render() {
        const state = this.elfState;
        const filterBySection = state.ui.filterBySection;
        const symbolsTree = state.symbols === 'LOADING' ? 'LOADING' : !filterBySection ? state.symbols : FilterTree<ISymbol>(state.symbols, node => node.data.section && node.data.section.includes(filterBySection));
        return (<div className="page">
            <Header />
            <div className="workspace" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                <Panel node={SectionNode} tree={state.sections} title="Sections" filter={state.ui.sectionFilter} changeFilter={this.elfService.changeSectionFilter}/>
                <Panel additionalFilter={<FilterBySection />} node={SymbolNode} tree={symbolsTree} title="Symbols" filter={state.ui.symbolFilter} changeFilter={this.elfService.changeSymbolFilter} />
            </div>
        </div>);
    }
}