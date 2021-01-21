import React from 'react';
import {connect} from "react-redux";
import ApiService from "../../../api";
import * as Icon from 'react-bootstrap-icons';
import {
  Link
} from "react-router-dom";
import FooterBack from '../../../components/FooterBack';

class Shift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      error_message: "",
      shiftData:[]
    };
  }

  componentDidMount(){
    this.getShift();
  }

  getShift(){
    const req={
      method:'getShift',
      params:{}
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
          shiftData: response
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

  confirmDelete(shiftID){
    if(window.confirm("Delete this Shift: ID = "+shiftID+" ?")){
      const req={
        method:'deleteShift',
        params:{
          id_shift: shiftID
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
            message: response.message
          });
          this.getShift();
        }
      }
      const onError=(error)=>{
        this.setState({
          isError:true,
          error_message: error.toString()
        })
      }
      ApiService.open(req).then(onSuccess, onError);
    } else {
      // console.log("cancel");
    }
  }

  confirmPublish(shiftID){
    if(window.confirm("Publish this Shift: ID = "+shiftID+" ?")){
      const req={
        method:'publishShift',
        params:{
          id_shift: shiftID
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
            message: response.message
          });
          this.getShift();
        }
      }
      const onError=(error)=>{
        this.setState({
          isError:true,
          error_message: error.toString()
        })
      }
      ApiService.open(req).then(onSuccess, onError);
    } else {
      // console.log("cancel");
    }
  }

  render(){
    return (
      <div className="table-responsive">
        <div className="container-fluid">
          <div className="row page-title align-items-center">
            <div className="text-left col-6 p-0"><h3>Shift Data</h3></div>
            <div className="text-right col-6 p-0">
              <Link to={'/shift/add/'}>
                <button type="button" className="btn btn-primary"><Icon.Plus/> Add Shift</button>
              </Link>
            </div>
          </div>
        </div>
        {
          this.state.isError ? <div className="alert alert-danger">{this.state.error_message}</div> : null
        }
        {
          this.state.message ? <div className="alert alert-success">{this.state.message}</div> : null
        }
        <table className="table table-striped text-center">
          <thead className="thead-dark">
            <tr>
              <th>Date</th>
              <th>Shift</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.shiftData.map((item,index)=>{
              let shiftStartHour = item.start.split(":");
              return(
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{shiftStartHour[0] < 8 ? "Morning" : (shiftStartHour[0] < 16 ? "Afternoon" : "Night")}</td>
                  <td>{item.start}</td>
                  <td>{item.end}</td>
                  <td>
                    <button className="btn"><Link to={'/shift/view/'+item.id_shift}><Icon.Binoculars/></Link></button>
                    <button style={item.status === '2' ? {display:'none'} : null} className="btn"><Link to={'/shift/edit/'+item.id_shift}><Icon.PencilSquare/></Link></button>
                    <button style={item.status === '2' ? {display:'none'} : null} className="btn btn-link" onClick={()=>this.confirmDelete(item.id_shift)}><Icon.Trash/></button>
                    <button style={item.status === '2' ? {display:'none'} : null} className="btn btn-link" onClick={()=>this.confirmPublish(item.id_shift)}><Icon.Cursor/></button>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        <div className="p-3">&nbsp;</div>
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

export default connect(mapStateToProps)(Shift);