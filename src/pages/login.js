import React from 'react';
import { loginRequest } from '../actions/login.action';
import { connect } from 'react-redux';
import '../styles/login.scss';
import ReCAPTCHA from "react-google-recaptcha";
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            submitted: false,
            flagLogin: false,
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }
    handleChangeName(e) {
        this.setState({ username: e.target.value });
    }
    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password && this.state.flagLogin) {
            const repos = { username, password }
            this.props.loginRequest(repos);
        }
    }
    renderError = () => {
        return (
            <div className="help-block">Username and password incorrect</div>
        )
    }
    onChange=(value)=> {
        if(value) {
            this.setState({ flagLogin: true });
        }
    }
   
    render() {
        const { username, password, submitted } = this.state;
        return (
            <div className='Login'>
                <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
                    {this.props.error && this.renderError()}
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <label htmlFor="username" className="hidden">Username</label>
                            <input type="text" placeholder="Username or Email" className="form-control" name="username" value={username} onChange={this.handleChangeName} />
                            {submitted && !username &&
                                <div className="help-block" style={{ color: 'red' }}>Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password" className="hidden">Password</label>
                            <input type="password" placeholder="Password" className="form-control" name="password" value={password} onChange={this.handleChangePassword} />
                            {submitted && !password &&
                                <div className="help-block" style={{ color: 'red' }}>Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <ReCAPTCHA
                                // ref={(el) => {this.captchaDemo = el;}}
                                size="normal"
                                data-theme="dark"            
                                render="explicit"
                                sitekey="6LdD9rQUAAAAAERknSe0mtuDMaXi8v0lTOQn8emx"
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary login-button" size="lg">Login</button>
                            {this.props.loggingIn &&
                                <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            {this.props.loggingIn && (this.props.requestApi() || this.props.handleClose())}
                            
                        </div>
                    </form>
                </div>
                
            </div>
        );
    }
}
const mapStateToProps = state => ({
    loggingIn: state.login && state.login.loggingIn,
    error: state.login && state.login.error
});
function mapDispatchToProps(dispatch, ownProps) {
    return {
        loginRequest: (repos) => dispatch(loginRequest(repos))
    }
}
const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(Login);
export default connectedLoginPage;