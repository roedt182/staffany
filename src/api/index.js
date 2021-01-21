import React from 'react';
import { store } from '../redux/store';
import {setActivity, setInProgress} from "../redux/actions";

class ApiService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  open = ({method, params}) => {
    console.log("METHOD", method);
    console.log("PARAMS", params);
    store.dispatch(setInProgress(true));
    let session_id = "";
    if(method !== "login"){
      session_id = store.getState().loginData ? store.getState().loginData.session_id : null;
    }
    if(method !== "deleteSession"){
      const dateTime = new Date().getTime();
      store.dispatch(setActivity(dateTime));
    }
    const serverURLPost = 'https://yesiintasari.com/reactjs/api/StaffAny-postAPI.php';
    const serverURLGet = 'https://yesiintasari.com/reactjs/api/StaffAny-getAPI.php';
    const successCallback = (result, resolve, reject) => {
      store.dispatch(setInProgress(false));
      console.log("SUKSES", result);
      resolve(result);
    }
    const errorCallback = (error, reject) => {
      store.dispatch(setInProgress(false));
      console.log("ERROR", error);
      reject(error);
    }
    return new Promise((resolve, reject) => {
      let fetchURL = '';
      switch(method){
        case "login":
          fetchURL = serverURLPost;
          break;
        case "getShift":
          fetchURL = serverURLGet + '?method=getShift&session_id='+session_id;
          break;
        case "getShiftDetail":
          fetchURL = serverURLGet + '?method=getShiftDetail&session_id='+session_id+'&id_shift='+params.id_shift;
          break;
        case "getShiftOfDay":
          fetchURL = serverURLGet + '?method=getShiftOfDay&session_id='+session_id+'&date='+params.date;
          break;
        case "getStaff":
          fetchURL = serverURLGet + '?method=getStaff&session_id='+session_id;
          break;
        case "addShift":
          fetchURL = serverURLPost;
          break;
        case "deleteShift":
          fetchURL = serverURLPost;
          break;
        case "publishShift":
          fetchURL = serverURLPost;
          break;
        case "editShift":
          fetchURL = serverURLPost;
          break;
        default:
          fetchURL = serverURLGet;
      }
      
      if(method === "login" || method === "addShift" || method === "editShift" || method === "deleteShift" || method === "publishShift"){
        fetch(fetchURL, { 
            method: "POST",
            body: JSON.stringify({ 
              method: method,
              username: params.username, 
              password: params.password,
              date:params.date,
              start:params.start,
              end:params.end,
              id_staff:params.id_staff,
              session_id:session_id,
              id_shift: params.id_shift,
            }),
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        })
        .then((response) => response.json())
        .then(
          (result) => successCallback(result, resolve, reject),
          (error) => errorCallback(error, reject)
        )
        .catch(error => {
          reject(error);
        })
      } else {
        fetch(fetchURL)
        .then((response) => response.json())
        .then(
          (result) => successCallback(result, resolve, reject),
          (error) => errorCallback(error, reject)
        )
        .catch(error => {
          reject(error);
        })
      }
    })
  }
}

export default new ApiService();
