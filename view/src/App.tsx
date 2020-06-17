import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import jwtDecode from 'jwt-decode';
// material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import axios from 'axios';
// redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './redux/types';
import { logoutUser } from './redux/actions/userActions';
import { BASE_URL, URI } from './constants';
// routes
import { AuthRoute, AuthRouteProps } from './routes/AuthRoute';
// load pages
const Home = React.lazy(() => import('./components/Home'));
const History = React.lazy(() => import('./components/History'));
const Login = React.lazy(() => import('./components/Login'));
const Register = React.lazy(() => import('./components/Register'));

axios.defaults.baseURL = BASE_URL;
const token = localStorage.Token;
if (token) {
  const decodedToken: any = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    store.dispatch({ type: SET_UNAUTHENTICATED });
  } else {
    store.dispatch({
      type: SET_AUTHENTICATED
    });
    axios.defaults.headers.common['Authorization'] = token;
  }
}
const authenticated = store.getState().user.authenticated;
const client = new ApolloClient({
  uri: URI
});

const defaultProtectedRouteProps: AuthRouteProps = {
  isAuthenticated: authenticated,
  authenticationPath: '/login'
};

const App: React.FC = () => {
  return (
    <div id="app-container">
      <AppBar id="appBar" elevation={0}>
        <Toolbar className="header">
          <h1 id="heading">
            Hospital F<LocationOnIcon />
            nder
          </h1>
        </Toolbar>
      </AppBar>
      <Router>
        <Suspense
          fallback={
            <Backdrop open={true} style={{ color: 'white', zIndex: 10 }}>
              <CircularProgress color="inherit" size={100} />
            </Backdrop>
          }
        >
          <Provider store={store}>
            <Switch>
              <AuthRoute {...defaultProtectedRouteProps} exact={true} path="/" component={Home} />
              <ApolloProvider client={client}>
                <AuthRoute {...defaultProtectedRouteProps} exact={true} path="/history" component={History} />
              </ApolloProvider>

              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </Provider>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
