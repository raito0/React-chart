var rp = require('request-promise').defaults({ json: true });
var axios = require('axios');
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
            if (split_symbol[1] === "1") {
                url = "/get-summary-total.do?indexsType=altcoin";
            } else if (split_symbol[1] === "2") {
                url = "/get-mabell-index-all.do"; // api chart for #3
            } else if (split_symbol[1] === "3") {
                url = "/get-member-index-value.do?memberID=1"; // api chart for #4
            }
            else {
                url = "/get-summary-total.do?indexsType=taifu30";
            }
            // const qs = {
            //     e: split_symbol[0],
            //     fsym: split_symbol[1],
            //     tsym: split_symbol[2],
            //     toTs: to ? to : '',
            //     limit: limit ? limit : 2000
            //     // aggregate: 1//resolution 
            // };
            // console.log({qs})
            if (url !== "") {
                return rp({
                    url: `${api_root}${url}`,
                    // qs,
                })
                    .then(data => {
                        if (data.length) {
                            var bars = data.map(el => {
                                return {
                                    time: new Date(el.date).getTime(), //TradingView requires bar time in ms
                                    low: el.portfolio_low || el.low,
                                    high: el.portfolio_high || el.high,
                                    open: el.portfolio_open || el.open,
                                    close: el.portfolio_close || el.close
                                    // volume: el.volumefrom 
                                }
                            });
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
