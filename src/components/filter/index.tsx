import * as React from 'react';
import { observer } from 'mobx-react';

import { inject } from '../../ioc';

import { ElfService } from '../../service/elf.service';

interface TreeFilterProps {
    filter: string;
    onChange: (filter: string) => void;
}

@observer
export class TreeFilter extends React.Component<TreeFilterProps, {}> {
    private onChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.props.onChange(e.currentTarget.value);
    }

    public render() {
        return (<div className="filter">
            <span>Filter by title:</span>
            <input onChange={this.onChange} value={this.props.filter} />
        </div>);
    }
}