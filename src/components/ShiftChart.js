import React from 'react';

class ShiftChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startChartBlock:0,
      endChartBlock:0,
      shiftTime: "",
      timeline:["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","24:00"]
    };
  }

  componentDidMount(){
    this.renderChart();
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.data !== prevProps.data){
      this.renderChart();
    }
  }

  renderChart(){
    let shiftData = this.props.data;
    let startChartArray = shiftData && shiftData.start ? shiftData.start.split(":") : [];
    let startChartMinute = startChartArray.length > 0 ? Math.floor(startChartArray[1]/60*100) : 0;
    let startChartHour = startChartArray.length > 0 ? startChartArray[0] : 0;
    let startChartBlock = startChartHour+"."+startChartMinute;

    let endChartArray = shiftData && shiftData.end ? shiftData.end.split(":") : [];
    let endChartMinute = endChartArray.length > 0 ? Math.floor(endChartArray[1]/60*100) : 0;
    let endChartHour = endChartArray.length > 0 ? endChartArray[0] : 0;
    let endChartBlock = endChartHour+"."+endChartMinute;

    this.setState({
      startChartBlock: startChartBlock,
      endChartBlock: endChartBlock,
      shiftTime: startChartHour < 8 ? "Morning" : (startChartHour < 16 ? "Afternoon" : "Night")
    });
  }

  render(){
    const { data } = this.props;
    return (
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
          data ? 
          <div style={{
            position: 'absolute',
            top: 30*Number(this.state.startChartBlock) + 11,
            left: 100,
            width: 150,
            background: '#f00',
            height: (30*Number(this.state.endChartBlock) - 30*Number(this.state.startChartBlock)),
            padding: 10,
            color: '#fff'
          }}>{this.state.shiftTime} Shift<br/>{data.date}<br/>{data.start+"-"+data.end}</div>
          :
          null
        }
      </div>
    );
  }
}

export default ShiftChart;