import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import '../../index.scss';
import PropTypes from "prop-types";
export default function Profile(props) {
    return (
        <div className='Profile'>
            <Row className="show-grid container-fluid">
                <Col xs={12} md={12} lg={6}>
                    <Image className="avatar" src="https://www.w3schools.com/images/picture.jpg" rounded />
                </Col>
                <Col xs={12} md={12} lg={6}>
                    <div className="displayName">{props.displayName}</div>
                </Col>
            </Row>
        </div>
    );
};

Profile.propTypes = {
    displayName: PropTypes.string
}