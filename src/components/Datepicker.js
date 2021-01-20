import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
const DatePickerComponent = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {props.dateChange(startDate);}, [props, startDate]);
  return (
    <DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat="dd/MM/yyyy"/>
  );
};

export default DatePickerComponent;