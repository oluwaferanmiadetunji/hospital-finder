import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { connect } from 'react-redux';

export interface IPrivateRouteProps extends RouteProps {
  authenticated: boolean;
}

const AuthRoute: React.FC<IPrivateRouteProps> = (props) => {
  return props.authenticated ? <Redirect to="/" /> : <Route {...props} component={props.component} render={undefined} />;
};

const mapStateToProps = (state: { user: { authenticated: any } }) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(AuthRoute);
