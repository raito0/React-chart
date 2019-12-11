import React from 'react';
import parse from 'html-react-parser';
import produce from 'immer';
import UserBox2 from './UserBox2';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import ProductRow from './ProductRow';
import { pointDotCenterAndFormat, numberFormat } from '../Tool/index.jsx';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import SVGIcon from "../SVGIcon";

export class IndexesDetails extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            top30: [],
            token_id: 1,
            userBox2: [],
            toFixedArray: {
                "%ofTot": 4,
                "24HRChg": 4,
                "30DAvgChg": 4,
                "Pos Value": 4,
                "24HRPosChg": 4,
                "30DAvgPosChg": 4,
                "Mli$In": 4
            },
            show: false,
            paramUserIdforwardBox3: null,
            tot: 0,
            last: 0,
            posValue: 0,
            PL: 0,
            percent: 0,
            flagColor: "black",
            totalPosValue: 0,
            totalPL: 0,
            totalPercent: 0
        };
        this.numFormart = this.numFormart.bind(this);
        this.pointCenterString = this.pointCenterString.bind(this);
    }

    componentDidUpdate(preProps, preState) {
        var arrayBox2 = [];
        Array.isArray(this.props.paramUserTable2) && this.props.paramUserTable2.filter(item => {
            if (arrayBox2.indexOf(item.tokenId) === -1) {
                arrayBox2.push(item.tokenId)
            }
            return arrayBox2
        });
        if (preState.userBox2 === this.state.userBox2) {
            if ((preState.userBox2[preState.userBox2.length - 1] && preState.userBox2[preState.userBox2.length - 1].id) !== -1) {
                var userBox2Content = arrayBox2.map(tokenId => (Array.isArray(this.props.responseBox2) && this.props.responseBox2.filter(item => item.id === tokenId))[0]);
                if (userBox2Content.length !== 0 && userBox2Content[0] !== undefined) {
                    userBox2Content = userBox2Content.map(item => {
                        const container = {};
                        container.id = item.id;
                        container.tokenName = item.tokenName;
                        return container;
                    })
                    this.setState(state => ({
                        userBox2: [
                            ...userBox2Content
                        ]
                    }))
                } else {
                    this.setState(state => ({
                        userBox2: []
                    }))
                }
            }
        }
        if (preState.userBox2 !== this.state.userBox2) {
            if (Array.isArray(this.props.paramUserTable2)) {
                
                var filterTotalCostBuy = this.props.paramUserTable2.filter(i => i.action === "buy").map(i => i.totalCostBasis);
                filterTotalCostBuy = filterTotalCostBuy.reduce((a, b) => a + b, 0);
                var filterTotalCostSell = this.props.paramUserTable2.filter(i => i.action === "sell").map(i => i.totalCostBasis);
                filterTotalCostSell = filterTotalCostSell.reduce((a, b) => a + b, 0);
                if(filterTotalCostBuy - filterTotalCostSell) {
                    this.setState({
                        totalPosValue: this.state.userBox2.filter(i => i.posValue).map(i => i.posValue).reduce((a, b) => a + b, 0),
                        totalPL: this.state.userBox2.filter(i => i.PL).map(i => i.PL).reduce((a, b) => a + b, 0),
                        totalPercent: ((this.state.userBox2.filter(i => i.PL).map(i => i.PL).reduce((a, b) => a + b, 0)) / (filterTotalCostBuy - filterTotalCostSell)) * 100
                    });
                }
                else {
                    this.setState({totalPosValue:0, totalPL: 0,totalPercent: 0})
                }
            }
        }
    }

    handleAddEventBox2 = (e) => {
        e.preventDefault();
        var id = -1;
        var userAddBox2 = {
            id: id,
            tokenName: "",
            tot: 0,
            last: 0
        };
        this.setState((state) => ({
            ...state,
            userBox2: [
                ...state.userBox2,
                userAddBox2,
            ]
        }));
    }
    numFormart(x, i) {
        return Number.parseFloat(x).toFixed(i);
    }

    pointCenterString(x) {
        var words = x.toString().split('.');
        let strArray = words.map((item, key) => ('<div class="col-lg-6">' + item + ((key === 0) ? '<b>.</b></div>' : '</div>')));
        return '<div class="centerDot">' + strArray[0] + strArray[1] + '</div>';
    }

    handleRowDelBox2 = (product) => () => {
        var index = this.state.userBox2.indexOf(product);
        this.setState(produce(
            (state) => {
                state.userBox2.splice(index, 1)
            }
        ));
    }

    handleRowDelBox2_1 = (product) => () => {
        confirmAlert({
            title: 'Confirm to delete',
            childrenElement: () => <div className="ConfirmDialogBody">Are you sure to delete token <b style={{ 'text-transform': 'capitalize' }}>{product.tokenName}</b> from your portfolio</div>,
            message: '',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        var index = this.state.userBox2.indexOf(product);
                        this.setState(produce(
                            (state) => {
                                state.userBox2.splice(index, 1)
                            }
                        ));
                    }
                },
                {
                    label: 'No',
                    onClick: () => null
                }
            ]
        })
    }


    getDataShowTable3 = (data) => {
        if (Array.isArray(this.props.responseBox2)) {
            const valueId = this.props.responseBox2.filter(item => item.tokenName === data.toLowerCase());
            if (valueId.length !== 0) {
                this.setState(produce(
                    (state) => {
                        state.userBox2.splice(-1, 1)
                    }
                ));
                this.setState(state => ({
                    userBox2: [
                        ...state.userBox2,
                        ...valueId
                    ]
                }))
            }
        }
    }
    getTotAndLast = (tot, last) => {
        this.setState({ tot, last });
    }
    getPosValueAndPL = (posValue, PL, percent) => {
        if (percent > 0) {
            this.setState({ percent: "+" + numberFormat(percent, 2) });
        } else if (percent < 0) {
            this.setState({ percent: numberFormat(percent, 2) })
        }
        this.setState({ posValue })
        if (PL > 0) {
            this.setState({ PL: "+" + numberFormat(PL, 4), flagColor: "blue" })
        } else if (PL < 0) {
            this.setState({ PL: numberFormat(PL, 4), flagColor: "red" })
        } else {
            this.setState({ PL: numberFormat(PL, 4), percent: numberFormat(0, 2), flagColor: "black" })
        }
    }
    getPosValueAndPLUserBox2 = (idx) => (posValue, PL) => {
        if (posValue !== 0 || PL !== 0) {
            this.setState(
                state => {
                    return state.userBox2[idx] = {
                        ...state.userBox2[idx],
                        posValue,
                        PL
                    }
                }
            )
        }
    }
    render() {
        var addTokenButtonTopPos = 0;
        var addTransactionButtonTopPos = 0;
        var backgroundText = '';
        if (this.props.paramTable2 !== undefined && this.props.paramTable2.length < 20 && !this.props.flagSwitchTable) {
            for (var i = 0; i < (22 - this.props.paramTable2.length); i++) {
                backgroundText += '<ul style={{display: `flex`}}><li><span></span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li></ul>';
            }
        } else if (this.props.flagSwitchTable && this.state.userBox2 !== undefined && this.state.userBox2.length < 20) {
            for (var j = 0; j < (21 - this.state.userBox2.length); j++) {
                backgroundText += '<ul style={{display: `flex`}}><li><div>&nbsp;</div></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li></ul>';
                addTokenButtonTopPos = this.state.userBox2.length * 38 + 80;
            }
        }
        if (this.props.flagSwitchTable) {
            addTransactionButtonTopPos = this.props.products.length * 38 + 80;
        }
        const { dataBox3 } = this.props;
        return (
            this.props.flagShowTable3 ? <div className="col-lg-12 col-md-12 top30-add-token">
                <div className="box3-token-view">
                    <ul className="box3-token-view-header">
                        <li>#</li>
                        <li>Description</li>
                        <li>% of Tot</li>
                        <li>Last</li>
                        <li>Pos Value</li>
                        <li>P/L</li>
                    </ul>
                    <ul className="box3-token-view-content">
                        <li>{dataBox3.idx}</li>
                        <li>{dataBox3.paramTable.tokenName}</li>
                        <li><span>{pointDotCenterAndFormat(this.state.tot, 4)}</span></li>
                        <li><span>{pointDotCenterAndFormat(this.state.last, 4)}</span></li>
                        <li><span>{pointDotCenterAndFormat(this.state.posValue, 2)}</span></li>
                        <li className="display-PL" style={{ color: `${this.state.flagColor}` }}><span className="col-lg-7">{pointDotCenterAndFormat(this.state.PL, 4)}</span><span className="col-lg-5">{this.state.percent}%</span></li>
                    </ul>
                </div>
                <div className="col-lg-12 col-md-12 top30-add-token-log">
                    <ul className="top30-token-header">
                        <li><span>#</span></li>
                        <li><span>Date</span></li>
                        <li><span>Action</span></li>
                        <li><span>Qty</span></li>
                        <li><span>Unit Cost</span></li>
                        <li><span>Total Cost Basis</span></li>
                        <li><span>Location</span></li>
                        <li><span>Block Explorer Link</span></li>
                        <li><span>Comments</span></li>
                    </ul>

                    {this.props.products.map((product, idx) =>
                        <ProductRow
                            products={this.props.products}
                            handleRowDel={this.props.handleRowDel(product)}
                            handleChangeDate={this.props.handleChangeDate(idx)}
                            product={product}
                            handleChange={this.props.handleChange(idx)}
                            idx={idx}
                            portfolioId={this.props.portfolioId}
                            paramUserTable2={this.props.paramUserTable2}
                            dataUserBox2={this.props.dataUserBox2}
                            getPosValueAndPL={this.getPosValueAndPL}
                            getTotAndLast={this.getTotAndLast} />
                    )
                    }

                    <button className="add-new-coin" style={{ top: addTransactionButtonTopPos }} onClick={this.props.handleAddEvent}><FontAwesomeIcon icon={faPlus} style={{ color: 'gray' }} />&nbsp;&nbsp;Click Here To Add New Transaction</button>
                    <button className="add-new-coin" style={{ top: addTransactionButtonTopPos, 'left': '0%' }} onClick={this.props.handleTableHidden}>
                        <SVGIcon name="return" className="return-icon" width={"20px"} fill={"#6e6e6e"} />
                    </button>
                </div>
            </div> :
                <div className="table-responsive top30-table IndexesDetails" id='box2-container'>
                    {
                        this.props.flagShowUserBox2 ?
                            <div>
                                {!this.props.flagShowTable3 ? <ul className={this.props.flagSwitchTable ? 'Table-Header-HasTable3' : 'Table-Header'}>
                                    <li><span>#</span></li>
                                    <li><span>Description</span></li>
                                    <li><span>% of Tot</span></li>
                                    <li><span>Last</span></li>
                                    {this.props.flagShowUserBox2 ? <li><span>Pos Value</span></li> : null}
                                    {this.props.flagShowUserBox2 ? <li><span>P/L</span></li> : null}
                                    {this.props.flagShowUserBox2 ? <li></li> : null}
                                    {/* <li className="hidden"><span>24HR Chg</span></li>
                                <li className="hidden"><span>30D Avg Chg</span></li>
                                <li className="hidden"><span>Pos Value</span></li>
                                <li className="hidden"><span>24HR Pos Chg</span></li>
                                <li className="hidden"><span>30D Avg Pos Chg</span></li>
                                <li className="hidden"><span>MTD $ In</span></li> */}
                                </ul> : null}
                                <div className={this.props.flagSwitchTable ? 'Table-Content-HasTable3' : 'Table-Content'}>
                                    {this.state.userBox2.map((item, idx) =>
                                        <UserBox2
                                            item={item}
                                            idx={idx}
                                            token_id={this.props.token_id}
                                            portfolioItems={this.state.userBox2.map(item => (item.tokenName, item.tokenMarketcap))}
                                            handleShowTableHidden={this.props.handleShowTableHidden(idx, item)}
                                            handleRowDelBox2={this.handleRowDelBox2_1(item)}
                                            paramUserTable2={this.props.paramUserTable2}
                                            flagShowTable3={this.props.flagShowTable3}
                                            flagSwitchTable={this.props.flagSwitchTable}
                                            flagShowUserBox2={this.props.flagShowUserBox2}
                                            handleAddEventBox2={this.handleAddEventBox2}
                                            dataBox3={this.props.dataBox3}
                                            handleRowDel={this.props.handleRowDel}
                                            handleAddEvent={this.props.handleAddEvent}
                                            handleChange={this.props.handleChange}
                                            products={this.props.products}
                                            handleTableHidden={this.props.handleTableHidden}
                                            getDataTable2={this.props.getDataTable2}
                                            getDataShowTable3={this.getDataShowTable3}
                                            dataUserBox2={this.props.dataUserBox2}
                                            handleClickToken={this.props.handleClickToken}
                                            getPosValueAndPLUserBox2={this.getPosValueAndPLUserBox2(idx)}
                                        />
                                    )}
                                    {parse(backgroundText)}
                                    {
                                        <button className="add-new-coin" onClick={this.handleAddEventBox2} style={{ top: addTokenButtonTopPos }}><FontAwesomeIcon icon={faPlus} style={{ color: 'gray' }} />&nbsp;&nbsp;Click Here To Add New Coin</button>
                                    }
                                </div>
                                <ul className={this.props.flagSwitchTable ? 'Table-Footer-HasTable3' : 'Table-Footer'}>
                                    {this.props.flagSwitchTable ? <li>&nbsp;</li> : <li style={{ width: "0px", border: "none" }}></li>}
                                    <li><span></span></li>
                                    <li><span>100%</span></li>
                                    <li><span>&nbsp;</span></li>
                                    <li><span>{numberFormat(this.state.totalPosValue, 2)}</span></li>
                                    <li><span>{numberFormat(this.state.totalPL, 4)}({numberFormat(this.state.totalPercent, 2)})%</span></li>
                                    <li><span>&nbsp;</span></li>
                                </ul>
                            </div>
                            :
                            this.props.paramTable2 !== undefined && this.props.paramTable2.length !== undefined ?
                                <div>
                                    <ul className={this.props.flagSwitchTable ? 'Table-Header-HasTable3' : 'Table-Header'}>
                                        {this.props.flagSwitchTable ? <li>&nbsp;</li> : <li style={{ width: "0px", border: "none" }}></li>}
                                        <li><span>#</span></li>
                                        <li><span>Description</span></li>
                                        <li><span>% of Tot</span></li>
                                        <li><span>Last</span></li>
                                        {this.props.flagShowUserBox2 ? <li></li> : null}
                                        {/* <li className="hidden"><span>24HR Chg</span></li>
                                        <li className="hidden"><span>30D Avg Chg</span></li>
                                        <li className="hidden"><span>Pos Value</span></li>
                                        <li className="hidden"><span>24HR Pos Chg</span></li>
                                        <li className="hidden"><span>30D Avg Pos Chg</span></li>
                                        <li className="hidden"><span>MTD $ In</span></li> */}
                                    </ul>
                                    <div className={this.props.flagSwitchTable ? 'Table-Content-HasTable3' : 'Table-Content'}>
                                        {this.props.paramTable2.map((item, idx) => {
                                            return (
                                                <ul className={this.props.token_id === item.token_id ? 'table-success' : ''} variant="outline-primary" onClick={(e) => {
                                                    this.props.handleChart(e);
                                                    this.props.handleClickToken(item.token_id);
                                                }} key={idx} >
                                                    {this.props.flagSwitchTable ? <li><div onClick={this.props.handleShowTableHidden(idx)}><FontAwesomeIcon icon={faPlusSquare} /></div></li> : <li></li>}
                                                    <li className="table-center">{idx + 1}</li>
                                                    <li >{item.token_name}</li>
                                                    <li >{parse(this.pointCenterString(this.numFormart((item.allocation * 100) || item.percentage || item.percent, 4)))}</li>
                                                    <li >{parse(this.pointCenterString(this.numFormart(item.last_close_price || item.close_price || item.close, 4)))}</li>
                                                    {/* <li className="table-right">&nbsp;</li>
                                                    <li className="table-right">&nbsp;</li>
                                                    <li className="table-right">&nbsp;</li>
                                                    <li className="table-right">&nbsp;</li> */}
                                                </ul>
                                            );
                                        })}
                                    </div>
                                    <ul className={this.props.flagSwitchTable ? 'Table-Footer-HasTable3' : 'Table-Footer'}>
                                        <li><span></span></li>
                                        {this.props.flagSwitchTable ? <li>&nbsp;</li> : <li style={{ width: "0px", border: "none" }}></li>}
                                        <li><span>100%</span></li>
                                        <li><span>&nbsp;</span></li>
                                        <li><span>&nbsp;</span></li>
                                        {/* <li className="hidden"><span>24HR Chg</span></li>
                                        <li className="hidden"><span>30D Avg Chg</span></li>
                                        <li className="hidden"><span>Pos Value</span></li>
                                        <li className="hidden"><span>24HR Pos Chg</span></li>
                                        <li className="hidden"><span>30D Avg Pos Chg</span></li>
                                        <li className="hidden"><span>MTD $ In</span></li> */}
                                    </ul>
                                </div> : null
                    }
                </div>
        );
    }
};
export default IndexesDetails;