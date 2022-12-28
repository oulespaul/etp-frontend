import React, { lazy } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import AppLayout from 'shared/layouts/AppLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './PrivateRoute';
import { setAuth } from 'library/common/actions/AuthActions';

const Exchange = lazy(() => import('modules/Exchange'));
const Login = lazy(() => import('modules/Login'));
const OpenOrder = lazy(() => import('modules/OpenOrder'));
const Invoice = lazy(() => import('modules/Invoice'));

const Routes = props => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to={{ pathname: '/exchange' }} />;
        }}
      />

      <Route exact path="/exchange" render={() => <Login {...props} />} />

      <AppLayout>
        <PrivateRoute exact path="/exchanges" component={Exchange} {...props} />

        <PrivateRoute exact path="/open-order" component={OpenOrder} {...props} />

        <PrivateRoute exact path="/invoice" component={Invoice} {...props} />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AppLayout>
    </Switch>
  );
};

const mapStateToProps = ({ authReducer }) => {
  return {
    isLoggedIn: authReducer.isLoggedIn,
    user: authReducer.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      dispatch(setAuth(user));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
