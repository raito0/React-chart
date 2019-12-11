var rp = require('request-promise').defaults({ json: true });
//const api_root = 'https://min-api.cryptocompare.com'
const api_root = require("../api").apiCrypto;
const api_user = require("../api").apiAlexfu;
const history = {};

export default {
    history: history,

    getBars: function (symbolInfo, resolution, from, to, first, limit) {
        var split_symbol = symbolInfo.ticker.split(/[:/]/);
        if (split_symbol[0] === "AAPL") {
            let url = "";
            if (split_symbol[1] === "4") {
                url = `/crypto/get-user-index/${split_symbol[2]}`;// api chart for #5
            }
            const qs = {
                e: split_symbol[0],
                fsym: split_symbol[1],
                tsym: split_symbol[2],
                toTs: to ? to : '',
                limit: limit ? limit : 2000
                // aggregate: 1//resolution 
            };
            // console.log({qs})
            const cookies = document.cookie.split(";");
            var accessToken = cookies.filter(item => item.startsWith(' access_token=') || item.startsWith('access_token='));
            const valueToken = accessToken.toString().split("[")[1] && accessToken.toString().split("[")[1].split("]")[0];
            return rp({
                url: `${api_user}${url}`,
                qs,
                headers: {
                    'Authorization': `bearer ${valueToken}`,
                    'Content-Type': 'application/json',
                }
            })
                .then(data => {
                    if (data.wpKUserIndexList.length) {
                        // console.log(`Actually returned: ${new Date(data.TimeFrom * 1000).toISOString()} - ${new Date(data.TimeTo * 1000).toISOString()}`)
                        var bars = data.wpKUserIndexList.filter(item=>item.close > 0).map(el => {
                            return {
                                time: new Date(el.date).getTime(), //TradingView requires bar time in ms
                                low: el.portfolio_low || el.low,
                                high: el.portfolio_high || el.high,
                                open: el.portfolio_open || el.open,
                                close: el.portfolio_close || el.close,
                                // volume: el.volumefrom 
                            }
                        })
                        if (first) {
                            var lastBar = bars[bars.length - 1]
                            history[symbolInfo.name] = { lastBar: lastBar }
                        }
                        return bars
                    } else {
                        return []
                    }
                })
        }
        //        const url = resolution === 'D' ? '/data/histoday' : resolution >= 60 ? '/data/histohour' : '/data/histominute'
        if (split_symbol[0] === "Compare") {
            let url = "";
            url = `/gettokenbyid.do?token_id=${split_symbol[1]}`
            // const qs = {
            //     e: split_symbol[0],
            //     fsym: split_symbol[1],
            //     tsym: split_symbol[2],
            //     toTs: to ? to : '',
            //     limit: limit ? limit : 2000
            //     // aggregate: 1//resolution 
            // };
            // console.log({qs})
            return rp({
                url: `${api_root}${url}`,
                // qs,
            })
                .then(data => {
                    if (data.length) {
                        // console.log(`Actually returned: ${new Date(data.TimeFrom * 1000).toISOString()} - ${new Date(data.TimeTo * 1000).toISOString()}`)
                        var bars = data.map(el => {
                            return {
                                time: new Date(el.data_date).getTime(), //TradingView requires bar time in ms
                                low: el.low_price || el.low,
                                high: el.high_price || el.high,
                                open: el.open_price || el.open,
                                close: el.close_price || el.close
                                // volume: el.volumefrom 
                            }
                        })
                        if (first) {
                            var lastBar = bars[bars.length - 1];
                            history[symbolInfo.ticker] = { lastBar: lastBar }
                        }
                        return bars
                    } else {
                        return []
                    }
                })
        }

    }
}
