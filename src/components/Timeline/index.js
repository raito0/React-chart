import * as React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import 'moment-timezone';
import moment from 'moment';
import RealTimeClock from './Realtimeclock';

const hourArray = [{"id":0,"name":"01"},{"id":1,"name":"02"},{"id":2,"name":"03"},{"id":3,"name":"04"},{"id":4,"name":"05"},{"id":5,"name":"06"},{"id":6,"name":"07"},{"id":7,"name":"08"},{"id":8,"name":"09"},{"id":9,"name":"10"},{"id":10,"name":"11"},{"id":11,"name":"12"},{"id":12,"name":"13"},{"id":13,"name":"14"},{"id":14,"name":"15"},{"id":15,"name":"16"},{"id":16,"name":"17"},{"id":17,"name":"18"},{"id":18,"name":"19"},{"id":19,"name":"20"},{"id":20,"name":"21"},{"id":21,"name":"22"},{"id":22,"name":"23"}, {"id":23,"name":"24"}];

class Timeline extends React.Component {
	constructor(props) {
		super(props);
	    this.state = {
			hourNow: moment().utc().format('H'),
			leftPosTimeDot: 4 * moment().utc().get('hour') + 4 + moment().utc().get('minute')/15
		};
		this.isNow = this.isNow.bind(this);
	}

	isNow(hour){
		return !(parseInt(this.state.hourNow) - parseInt(hour)) ? 'isNow' : 'notNow';
	}

	render(){
        return (
            <div className="right-div timeline-div col-lg-12 col-md-12">
                <Tabs defaultActiveKey={this.state.hourNow} id="timeline-bar">
					<Tab className="" title="UTC">
                    </Tab>
                    { hourArray.map(
                    	(timeItem, idx) => {
                    		return <Tab className={this.isNow(timeItem.id)} eventKey = {timeItem.id} title={timeItem.name} key={idx}>
                    					{/* <RealTimeClock pointTime={timeItem.id} /> */}
                    			   </Tab>
                    	}
                    )}
                </Tabs> 
				<div className="RealTimeDot" style={{left: this.state.leftPosTimeDot + "%"}}></div>
				<RealTimeClock pointTime={this.state.hourNow} /> 
            </div>
        );
    }
}
export default Timeline;