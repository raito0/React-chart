import React from 'react';
import { registerRequest } from '../actions/login.action';
import { connect } from 'react-redux';
import '../styles/register.scss';
import ReCAPTCHA from "react-google-recaptcha";
class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: '',
                gender: '',
                mobile: '',
                username: '',
                password: '',
                firstname: '',
                lastname: '',
            },
            submitted: false,
            flagRegister: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.email && user.gender && user.username && user.password && this.state.flagRegister) {
            this.props.registerRequest(user);
        }
    }
    handleChangeGender = e => {
        // this.state.user.gender = e.target.value;
        const {value}=e.target;
        this.setState(state=>{
            state.user ={
                ...state.user,
                gender: value,
            }
        });
    };
    renderRegisterExist() {
        return (
            <div style={{color: 'red'}} >Account exist</div>
        )
    }
    onChange=(value)=> {
        if(value) {
            this.setState({ flagRegister: true });
        }
    }
    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return(
            <div className="col-lg-12 col-md-12 Register">
                {this.props.errored ? this.renderRegisterExist() : ''}
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstname ? ' has-error' : '')}>
                        <label htmlFor="firstname">Firstname</label>
                        <input placeholder="first name" type="text" className="form-control" name="firstname" value={user.firstname} onChange={this.handleChange} />
                    </div>
                    <div className={'form-group' + (submitted && !user.lastname ? ' has-error' : '')}>
                        <label htmlFor="lastname">Lastname</label>
                        <input placeholder="last name" type="text" className="form-control" name="lastname" value={user.lastname} onChange={this.handleChange} />
                    </div>
                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input placeholder="email" type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                        {submitted && !user.email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.gender ? ' has-error' : '')}>
                        <label htmlFor="gender">Gender</label>
                        <select placeholder="gender" onChange={this.handleChangeGender.bind(this)} className="form-control">
                            <option>Select...</option>
                            <option value="FEMALE">Female</option>
                            <option value="MALE">Male</option>
                        </select>
                        {submitted && !user.gender &&
                            <div className="help-block">Gender is required</div>
                        }
                    </div>
                    {/* <div className={'form-group' + (submitted && !user.mobile ? ' has-error' : '')}>
                        <label htmlFor="mobile">Mobile</label>
                        <input placeholder="mobile" type="text" className="form-control" name="mobile" value={user.mobile} onChange={this.handleChange} />
                        {submitted && !user.mobile &&
                            <div className="help-block">Mobile is required</div>
                        }
                    </div> */}
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input placeholder="username" type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input placeholder="password" type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
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
                        <button className="btn btn-primary register-button">Register</button>
                        {registering && 
                            <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        {registering && window.location.assign("/") }
                    </div>
                    
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    registering: state.register && state.register.registering,
    errored: state.register && state.register.error
})
function mapDispatchToProps(dispatch, ownProps) {
    return {
        registerRequest: (repos) => dispatch(registerRequest(repos))
    }
}
const connectedRegisterPage = connect(mapStateToProps, mapDispatchToProps)(Register);
export default connectedRegisterPage;