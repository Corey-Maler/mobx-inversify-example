import { observable } from 'mobx';

import { provideSingleton } from '../ioc';

import { Node } from '../models/node';

export class ElfUI {
    @observable sectionFilter: string = '';
    @observable symbolFilter: string = '';
}

@provideSingleton(ElfState)
export class ElfState {
    @observable public filename: string = 'LOADING';
    @observable public sections: Node[] | 'LOADING' = 'LOADING';
    @observable public symbols: Node[] | 'LOADING' = 'LOADING';
    public readonly ui: ElfUI = new ElfUI();
}