import { observable } from 'mobx';

import { provideSingleton } from '../ioc';

import { Node } from '../models/node';
import { Section } from '../models/section';
import { ISymbol } from '../models/symbol';

export class ElfUI {
    @observable sectionFilter: string = '';
    @observable symbolFilter: string = '';
    @observable public highlightedSection: string | undefined;
    @observable public filterBySection: string | undefined;
}

@provideSingleton(ElfState)
export class ElfState {
    @observable public filename: string = 'LOADING';
    @observable public sections: Node<Section>[] | 'LOADING' = 'LOADING';
    @observable public symbols: Node<ISymbol>[] | 'LOADING' = 'LOADING';
    public readonly ui: ElfUI = new ElfUI();
}