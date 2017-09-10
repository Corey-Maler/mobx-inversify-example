import { observable } from 'mobx';

export class ElfState {
    @observable public filename: string = 'LOADING';
    @observable public tree: any = 'LOADING';
}