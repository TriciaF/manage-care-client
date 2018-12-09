import React from 'react';
import '../index.css';
import {Field, reduxForm, focus} from 'redux-form';
import {required, nonEmpty} from '../validators';
import Input from './input';
import {addNewPatient, addToPatientList} from '../actions/patient';

export class PatientForm extends React.Component {

  onSubmit(values) {
    this.props.dispatch(addNewPatient(values));
    this.props.dispatch(addToPatientList(values))
}

render() {
console.log('Enter PatientForm')
    let error;
    if (this.props.error) {
        error = (
            <div className="form-error" aria-live="polite">
                {this.props.error}
            </div>
        );
    }
    return (
        <form
            className="add-patient-form"
            onSubmit={this.props.handleSubmit(values =>
              this.onSubmit(values)
          )}>
            {error}
            <div className='add-patient'>
            <span className='medicine'>Patient Information:</span>
            <Field
                component={Input}
                type="text"
                name="name"
                id="patientName"
                placeholder="patient name"
                validate={[required, nonEmpty]}
            />
            </div>
            <div className='add-patient'>
            <span className='medicine'>Medication:</span>
            <Field
                component={Input}
                type="medication"
                name="medication"
                id="medName"
                placeholder="medication"
                validate={[required, nonEmpty]}
            />
            <Field
                component={Input}
                type="dosage"
                name="dosage"
                id="medDosage"
                placeholder="dosage"
            />
            <Field
                component={Input}
                type="schedule"
                name="schedule"
                id="medSchedule"
                placeholder="schedule"
            />
            </div>
            <div className='add-patient'>
            <span className='medicine'>Pharmacy:</span>
            <Field
                component={Input}
                type="pharmacyName"
                name="pharmacyName"
                id="pharmName"
                placeholder="pharmacy name"
            />
            <Field
                component={Input}
                type="pharmacyAddr"
                name="pharmacyAddr"
                id="pharmAddr"
                placeholder="pharmacy address"
            />
            <Field
                component={Input}
                type="pharmacyPhone"
                name="pharmacyPhone"
                id="pharmPhone"
                placeholder="pharmacy phone number"
            />
            </div>
            <div className='add-patient'>
            <span className='medicine'>Physician:</span>
            <Field
                component={Input}
                type="physicianName"
                name="physicianName"
                id="physicianName"
                placeholder="physician's name"
            />
            <Field
                component={Input}
                type="physicianAddr"
                name="physicianAddr"
                id="physicianAddr"
                placeholder="physician's address"
            />
            <Field
                component={Input}
                type="physicianPhone"
                name="physicianPhone"
                id="physicianPhone"
                placeholder="physician's phone number"
            />
            </div>
            <div className='medicine'>
            <button className='submit-add-patient-button' disabled={this.props.pristine || this.props.submitting}>
                Submit
            </button>
            </div>
        </form>
    );
}
}

  export default reduxForm({
    form: 'patientForm',
    onSubmitFail: (errors, dispatch) => dispatch(focus('name'))
})(PatientForm);