import * as React from 'react';

export class Node extends React.Component<{}, {}> {
    public render() {
        return <div><div style={{display: 'flex'}}>
            <div style={{flex: '1 1 auto'}}>{this.props.val.title}</div>
            <div style={{maxWidth: '100px', minWidth: '100px'}}>43</div>
        </div>
        {
            this.props.val.childs && this.props.val.childs.map((a) => (
                <div style={{marginLeft: '20px'}}><Node val={a}></Node></div>)
            )
        }
        </div>
    }
}