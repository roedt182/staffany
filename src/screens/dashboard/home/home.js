import React from 'react';
import {connect} from "react-redux";
import * as Icon from 'react-bootstrap-icons';
import {
  Link
} from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
  }

  render(){
    return (
      <div className="container-fluid">
        <div className="row page-title align-items-center">
          <div className="text-left col-6 p-0"><h3>Home</h3></div>
          <div className="text-right col-6 p-0">&nbsp;</div>
        </div>
        <div className="mobile-menu">
          <div className="sidebar-menu"><Link to="/shift"><Icon.Person width="22" height="22" color="#50d9cd"/> Shift Data</Link></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      loginStatus: state.loginStatus,
      loginData: state.loginData
    }
}

export default connect(mapStateToProps)(Home);