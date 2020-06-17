import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { BASE_URL } from './constants';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './redux/types';
import { logoutUser } from './redux/actions/userActions';
import AuthRoute from './routes/AuthRoute';
import PrivateRoute from './routes/PrivateRoute';

const HomePage = import('./components/Home');
const HistoryPage = import('./components/History');
const LoginPage = import('./components/Login');
const RegisterPage = import('./components/Register');

const Home = React.lazy(() => HomePage);
const History = React.lazy(() => HistoryPage);
const Login = React.lazy(() => LoginPage);
const Register = React.lazy(() => RegisterPage);
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
    // store.dispatch(getUserData());
  }
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
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
                <CircularProgress color="inherit" />
              </Backdrop>
            }
          >
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/history" component={History} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/register" component={Register} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
