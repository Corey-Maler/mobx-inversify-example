import { action, observable, computed } from 'mobx';
import { inject } from 'inversify';

import { provideSingleton } from '../ioc';
import { HTTP } from '../utils/http';

import { Node } from '../models/node';
import { ElfState } from '../state/elf.state';

function TreeWalk(node: Node, cb: (n: Node) => void) {
    cb(node);
    if (node.childs) {
        node.childs.forEach(n => TreeWalk(n, cb));
    }
}

@provideSingleton(ElfService)
export class ElfService {
    @inject(HTTP) private http: HTTP;
    @inject(ElfState) public elfState: ElfState;

    @action.bound public async fetch() {
        const raw = <any>(await this.http.Get('/elf'));
        this.elfState.filename = 'filename.elm';
        this.elfState.tree = raw.map(r => new Node(r));
    }

    @action.bound public filterByTitle(filterStr: string) {
        const lowerFilterStr = filterStr.toLowerCase();
        this.elfState.ui.filter = filterStr;
        if (this.elfState.tree !== 'LOADING') {
            if (filterStr !== '') {
                const check = (node: Node) => {
                    node.hidden = true;
                    if (node.title.toLowerCase().includes(lowerFilterStr)) {
                        let parent = node;
                        while (parent) {
                            parent.hidden = false;
                            parent.collapsed = false;
                            parent = parent.parent;
                        }
                    }
                }

                this.elfState.tree.forEach(node => TreeWalk(node, check));
            } else {
                this.elfState.tree.forEach(node => TreeWalk(node, (n) => { n.hidden= false }));
            }
        }
        console.log('state', this.elfState);
    }
}