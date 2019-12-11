import * as React from 'react';
import './style.css';
import { Table, Modal, Col } from 'react-bootstrap';

class PersonalToken extends React.Component{
    constructor(props){
        super(props)
        this.state={
            show: false
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleShow() {
        this.setState({ show: true })
    }  
    handleClose() {
        this.setState({ show: false })
    } 

    render(){
        return(
            <div className={"PersonalShow_" + this.state.show}>
                <h3>Hello</h3>    
            </div>
        );
    }
}

export default PersonalToken;