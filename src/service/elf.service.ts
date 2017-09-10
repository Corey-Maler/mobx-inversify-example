import { action, observable, computed } from 'mobx';
import { inject } from 'inversify';

import { provideSingleton } from '../ioc';
import { HTTP } from '../utils/http';

import { Node } from '../models/node';
import { ElfState } from '../state/elf.state';


const parseData = (raw: any) => {
    let childs = undefined;
    if (raw.childs) {
        childs = raw.childs.map(parseData);
    }

    return new Node(raw.title, raw, childs);
}

@provideSingleton(ElfService)
export class ElfService {
    @inject(HTTP) private http: HTTP;
    @inject(ElfState) public elfState: ElfState;

    @action.bound public async fetch() {
        const raw = <any>(await this.http.Get('/elf'));
        this.elfState.filename = 'filename.elm';
        this.elfState.sections = raw.map(parseData);
        this.elfState.symbols = raw.map(parseData);
    }

    @action.bound public changeSectionFilter(filter: string) {
        this.elfState.ui.sectionFilter = filter;
    }

    @action.bound public changeSymbolFilter(filter: string) {
        this.elfState.ui.symbolFilter = filter;
    }
}