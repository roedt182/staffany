import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
  }

  render(){
    return (
      <div className={this.props.display ? "loader" : "loader-hide"}>
        <Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
        />
      </div>
    );
  }
}

export default Popup;