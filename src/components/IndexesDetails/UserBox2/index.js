import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import Autocomplete from "../../Autocomplete";
import { numberFormat, pointCenterString, pointDotCenterAndFormat } from '../../Tool/index.jsx';
import SVGIcon from "../../SVGIcon";

import '../style.scss';
function UserBox2(props) {
    let initialItems = [];
    if (Array.isArray(props.responseBox2)) {
        for (let i = 0; i < props.responseBox2.length; i++) {
            if (!props.portfolioItems.includes(props.responseBox2[i].tokenMarketcap)) {
                initialItems.push(props.responseBox2[i].tokenName);
            }
        }
    }
    const [flag, setflag] = useState(props.flagShowHiddenBox3);
    const [tot, setTot] = useState(0);
    const [last, setLast] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const [totalCostBasis, setTotalCostBasis] = useState(0);
    const [percent, setPercent] = useState(0);
    const [flagColor, setFlagColor] = useState("black");
    useEffect(() => {
        if (props.item.id === -1) {
            setflag(true)
        } else {
            setflag(false);
            if (props.dataUserBox2 !== undefined && props.dataUserBox2.length !== undefined) {
                var totUserBox = props.dataUserBox2.filter(item => item.tokenId === props.item.id);
                totUserBox = totUserBox[totUserBox.length - 1];
                if (totUserBox !== undefined && totUserBox.length !== 0) {
                    setTot(totUserBox.percent);
                    setLast(totUserBox.close);
                    props.getPosValueAndPLUserBox2(totalQty * last, totalQty * last - totalCostBasis)
                } else {
                    props.getPosValueAndPLUserBox2(0, 0 - totalCostBasis)
                }
            }
        }
        if (props.paramUserTable2.length !== 0 && Array.isArray(props.paramUserTable2)) {
            var filterBuy = props.paramUserTable2.filter(i => i.tokenId === props.item.id && i.action === "buy").map(i => i.quantity);
            filterBuy = filterBuy.reduce((a, b) => a + b, 0);
            var filterSell = props.paramUserTable2.filter(i => i.tokenId === props.item.id && i.action === "sell").map(i => i.quantity);
            filterSell = filterSell.reduce((a, b) => a + b, 0);
            var filterTotalCostBuy = props.paramUserTable2.filter(i => i.tokenId === props.item.id && i.action === "buy").map(i => i.totalCostBasis);
            filterTotalCostBuy = filterTotalCostBuy.reduce((a, b) => a + b, 0);
            var filterTotalCostSell = props.paramUserTable2.filter(i => i.tokenId === props.item.id && i.action === "sell").map(i => i.totalCostBasis);
            filterTotalCostSell = filterTotalCostSell.reduce((a, b) => a + b, 0);
            setTotalQty(filterBuy - filterSell);
            setTotalCostBasis(filterTotalCostBuy - filterTotalCostSell);
        }
        var percentPL = ((totalQty * last - totalCostBasis) / totalCostBasis) * 100;
        if (percentPL) {
            if (percentPL < 0) {
                setFlagColor("red")
                setPercent(numberFormat(percentPL, 2));
            } else if (percentPL > 0) {
                setFlagColor("green")
                setPercent("+" + numberFormat(percentPL, 2));
            }
        }
    }, [props.item, props.dataUserBox2, props.paramUserTable2, last, totalCostBasis, totalQty]);
    return (
        <ul style={{ display: 'flex' }} className={props.token_id === props.item.id ? "eachRow top30-token-eachRow yellow-row" : "eachRow top30-token-eachRow"} key={props.idx} onClick={(e) => props.handleClickToken(props.item.id)}>
            <li>{props.idx + 1}</li>
            {props.item.id === -1 ?
                <li>
                    <Autocomplete suggestions={initialItems} getDataShowTable3={props.getDataShowTable3} />
                </li>
                : <li>{props.item && props.item.tokenName}</li>}

            <li><span>{pointDotCenterAndFormat(tot, 2)}</span></li>
            <li><span>{pointDotCenterAndFormat(last, 4)}</span></li>
            <li><span>{pointDotCenterAndFormat(totalQty * last, 2)}</span></li>
            <li style={{ display: 'flex', 'flex-wrap': 'wrap' }}>
                <span className="col-lg-7">{pointDotCenterAndFormat(totalQty * last - totalCostBasis, 4)}</span>
                <span className="col-lg-5" style={{ color: `${flagColor}` }}>{percent}%</span>
            </li>
            <li className="del-cell">
                <buton className="edit-button col-lg-6" onClick={(e) => {
                props.handleShowTableHidden(e);
            }}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-edit"><path fill="currentColor" d="M417.8 315.5l20-20c3.8-3.8 10.2-1.1 10.2 4.2V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h292.3c5.3 0 8 6.5 4.2 10.2l-20 20c-1.1 1.1-2.7 1.8-4.2 1.8H48c-8.8 0-16 7.2-16 16v352c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V319.7c0-1.6.6-3.1 1.8-4.2zm145.9-191.2L251.2 436.8l-99.9 11.1c-13.4 1.5-24.7-9.8-23.2-23.2l11.1-99.9L451.7 12.3c16.4-16.4 43-16.4 59.4 0l52.6 52.6c16.4 16.4 16.4 43 0 59.4zm-93.6 48.4L403.4 106 169.8 339.5l-8.3 75.1 75.1-8.3 233.5-233.6zm71-85.2l-52.6-52.6c-3.8-3.8-10.2-4-14.1 0L426 83.3l66.7 66.7 48.4-48.4c3.9-3.8 3.9-10.2 0-14.1z" class=""></path></svg>
                </buton>
                <buton className="del-button  col-lg-6" onClick={props.handleRowDelBox2}>
                    <SVGIcon name="trash" className="del-icon" width={"20px"} fill={"#6e6e6e"} />
                </buton>
            </li>
        </ul>
    );
}
const mapStateToProps = (state) => {
    return {
        responseBox2: state && state.userBox2Reducer && state.userBox2Reducer.response
    }
};
const connectedHomePage = connect(mapStateToProps, null)(UserBox2);
export default connectedHomePage;