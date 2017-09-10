import * as React from 'react';

import { AppContainer, inject } from '../../ioc';

import { ElfService } from '../../service/elf.service';
import { ElfState } from '../../state/elf.state';

export class FilterBySection extends React.Component<{}, {}> {
    @inject(ElfState) private elfState: ElfState;
    @inject(ElfService) private elfService: ElfService;

    private onClean = () => {
        this.elfService.setFilterBySection(undefined);
    }

    public render() {
        if (!this.elfState.ui.filterBySection) {
            return null;
        }
        return (
            <div className="filter"><span>Filter by section: {this.elfState.ui.filterBySection} <a href="#" onClick={this.onClean}>x</a></span></div>
        );
    }
}