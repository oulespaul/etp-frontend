import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = withRouter(({ component: Component, ...rest }) => {
  const componentCheck = props => {
    if (rest.isLoggedIn) {
      return <Component {...props} {...rest} />;
    } else {
      return (
        <Redirect
          to={{
            pathname: '/exchange',
            state: { from: props.location },
          }}
        />
      );
    }
  };

  return <Route {...rest} render={props => componentCheck(props)} />;
});

export default PrivateRoute;
