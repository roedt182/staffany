import React from 'react';
import {connect} from "react-redux";
import ApiService from "../../../api";
import * as Icon from 'react-bootstrap-icons';
import {
  Link
} from "react-router-dom";

class ShiftOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      error_message: "",
    };
  }

  componentDidMount(){
  }

  render(){
    return (
      <div className="table-responsive">
        <div className="container-fluid">
          <div className="row page-title align-items-center">
            <div className="text-left col-6 p-0"><h3>ShiftOptions</h3></div>
            <div className="text-right col-6 p-0">&nbsp;</div>
          </div>
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

export default connect(mapStateToProps)(ShiftOptions);