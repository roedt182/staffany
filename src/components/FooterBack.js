import React from 'react';
import {connect} from "react-redux";
import * as Icon from 'react-bootstrap-icons';
import {
  Link
} from "react-router-dom";

class FooterBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
  }

  render(){
    return (
      <div className="back-button d-flex d-md-none">
        <div className="col-3">
          <Link to="/">
            <button type="button" className="btn btn-block btn-home">
              <Icon.HouseFill/>
            </button>
          </Link>
        </div>
        <div className="col-9">
          <button type="button" className="btn btn-block" onClick={()=>this.props.history.goBack()}>
            <Icon.ChevronDoubleLeft/> Kembali
          </button>
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

export default connect(mapStateToProps)(FooterBack);