import React from 'react';
import DatePicker from "react-datepicker";
import './style.scss';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { box3Request, box3RequestDel } from '../../../actions/home.action';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import SVGIcon from "../../SVGIcon";

class ProductRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flagPush: false,
            action: "",
            totalCostBasis: 0
        };
    }
    componentDidMount() {
        var input = document.getElementById("rowBox3-1");
        var lis = input.getElementsByTagName('li');
        if (this.state.action === "") {
            lis[2].classList.add('focusin');
        }
        this.setState({ totalCostBasis: this.props.product.totalCostBasis, action: this.props.product.action })
    }
    componentDidUpdate(preProp, preState) {
        if (preProp.product !== this.props.product) {
            this.setState({ flagPush: true });
        }
        if ((this.props.products.length - preProp.products.length) === -1) {
            this.setState({ flagPush: false });
        }
        if (preProp.product.unitCost !== this.props.product.unitCost || preProp.product.quantity !== this.props.product.quantity) {
            this.setState({ totalCostBasis: this.props.product.unitCost * this.props.product.quantity })
        }
        if (preProp.products === this.props.products) {
            var filterBuy = this.props.products.filter(i => i.action === "buy").map(i => i.quantity);
            filterBuy = filterBuy.reduce((a, b) => a + b, 0);
            var filterSell = this.props.products.filter(i => i.action === "sell").map(i => i.quantity);
            filterSell = filterSell.reduce((a, b) => a + b, 0);
            var filterTotalCostBuy = this.props.products.filter(i => i.action === "buy").map(i => i.totalCostBasis);
            filterTotalCostBuy = filterTotalCostBuy.reduce((a, b) => a + b, 0);
            var filterTotalCostSell = this.props.products.filter(i => i.action === "sell").map(i => i.totalCostBasis);
            filterTotalCostSell = filterTotalCostSell.reduce((a, b) => a + b, 0);
            // this.props.getPosValueAndPL()
            if (this.props.dataUserBox2.length !== undefined) {
                var totUserBox2 = this.props.dataUserBox2.filter(item => item.tokenId === this.props.product.tokenId);
                totUserBox2 = totUserBox2[totUserBox2.length - 1];
                if (totUserBox2 !== undefined && totUserBox2.length !== 0) {
                    var percentPL = (((filterBuy - filterSell) * totUserBox2.close - (filterTotalCostBuy - filterTotalCostSell)) / (filterTotalCostBuy - filterTotalCostSell)) * 100;
                    this.props.getPosValueAndPL((filterBuy - filterSell) * totUserBox2.close, (filterBuy - filterSell) * totUserBox2.close - (filterTotalCostBuy - filterTotalCostSell), percentPL)
                } else {
                    this.props.getPosValueAndPL(0, filterTotalCostSell - filterTotalCostBuy, -100);
                }
                if (this.props.dataUserBox2 !== undefined) {
                    var totUserBox = this.props.dataUserBox2.filter(item => item.tokenId === this.props.product.tokenId);
                    totUserBox = totUserBox[totUserBox.length - 1];
                    if (totUserBox !== undefined && totUserBox.length !== 0) {
                        this.props.getTotAndLast(totUserBox.percent, totUserBox.close);
                    } else {
                        this.props.getTotAndLast(0, 0);
                    }
                }
            }
        }


    }
    blurHandle = () => {
        if (this.state.action !== "" && this.props.product.quantity && this.props.product.quantity!== "0" && this.props.product.unitCost!== "0" && this.props.product.unitCost && this.props.product.location && this.props.product.blockExplorerLink && this.props.product.comments && this.props.product.tokenId && this.state.flagPush) {
            this.setState({ flagPush: false });
            const cookies = document.cookie.split(";");
            var accessToken = cookies.filter(item => item.startsWith(' access_token=') || item.startsWith('access_token='));
            const valueToken = accessToken.toString().split("[")[1].split("]")[0];
            var pushData = {
                "action": this.state.action,
                "blockExplorerLink": this.props.product.blockExplorerLink,
                "comments": this.props.product.comments,
                "date": (this.props.product.date.getFullYear() + "-" + ((this.props.product.date.getMonth() + 1) <= 9 ? "0" + (this.props.product.date.getMonth() + 1) : (this.props.product.date.getMonth() + 1)) + "-" + (this.props.product.date.getDate() <= 9 ? '0' + this.props.product.date.getDate() : this.props.product.date.getDate())),
                "quantity": this.props.product.quantity,
                "unitCost": this.props.product.unitCost,
                "totalCostBasis": this.props.product.quantity * this.props.product.unitCost,
                "location": this.props.product.location,
                "tokenId": this.props.product.tokenId,
                "access_token": valueToken,
                "id": this.props.product.id,
                "porfolioId": this.props.portfolioId
            }
            this.props.box3RequestTable(pushData)
        }
        var input = document.getElementById("rowBox3-1");
        if (input !== null) {
            var lis = input.getElementsByTagName('li');
            if (this.state.action === "") {
                lis[2].classList.add('focusin');
            } else if (this.state.action !== "") {
                lis[2].classList.remove('focusin');
                lis[3].classList.add('focusin');
                if (this.props.product.quantity && this.props.product.quantity !== "0") {
                    lis[3].classList.remove('focusin');
                    lis[4].classList.add('focusin');
                    if (this.props.product.unitCost && this.props.product.unitCost !== "0") {
                        lis[4].classList.remove('focusin');
                        lis[6].classList.add('focusin');
                        if (this.props.product.location) {
                            lis[6].classList.remove('focusin');
                            lis[7].classList.add('focusin');
                            if (this.props.product.blockExplorerLink) {
                                lis[7].classList.remove('focusin');
                                lis[8].classList.add('focusin');
                                if (this.props.product.comments) {
                                    lis[8].classList.remove('focusin');
                                }
                            }
                        }
                    }
                }
            }
        }

    }
    handleClickDel = () => {
        const cookies = document.cookie.split(";");
        var accessToken = cookies.filter(item => item.startsWith(' access_token=') || item.startsWith('access_token='));
        const valueToken = accessToken.toString().split("[")[1].split("]")[0];
        this.props.box3RequestDel({ id: this.props.product.id, access_token: valueToken, porfolioId: this.props.portfolioId })
    }
    handleChangeAction = (e) => {
        const { value } = e.target;
        this.setState({ action: value })
    }
    handleConfirmDel = (e) => {
        if (window.confirm("Do you want to delete?")) {
            this.props.handleRowDel(e)
            this.handleClickDel()
        }
    }

    handleConfirmDel_1 = (e) => {
        confirmAlert({
            title: 'Confirm to delete',
            childrenElement: () => <div className="ConfirmDialogBody">Are you sure to delete this transaction</div>,
            message: '',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.handleRowDel(e)
                        this.handleClickDel()
                    }
                },
                {
                    label: 'No',
                    onClick: () => null
                }
            ]
        })
    }
    onKeyDown = (e) => {
        if (e.keyCode === 9 || e.keyCode === 13) {
            e.preventDefault();
            if (this.state.action === "") {
                this.textInput.focus();
            } else if (!this.props.product.quantity || this.props.product.quantity === "0") {
                this.textInputQty.focus();
            } else if (!this.props.product.unitCost || this.props.product.unitCost === "0") {
                this.textInputUnitCost.focus();
            } else if (!this.props.product.location) {
                this.textInputLocation.focus();
            } else if (!this.props.product.blockExplorerLink) {
                this.textInputBlockExplorerLink.focus();
            } else if (!this.props.product.comments) {
                this.textInputComments.focus();
            }
        }
    }

    render() {
        return (
            <ul className="eachRow top30-token-eachRow" onBlur={this.blurHandle} key={this.props.idx} id={`rowBox3${this.props.product.id}`}>
                <li>{this.props.idx + 1}</li>
                <li>
                    <React.Fragment>
                        <DatePicker
                            selected={new Date(this.props.product.date)}
                            onChange={this.props.handleChangeDate}
                            dateFormat="yyyy-MM-dd"
                        />
                    </React.Fragment>
                </li>
                <li>
                    <select className='focusLink' placeholder="action" ref={(input) => { this.textInput = input; }} onChange={this.handleChangeAction} onKeyDown={this.onKeyDown}>
                        <option>{this.state.action !== "" || this.props.product.action || "Select..."}</option>
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                </li>
                <li>
                    <input className='focusLink' ref={(input) => { this.textInputQty = input; }} type='number' name="quantity" id={this.props.product.quantity} value={this.props.product.quantity} onChange={this.props.handleChange} onKeyDown={this.onKeyDown} />
                </li>
                <li>
                    <input className='focusLink' ref={(input) => { this.textInputUnitCost = input; }} type='number' name="unitCost" id={this.props.product.unitCost} value={this.props.product.unitCost} onChange={this.props.handleChange} onKeyDown={this.onKeyDown} />
                </li>
                <li>
                    <input type='text' name="totalCostBasis" id={this.props.product.totalCostBasis} value={this.state.totalCostBasis} disabled />
                </li>
                <li>
                    <input className='focusLink' ref={(input) => { this.textInputLocation = input; }} type='text' name="location" id={this.props.product.location} value={this.props.product.location} onChange={this.props.handleChange} onKeyDown={this.onKeyDown} />
                </li>
                <li>
                    <input className='focusLink' ref={(input) => { this.textInputBlockExplorerLink = input; }} type='text' name="blockExplorerLink" id={this.props.product.blockExplorerLink} value={this.props.product.blockExplorerLink} onChange={this.props.handleChange} onKeyDown={this.onKeyDown} />
                </li>
                <li>
                    <input className='focusLink' ref={(input) => { this.textInputComments = input; }} type='text' name="comments" id={this.props.product.comments} value={this.props.product.comments} onChange={this.props.handleChange} onKeyDown={this.onKeyDown} />
                </li>
                <li className="del-cell" style={{ 'text-align': 'center' }}>
                    <buton className="del-button" onClick={(e) => this.handleConfirmDel_1(e)}>
                        <SVGIcon name="trash" width={"20px"} fill={"#6e6e6e"} />
                    </buton>
                </li>
            </ul>
        );
    }
}
const mapStateToProps = (state) => {
};
function mapDispatchToProps(dispatch, ownProps) {
    return {
        box3RequestTable: (repos) => dispatch(box3Request(repos)),
        box3RequestDel: (repos) => dispatch(box3RequestDel(repos)),
    }
}
const connectedProductRowPage = connect(mapStateToProps, mapDispatchToProps)(ProductRow);
export default connectedProductRowPage;