import * as React from 'react';
import { observer } from 'mobx-react';

import { provideSingleton } from '../../ioc';
import { ElfState } from '../../state/elf.state';

import { inject } from '../../ioc';

@observer
export class Header extends React.Component<{}, {}> {
    @inject(ElfState) private elfState: ElfState;

    public render() {
        const state = this.elfState;
        return (<div className="header">
            <h1>ELF<span>Visualizator</span></h1>
            <h2>file: <b>{state.filename}</b></h2>
        </div>);
    }
}