import React from 'react';
import {connect} from "react-redux";
import {setLoginData, setLoginStatus, setActivity} from "../../redux/actions";
import * as Icon from 'react-bootstrap-icons';
import MainNavigation from "../../router";
import { addTimeout, removeTimeout } from 'redux-timeout';
import { SET_ACTIVITY } from '../../redux/actions/constants';
import ApiService from "../../api";
import Popup from '../../components/Popup';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popupLogout: false
    };
  }

  componentDidMount(){
  	const { addTimeout, displaySessionAlert } = this.props;
  	const dateTime = new Date().getTime();
  	const sessionTime =  60 * 60 * 1000;

  	const reduxSession = this.props.activity;
  	const reduxExpiryTime = reduxSession + sessionTime;

  	if(dateTime > reduxExpiryTime){
  		displaySessionAlert();
  		return;
  	} else {
  		addTimeout(sessionTime, SET_ACTIVITY, displaySessionAlert);
  	}
  }

  componentDidUpdate(){
  }

  logout = () => {
    this.setState({
      popupLogout: true
    });
  };

  logoutExpired = () => {
    const { logout } = this.props;
    logout();
  };

  confirmLogout = () => {
    this.setState({
      popupLogout: false
    });
    const { logout } = this.props;
    logout();
  };

  cancelLogout = () => {
    this.setState({
      popupLogout: false
    });
  };

  render(){
    return (
      <div className="main-container">
        <div className="d-flex header-dashboard">
        	<div className="col-6 col-md-8"></div>
        	<div className="col-6 col-md-4 text-right logout">
        		<Icon.PersonCircle width="32" height="32" color="#00b104"/> {this.props.loginData.username} | <button type="button" className="btn-logout" onClick={this.logout}>logout</button>
        	</div>
        </div>
        <div className="d-flex content-dashboard">
        	<MainNavigation/>
        </div>
        {
        	this.props.activity ? 
        	null
        	:
        	<div className="sessionWarning">
        		<div className="warningPopup">
        			<h5>You session has been expired!</h5>
        			<button type="button" className="btn btn-primary" onClick={this.logoutExpired}>Click here to login</button>
        		</div>
        	</div>
        }
        <div className={this.state.popupLogout ? "sessionWarning" : "d-none"}>
          <div className="warningPopup">
            <Icon.BoxArrowRight width="60" height="60" color="#00b104"/>
            <hr/>
            <p>Confirm logout and exit the app?</p>
            <button type="button" className="btn btn-success btn-block" onClick={this.confirmLogout}>Yes</button><br/>
            <button type="button" className="btn btn-danger btn-block" onClick={this.cancelLogout}>Cancel</button>
          </div>
        </div>
        <Popup display={this.props.inProgress}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      loginStatus: state.loginStatus,
      loginData: state.loginData,
      activity: state.activity,
      inProgress: state.inProgress
    }
}

function mapDispatchToProps(dispatch) {
	return {
		addTimeout: (timeout, action, fn) => {
		  dispatch(addTimeout(timeout, action, fn))
		},
		displaySessionAlert: () => {
    		dispatch(setActivity(false));
    		dispatch(removeTimeout(SET_ACTIVITY));
    		const req={
      		  method: 'deleteSession',
      		  params: {}
      		};
      		const onSuccess=(response)=>{}
      		const onError=(error)=>{}
      		ApiService.open(req).then(onSuccess, onError);
		},
		logout: () => {
			const req={
      		  method: 'deleteSession',
      		  params: {}
      		};
      		const onSuccess=(response)=>{}
      		const onError=(error)=>{}
      		ApiService.open(req).then(onSuccess, onError);
		  	dispatch(setLoginStatus(false));
    		dispatch(setLoginData(null));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);