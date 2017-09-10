import * as React from 'react';

import { inject } from '../../ioc';

import { ElfService } from '../../service/elf.service';

export class TreeFilter extends React.Component<{}, {}> {
    @inject(ElfService) private elfService: ElfService;

    private onChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.elfService.filterByTitle(e.currentTarget.value);
    }

    public render() {
        return (<div className="filter">
            <span>Filter by title:</span>
            <input onChange={this.onChange}/>
        </div>);
    }
}