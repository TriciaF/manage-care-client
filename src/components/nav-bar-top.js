import React from 'react';
import {connect} from 'react-redux';
import { showAddPatientForm} from '../actions/patient';
import {clearAuth } from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import LoginForm from './login-form';

class NavBarTop extends React.Component {
logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
}
logIn() {
  return <LoginForm />
}
register(){
  // this.props.dispatch(showRegistrationForm())
    return <div>register</div>
}
addPatient() {
    return this.props.dispatch(showAddPatientForm());
}

render() {
  // Only render the log out button if we are logged in
  let logOutButton;
  let logInButton;
  let register;
  let addPatient;

  if (this.props.loggedIn) {
      logOutButton = (
          <div onClick={() => this.logOut()}>
            <a className="nav-words" href='/'>
              Log out
            </a>
          </div>
      )
      addPatient = (
          <div onClick={() => this.addPatient()}>
            <a className="nav-words" href='#'>
              Add Patient
            </a>
          </div>
      )
  }
  if (!this.props.loggedIn) {
      logInButton = (
           <div onClick={() => this.logIn()}>
              <a className="nav-words" href='/login'>
                Log in
              </a>
            </div>
        )
    }
    if (!this.props.loggedIn) {
        register = (
            <div onClick={() => this.register()}>
              <a className="nav-words" href='/register'>
                Register
              </a>
           </div>
        )
    }
    return (
        <div className="nav-bar-top">
          <div>
            <a className="nav-words-fda" href='https://www.fda.gov/Drugs/default.htm'>
              FDA Website
            </a>
          </div>
          <div>
            <a className="nav-words-faq" href='http://www.signgenius.com/sign-language/sign-language-faq-introduction.shtml'>
              FAQs
            </a>
          </div>
              {register}
              {logInButton}
              {addPatient}
              {logOutButton}
        </div>
    );
}
}

const mapStateToProps = state => ({
loggedIn: state.auth.currentUser,
currentUser:  state.auth.currentUser,

});
export default connect(mapStateToProps)(NavBarTop);

