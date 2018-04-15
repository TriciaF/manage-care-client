
import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import ManageCare from './manageCare';
import PatientList from './patient-list';
import NavBarTop from './nav-bar-top';
import LoginForm from './login-form';
import RegistrationPage from './registration-page';
import {clearAuth} from '../actions/auth';


export class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && !this.props.loggedIn) {
        // When we are logged in, start login timer
        this.startLogoutWithInactivity();
        this.props.history.push('/')
    } else if (!nextProps.loggedIn && this.props.loggedIn) {
        // Stop refreshing when we log out
        this.stopPeriodicRefresh(); 
        this.props.history.push('/')
    };
};

  startLogoutWithInactivity(){
    this.logoutTimer = setInterval( () => this.props.dispatch(clearAuth()), 6 * 60000);
  };

  componentWillUnmount() {
      this.stopPeriodicRefresh();
  };
 
  stopPeriodicRefresh() {
      if (!this.logoutTimer) {
          return;
      }
      clearInterval(this.logoutTimer);
  }
    render() {
        return ( 
          <div className = "app" >
            <NavBarTop />
            <Route exact path='/' component={ManageCare}/>
            <Route exact path='/login' component={LoginForm}/>
            <Route exact path='/patient' component={PatientList}/>
            <Route exact path='/register' component={RegistrationPage}/>
          </div>


        );
    }
}

const mapStateToProps = state => ({
  logoutWarning: state.auth.logoutWarning,
  loggedIn: state.auth.loggedIn,
  hasAuthToken: state.auth.authToken
});


export default withRouter(connect(mapStateToProps)(App));
