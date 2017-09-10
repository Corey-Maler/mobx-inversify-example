import * as React from 'react';
import { observer } from 'mobx-react';

import { inject } from '../../ioc';

import { Panel } from '../panel';
import { Header } from '../header';

import { ElfService } from '../../service/elf.service';
import { ElfState } from '../../state/elf.state';

import { SectionNode } from '../SectionNode';
import { SymbolNode } from '../SymbolNode'


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
        return (<div className="page">
            <Header />
            <div className="workspace" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                <Panel node={SectionNode} tree={state.sections} title="Sections" filter={state.ui.sectionFilter} changeFilter={this.elfService.changeSectionFilter}/>
                <Panel node={SymbolNode} tree={state.symbols} title="Symbols" filter={state.ui.symbolFilter} changeFilter={this.elfService.changeSymbolFilter} />
            </div>
        </div>);
    }
}