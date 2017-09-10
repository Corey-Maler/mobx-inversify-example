import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Tree } from './components/tree';

class App extends React.Component<{}, {}> {
    public render() {
        return (<div>
            <Tree />
        </div>);
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
