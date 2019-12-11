import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import './style.scss';
class ProfileSetting extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            selectedFile: null,
        };
        this.onChangeFile=this.onChangeFile.bind(this);
    }
    onChangeFile(event) {
        this.setState({ selectedFile: event.target.files[0] })
    }
    render() {
        return(
            <div className='ProfileSetting'>
                <Container>
                    <Row>
                        <Col>
                            <form>
                                <h5>PUBLIC INFO</h5>
                                <p>This information will be publicly displayed and visible for all users.</p>
                                <fieldset className="tv-control-fieldset">
                                    <label class="fieldset-label">Username</label>
                                    <input type="text" />
                                </fieldset>
                                <fieldset className="tv-control-fieldset">
                                    <label class="fieldset-label">Avatar</label>
                                    <input type="file" onChange={this.onChangeFile}/>
                                </fieldset>
                            </form>
                        </Col>
                        <Col md={{ span: 0, offset: 0 }}>
                            sadf
                        </Col>
                    </Row>
                </Container>
                
            </div>
        );
    }
}

export default ProfileSetting;