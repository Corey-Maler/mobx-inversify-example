import { observable } from 'mobx';

import { provideSingleton } from '../ioc';

import { Node } from '../models/node';

export class ElfUI {
    @observable filter: string = '';
}

@provideSingleton(ElfState)
export class ElfState {
    @observable public filename: string = 'LOADING';
    @observable public tree: Node[] | 'LOADING' = 'LOADING';
    public readonly ui: ElfUI = new ElfUI();
}