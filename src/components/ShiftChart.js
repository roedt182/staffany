import React from 'react';
import Datepicker from "./Datepicker.js";
import ApiService from "../api";

let pickedDate = "";

class ShiftChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shiftOfDayList: null,
      timeline:["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","24:00"]
    };
  }

  componentDidMount(){
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.data !== prevProps.data){
      this.getShiftOfDay();
    }
  }

  getShiftOfDay(date){
    const req={
      method:'getShiftOfDay',
      params:{
        date: date ? date : this.props.data.date
      }
    };
    const onSuccess=(response)=>{
      if(response.error_message){
        this.setState({
          isError:true,
          error_message: response.error_message,
          shiftOfDayList: null
        });
      } else {
        this.setState({
          isError:false,
          error_message: "",
          message: response.message,
          shiftOfDayList: response
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

  selectDate(date){
    const dateValue = new Date(date);
    let getDate = dateValue.getDate() < 10 ? "0"+dateValue.getDate() : dateValue.getDate();
    let getMonth = dateValue.getMonth() < 9 ? "0"+(dateValue.getMonth() + 1) : dateValue.getMonth() + 1;
    const getYear = dateValue.getFullYear();
    const selectedDate = getYear + '-' + getMonth + '-' + getDate;
    pickedDate = selectedDate;
  }

  render(){
    const { data } = this.props;
    return (
      <div>
        {
          this.state.isError ? <div className="alert alert-danger">{this.state.error_message}</div> : null
        }
        {
          this.state.message ? <div className="alert alert-success">{this.state.message}</div> : null
        }
        <label>Shift Date:</label>
        <div className="row">
          <div className="col-md-9">
            <Datepicker dateChange={(value)=>this.selectDate(value)} isTime={false} editDate={data.date}/>
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary btn-block" onClick={()=>this.getShiftOfDay(pickedDate)}>Search</button>
          </div>
        </div>
        <hr/>
        <div style={{position:'relative'}}>
          {
            this.state.timeline.map((item, index)=>{
              return(
                <div key={index} className="timeline">
                  <span>{item}</span>
                  <hr/>
                </div>
              )
            })
          }
          {
            this.state.shiftOfDayList ? 
            this.state.shiftOfDayList.map((item,index)=>{
              let shiftData = item;
              let startChartArray = shiftData && shiftData.start ? shiftData.start.split(":") : [];
              let startChartMinute = startChartArray.length > 0 ? Math.floor(startChartArray[1]/60*100) : 0;
              let startChartHour = startChartArray.length > 0 ? startChartArray[0] : 0;
              let startChartBlock = startChartHour+"."+startChartMinute;

              let endChartArray = shiftData && shiftData.end ? shiftData.end.split(":") : [];
              let endChartMinute = endChartArray.length > 0 ? Math.floor(endChartArray[1]/60*100) : 0;
              let endChartHour = endChartArray.length > 0 ? endChartArray[0] : 0;
              let endChartBlock = endChartHour+"."+endChartMinute;

              let shiftTime = startChartHour < 8 ? "Morning" : (startChartHour < 16 ? "Afternoon" : "Night");
              return(
                <div className="shiftItem" key={index} style={{
                  top: 30*Number(startChartBlock) + 11,
                  height: (30*Number(endChartBlock) - 30*Number(startChartBlock))
                }}>{shiftTime} Shift<br/>{item.date}<br/>{item.start+"-"+item.end}</div>
              )
            })
            :
            null
          }
        </div>
      </div>
    );
  }
}

export default ShiftChart;