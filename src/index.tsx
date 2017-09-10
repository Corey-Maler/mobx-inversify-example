import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Node } from './components/node';

class App extends React.Component<{}, {}> {
    public render() {
        return (<div>
            <Node val={{
                title: '1',
                childs: [{title: '1.1'}, {title: '1.2', childs: [{title: '1.2.1'}, {title: '1.2.2'}]}]
            }}></Node>
        </div>);
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
