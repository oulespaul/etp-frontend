import React, { lazy } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter, Switch, useLocation } from 'react-router-dom';
import AppLayout from 'shared/layouts/AppLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './PrivateRoute';

// const Home = lazy(() => import('modules/Home'));
const Dashboard = lazy(() => import('modules/Dashboard'));
const Exchange = lazy(() => import('modules/Exchange'));
const Login = lazy(() => import('modules/Login'));

const Routes = ({ isLoggedIn }) => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/bookings' } };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          if (isLoggedIn && from) {
            return <Redirect to={from} />;
          } else {
            return <Redirect to={{ pathname: '/login' }} />;
          }
        }}
      />

      <Route exact path="/login" render={() => <Login />} />

      <AppLayout>
        <Route exact path="/exchange" render={() => <Exchange />} />
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
  };
};

export default withRouter(connect(mapStateToProps)(Routes));
