import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { configureStore } from 'app/store';
import Root from './app';
import history from './browserHistory';
import { StylesProvider } from '@material-ui/styles';

// prepare store
const store = configureStore(history);

ReactDOM.render(
  <StylesProvider injectFirst>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Root />
      </ConnectedRouter>
    </Provider>
  </StylesProvider>,
  document.getElementById('root'),
);
