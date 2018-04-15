import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        return this.props.dispatch(registerUser(user))
               .then(() => this.props.dispatch(login(username, password)));
    }

render() {
  console.log('Enter RegistrationForm')
  
    return (
        <form
            className="registration-form"
            onSubmit={this.props.handleSubmit(values =>
                this.onSubmit(values)
            )}>
            <Field
                component={Input}
                type="text"
                name="firstname"
                id="firstname"
                placeholder='First name'
                validate={[required, nonEmpty, isTrimmed]}
            />
            <Field
                component={Input}
                type="text"
                name="lastname"
                id="lastname"
                placeholder='Last name'
                validate={[required, nonEmpty, isTrimmed]}
            />
            <Field
                component={Input}
                type="text"
                name="username"
                id="username"
                placeholder='User name'
                validate={[required, nonEmpty, isTrimmed]}
            />
            <Field
                component={Input}
                type="password"
                name="password"
                id="password"
                placeholder='Password'
                validate={[required, passwordLength, isTrimmed]}
            />
            <Field
                component={Input}
                type="password"
                name="passwordConfirm"
                id="confirmPassword"
                placeholder='Confirm Password'
                validate={[required, nonEmpty, matchesPassword]}
            />
            <button className='registration-button'
                type="submit"
                disabled={this.props.pristine || this.props.submitting}>
                Register
            </button>
        </form>
    );
}
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);