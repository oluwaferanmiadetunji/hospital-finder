import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export interface AuthRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

export class AuthRoute extends Route<AuthRouteProps> {
  public render() {
    let redirectPath: string = '';
    if (!this.props.isAuthenticated) {
      redirectPath = this.props.authenticationPath;
    }

    if (redirectPath) {
      const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
      return <Route {...this.props} component={renderComponent} render={undefined} />;
    } else {
      return <Route {...this.props} />;
    }
  }
}
