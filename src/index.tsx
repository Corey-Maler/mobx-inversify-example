import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppContainer } from './ioc';

import { Tree } from './components/tree';
import { Header } from './components/header';
import { TreeFilter } from './components/filter';

class App extends React.Component<{}, {}> {
    public render() {
        return (<div className="app-root">
            <Header />
            <TreeFilter />
            <Tree />
        </div>);
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
