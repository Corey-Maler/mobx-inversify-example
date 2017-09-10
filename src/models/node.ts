import { observable } from 'mobx';

let id = 0;

export class Node {
    public readonly id: number;
    public title: string;
    @observable public collapsed: boolean;
    @observable public hidden: boolean = false;
    public a: number;
    public childs?: Node[];
    public readonly parent: Node | undefined;
    constructor(raw, parent?: Node) {
        this.parent = parent;
        this.id = ++id;
        this.title = raw.title;
        this.collapsed = false;
        this.a = 3;
        if (raw.childs) {
            this.childs = raw.childs.map(rawChild => new Node(rawChild, this));
        } else {
            this.childs = undefined;
        }
    }
}