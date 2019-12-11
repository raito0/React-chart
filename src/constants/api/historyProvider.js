var rp = require('request-promise').defaults({ json: true });
const apiCrypto = require("../api").apiCrypto;
const apiAlexFu = require("../api").apiAlexfu;

const history = {};

export default {
    history: history,

    getBars: function (symbolInfo, resolution, from, to, first, limit) {
        var split_symbol = symbolInfo.name.split(/[:/]/);
        //        const url = resolution === 'D' ? '/data/histoday' : resolution >= 60 ? '/data/histohour' : '/data/histominute'
        const url = '/gettokenbyid.do?token_id=' + split_symbol[3];
        const qs = {
            e: split_symbol[0],
            fsym: split_symbol[1],
            tsym: split_symbol[2],
            toTs: to ? to : '',
            limit: limit ? limit : 2000
            // aggregate: 1//resolution 
        };
        // console.log({qs})
        return rp({
            url: `${apiCrypto}${url}`,
            qs
        })
            .then(data => {
                //                    console.log({data});
                //                    if (data.Response && data.Response === 'Error') {
                //                        console.log('CryptoCompare API error:', data.Message);
                //                        return [];
                //                    }
                if (data.length) {
                    //                        console.log(`Actually returned: ${new Date(data.TimeFrom * 1000).toISOString()} - ${new Date(data.TimeTo * 1000).toISOString()}`);
                    var bars = data.map(el => {
                        return {
                            time: new Date(el.data_date).getTime(), //TradingView requires bar time in ms
                            low: el.low_price,
                            high: el.high_price,
                            open: el.open_price,
                            close: el.close_price,
                            volume: el.token_volume
                        };
                    });
                    if (first) {
                        var lastBar = bars[bars.length - 1];
                        history[symbolInfo.name] = { lastBar: lastBar };
                    }
                    return bars;
                } else {
                    return [];
                }
            });
    }
}
