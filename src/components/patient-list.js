import React from 'react';
import {connect} from 'react-redux';
import {DropdownList} from 'react-widgets';
import PatientDashboard from './patient-dashboard'
import PatientForm from './patient-form';
import AddMedsForm from './add-meds-form';
import {getPatientList, setPatientDashboard, showPatientDashboard, addToDashboard} from '../actions/patient';
import 'react-widgets/dist/css/react-widgets.css';


export class PatientList extends React.Component {
  componentWillMount() {
    this.props.dispatch(getPatientList());
  }

  onChange(value) {
    const patientDashboardInfo = this.props.patientList.find(patient => {
      return patient.name === value
    });
      this.props.dispatch(setPatientDashboard(value, patientDashboardInfo));
      this.props.dispatch(showPatientDashboard());
  };

   render() {
    if(this.props.addMedication) {
      return this.props.dispatch(addToDashboard(this.props.patientDashboard))
    }
    if(this.props.showPatientDashboard) {
      return <PatientDashboard />
    }
    if(this.props.showAddPatientForm) {
      return <PatientForm />
    }
    if(this.props.showAddMedsForm) {
      return <AddMedsForm />
    }

    //map over state.patientList to obtain the patient name
      const patients = this.props.patientList.map(patient => {
        return patient.name;
      })
      return (
        <form className="patient-list">
         <div className="patient-list-selection">
          <h2 className='tag-line'>Select a patient</h2>
          <DropdownList
            className="dropdown_customized"
            data={patients}
            value={this.props.currentPatient}
            onChange={value => this.onChange(value)}
          />
        </div>
        </form>
      );//end return
  }//end render
}//end PatientDashboard

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  patientList: state.patient.patientList,
  showPatientDashboard: state.patient.showPatientDashboard,
  showAddPatientForm: state.patient.showAddPatientForm,
  showAddMedsForm: state.patient.showAddMedsForm,
  addMedication: state.patient.addMedication,
  patientDashboard: state.patient.patientDashboard
});

export default connect(mapStateToProps)(PatientList);


