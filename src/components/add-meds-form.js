import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import AddMedsInput from './add-meds-input';
import {addMedication} from '../actions/patient';



export class AddMedsForm extends React.Component {

  onSubmit(values) {
      this.props.dispatch(addMedication(values))
  }

  render() {
    console.log('Enter AddMedsForm component');
      let error;
      if (this.props.error) {
          error = (
              <div className="form-error" aria-live="polite">
                  {this.props.error}
              </div>
          );
      }

      return (
        <div>
          <form className='add-medicine-form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
            {error}
            <span className="medicine">Medicine:</span>
              <Field
                  component={AddMedsInput}
                  type="text"
                  name="medName"
                  id="medName"
                  placeholder="medicine name"
              />
              <Field
                  component={AddMedsInput}
                  type="text"
                  name="medDosage"
                  id="medDosage"
                  placeholder="dosage"
              />
              <Field
                  component={AddMedsInput}
                  type="text"
                  name="medSchedule"
                  id="medSchedule"
                  placeholder="schedule"
              />
            <span className="medicine">Pharmacy:</span>
              <Field
                  component={AddMedsInput}
                  type="text"
                  name="pharmName"
                  id="pharmName"
                  placeholder="pharmacy name"
              />
              <Field
                  component={AddMedsInput}
                  type="text"
                  name="pharmAddr"
                  id="pharmAddr"
                  placeholder="pharmacy address"
              />
              <Field
                  component={AddMedsInput}
                  type="text"
                  name="pharmPhone"
                  id="pharmPhone"
                  placeholder="pharmacy phone number"
              />
            <span className="medicine">Physician:</span>
              <Field
                  component={AddMedsInput}
                  type="text"
                  name="physicianName"
                  id="physicianName"
                  placeholder="physician's name"
              />
              <Field
                  component={AddMedsInput}
                  type="text"
                  name="physicianAddr"
                  id="physicianAddr"
                  placeholder="physician's address"
              />
              <Field
                  component={AddMedsInput}
                  type="text"
                  name="physicianPhone"
                  id="physicianPhone"
                  placeholder="physician's phone number"
              />
              <button className="submit-medicine-button" disabled={this.props.pristine || this.props.submitting}>
                  Submit
              </button>
            </form>
          </div>
      );
  }
}

export default reduxForm({
  form: 'addMedsForm',
  onSubmitFail: (errors, dispatch) => dispatch(focus('medName', 'medDosage'))
})(AddMedsForm);
