import React from 'react';
import parse from 'html-react-parser';

export function numberFormat(x, i){
    return parseFloat(x).toFixed(i);
}

export function pointCenterString(x) {
    var words = x.toString().split('.');
    let strArray = words.map((item, key) => ('<div class="col-lg-6">' + item + ((key === 0) ? '<b>.</b></div>' : '</div>')));
    return parse('<div class="centerDot">' + strArray[0] + strArray[1] + '</div>');
}
export function pointDotCenterAndFormat(x,i){
	return pointCenterString(numberFormat(x,i));
}
export function pointDotCenterAndFormatForExchange(x,i){
	return pointCenterStringForExChange(numberFormat(x,i));
}
export function pointCenterStringForExChange(x) {
    var words = x.toString().split('.');
    let strArray = words.map((item, key) => ('<div class="col-lg-6">' + ((key===0) ? item <=0 ? item : '+'+`${item}` : item) + ((key === 0) ? '<b>.</b></div>' : '</div>')));
    return parse('<div class="centerDot">' + strArray[0] + strArray[1]+ '</div>');
}