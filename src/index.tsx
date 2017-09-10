import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppContainer } from './ioc';

import { Page } from './components/page';

class App extends React.Component<{}, {}> {
    public render() {
        return (<div className="app-root">
            <Page />
        </div>);
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
