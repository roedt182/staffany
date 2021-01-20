import React from 'react';
import {connect} from "react-redux";
import ApiService from "../../../api";
import * as Icon from 'react-bootstrap-icons';
import {
  Link
} from "react-router-dom";
import Datepicker from '../../../components/Datepicker';

let pickedDate = "";
let startTime = "";
let endTime = "";

class ShiftOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      error_message: "",
      shiftData:{
        name:""
      },
      staffData:[]
    };
  }

  componentDidMount(){
    const option = this.props.option;
    if(option === "add"){
      this.getStaffData();
    }
  }

  getStaffData(){
    const req={
      method:'getStaff',
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
          staffData: response
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

  nameChange = (event) => {
    this.setState({
      shiftData:{
        ...this.state.shiftData,
        name: event.target.value,
      },
      isSearch: event.target.value ? true : false
    }, ()=>this.filterStaff(this.state.staffData, event.target.value));
  };

  filterStaff(array, string) {
    let newList = array.filter(o => Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
    this.setState({
      staffDataFiltered: newList.length > 0 ? newList : [{name:"No Result."}]
    });
  }

  resetForm = () => {
    this.setState({
      shiftData:{
        name:""
      }
    })
  }

  selectDate(date){
    const dateValue = new Date(date);
    let getDate = dateValue.getDate() < 10 ? "0"+dateValue.getDate() : dateValue.getDate();
    let getMonth = dateValue.getMonth() < 9 ? "0"+(dateValue.getMonth() + 1) : dateValue.getMonth() + 1;
    const getYear = dateValue.getFullYear();
    const selectedDate = getYear + '-' + getMonth + '-' + getDate;
    pickedDate = selectedDate;
    console.log("pickedDate", pickedDate);
  }

  selectTime(time, option){
    const dateValue = new Date(time);
    const getHour = dateValue.getHours() < 10 ? "0"+dateValue.getHours() : dateValue.getHours();
    const getMinute = dateValue.getMinutes() < 10 ? "0"+dateValue.getMinutes() : dateValue.getMinutes();
    if(option === "start"){
      startTime = getHour+":"+getMinute;
    } else {
      endTime = getHour+":"+getMinute;
    }
  }

  setStaffName(id, name){
    this.setState({
      shiftData:{
        ...this.state.shiftData,
        name: name,
        id_staff: id
      },
      isSearch: false
    });
  }

  handleSubmit(){
    const req={
      method:'addShift',
      params:{
        date:pickedDate,
        start:startTime,
        end:endTime,
        id_staff:this.state.shiftData.id_staff
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
        }, ()=>this.props.history.goBack());
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
    const { option } = this.props;
    const { shiftData, staffDataFiltered } = this.state;

    const StaffList = () => {
      return(
        <div className={this.state.isSearch ? "show-list" : "hide-list"}>
        {
          staffDataFiltered ? (
            staffDataFiltered.map((item, index)=>{
              return(
                <div key={index} onClick={item.id_staff ? ()=>this.setStaffName(item.id_staff, item.name) : null}>
                  {item.name}
                </div>
              )
            })
          ) : null
        }
        </div>
      );
    }
    return (
      <div className="table-responsive">
        <div className="container-fluid">
          <div className="row page-title align-items-center">
            <div className="text-left col-6 p-0"><h3>ShiftOptions</h3></div>
            <div className="text-right col-6 p-0">&nbsp;</div>
          </div>
        </div>
        {
          this.state.isError ? <div className="alert alert-danger">{this.state.error_message}</div> : null
        }
        {
          this.state.message ? <div className="alert alert-success">{this.state.message}</div> : null
        }
        {
          option === "add" ?
          <form>
            <div className="form-group staff-list">
              <label>Staff Name</label>
              <input type="text" name="name" className="form-control" autoComplete="off" value={shiftData.name} onChange={(event)=>this.nameChange(event)}/>
              <StaffList/>
            </div>
            <div className="form-group">
              <label>Date</label>
              <Datepicker dateChange={(value)=>this.selectDate(value)} isTime={false}/>
            </div>
            <div className="form-group">
              <label>Start Time</label>
              <Datepicker dateChange={(value)=>this.selectTime(value, "start")} isTime={true}/>
            </div>
            <div className="form-group">
              <label>End Time</label>
              <Datepicker dateChange={(value)=>this.selectTime(value, "end")} isTime={true}/>
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-warning col-5" onClick={()=>this.resetForm()}>Reset Form</button>
              <button type="button" className="btn btn-primary col-5" onClick={()=>this.handleSubmit()}>Submit Data</button>
            </div>
          </form>
          :
          null
        }
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