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

    return new Node(raw.name, raw, childs);
}

const parseSymbolData = (raw: any, key: string) => {
    if (raw.type === 'symbol') {
        return new Node(key, raw, undefined);
    }

    if (raw.type === 'scope') {
        const childKeys = Object.keys(raw.elements);
        const childs = childKeys.map(ckey => parseSymbolData(raw.elements[ckey], ckey));
        return new Node(key, raw, childs);
    }
    
    return new Node('section', raw, undefined);
    /*
    let childs = undefined;
    if (raw.childs) {
        childs = raw.childs.map(parseData);
    }

    return new Node(raw.name, raw, childs);
    */
}

@provideSingleton(ElfService)
export class ElfService {
    @inject(HTTP) private http: HTTP;
    @inject(ElfState) public elfState: ElfState;

    @action.bound public async fetch() {
        const rawFull = <any>(await this.http.Get('/elf'));
        const raw = rawFull.sections;
        const keys = Object.keys(raw);
        this.elfState.filename = rawFull.file;
        this.elfState.sections = keys.map(key => parseData(raw[key]));
        const symbolsRaw = rawFull.symbols.elements;
        const symbolKeys = Object.keys(symbolsRaw)
        this.elfState.symbols = symbolKeys.map(key => parseSymbolData(symbolsRaw[key], key));
    }

    @action.bound public changeSectionFilter(filter: string) {
        this.elfState.ui.sectionFilter = filter;
    }

    @action.bound public changeSymbolFilter(filter: string) {
        this.elfState.ui.symbolFilter = filter;
    }

    @action.bound public highlightSection(section: string) {
        this.elfState.ui.selectedSection = section;
    }
}