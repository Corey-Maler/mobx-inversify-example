import { observable } from 'mobx';

let id = 0;

export function TreeWalk(node: Node, cb: (n: Node) => void) {
    cb(node);
    if (node.childs) {
        node.childs.forEach(n => TreeWalk(n, cb));
    }
}

type Predicate = (n: Node) => boolean;

function checkSelfOrChild(node: Node, predicate: Predicate) {
    let childs = [];
    if (node.childs) {
        childs = node.childs.map(n => checkSelfOrChild(n, predicate)).filter(n => n !== undefined);
    }
    const self = predicate(node);

    if (self || childs.length > 0) {
        return new Node(node.title, node.data, childs.length > 0 ? childs : undefined, node.id, node.parent);
    }

    return undefined;
}

export function FilterTree(nodes: Node[], predicate: Predicate) {
    const res = nodes.map(n => checkSelfOrChild(n, predicate)).filter(t => t !== undefined);
    return res;
}

export class Node {
    public readonly id: number;
    public title: string;
    @observable public collapsed: boolean;
    @observable public hidden: boolean = false;
    public readonly data: any;
    public readonly childs?: Node[];
    public readonly parent: Node | undefined;
    constructor(title, data, childs: Node[] | undefined, oldid?: number, parent?: Node) {
        this.parent = parent;
        this.id = oldid || (++id);
        this.title = title;
        this.collapsed = false;
        this.childs = childs;
    }
}