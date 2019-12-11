import * as React from 'react';
import '../index.scss';
import '../styles/home.scss';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import Top30Tokens from '../components/Top30Tokens';
import IndexesDetails from '../components/IndexesDetails';
import produce from 'immer';
//Luong component
import { Tabs, Tab } from 'react-bootstrap';
//Luong component :: end
import Datafeed from '../constants/api/index';
import DatafeedTV from '../constants/apiTV/index';
import { tableRequest, tableRequest1, tableRequest2, tableRequest3, tableRequestUser } from '../actions/component.action';
import { chartRequestTV, chartRequestToken } from '../actions/chart.action';
import { animateScroll as scroller } from 'react-scroll';
import {
    userBox2Request,
    userBox2RequestTable,
    box3RequestChangeFlag,
    box3RequestDelChangeFlag,
    userRequestBox1,
    saveBox1,
    requestDelUserBox1,
    requestChangeFlagDelBox1
} from '../actions/home.action'
function getLanguageFromURL() {
    const regex = new RegExp('[\\?&]lang=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token_id: 1,
            token_idTV: 0,
            flagSwitchTable: false,
            flagShowTable3: false,
            flagShowUserBox2: false,
            dataBox3: {},
            products: [],
            portfolio: "",
            portfolioId: 0,
        };
    }
    componentDidMount() {
        this.props.tableRequestApi();
        this.handleChart();
        this.handleChartTV();
        this.props.chartRequestApiTV();
        const cookies = document.cookie.split(";");
        var accessToken = cookies.filter(item => item.startsWith(' access_token=') || item.startsWith('access_token='));
        const valueToken = accessToken.toString().split("[")[1] && accessToken.toString().split("[")[1].split("]")[0];
        this.props.userRequestBox1({ valueToken });
        setInterval(() => {
            this.props.chartRequestApiTV({ portfolio: this.props.box1Reducer });
            this.props.tableRequestUser({ valueToken, portfolio: this.props.getPorforlioId });
        }, 600000)
    }
    componentDidUpdate(preProps, preState) {
        const cookies = document.cookie.split(";");
        var accessToken = cookies.filter(item => item.startsWith(' access_token=') || item.startsWith('access_token='));
        const valueToken = accessToken.toString().split("[")[1] && accessToken.toString().split("[")[1].split("]")[0];
        if (this.state.token_id !== preState.token_id && this.state.token_id !== "-1") {
            this.handleChart();
        }
        if (this.props.displayName && preProps.displayName !== this.props.displayName) {
            this.props.userRequestBox1({ valueToken });
        }
        if (this.state.token_idTV !== preState.token_idTV) {
            document.cookie = `token_idTV=[${this.state.token_idTV}]`;
            this.handleChartTV(this.props.getPorforlioId);
        }
        if (preProps.getPorforlioId !== this.props.getPorforlioId) {
            this.handleChartTV(this.props.getPorforlioId)
            this.setState({ products: [], portfolioId: this.props.getPorforlioId });
            this.props.userBox2RequestTable({ valueToken, portfolio: this.props.getPorforlioId });
            this.props.tableRequestUser({ valueToken, portfolio: this.props.getPorforlioId });

        }
        if (this.state.dataBox3 !== preState.dataBox3 && Array.isArray(this.props.paramUserTable2)) {
            var paramUserId = this.props.paramUserTable2.filter(item => {
                let x;
                if (this.state.dataBox3.paramTable && this.state.dataBox3.paramTable.id !== undefined) {
                    x = this.state.dataBox3.paramTable && this.state.dataBox3.paramTable.id;
                }
                return item.tokenId === x
            });
            this.setState(state => ({ products: [...paramUserId, ...state.products] }))
        }
        if (preProps.paramTable2 !== this.props.paramTable2) {
            this.props.chartRequestApiToken(this.props.paramTable2.map(item => item.token_id))
        }

        if (this.props.box3DelReducer || this.props.box3Reducer) {
            this.handleChartTV(this.props.getPorforlioId);
            this.handleChart();
            this.props.box3RequestChangeFlag();
            this.props.box3RequestDelChangeFlag();
            if (accessToken.length !== 0) {
                this.props.tableRequestUser({ valueToken, portfolio: this.props.getPorforlioId });
                this.props.chartRequestApiTV({ portfolio: this.props.box1Reducer });
            }
        }
        if (this.props.displayName && preProps.displayName !== this.props.displayName) {
            // this.props.userRequestBox1({ valueToken, portfolio });
        }
        if (this.props.saveBox1Reducer) {
            this.props.userRequestBox1({ valueToken, portfolio: this.props.getPorforlioId });
            this.props.requestChangeFlagDelBox1()
        }
        if (preProps.box1Reducer !== this.props.box1Reducer) {
            this.props.chartRequestApiTV({ portfolio: this.props.box1Reducer });
        }
        if (this.state.dataBox3 !== preState.dataBox3 && Object.keys(this.state.dataBox3).length !== 0) {
            this.handleAddEvent();
        }
    }

    handleAddEvent = () => {
        var product = {
            id: -1,
            date: new Date(),
            action: "",
            quantity: 0,
            unitCost: 0,
            totalCostBasis: 0,
            location: "",
            blockExplorerLink: "",
            comments: "",
            tokenId: this.state.dataBox3.paramTable && this.state.dataBox3.paramTable.id,
        }
        this.setState((state) => ({
            ...state,
            products: [
                ...state.products,
                product,
            ]
        }));
    }
    handleRowDel = (product) => () => {
        var index = this.state.products.indexOf(product);
        this.setState(produce(
            (state) => {
                state.products.splice(index, 1)
            }
        ));
    }
    handleChange = (idx) => (event) => {
        const { name, value } = event.target;
        this.setState(produce(
            (state) => {
                state.products[idx] = {
                    ...state.products[idx],
                    [name]: value,
                }
            },
        ));
    }
    handleChangeDate = (idx) => (date) => {
        this.setState(produce(
            (state) => {
                state.products[idx] = {
                    ...state.products[idx],
                    date,
                }
            },
        ))
    }
    getDataTable2 = (data) => {
        this.setState((state) => ({
            ...state,
            products: [
                ...state.products,
                ...data,
            ]
        }));
    }

    switchRow0 = () => {
        this.props.tableRequestApi();
        this.setState({ flagShowTable3: false, flagShowUserBox2: false });
    }
    switchRow1 = () => {
        this.props.tableRequestApi1();
        this.setState({ flagShowTable3: false, flagShowUserBox2: false });
    }
    switchRow2 = () => {
        this.props.tableRequestApi2();
        this.setState({ flagShowTable3: false, flagShowUserBox2: false });
    }
    switchRow3 = () => {
        this.props.tableRequestApi3();
        this.setState({ flagShowTable3: false, flagShowUserBox2: false });
    }
    switchUserBox2 = (portfolio) => {
        this.setState({ flagShowUserBox2: true, portfolio: portfolio, flagSwitchTable: true, flagShowTable3: false });
        const cookies = document.cookie.split(";");
        var accessToken = cookies.filter(item => item.startsWith(' access_token=') || item.startsWith('access_token='));
        if (accessToken.length !== 0) {
            const valueToken = accessToken.toString().split("[")[1].split("]")[0];
            this.props.userBox2Request(valueToken);
            if (portfolio !== "") {
                this.props.userRequestBox1({ valueToken, portfolio });
                document.cookie = `index-row=[${portfolio}]`;
            }
        }
    }
    handleShowTableHidden = (idx, paramTable) => () => {
        this.setState({ flagShowTable3: true })
        this.setState(
            (state) => ({
                dataBox3: {
                    idx: idx + 1,
                    paramTable
                }
            })
        );
    }
    handleShowTable = () => {
        this.setState({ flagSwitchTable: true })
    }
    handleHiddenTable = () => {
        this.setState({ flagSwitchTable: false })
    }
    handleTableHidden = (event) => {
        const cookies = document.cookie.split(";");
        var accessToken = cookies.filter(item => item.startsWith(' access_token=') || item.startsWith('access_token='));
        const valueToken = accessToken.toString().split("[")[1].split("]")[0];
        this.setState({ flagShowTable3: false, dataBox3: {}, products: [] });
        this.props.userBox2RequestTable({ valueToken, portfolio: this.state.portfolioId })
    }
    handleClickToken = (token_id) => {
        this.setState({ token_id: token_id });
    }
    handleClickTokenTV = (token_id) => {
        this.setState({ token_idTV: token_id });
    }
    handleChart = () => {
        const widgetOptions = {
            debug: false,
            symbol: 'Coinbase:BTC/USD' + ':' + this.state.token_id,
            datafeed: Datafeed,
            interval: this.props.interval,
            container_id: this.props.containerId,
            library_path: this.props.libraryPath,
            locale: getLanguageFromURL() || 'en',
            disabled_features: ['use_localstorage_for_settings'],
            enabled_features: ['study_templates'],
            charts_storage_url: this.props.chartsStorageUrl,
            charts_storage_api_version: this.props.chartsStorageApiVersion,
            client_id: this.props.clientId,
            user_id: this.props.userId,
            fullscreen: this.props.fullscreen,
            autosize: this.props.autosize,
            studies_overrides: this.props.studiesOverrides,
            overrides: {
                // "mainSeriesProperties.showCountdown": true,
                "paneProperties.background": "#FFFFFF",
                "paneProperties.vertGridProperties.color": "#363c4e",
                "paneProperties.horzGridProperties.color": "#363c4e",
                "symbolWatermarkProperties.transparency": 90,
                "scalesProperties.textColor": "#AAA",
                "mainSeriesProperties.candleStyle.wickUpColor": '#336854',
                "mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
            }
        };

        Datafeed.onReady(() => {
            window.tvWidget = new window.TradingView.widget(widgetOptions);
        });
    }
    handleChartTV = (id) => {
        if (id === undefined) {
            const widgetOption = {
                debug: false,
                symbol: this.props.symbol + ":" + this.state.token_idTV,
                datafeed: DatafeedTV,
                interval: this.props.interval,
                container_id: this.props.containerIdTV,
                library_path: this.props.libraryPath,
                locale: getLanguageFromURL() || 'en',
                disabled_features: ['use_localstorage_for_settings'],
                enabled_features: ['study_templates'],
                charts_storage_url: this.props.chartsStorageUrl,
                charts_storage_api_version: this.props.chartsStorageApiVersion,
                client_id: this.props.clientId,
                user_id: this.props.userId,
                fullscreen: this.props.fullscreen,
                autosize: this.props.autosize,
                overrides: {
                    // "mainSeriesProperties.showCountdown": true,
                    "paneProperties.background": "#FFFFFF",
                    "paneProperties.vertGridProperties.color": "#363c4e",
                    "paneProperties.horzGridProperties.color": "#363c4e",
                    "symbolWatermarkProperties.transparency": 90,
                    "scalesProperties.textColor": "#AAA",
                    "mainSeriesProperties.candleStyle.wickUpColor": '#336854',
                    "mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
                },
                studies_overrides: {
                    "compare.plot.color": "#000000",
                    "compare.source": "high"
                },
            };

            DatafeedTV.onReady(() => {
                window.tvWidget = new window.TradingView.widget(widgetOption);
            });
        } else {
            const widgetOption = {
                debug: false,
                symbol: this.props.symbol + ":" + this.state.token_idTV + ":" + id,
                datafeed: DatafeedTV,
                interval: this.props.interval,
                container_id: this.props.containerIdTV,
                library_path: this.props.libraryPath,
                locale: getLanguageFromURL() || 'en',
                disabled_features: ['use_localstorage_for_settings'],
                enabled_features: ['study_templates'],
                charts_storage_url: this.props.chartsStorageUrl,
                charts_storage_api_version: this.props.chartsStorageApiVersion,
                client_id: this.props.clientId,
                user_id: this.props.userId,
                fullscreen: this.props.fullscreen,
                autosize: this.props.autosize,
                studies_overrides: this.props.studiesOverrides,
                overrides: {
                    // "mainSeriesProperties.showCountdown": true,
                    "paneProperties.background": "#FFFFFF",
                    "paneProperties.vertGridProperties.color": "#363c4e",
                    "paneProperties.horzGridProperties.color": "#363c4e",
                    "symbolWatermarkProperties.transparency": 90,
                    "scalesProperties.textColor": "#AAA",
                    "mainSeriesProperties.candleStyle.wickUpColor": '#336854',
                    "mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
                },
            };

            DatafeedTV.onReady(() => {
                window.tvWidget = new window.TradingView.widget(widgetOption);
            });
        }

    }
    render() {
        let lastPriceTV, lastPriceTV1, lastPriceTV2, lastPriceTV3;
        if (this.props.paramChartTV.length !== undefined) {
            lastPriceTV = this.props.paramChartTV.filter(item => item.portfolio_close > 0);
            lastPriceTV = lastPriceTV[lastPriceTV.length - 1].portfolio_close;
        }
        if (this.props.paramChartTV1.length !== undefined) {
            lastPriceTV1 = this.props.paramChartTV1.filter(item => item.portfolio_close > 0);
            lastPriceTV1 = lastPriceTV1[lastPriceTV1.length - 1].portfolio_close;
        }
        if (this.props.paramChartTV2.length !== undefined) {
            lastPriceTV2 = this.props.paramChartTV2.filter(item => item.close > 0);
            lastPriceTV2 = lastPriceTV2[lastPriceTV2.length - 1].close;
        }
        if (this.props.paramChartTV3.length !== undefined) {
            lastPriceTV3 = this.props.paramChartTV3.filter(item => item.close > 0);
            lastPriceTV3 = lastPriceTV3[lastPriceTV3.length - 1].close;
        }
        return (
            <div className="Home">
                <div className="container-fluid mookup-hub">
                    {
                        //Box1
                    }
                    <div className="top-30-token-wrapper">
                        <Top30Tokens
                            handleShowTable={this.handleShowTable}
                            handleHiddenTable={this.handleHiddenTable}
                            token_id={this.state.token_id}
                            token_idTV={this.state.token_idTV}
                            handleClickTokenTV={this.handleClickTokenTV}
                            lastPriceTV={lastPriceTV}
                            lastPriceTV1={lastPriceTV1}
                            lastPriceTV2={lastPriceTV2}
                            lastPriceTV3={lastPriceTV3}
                            paramChartUser={this.props.paramChartUser}
                            switchRow0={this.switchRow0}
                            switchRow1={this.switchRow1}
                            switchRow2={this.switchRow2}
                            switchRow3={this.switchRow3}
                            switchUserBox2={this.switchUserBox2}
                            displayName={this.props.displayName}
                            box1Reducer={this.props.box1Reducer}
                            saveBox1={this.props.saveBox1}
                            getPorforlioId={this.props.getPorforlioId}
                            displayName={this.props.displayName}
                            requestDelUserBox1={this.props.requestDelUserBox1} />
                    </div>
                    <div className="tv-chart-wrapper">
                        <div
                            id={this.props.containerIdTV}
                            className={'TVChartContainer d-inline-block'}
                        />
                    </div>
                </div>
                {
                    //Box2
                }
                <div className="container-fluid moockup-tab">
                    <Tabs lg={12} xl={12} md={12} defaultActiveKey={this.state.hourNow} id="Component-Tab">
                        <Tab className="components" eventKey="components" title="Components" >
                            <div className="show-grid container-fluid">
                                <div className="indexes-table-wrapper">
                                    <IndexesDetails
                                        token_id={this.state.token_id}
                                        handleClickToken={this.handleClickToken}
                                        handleShow={this.handleShow}
                                        handleClose={this.handleClose}
                                        handleChart={this.handleChart}
                                        paramTable2={this.props.paramTable2}
                                        flagSwitchTable={this.state.flagSwitchTable}
                                        flagShowTable3={this.state.flagShowTable3}
                                        flagShowUserBox2={this.state.flagShowUserBox2}
                                        handleShowTableHidden={this.handleShowTableHidden}
                                        handleTableHidden={this.handleTableHidden}
                                        dataBox3={this.state.dataBox3}
                                        paramChartToken={this.props.paramChartToken}
                                        paramUserTable2={this.props.paramUserTable2}
                                        responseBox2={this.props.responseBox2}
                                        getDataTable2={this.getDataTable2}
                                        handleChangeDate={this.handleChangeDate}
                                        handleChange={this.handleChange}
                                        handleAddEvent={this.handleAddEvent}
                                        handleRowDel={this.handleRowDel}
                                        products={this.state.products}
                                        dataUserBox2={this.props.dataUserBox2}
                                        portfolioId={this.state.portfolioId}
                                    />
                                </div>
                                <div className="tv-chart-wrapper">
                                    <div
                                        id={this.props.containerId}
                                        className={'TokenChartContainer d-inline-block'}
                                    />
                                </div>
                            </div>
                        </Tab>
                        {/* <Tab className="chatbox" eventKey = "chat" title="Chat Box" >
                                <h3>Noi dung here</h3>
                            </Tab>
                            <Tab className="Statistics" eventKey = "Statistics" title="Statistics" >
                                <h3>Noi dung Statistics here</h3>
                            </Tab>
                            <Tab className="LeaderBoard" eventKey = "LeaderBoard" title="Leader Board" >
                                <h3>Noi dung LeaderBoard here</h3>
                            </Tab>
                            <Tab className="Staking" eventKey = "Staking" title="Staking" >
                                <h3>Noi dung Staking here</h3>
                            </Tab>
                            <Tab className="Mining" eventKey = "Mining" title="Mining" >
                                <h3>Noi dung Mining here</h3>
                            </Tab>
                            <Tab className="Tutorials" eventKey = "Tutorials" title="Tutorials" >
                                <h3>Noi dung Tutorials here</h3>
                            </Tab>
                            <Tab className="Forum" eventKey = "Forum" title="Forum" >
                                <h3>Noi dung Forum here</h3>
                            </Tab>
                            <Tab className="Blog" eventKey = "Blog" title="Blog" >
                                <h3>Noi dung Blog here</h3>
                            </Tab>
                            <Tab className="Support" eventKey = "Support" title="Support" >
                                <h3>Noi dung Support Forum here</h3>
                            </Tab> */}
                    </Tabs>
                </div>
            </div>
        );
    }
}
Home.defaultProps = {
    symbol: 'AAPL',
    interval: '1440',
    containerId: 'token_chart_container',
    containerIdTV: 'tv_chart_container',
    libraryPath: '/charting_library/',
    chartsStorageUrl: 'https://saveload.tradingview.com',
    chartsStorageApiVersion: '1.1',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
}
Home.propTypes = {
    loggingIn: PropTypes.bool,
    displayName: PropTypes.string,
}
const mapStateToProps = (state) => {
    var checkUndefined = state.homeAfterLogin && state.homeAfterLogin.response && state.homeAfterLogin.response.wpKMemberDto;
    return {
        displayName: checkUndefined && checkUndefined.identifier,
        paramTable2: state && state.tableBox2 && state.tableBox2.response,
        paramChartTV: state && state.chartReducer && state.chartReducer.response,
        paramChartTV1: state && state.chartReducerTV1 && state.chartReducerTV1.response,
        paramChartTV2: state && state.chartReducerTV2 && state.chartReducerTV2.response,
        paramChartTV3: state && state.chartReducerTV3 && state.chartReducerTV3.response,
        paramChartUser: state && state.chartReducerUser && state.chartReducerUser.response,
        paramChartToken: state && state.chartReducerToken && state.chartReducerToken.response,
        paramUserTable2: state && state.userBox2Table && state.userBox2Table.response,
        responseBox2: state && state.userBox2Reducer && state.userBox2Reducer.response,
        dataUserBox2: state && state.dataUserBox2 && state.dataUserBox2.response,
        box3Reducer: state && state.box3Reducer && state.box3Reducer.register,
        box3DelReducer: state && state.box3DelReducer && state.box3DelReducer.delete,
        box1Reducer: state && state.box1Reducer && state.box1Reducer.response,
        getPorforlioId: state && state.getPorforlioId && state.getPorforlioId.response,
        saveBox1Reducer: state && state.saveBox1Reducer && state.saveBox1Reducer.register,
    }
};
function mapDispatchToProps(dispatch, ownProps) {
    return {
        tableRequestApi: () => dispatch(tableRequest()),
        tableRequestApi1: () => dispatch(tableRequest1()),
        tableRequestApi2: () => dispatch(tableRequest2()),
        tableRequestApi3: () => dispatch(tableRequest3()),
        chartRequestApiTV: (repos) => dispatch(chartRequestTV(repos)),
        chartRequestApiToken: (repos) => dispatch(chartRequestToken(repos)),
        userBox2Request: (repos) => dispatch(userBox2Request(repos)),
        userBox2RequestTable: (repos) => dispatch(userBox2RequestTable(repos)),
        tableRequestUser: (repos) => dispatch(tableRequestUser(repos)),
        box3RequestChangeFlag: () => dispatch(box3RequestChangeFlag()),
        box3RequestDelChangeFlag: () => dispatch(box3RequestDelChangeFlag()),
        userRequestBox1: (repos) => dispatch(userRequestBox1(repos)),
        saveBox1: (repos) => dispatch(saveBox1(repos)),
        requestDelUserBox1: (repos) => dispatch(requestDelUserBox1(repos)),
        requestChangeFlagDelBox1: () => dispatch(requestChangeFlagDelBox1()),
    }
}
const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(Home);
export default connectedHomePage;
