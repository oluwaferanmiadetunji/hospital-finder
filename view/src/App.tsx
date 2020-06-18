import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
// material UI
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { URI } from './constants';
// routes
import { AuthRoute } from './components/AuthRoute';
import { getLocation } from './redux/actions/userActions';
// load pages
const Home = React.lazy(() => import('./components/Home'));
const History = React.lazy(() => import('./components/History'));
const Login = React.lazy(() => import('./components/Login'));
const Register = React.lazy(() => import('./components/Register'));

interface RootState {
  user: any;
}

const client = new ApolloClient({
  uri: URI
});
const App: React.FC = () => {
  const authenticated = useSelector((state: RootState) => state.user.authenticated);
  const Props = {
    isAuthenticated: authenticated,
    authenticationPath: '/login'
  };
  const ProtectedRoutesProps = {
    isAuthenticated: !authenticated,
    authenticationPath: '/'
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocation());
  }, []);

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
          <Switch>
            <AuthRoute {...Props} exact={true} path="/" component={Home} />
            <AuthRoute {...ProtectedRoutesProps} path="/login" component={Login} />
            <AuthRoute {...ProtectedRoutesProps} path="/register" component={Register} />
            <ApolloProvider client={client}>
              <AuthRoute {...Props} path="/history" component={History} />
            </ApolloProvider>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
