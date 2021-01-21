import React from 'react';
import {connect} from "react-redux";
import * as Icon from 'react-bootstrap-icons';
import FooterBack from '../../../components/FooterBack';
import ApiService from "../../../api";

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportData: null
    };
  }

  componentDidMount(){
    this.getReport();
  }

  getReport(){
    const req={
      method:'getReport',
      params:{
        id_staff: this.props.loginData.id
      }
    };
    const onSuccess=(response)=>{
      if(response.error_message){
        this.setState({
          isError:true,
          error_message: response.error_message,
        });
      } else {
        this.setState({
          isError:false,
          error_message: "",
          reportData: response
        });
      }
    }
    const onError=(error)=>{
      this.setState({
        isError:true,
        error_message: error.toString()
      })
    }
    ApiService.open(req).then(onSuccess, onError);
  }

  render(){
    return (
      <div className="container-fluid">
        <div className="row page-title align-items-center">
          <div className="text-left col-12 p-0"><h3>Report</h3></div>
        </div>
        {
          this.state.isError ? <div className="alert alert-danger">{this.state.error_message}</div> : null
        }
        {
          this.state.message ? <div className="alert alert-success">{this.state.message}</div> : null
        }
        {
          this.state.reportData ?
          <div>
            <div className="row mb-2">
              <div className="col-1 p-0"><Icon.Person width="16" height="16" color="#50d9cd"/></div>
              <div className="col-7 p-0">Staff Name:</div>
              <div className="col-4 p-0 text-right">{this.state.reportData.name}</div>
            </div>
            <div className="row mb-2">
              <div className="col-1 p-0"><Icon.Calendar width="16" height="16" color="#50d9cd"/></div>
              <div className="col-7 p-0">Working Days:</div>
              <div className="col-4 p-0 text-right">{this.state.reportData.total_days}</div>
            </div>
            <div className="row mb-2">
              <div className="col-1 p-0"><Icon.Clock width="16" height="16" color="#50d9cd"/></div>
              <div className="col-7 p-0">Total Hours:</div>
              <div className="col-4 p-0 text-right">{Number(this.state.reportData.total_hours/60).toFixed(2)}</div>
            </div>
            <div className="row mb-2">
              <div className="col-1 p-0"><Icon.Alarm width="16" height="16" color="#50d9cd"/></div>
              <div className="col-7 p-0">Total Minutes:</div>
              <div className="col-4 p-0 text-right">{Number(this.state.reportData.total_hours).toLocaleString()}</div>
            </div>
            <div className="row mb-2">
              <div className="col-1 p-0"><Icon.Kanban width="16" height="16" color="#50d9cd"/></div>
              <div className="col-7 p-0">Total Shifts:</div>
              <div className="col-4 p-0 text-right">{this.state.reportData.total_shift}</div>
            </div>
            <div className="row mb-2">
              <div className="col-1 p-0"><Icon.CheckCircleFill width="16" height="16" color="#50d9cd"/></div>
              <div className="col-7 p-0">Published Shifts:</div>
              <div className="col-4 p-0 text-right">{this.state.reportData.total_published}</div>
            </div>
          </div>
          :
          null
        }
        <FooterBack history={this.props.history}/>
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

export default connect(mapStateToProps)(Report);