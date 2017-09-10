import * as React from 'react';
import { observer } from 'mobx-react';

import { inject } from '../../ioc';

import { Panel } from '../panel';
import { Header } from '../header';

import { ElfService } from '../../service/elf.service';
import { ElfState } from '../../state/elf.state';

@observer
export class Page extends React.PureComponent<{}, {}> {
    @inject(ElfService) private elfService: ElfService;
    @inject(ElfState) private elfState: ElfState;

    constructor() {
        super();
        this.elfService.fetch();
    }

    public render() {
        const state = this.elfState;
        return (<div className="page">
            <Header />
            <div className="workspace">
                <Panel tree={state.sections} title="Sections" filter={state.ui.sectionFilter} changeFilter={this.elfService.changeSectionFilter}/>
                <Panel tree={state.symbols} title="Symbols" filter={state.ui.symbolFilter} changeFilter={this.elfService.changeSymbolFilter} />
            </div>
        </div>);
    }
}