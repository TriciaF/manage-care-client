import React from 'react';
import {connect} from 'react-redux';
import {removeFromDashboard,  
        showAddMedsForm, 
        showPatientList, getPatientList} from '../actions/patient';
import PatientForm from './patient-form';
import PatientList from './patient-list'

export class PatientDashboard extends React.Component {

  backToPatientList() {
    this.props.dispatch(showPatientList());
    return this.props.dispatch(getPatientList())
  }
  render() {
    console.log('Enter PatientDashboard Component');
    if(this.props.showAddPatientForm){
      return <PatientForm />
    }
    if(this.props.showPatientList){
      return <PatientList />
    }

    const medicationList = this.props.patientDashboard.medication.map(med=> {
      return (
        <div className='medication-card'>
          <div className='medication-card-content-title'>Medication:</div>
            <span className='medication-card-content'> {med.name}, {med.dosage}, {med.schedule}</span>
          <div className='medication-card-content-title'>Pharmacy:</div>
            <span className='medication-card-content'> {med.pharmacy.name}, {med.pharmacy.address}, {med.pharmacy.phoneNumer}</span>
          <div className='medication-card-content-title'>Physician:</div>
            <span className='medication-card-content'> {med.physician.name}, {med.physician.address}, {med.physician.phoneNumber}</span>
          <button className="rem-med-button" onClick={()=>this.props.dispatch(removeFromDashboard(med, this.props.patientDashboard.name))}>remove</button>
        </div>
      )
    })

    return (
      <div>
          <div className="dashboard-header">
            <h1 className="dashboard-name">
                {this.props.currentPatient}
            </h1>
        </div>
        <div className="medicine-list">
        <div className="dashboard-buttons">
                <button className="add-med-button" onClick={() =>this.props.dispatch(showAddMedsForm(true))}>Add Medication</button>
                <button className="back-to-patient-list-button" onClick={() =>this.backToPatientList()}>Back to Patient List</button>
        </div>
        <div className='medication-table'>
            {medicationList}
        </div>
         </div>
      </div>  
    );//end return
  }//end render
}//end PatientDashboard


const mapStateToProps = state => ({
  patientDashboard: state.patient.patientDashboard,
  currentPatient: state.patient.currentPatient,
  showAddPatientForm: state.patient.showAddPatientForm,
  showPatientList: state.patient.showPatientList
});

export default connect(mapStateToProps)(PatientDashboard);