import React from 'react';
import './style.scss';
import { numberFormat, pointCenterString, pointDotCenterAndFormat } from '../../Tool/index.jsx';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


export default class UserBox1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            lastPriceUser: 0,
            edit: false,
            totalCostBasis: 0,
        }
    }



    componentDidUpdate(preProp, preState) {
        if (preProp.item.porfolioName !== this.props.item.porfolioName) {
            this.setState({ flag: true })
        }
        if (preState.flag !== this.state.flag) {
            this.setState({ flag: false })
        }

        if (preProp.paramChartUser !== this.props.paramChartUser && Object.keys(this.props.paramChartUser).length !== 0) {
            var filterTotalCostBasisBuy = this.props.paramChartUser.map[`${this.props.item.id}`].filter(i => i.action.toLowerCase() === 'buy').map(i => i.totalCostBasis).reduce((a, b) => a + b, 0);
            var filterTotalCostBasisSell = this.props.paramChartUser.map[`${this.props.item.id}`].filter(i => i.action.toLowerCase() === 'sell').map(i => i.totalCostBasis).reduce((a, b) => a + b, 0);
            this.setState({ lastPriceUser: this.props.paramChartUser.lasts[`${this.props.item.id}`], totalCostBasis: (filterTotalCostBasisBuy - filterTotalCostBasisSell) <= 0 ? filterTotalCostBasisBuy - filterTotalCostBasisSell : '+'+`${filterTotalCostBasisBuy - filterTotalCostBasisSell}`})
        }
    }
    BlurFunction = () => {
        if (this.props.item.porfolioName !== "") {
            const cookies = document.cookie.split(";");
            var accessToken = cookies.filter(item => item.startsWith(' access_token=') || item.startsWith('access_token='));
            const valueToken = accessToken.toString().split("[")[1] && accessToken.toString().split("[")[1].split("]")[0];
            this.props.saveBox1({ valueToken, portfolio: this.props.item });
            this.setState({ edit: false });
        }
    }
    confirmDeleteDialog = (row) => {
        confirmAlert({
            title: 'Confirm to delete',
            childrenElement: () => <div className="ConfirmDialogBody">Are you sure to delete portfolio {row.porfolioName}</div>,
            message: '',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.handleConfirmDelFromDialog(row)
                },
                {
                    label: 'No',
                    onClick: () => null
                }
            ]
        })
    }
    handleConfirmDel = (row) => {
        if (window.confirm("Do you want to delete?")) {
            const cookies = document.cookie.split(";");
            var accessToken = cookies.filter(item => item.startsWith(' access_token=') || item.startsWith('access_token='));
            const valueToken = accessToken.toString().split("[")[1] && accessToken.toString().split("[")[1].split("]")[0];
            this.props.handleDelUserIndex(row);
            this.props.requestDelUserBox1({ valueToken, id: row.id });
        }
    }
    handleConfirmDelFromDialog = (row) => {
        const cookies = document.cookie.split(";");
        var accessToken = cookies.filter(item => item.startsWith(' access_token=') || item.startsWith('access_token='));
        const valueToken = accessToken.toString().split("[")[1] && accessToken.toString().split("[")[1].split("]")[0];
        this.props.handleDelUserIndex(row);
        this.props.requestDelUserBox1({ valueToken, id: row.id });
    }
    handleEdit = () => {
        this.setState({ edit: true });
    }
    render() {
        return (
            <ul onClick={() => {
                this.props.handleShowTable();
                this.props.switchUserBox2(this.props.item.porfolioName);
                this.props.handleClickTokenTV(4);
            }} key={this.props.i} className={this.props.token_idTV === 4 && this.props.getPorforlioId === this.props.item.id ? "rowTable1 NewPortfolioToken row_flex" : "row_flex NewPortfolioToken"}>
                <li ><span>{this.props.i}</span></li>
                {this.props.item.id === -1 || this.state.edit ? <li><input type="text" name="porfolioName" placeholder="Add new portfolio name" value={this.props.item.porfolioName} onChange={this.props.handleChange} onBlur={this.BlurFunction} />
                </li>
                    : <li><span>{this.props.item.porfolioName}</span></li>}
                <li ><span>{pointDotCenterAndFormat(this.state.lastPriceUser ? this.state.lastPriceUser : 0, 4)}</span></li>
                <li className={(this.state.lastPriceUser ? (this.state.lastPriceUser - this.state.totalCostBasis) / this.state.totalCostBasis * 100 : this.state.totalCostBasis !== 0 ? -100 : 0) < 0 ? "red table-center" : (this.state.lastPriceUser ? (this.state.lastPriceUser - this.state.totalCostBasis) / this.state.totalCostBasis * 100 : this.state.totalCostBasis !== 0 ? -100 : 0) > 0 ? "green table-center" : "table-center"}><span>{pointDotCenterAndFormat((this.state.lastPriceUser ? (this.state.lastPriceUser - this.state.totalCostBasis) / this.state.totalCostBasis * 100 : this.state.totalCostBasis !== 0 ? -100 : 0), 4)}%</span></li>
                {this.props.displayName ?
                    <li className="del-cell process-col" style={{ display: 'flex', 'flex-wrap': 'wrap' }}>
                        <buton className="edit-button col-lg-6" onClick={(e) => this.handleEdit()}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-edit"><path fill="currentColor" d="M417.8 315.5l20-20c3.8-3.8 10.2-1.1 10.2 4.2V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h292.3c5.3 0 8 6.5 4.2 10.2l-20 20c-1.1 1.1-2.7 1.8-4.2 1.8H48c-8.8 0-16 7.2-16 16v352c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V319.7c0-1.6.6-3.1 1.8-4.2zm145.9-191.2L251.2 436.8l-99.9 11.1c-13.4 1.5-24.7-9.8-23.2-23.2l11.1-99.9L451.7 12.3c16.4-16.4 43-16.4 59.4 0l52.6 52.6c16.4 16.4 16.4 43 0 59.4zm-93.6 48.4L403.4 106 169.8 339.5l-8.3 75.1 75.1-8.3 233.5-233.6zm71-85.2l-52.6-52.6c-3.8-3.8-10.2-4-14.1 0L426 83.3l66.7 66.7 48.4-48.4c3.9-3.8 3.9-10.2 0-14.1z" class=""></path></svg>
                        </buton>
                        <buton className="del-button  col-lg-6" onClick={(e) => this.confirmDeleteDialog(this.props.item)}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-trash"><path fill="currentColor" d="M440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h18.9l33.2 372.3a48 48 0 0 0 47.8 43.7h232.2a48 48 0 0 0 47.8-43.7L421.1 96H440a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zm184.8 427a15.91 15.91 0 0 1-15.9 14.6H107.9A15.91 15.91 0 0 1 92 465.4L59 96h330z" class=""></path></svg>
                        </buton>
                    </li> : null}
                {/* <li className="table-right"></li>
            <li className="table-right"></li>
            <li className="table-right">&nbsp;</li>
            <li className="table-right">&nbsp;</li>
            <li className="table-right">&nbsp;</li>
            <li className="table-right">&nbsp;</li> */}
            </ul>
        );
    }
}