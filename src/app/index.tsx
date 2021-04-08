import 'typeface-roboto';
import 'app/styles.css';

import React from 'react';
import { Route, RouteComponentProps, Switch, Redirect } from 'react-router';
import { hot } from 'react-hot-loader';
import App from './containers/App';
import Box from '@material-ui/core/Box';
import { createMuiTheme } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F96565',
      contrastText: "white"
    },
    secondary: {
      main: '#286FA9',
    }
  },
  typography: {
    fontFamily: [
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h4: {
      fontFamily: 'Literata'
    }
  }
});

export interface Props {
}

export interface State {
  showLoader: boolean;
}

export class Root extends React.Component<Props, State> {
  state = {
    showLoader: true,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ showLoader: false }), 1000);
  }
  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <Box>
          <Switch>
            <Route
              render={(props: RouteComponentProps<void>) => {
                return <App {...props} />;
              }}
            />
            <Route exact path="/" render={() => <Redirect to="/welcome" />} />

            <Route
              render={(props: RouteComponentProps<void>) => {
                return <App {...props} />;
              }}
            />
          </Switch>
        </Box>
      </MuiThemeProvider>
    );
  }
}

export default hot(module)(Root);
