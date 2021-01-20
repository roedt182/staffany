import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
const DatePickerComponent = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {props.dateChange(startDate);}, [props, startDate]);
  return (
  	props.isTime ?
    <DatePicker className="form-control" selected={startDate} onChange={date => setStartDate(date)} 
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"/>
  	:
    <DatePicker className="form-control" selected={startDate} onChange={date => setStartDate(date)} dateFormat="dd/MM/yyyy"/>
  );
};

export default DatePickerComponent;