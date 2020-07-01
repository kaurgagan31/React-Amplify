import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
/** Presentational */
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Themes from "./Themes";
import App from './components/App';
/** Amplify config */
import awsconfig from './aws-exports';
/** Service worker */
import * as serviceWorker from './serviceWorker';

/** Configure amplify */
Amplify.configure(awsconfig);

ReactDOM.render(
  <ThemeProvider theme={Themes.default}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
