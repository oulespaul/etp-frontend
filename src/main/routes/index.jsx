import React, { lazy } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter, Switch, useLocation } from 'react-router-dom';
import AppLayout from 'shared/layouts/AppLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './PrivateRoute';
import { setAuth } from 'library/common/actions/AuthActions';

// const Home = lazy(() => import('modules/Home'));
const Dashboard = lazy(() => import('modules/Dashboard'));
const Exchange = lazy(() => import('modules/Exchange'));
const Login = lazy(() => import('modules/Login'));
const OpenOrder = lazy(() => import('modules/OpenOrder'));
const Invoice = lazy(() => import('modules/Invoice'));

const Routes = props => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/bookings' } };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          if (props.isLoggedIn && from) {
            return <Redirect to={from} />;
          } else {
            return <Redirect to={{ pathname: '/login' }} />;
          }
        }}
      />

      <Route exact path="/login" render={() => <Login />} />

      <AppLayout>
        <Route exact path="/exchange" render={() => <Exchange {...props} />} />

        <Route exact path="/open-order" component={OpenOrder} />

        <Route exact path="/invoice" component={Invoice} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />

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
