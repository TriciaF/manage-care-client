import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import NavBarBottom from './nav-bar-bottom';

export class ManageCare extends React.Component {
  
    render() {
      // If we are logged in redirect straight to the user's dashboard
      if (this.props.loggedIn) {
          return (<Redirect to="/patient" />);
      }

    return (
      <div className="manage-care">
        <div className="manage-care-header">
           <div id="circle">Manage Care</div>
        </div> 
        <div className='nav-bar-bottom-container'>
           <NavBarBottom />
        </div>
      </div> 
    );
  }
}



               
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser,
});

export default connect(mapStateToProps)(ManageCare);