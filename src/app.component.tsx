import React, { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Constants from './app/Constatns';
import Pages from './app/pages.component';
import LoginPage from './app/login/login-page.component';
import SignUpPage from './app/sign-up/sign-up-page.component';


const history = createBrowserHistory();

function App() {
  function initGoogleApi() {
    // @ts-ignore
    window.gapi.load('auth2', () => {
      // @ts-ignore
      window.gapi.auth2.init({
        client_id: Constants.GOOGLE_CLIENT_ID,
      });
    });
  }

  useEffect(() => { initGoogleApi(); }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={Constants.Urls.Pages.SIGN_IN}>
          <LoginPage />
        </Route>
        <Route path={Constants.Urls.Pages.SIGN_UP}>
          <SignUpPage />
        </Route>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/">
          <Pages history={history} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
