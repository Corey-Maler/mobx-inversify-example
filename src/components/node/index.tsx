import * as React from 'react';
import { observer } from 'mobx-react';

import { Node } from '../../models/node';

interface NodeProps {
    node: Node;
}

@observer
export class TreeNode extends React.Component<NodeProps, {}> {
    public render() {
        return (
        <div>
            <div className="row" onClick={() => this.props.node.collapsed = !this.props.node.collapsed}>
                <div className="title">{this.props.node.title} {this.props.node.childs && <span className="label">show/hide</span>}</div>
                <div className="desc">{this.props.node.a}</div>
            </div>
            <div className="childs">
            {
                (!this.props.node.collapsed) && this.props.node.childs && this.props.node.childs.map((a) => <TreeNode key={a.id} node={a}></TreeNode>)
            }
            </div>
        </div>
        );
    }
}