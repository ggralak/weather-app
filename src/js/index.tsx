import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../scss/app.scss';
import { Route} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import configureStore, { history }  from './utils/configureStore';

import App from './components/App';

const store = configureStore({});

declare namespace JSX {
    interface IntrinsicElements {
        'heyo': any
    }
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/" component={App} />
        </ConnectedRouter>
    </Provider>,
  document.getElementById('app')
);

//(<any>module).hot.accept();