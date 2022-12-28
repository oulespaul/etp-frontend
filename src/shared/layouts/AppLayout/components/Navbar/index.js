import { connect } from 'react-redux';
import AppNavBar from './AppNavBar';

const mapStateToProps = ({ authReducer }) => {
  return {
    isLoggedIn: authReducer.isLoggedIn,
    user: authReducer.user,
  };
};

export default connect(mapStateToProps)(AppNavBar);
