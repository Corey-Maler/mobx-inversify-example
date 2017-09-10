import * as React from 'react';

import { ElfState } from '../../state/elf';

export class Header extends React.Component<{}, {}> {
    constructor(){
        super();

        this.state = new ElfState();
    }
    public render() {
        const state = this.state;
        return (<div className="header">
            <h1>ELF<span>Visualizator</span></h1>
            <h2>file: <b>{state.filename}</b></h2>
        </div>);
    }
}