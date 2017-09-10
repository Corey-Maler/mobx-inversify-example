import { observable } from 'mobx';

let id = 0;

export class Node {
    public readonly id: number;
    public title: string;
    @observable public collapsed: boolean;
    public a: number;
    public childs?: Node[];
    constructor(raw) {
        this.id = ++id;
        this.title = raw.title;
        this.collapsed = false;
        this.a = 3;
        if (raw.childs) {
            this.childs = raw.childs.map(rawChild => new Node(rawChild));
        } else {
            this.childs = undefined;
        }
    }
}