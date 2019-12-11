import * as React from 'react';
import parse from 'html-react-parser';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { numberFormat, pointCenterString, pointDotCenterAndFormat, pointDotCenterAndFormatForExchange } from '../Tool/index.jsx';
import UserBox1 from './UserBox1';
import produce from 'immer';
export default class Top30Tokens extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            top30: [],
            userBox1: [],
        }
    }
    componentDidUpdate(preProps, preState) {
        var id1 = this.state.userBox1.filter(item => item.id === -1)
        if (preProps.box1Reducer !== this.props.box1Reducer) {
            if (Array.isArray(this.props.box1Reducer)) {
                if ((id1[0] && id1[0].id === -1)) {
                    this.setState({
                        userBox1: [
                            ...this.props.box1Reducer,
                            { id: -1, porfolioName: "" }
                        ]
                    })
                } else {
                    this.setState({ userBox1: this.props.box1Reducer })
                }
            }
        }
    }

    handleAddUserIndex = (e) => {
        e.preventDefault();
        var id = -1;
        var userBox1 = {
            id: id,
            porfolioName: "",
        }
        this.setState((state) => ({
            ...state,
            userBox1: [
                ...state.userBox1,
                userBox1,
            ]
        }));
    }
    handleDelUserIndex = (idx) => (row) => {
        var index = this.state.userBox1.indexOf(row);
        this.setState(produce(
            (state) => {
                state.userBox1.splice(index, 1)
            }
        ));
    }
    handleChange = (idx) => (event) => {
        const { name, value } = event.target;
        this.setState(produce(
            (state) => {
                state.userBox1[idx] = {
                    ...state.userBox1[idx],
                    [name]: value,
                }
            },
        ));
    }


    render() {
        var i = 1;
        var addPortfoliosButtonTopPos;
        if (this.props.displayName && this.state.userBox1.length) {
            addPortfoliosButtonTopPos = (4 + this.state.userBox1.length) * 38 + 40 + 40;
        } else {
            addPortfoliosButtonTopPos = 4 * 38 + 40 + 40;
        }
        return (
            <div className="indexes-table d-inline-block">
                <div className="indexes-table-1">
                    <ul className="Table-Header">
                        <li><span>#</span></li>
                        <li><span>Description</span></li>
                        <li><span>Last</span></li>
                        <li><span>P/L</span></li>
                        {this.props.displayName ? <li><span></span></li> : null}
                    </ul>
                    <div className="Table-Content">
                        <ul onClick={() => {
                            this.props.handleHiddenTable();
                            this.props.switchRow0();
                            this.props.handleClickTokenTV(0);
                        }} className={this.props.token_idTV === 0 ? "rowTable1 row_flex" : "row_flex"}>
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center"><span>TaiFu™ 30 Cryptocurrency Market Index</span></li>
                            <li className="table-center"><span>{pointDotCenterAndFormat(this.props.lastPriceTV, 4)}</span></li>
                            <li className={this.props.lastPriceTV-100 < 0 ? "red table-center" : this.props.lastPriceTV > 0 ? "green table-center" : "table-center"}><span>{pointDotCenterAndFormatForExchange(this.props.lastPriceTV-100, 4)}%</span></li>
                            {this.props.displayName ? <li><span></span></li> : null}
                            {/* <li className="table-right"></li>
                            <li className="table-right"></li>
                            <li className="table-right">&nbsp;</li>
                            <li className="table-right">&nbsp;</li>
                            <li className="table-right">&nbsp;</li>
                            <li className="table-right">&nbsp;</li> */}
                        </ul>
                        <ul onClick={() => {
                            this.props.handleHiddenTable();
                            this.props.switchRow1();
                            this.props.handleClickTokenTV(1);
                        }} className={this.props.token_idTV === 1 ? "rowTable1 row_flex" : "row_flex"}>
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center"><span>TaiFu™ 30 Altcoin Market Index</span></li>
                            <li className="table-center"><span>{pointDotCenterAndFormat(this.props.lastPriceTV1, 4)}</span></li>
                            <li className={this.props.lastPriceTV1-100 < 0 ? "red table-center" : this.props.lastPriceTV1 > 0 ? "green table-center" : "table-center"}><span>{pointDotCenterAndFormatForExchange(this.props.lastPriceTV1-100, 4)}%</span></li>
                            {this.props.displayName ? <li><span></span></li> : null}
                            {/* <li className="table-right"></li>
                            <li className="table-right"></li>
                            <li className="table-right">&nbsp;</li>
                            <li className="table-right">&nbsp;</li>
                            <li className="table-right">&nbsp;</li>
                            <li className="table-right">&nbsp;</li> */}
                        </ul>
                        <ul onClick={() => {
                            this.props.handleHiddenTable();
                            this.props.switchRow2();
                            this.props.handleClickTokenTV(2);
                        }} className={this.props.token_idTV === 2 ? "rowTable1 row_flex" : "row_flex"}>
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center"><span>TaiFu™ Baby Bitcoin Index</span></li>
                            <li className="table-center"><span>{pointDotCenterAndFormat(this.props.lastPriceTV2, 4)}</span></li>
                            <li className={this.props.lastPriceTV2-100 < 0 ? "red table-center" : this.props.lastPriceTV2 > 0 ? "green table-center" : "table-center"}><span>{pointDotCenterAndFormatForExchange(this.props.lastPriceTV2-100, 4)}%</span></li>
                            {this.props.displayName ? <li><span></span></li> : null}
                            {/* <li className="table-right"></li>
                            <li className="table-right"></li>
                            <li className="table-right">&nbsp;</li>
                            <li className="table-right">&nbsp;</li>
                            <li className="table-right">&nbsp;</li>
                            <li className="table-right">&nbsp;</li> */}
                        </ul>

                        <ul onClick={() => {
                            this.props.handleHiddenTable();
                            this.props.switchRow3();
                            this.props.handleClickTokenTV(3);
                        }} className={this.props.token_idTV === 3 ? "rowTable1 row_flex" : "row_flex"}>
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center"><span>Tone Vays Scam Coin Index</span></li>
                            <li className="table-center"><span>{pointDotCenterAndFormat(this.props.lastPriceTV3, 4)}</span></li>
                            <li className={this.props.lastPriceTV3-100 < 0 ? "red table-center" : this.props.lastPriceTV3 > 0 ? "green table-center" : "table-center"}><span>{pointDotCenterAndFormatForExchange(this.props.lastPriceTV3-100, 4)}%</span></li>
                            {this.props.displayName ? <li><span></span></li> : null}
                            {/* <li className="table-right"></li>
                            <li className="table-right"></li>
                            <li className="table-right">&nbsp;</li>
                            <li className="table-right">&nbsp;</li>
                            <li className="table-right">&nbsp;</li>
                            <li className="table-right">&nbsp;</li> */}
                        </ul>
                        {this.props.displayName ? this.state.userBox1.map((item, idx) =>
                            <UserBox1 item={item}
                                handleShowTable={this.props.handleShowTable}
                                switchUserBox2={this.props.switchUserBox2}
                                handleClickTokenTV={this.props.handleClickTokenTV}
                                numFormart={this.numFormart}
                                paramChartUser={this.props.paramChartUser}
                                token_idTV={this.props.token_idTV}
                                handleChange={this.handleChange(idx)}
                                requestTable={this.props.requestTable}
                                saveBox1={this.props.saveBox1}
                                getPorforlioId={this.props.getPorforlioId}
                                handleDelUserIndex={this.handleDelUserIndex(idx)}
                                displayName={this.props.displayName}
                                idx={idx}
                                handleHiddenTable={this.props.handleHiddenTable}
                                switchRow0={this.props.switchRow0}
                                handleClickTokenTV={this.props.handleClickTokenTV}
                                requestDelUserBox1={this.props.requestDelUserBox1}
                                i={i++} />
                        )
                            : <ul className="row_flex">
                                <li className="table-center"><span>{i++}</span></li>
                                <li className="table-center">&nbsp;</li>
                                <li className="table-center">&nbsp;</li>
                                <li className="table-center">&nbsp;</li>
                            </ul>
                        }

                        <ul className="row_flex">
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            {this.props.displayName ? <li><span></span></li> : null}
                        </ul>
                        <ul className="row_flex">
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            {this.props.displayName ? <li><span></span></li> : null}
                        </ul>
                        <ul className="row_flex">
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            {this.props.displayName ? <li><span></span></li> : null}
                        </ul>
                        <ul className="row_flex">
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            {this.props.displayName ? <li><span></span></li> : null}
                        </ul>
                        <ul className="row_flex">
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            {this.props.displayName ? <li><span></span></li> : null}
                        </ul>
                        <ul className="row_flex">
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            {this.props.displayName ? <li><span></span></li> : null}
                        </ul>
                        <ul className="row_flex">
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            {this.props.displayName ? <li><span></span></li> : null}
                        </ul>
                        <ul className="row_flex">
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            {this.props.displayName ? <li><span></span></li> : null}
                        </ul>
                        <ul className="row_flex">
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            {this.props.displayName ? <li><span></span></li> : null}
                        </ul>
                        <ul className="row_flex">
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            {this.props.displayName ? <li><span></span></li> : null}
                        </ul>
                        <ul className="row_flex">
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            {this.props.displayName ? <li><span></span></li> : null}
                        </ul>
                        <ul className="row_flex">
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            {this.props.displayName ? <li><span></span></li> : null}
                        </ul>
                        <ul className="row_flex">
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            {this.props.displayName ? <li><span></span></li> : null}
                        </ul>
                        <ul className="row_flex">
                            <li className="table-center"><span>{i++}</span></li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            <li className="table-center">&nbsp;</li>
                            {this.props.displayName ? <li><span></span></li> : null}
                        </ul>

                        {
                            <button className="add-new-porfolio" onClick={this.handleAddUserIndex} style={{ top: addPortfoliosButtonTopPos }}><FontAwesomeIcon icon={faPlus} style={{ color: 'gray' }} />&nbsp;&nbsp;Click Here To Create A New Index Or Portfolio</button>
                        }
                    </div>
                </div>
            </div >
        );
    }
};