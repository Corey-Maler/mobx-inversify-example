import { observable } from 'mobx';

const SHOW_LIMIT = 500;

let id = 0;

interface Iter {
    iteration: number;
}

type Predicate<DATA> = (n: Node<DATA>) => boolean;

function checkSelfOrChild<DATA>(node: Node<DATA>, predicate: Predicate<DATA>) {
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


function limitSelfOrChild<DATA>(node: Node<DATA>, _iteration: Iter) {
    let iteration: Iter = _iteration;
    iteration.iteration++;
    if (iteration.iteration > SHOW_LIMIT) {
        return undefined;
    }

    let childs = [];
    if (node.childs) {
        childs = node.childs.map(n => limitSelfOrChild(n, iteration)).filter(n => n !== undefined);
    }

    return new Node(node.title, node.data, childs.length > 0 ? childs : undefined, node.id, node.parent);
}

export function FilterTree<DATA>(nodes: Node<DATA>[], predicate: Predicate<DATA>) {
    return nodes.map(n => checkSelfOrChild(n, predicate)).filter(t => t !== undefined);
}

export function LimitTree<DATA>(nodes: Node<DATA>[]) {
    const iter = { iteration: 0 };
    const res = nodes.map(n => limitSelfOrChild(n, iter)).filter(t => t !== undefined);
    return {data: res, limited: iter.iteration > SHOW_LIMIT};
}

export class Node<DATA> {
    public readonly id: number;
    public readonly title: string;
    public readonly data: DATA;
    public readonly childs?: Node<DATA>[];
    public readonly parent: Node<DATA> | undefined;

    constructor(title, data: DATA, childs: Node<DATA>[] | undefined, oldid?: number, parent?: Node<DATA>) {
        this.parent = parent;
        this.id = oldid || (++id);
        this.title = title;
        this.childs = childs;
        this.data = data;
    }
}

export class FlatNode<DATA> {
    public readonly id: number;
    public readonly title: string;
    public readonly data: DATA;
    public readonly parent: FlatNode<DATA> | undefined;
    public readonly original: Node<DATA>;
    public readonly marginLeft: number;
    constructor(original: Node<DATA>, marginLeft: number, parent: FlatNode<DATA> | undefined) {
        this.original = original;
        this.id = original.id;
        this.title = original.title;
        this.data = original.data;
        this.marginLeft = marginLeft;
        this.parent = parent;
    }
}

export function Flatenize<DATA>(originalTree: Node<DATA>[], marginLeft: number = 0, parent?: FlatNode<DATA>): FlatNode<DATA>[] {
    const result: FlatNode<DATA>[] = [];
    originalTree.map(origin => {
        const node = new FlatNode<DATA>(origin, marginLeft, parent);
        result.push(node);
        if (origin.childs) {
            result.push(...Flatenize(origin.childs, marginLeft + 1, node));
        }
    });
    return result;
}