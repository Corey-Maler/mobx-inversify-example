import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export class Node extends React.Component<{}, {}> {
    public render() {
        return (
        <div>
            <div className="row" onClick={() => this.props.node.collapsed = !this.props.node.collapsed}>
                <div className="title">{this.props.node.title} {this.props.node.childs && <span className="label">show/hide</span>}</div>
                <div className="desc">{this.props.node.a}</div>
            </div>
            <div className="childs">
            {
                (!this.props.node.collapsed) && this.props.node.childs && this.props.node.childs.map((a) => <Node key={a.id} node={a}></Node>)
            }
            </div>
        </div>
        );
    }
}