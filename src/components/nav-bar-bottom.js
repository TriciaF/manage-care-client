import React from 'react';
import {connect} from 'react-redux';
import patientDashboardImg from '../components/images/patientDashboard.PNG';
import medicationCardImg from '../components/images/medication.PNG';
import addMedicationImg from '../components/images/addMedication.PNG';

class NavBarBottom extends React.Component {


  render () {
    return(
      <div className='nav-bar-bottom'>
          <div className='nav-bottom-column'>
          <div className='flipper'>
            <div className='nav-bottom-front'>
            <div className="nav-bottom-heading">Patient Dashboards</div>
            <span className="nav-bottom-info">Manage multiple patients, by adding to your patient list. Once a patient is created, the patient dashboard contain current medication which the patient is prescribed.</span>
            </div>
            <div className='nav-bottom-back'>
            <img src={patientDashboardImg} alt='patient dashboard' width='380px' height='380px'/>
            </div>
            </div>
          </div>
          <div className='nav-bottom-column'>
          <div className='flipper'>
          <div className='nav-bottom-front'>
            <div className="nav-bottom-heading">Medication Lists</div>
            <span className="nav-bottom-info">Information about a patient's medication is listed on the patient dashboard.  The medication information includes:</span>
            <ul className="nav-bottom-list">
              <li>medication name</li>
              <li>dosage and schedule</li>
              <li>pharmacy name, address, and phone number</li>
              <li>physician name, address, and phone number</li>
            </ul>
            </div>
            <div className='nav-bottom-back'>
            <img src={medicationCardImg} alt='patient dashboard' width='380px' height='380px'/>
            </div>
            </div>
          </div>
          <div className='nav-bottom-column'>
          <div className='flipper'>
          <div className='nav-bottom-front'>
            <div className="nav-bottom-heading">Add/Remove Medications</div>
            <span className="nav-bottom-info">Medications can be added or removed from the patient's dashboard, ensuring that your patient's information is up to date</span>
          </div>
          <div className='nav-bottom-back'>
            <img src={addMedicationImg} alt='patient dashboard' width='380px' height='380px'/>
            </div>
          </div>
          </div>
      </div>
    )

  }
}

const mapStateToProps = state => ({
  showLoginForm: state.auth.showLoginForm,
  loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(NavBarBottom);