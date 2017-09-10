import * as React from 'react';
import { observer } from 'mobx-react';

@observer
export class Node extends React.Component<{}, {}> {
    public render() {
        return (
        <div>
            <div className="row">
                <div className="title">{this.props.node.title} <button onClick={() => this.props.node.collapsed = !this.props.node.collapsed}>show/hide</button></div>
                <div className="desc">43</div>
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