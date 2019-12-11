import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './components/Profile';
import Product from './components/Products';
import Blog from './components/Blog';
import Userhomebox from './components/Userhomebox';
import { Button, Tabs, Tab, Modal } from 'react-bootstrap';
import Timeline from './components/Timeline';
import SearchResult from './components/SearchResult';
import { connect } from 'react-redux';
import { userRequest } from './actions/home.action';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            show: false,
            tabLogin: '',
        };
    }
    componentDidMount() {
        const cookies = document.cookie.split(";");
        var accessToken = cookies.filter(item => item.startsWith(' access_token=') || item.startsWith('access_token='));
        if (accessToken.length !== 0) {
            const valueToken = accessToken.toString().split("[")[1].split("]")[0];
            this.props.requestUserApi(valueToken);
        }
    }
    handleShow = () => {
        this.setState({ show: true })
    }
    handleClose = () => {
        this.setState({ show: false })
    }
    tabLogin = () => {
        this.setState({ tabLogin: 'login' })
    }
    tabRegister = () => {
        this.setState({ tabLogin: 'register' })
    }
    requestApi = () => {
        const cookies = document.cookie.split(";");
        var accessToken = cookies.filter(item => item.startsWith(' access_token=') || item.startsWith('access_token='));
        if (accessToken.length !== 0) {
            const valueToken = accessToken.toString().split("[")[1].split("]")[0];
            this.props.requestUserApi(valueToken);
        }
    }
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="widgetbar-tabs"></div>
                    <div className="home-container">
                        <div className="header-bar-1">
                            <div className="logo-slogan col-lg-5 col-md-5">
                                <h1>Cryptocurrency Market</h1>
                                <h2 className="slogan">Market Data To Help Investors Decide When To BUY, SELL, HOLD Or STAYOUT!</h2>
                                <div className={this.props.displayName || this.props.loggingIn ? '' : 'login-block'}>
                                    <Userhomebox displayName={this.props.displayName} />
                                </div>
                                <div>
                                    <Link to="/"><Button className="Button-Home home-button home-button-active" size="lg" variant="outline-secondary">Home</Button></Link>
                                    <Link to="/product"><Button className="Button-Product home-button" size="lg" variant="outline-secondary">Products</Button></Link>
                                    <Link to="/blog"><Button className="Button-Blog home-button" size="lg" variant="outline-secondary">Blog</Button></Link>
                                    <Button className={!this.props.displayName ? 'Button-Login home-button' : 'login-block'} style={{ marginRight: "0px" }} size="lg" variant="outline-secondary" onClick={() => {
                                        this.handleShow();
                                        this.tabLogin();
                                    }}>Login</Button><span className={!this.props.displayName ? '' : 'login-block'}>/</span>
                                    <Button className={!this.props.displayName ? 'Button-Register  home-button' : 'login-block'} style={{ marginLeft: "0px" }} size="lg" variant="outline-secondary" onClick={() => {
                                        this.handleShow();
                                        this.tabRegister();
                                    }}>Signup</Button>
                                    <Modal className="LoginDialog" show={this.state.show} onHide={this.handleClose}>
                                        <Modal.Header>
                                            <Modal.Title>
                                                <Tabs defaultActiveKey={this.state.tabLogin} id="uncontrolled-tab-example">
                                                    <Tab eventKey="login" title="Login">
                                                        <Login handleClose={this.handleClose} requestApi={this.requestApi} />
                                                    </Tab>
                                                    <Tab eventKey="register" title="Sign up">
                                                        <Register />
                                                    </Tab>
                                                </Tabs>
                                            </Modal.Title>
                                        </Modal.Header>
                                    </Modal>
                                </div>
                                <div><SearchResult /></div>
                            </div>

                            <div className="search-column col-lg-7 col-md-7">
                                <Timeline />
                            </div>
                        </div>
                        <Route path="/profile" component={() => {
                            return (
                                <Profile />
                            );
                        }}></Route>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/product" component={Product} />
                            <Route path="/blog" component={Blog} />
                        </Switch>
                    </div>
                    <div className="widgetbar-footer">
                        <div className="copyright">© 2013 - 2019 Cryptocurrency Market, LLC</div>
                        <div>
                            <Button className="Button-Home home-button home-button-active" size="lg" variant="outline-secondary">Home</Button>
                            <Button className="Button-Product home-button" size="lg" variant="outline-secondary">Products</Button>
                            <Button className="Button-Blog home-button" size="lg" variant="outline-secondary">Blog</Button>
                            <Button className={!this.props.displayName ? 'Button-Login home-button' : 'login-block'} style={{ marginRight: "0px" }} size="lg" variant="outline-secondary" onClick={() => {
                                this.handleShow();
                                this.tabLogin();
                            }}>Login</Button><span>/</span>
                            <Button className={!this.props.displayName ? 'Button-Register  home-button' : 'login-block'} style={{ marginLeft: "0px" }} size="lg" variant="outline-secondary" onClick={() => {
                                this.handleShow();
                                this.tabRegister();
                            }}>Signup</Button>
                            <Button className="Button-Blog home-button" size="lg" variant="outline-secondary">FAQ</Button>
                            <Button className="Button-Blog home-button" size="lg" variant="outline-secondary">Privacy Policy</Button>
                            <Button className="Button-Blog home-button" size="lg" variant="outline-secondary">Terms Of services</Button>
                            <Modal className="LoginDialog" show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        <Tabs defaultActiveKey={this.state.tabLogin} id="uncontrolled-tab-example">
                                            <Tab eventKey="login" title="Login">
                                                <Login handleClose={this.handleClose} requestApi={this.requestApi} />
                                            </Tab>
                                            <Tab eventKey="register" title="Sign up">
                                                <Register />
                                            </Tab>
                                        </Tabs>
                                    </Modal.Title>
                                </Modal.Header>
                            </Modal>
                        </div>
                        <div><SearchResult /></div>
                    </div>
                </div>
            </Router>
        );
    }
};

const mapStateToProps = (state) => {
    var checkUndefined = state.homeAfterLogin && state.homeAfterLogin.response && state.homeAfterLogin.response.wpKMemberDto;
    return {
        loggingIn: state.login && state.login.loggingIn,
        displayName: checkUndefined && checkUndefined.identifier,
    }
};
function mapDispatchToProps(dispatch, ownProps) {
    return {
        requestUserApi: (repos) => dispatch(userRequest(repos)),
    }
}
const connectedPage = connect(mapStateToProps, mapDispatchToProps)(App);
export default connectedPage;
