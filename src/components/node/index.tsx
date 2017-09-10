import * as React from 'react';
import { observer } from 'mobx-react';

import { Node } from '../../models/node';

interface NodeProps {
    node: Node;
}

@observer
export class TreeNode extends React.Component<NodeProps, {}> {
    public render() {
        const { node } = this.props;

        // probably display: hidden works faster that rebuilding DOM-tree,
        // but there are some bug in mobx-react and construction
        //  <div style={{display: (node.hidden ? 'hidden' : 'block')}}>
        // do not recalculatings
        if (node.hidden) return null;
        
        return (
        <div style={{display: (node.hidden ? 'hidden' : 'block')}}>
            <div className="row" onClick={() => node.collapsed = !node.collapsed}>
                <div className="title">{this.props.node.title} {node.childs && <span className="label">show/hide</span>}</div>
                <div className="desc">{this.props.node.a}</div>
            </div>
            <div className="childs">
            {
                (!node.collapsed) && node.childs && node.childs.map((a) => <TreeNode key={a.id} node={a}></TreeNode>)
            }
            </div>
        </div>
        );
    }
}