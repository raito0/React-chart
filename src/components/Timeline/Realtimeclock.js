import * as React from 'react';
import 'moment-timezone';
import moment from 'moment';

class RealTimeClock extends React.Component {
  constructor(props) {
    super(props);
    const timePoint = new moment().subtract(parseInt(this.props.pointTime) - parseInt(new moment().format('H')),'hour');
    this.state = {
      day: timePoint.utc().format('YYYY/MM/DD'),
      time: timePoint.format('hh:mm A'),
      america_losangeles: timePoint.tz('America/Los_Angeles').format('hh:mm A'),
      newyork: timePoint.tz('America/New_York').format('hh:mm A'), 
      tokyo: timePoint.tz('Asia/Tokyo').format('hh:mm A'),
      //tokyo: timePoint.utc().format('h:mm A'),
      sydney: timePoint.tz('Australia/Sydney').format('hh:mm A'),
      london: timePoint.tz("Europe/London").format('hh:mm A'),
      hour: timePoint.format('H'),
      minute: moment().get('minute'),
      realLeftPosStr: "50%"
    };
    
  }

    
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: moment().utc().format('hh:mm A'),
      hour: parseInt(new moment().utc().format('H')),
      realLeftPosStr: 4 * moment().utc().get('hour') + 4 + moment().utc().get('minute')/15 + "%"
    });
  }

  render() {
      // let leftPos = 0;
      // if(this.state.hour <=3){
      //   leftPos =0;
      // }else if(this.state.hour <= 21){
      //   leftPos = this.state.hour - 2;
      // }else{
      //   leftPos = 20.5;
      // }
      //var leftPosStr = 4 * leftPos + "%";//leftPosTimeDot: 4 * moment().get('hour') + 4 + moment().get('minute')/15
      // var leftPosStr = 4 * moment().get('hour') + 4 + moment().get('minute')/15 + "%";

      const divAbsoluteLeft = {
        position: "absolute",
        left: "calc(" + this.state.realLeftPosStr + " - 100px)",
        background: "#87d687",
        color: "white",
        padding: "5px 10px",
        textAlign: "left",
        top: "10px",
        opacity: "1",
        width: "200px",
        "line-height": "20px",
        "font-size": "13px",
        "font-family": "sans-serif"
      };

      if(this.state.hour > 5){
        return (  
        <div className='App-clock'>
          <div className="hereDiv hereDiv-Left" style={{"display":"none"}}>{this.state.day}</div>
          <div className="otherDiv" style={divAbsoluteLeft}>
            {this.state.time} = UTC &nbsp; {this.state.day}<br />
            {this.state.newyork} = New York<br />
            {this.state.london} = London<br />            
            {this.state.tokyo} = Tokyo
          </div>
        </div> 
        );
      }else{
        return (  
        <div className='App-clock'>
          <div className="hereDiv hereDiv-Right"  style={{"display":"none"}}>{this.state.day}</div>
          <div className="otherDiv" style={divAbsoluteLeft}> 
            {this.state.time} = UTC &nbsp; {this.state.day}<br />
            {this.state.newyork} = New York<br />
            {this.state.london} = London<br />
            {this.state.tokyo} = Tokyo
          </div>
        </div>
        );
      }
  }
} 

export default RealTimeClock;