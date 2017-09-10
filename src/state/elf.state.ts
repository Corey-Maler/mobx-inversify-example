import { observable } from 'mobx';

import { provideSingleton } from '../ioc';

@provideSingleton(ElfState)
export class ElfState {
    @observable public filename: string = 'LOADING';
    @observable public tree: any = 'LOADING';
}