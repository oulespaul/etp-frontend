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

const Routes = ({ isLoggedIn }) => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/bookings' } };

  return (
    <AppLayout>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            if (isLoggedIn && from) {
              return <Redirect to={from} />;
            } else {
              return <Redirect to={{ pathname: '/exchange' }} />;
            }
          }}
        />

        <Route exact path="/exchange" render={() => <Exchange />} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>

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
  );
};

const mapStateToProps = ({ authReducer }) => {
  return {
    isLoggedIn: authReducer.isLoggedIn,
  };
};

export default withRouter(connect(mapStateToProps)(Routes));
