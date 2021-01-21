import React from 'react';
import {connect} from "react-redux";
import ApiService from "../../../api";
import Datepicker from '../../../components/Datepicker';
import ShiftChart from '../../../components/ShiftChart';

let pickedDate = "";
let startTime = "";
let endTime = "";
let startTimeValue = 0;
let endTimeValue = 0;

class ShiftOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      error_message: "",
      shiftData:{
        name:""
      },
      staffData:[],
      shiftDetail:null,
    };
  }

  componentDidMount(){
    const option = this.props.option;
    if(option === "add"){
      // this.getStaffData();
    } else if(option === "view"){
      this.getShiftDetail(this.props.shiftID)
    } else if(option === "edit"){
      // this.getStaffData();
      this.getShiftDetail(this.props.shiftID)
    }
  }

  getShiftDetail(shiftID){
    const req={
      method:'getShiftDetail',
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
  }

  selectTime(time, option){
    const dateValue = new Date(time);
    const getHour = dateValue.getHours() < 10 ? "0"+dateValue.getHours() : dateValue.getHours();
    const getMinute = dateValue.getMinutes() < 10 ? "0"+dateValue.getMinutes() : dateValue.getMinutes();
    if(option === "start"){
      startTime = getHour+":"+getMinute;
      startTimeValue = dateValue.getTime();
    } else {
      endTime = getHour+":"+getMinute;
      endTimeValue = dateValue.getTime();
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
    if(startTimeValue > endTimeValue){
      this.setState({
        isError: true,
        error_message:"Start time cannot be bigger than end time."
      });
      return;
    }

    if(startTime === endTime){
      this.setState({
        isError: true,
        error_message:"Start time cannot be the same with end time."
      });
      return;
    }

    const req={
      method:'addShift',
      params:{
        date:pickedDate,
        start:startTime,
        end:endTime,
        id_staff:this.props.loginData.id
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

  handleEdit(){
    if(startTimeValue > endTimeValue){
      this.setState({
        isError: true,
        error_message:"Start time cannot be bigger than end time."
      });
      return;
    }

    if(startTime === endTime){
      this.setState({
        isError: true,
        error_message:"Start time cannot be the same with end time."
      });
      return;
    }
    
    const req={
      method:'editShift',
      params:{
        date:pickedDate,
        start:startTime,
        end:endTime,
        id_staff:this.state.shiftData.id_staff,
        id_shift:this.props.shiftID
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
    return (
      <div className="table-responsive">
        <div className="container-fluid">
          <div className="row page-title align-items-center">
            <div className="text-left col-6 p-0"><h3>Shift Option - {this.props.option}</h3></div>
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
          option === "edit" && shiftData ?
          <form>
            <div className="form-group">
              <label>Date</label>
              <Datepicker dateChange={(value)=>this.selectDate(value)} isTime={false} editDate={shiftData.date}/>
            </div>
            <div className="form-group">
              <label>Start Time</label>
              <Datepicker dateChange={(value)=>this.selectTime(value, "start")} isTime={true} editDate={shiftData.date} editTime={shiftData.start}/>
            </div>
            <div className="form-group">
              <label>End Time</label>
              <Datepicker dateChange={(value)=>this.selectTime(value, "end")} isTime={true} editDate={shiftData.date} editTime={shiftData.end}/>
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-primary col-5" onClick={()=>this.handleEdit()}>Save Changes</button>
            </div>
          </form>
          :
          option === "view" && shiftData ?
          <ShiftChart data={shiftData}/>
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