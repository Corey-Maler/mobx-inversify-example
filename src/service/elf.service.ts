import { action, observable, computed } from 'mobx';
import { inject } from 'inversify';

import { provideSingleton } from '../ioc';
import { HTTP } from '../utils/http';

import { Node } from '../models/node';
import { ElfState } from '../state/elf.state';



@provideSingleton(ElfService)
export class ElfService {
    @inject(HTTP) private http: HTTP;
    @inject(ElfState) public elfState: ElfState;

    @action.bound public async fetch() {
        const raw = <any>(await this.http.Get('/elf'));
        this.elfState.filename = 'filename.elm';
        this.elfState.tree = raw.map(r => new Node(r));
    }
}