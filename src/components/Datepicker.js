import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
const DatePickerComponent = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [clicked, setClicked] = useState(false);
  const editDate = props.editDate ? props.editDate.split("-") : null;
  const editTime = props.editTime ? props.editTime.split(":") : ["00","00"];

  let editDateTime = null;

  if(editDate){
  	const newDate = new Date(editDate[0], editDate[1]-1, editDate[2], editTime[0], editTime[1]);
  	editDateTime = newDate.getTime();
  }

  useEffect(() => {props.dateChange(props.editDate && !clicked ? editDateTime : startDate);}, [props, startDate, clicked, editDateTime]);

  return (
  	props.isTime ?
    <DatePicker className="form-control" 
      selected={props.editDate && !clicked ? editDateTime : startDate} 
      onChange={date => {setStartDate(date);setClicked(true);}} 
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"/>
  	:
    <DatePicker className="form-control" selected={props.editDate && !clicked ? editDateTime : startDate} onChange={date => {setStartDate(date);setClicked(true);}} dateFormat="dd/MM/yyyy"/>
  );
};

export default DatePickerComponent;