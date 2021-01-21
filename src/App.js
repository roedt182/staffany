import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {connect} from "react-redux";
import {setLoginData, setLoginStatus} from "./redux/actions";
import ApiService from "./api";
import logo from '../src/assets/logo.png';

import Dashboard from "./screens/dashboard";
import Popup from './components/Popup';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      isLogin: false,
    };
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }

  usernameChange(event) {
    this.setState({username: event.target.value});
  }

  passwordChange(event) {
    this.setState({password: event.target.value});
  }

  componentDidMount(){
  }

  componentDidUpdate(){
  }

  handleClickButton(e){
    this.setState({
      inProgress: true
    });
    e.preventDefault();
    this.submitKeyword();
  }

  resetForm(){
    this.setState({
      username: "",
      password: "",
      isError: false,
      error_message: ""
    });
  }

  submitKeyword(){
    if(!this.state.username || !this.state.password){
      this.setState({
        isError: true,
        error_message: "Please fill your username and password.",
        inProgress: false
      });
      return;
    }
    const req={
      method:'login',
      params:{
        username: this.state.username,
        password: this.state.password
      }
    };
    const onSuccess=(response)=>{
      if(response.error_message){
        this.setState({
          isError:true,
          error_message: response.error_message,
          username:"",
          password:"",
          inProgress: false
        });
      } else {
        this.setState({
          isError:false,
          error_message: "",
          username:"",
          password:"",
          inProgress: false
        });
        this.props.dispatch(setLoginStatus(true));
        this.props.dispatch(
          setLoginData({
            id:response[0]['id'], 
            username:response[0]['username'], 
            email: response[0]['email'], 
            session_id: response[0]['session_id']}
          )
        );
      }
    }
    const onError=(error)=>{
      this.setState({
        isError:true,
        error_message: error.toString(),
        inProgress: false
      })
    }
    ApiService.open(req).then(onSuccess, onError);
  }

  logout = () => {
    this.props.dispatch(setLoginStatus(false));
    this.props.dispatch(setLoginData(null));
  }

  render(){
    return (
      this.props.loginStatus && this.props.loginData ?
      <Dashboard/>
      :
      <div className="login-screen">
        <div className="form-login">
          <div className="text-center logo-login mt-5">
            <img src={logo} alt="logo-staffany" width="180"/>
            <hr/>
            Take Home Test - Rudi Susanto
            <hr/>
          </div>
          <form className="m-3 p-2">
            {
              this.state.isError ? <div className="alert alert-danger">{this.state.error_message}</div> : null
            }
            <div className="form-group">
              <label>Username</label>
              <input type="text" name="username" className="form-control" autoComplete="off" value={this.state.username} onChange={this.usernameChange}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.passwordChange}/>
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-warning col-5" onClick={()=>this.resetForm()}>Reset</button>
              <button type="button" className="btn btn-primary col-5" onClick={(e)=>this.handleClickButton(e)}>Submit</button>
            </div>
          </form>
        </div>
        <Popup display={this.state.inProgress}/>
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

export default connect(mapStateToProps)(App);
