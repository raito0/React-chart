import historyProvider from './historyProviderTV';
import chartUserTV from './chartUserTV';

// import requestCoinApi from './requestCoinApi';
const supportedResolutions = ["1D", "1W", "1M"]
const config = {
	supported_resolutions: supportedResolutions,
	"supports_search": true,
	"supports_group_request": false,
	"supports_marks": false,
	"supports_timescale_marks": false,
	"exchanges": [{
		"value": "",
		"name": "All Exchanges",
		"desc": ""
	}],
};
const exchanges = [
	{ tokenSymbol: "BTC", tokenName: "bitcoin", id: "1" }, 
	{ tokenSymbol: "ETH", tokenName: "ethereum", id: "2" },
	{ tokenSymbol: "XRP", tokenName: "xrp", id: "3" },
	{ tokenSymbol: "LTC", tokenName: "litecoin", id: "6" },
	{ tokenSymbol: "EOS", tokenName: "eos", id: "5" },
	{ tokenSymbol: "BCH", tokenName: "bitcoin cash", id: "4" },
	{ tokenSymbol: "BNB", tokenName: "binance coin", id: "7" },
	{ tokenSymbol: "TRX", tokenName: "tron", id: "11" },
	{ tokenSymbol: "XLM", tokenName: "stellar", id: "9" },
	{ tokenSymbol: "ETC-USD", tokenName: "ethereum classic", id: "18" },
	{ tokenSymbol: "NEO", tokenName: "neo", id: "17" },
	{ tokenSymbol: "ADA", tokenName: "cardano", id: "10" },
	{ tokenSymbol: "ZEC", tokenName: "zcash", id: "22" },
	{ tokenSymbol: "XMR", tokenName: "monero", id: "12" },
	{ tokenSymbol: "QTUM", tokenName: "qtum", id: "31" },
	{ tokenSymbol: "ONT", tokenName: "ontology", id: "19" },
	{ tokenSymbol: "MIOTA", tokenName: "iota", id: "15" },
	{ tokenSymbol: "NEM", tokenName: "nem", id: "21" },
	{ tokenSymbol: "OMG", tokenName: "omisego", id: "28" },
	{ tokenSymbol: "BAT", tokenName: "basic attention token", id: "24" },
	{ tokenSymbol: "LINK", tokenName: "chainlink", id: "41" },
	{ tokenSymbol: "DOGE", tokenName: "dogecoin", id: "26" },
	{ tokenSymbol: "VET", tokenName: "vechain", id: "25" },
	{ tokenSymbol: "BTG", tokenName: "bitcoin gold", id: "27" },
	{ tokenSymbol: "WAVES", tokenName: "waves", id: "29" },
	{ tokenSymbol: "AE", tokenName: "aeternity", id: "49" },
	{ tokenSymbol: "ZRX", tokenName: "0x", id: "38" },
	{ tokenSymbol: "REP", tokenName: "augur", id: "34" },
	{ tokenSymbol: "ICON", tokenName: "icon", id: "42" },
]
export default {
	onReady: cb => {
		setTimeout(() => cb(config), 0)
	},
	searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
		let match_datas = [];
		exchanges.map(el => {
			if (el.tokenSymbol.includes(userInput)) {
				match_datas.push({
					"symbol": `${el.tokenSymbol}`,
					"full_name": `${el.tokenSymbol}E:${el.tokenSymbol}USD`,
					"description": el.tokenName,
					"exchange": "Coinbase",
					"ticker": `Compare:${el.id}/USD`,
					"type": "crypto"
				});
			}
		});

		onResultReadyCallback(match_datas);
	},
	resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
		// expects a symbolInfo object in response
		// console.log('======resolveSymbol running')
		var split_data = symbolName.split(/[:/]/);
		var symbol_stub = {
			name: 'Index',
			description: '',
			type: 'crypto',
			session: '24x7',
			timezone: 'Etc/UTC',
			ticker: split_data[0] + ":" + split_data[1] + ":" + split_data[2],
			exchange: 'Coinbase',
			minmov: 1,
			pricescale: 100000000,
			has_intraday: true,
			intraday_multipliers: ['1', '60'],
			supported_resolution: supportedResolutions,
			volume_precision: 8,
			data_status: 'streaming',
		}
		// if (split_data[2].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
		// 	symbol_stub.pricescale = 100
		// }
		setTimeout(function () {
			onSymbolResolvedCallback(symbol_stub)
			//			console.log('Resolving that symbol....', symbol_stub)
		}, 0)


		// onResolveErrorCallback('Not feeling it today')

	},
	getBars: function (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
		// console.log('function args',arguments)
		// console.log(`Requesting bars between ${new Date(from * 1000).toISOString()} and ${new Date(to * 1000).toISOString()}`)
		var split_symbol = symbolInfo.ticker.split(/[:/]/);
		if (split_symbol[1] !== "4") {
			historyProvider.getBars(symbolInfo, resolution, from, to, firstDataRequest)
				.then(bars => {
					if (bars.length) {
						onHistoryCallback(bars, { noData: false })
					} else {
						onHistoryCallback(bars, { noData: true })
					}
				}).catch(err => {
					onErrorCallback(err)
				})
		} else {
			chartUserTV.getBars(symbolInfo, resolution, from, to, firstDataRequest)
				.then(bars => {
					if (bars.length) {
						onHistoryCallback(bars, { noData: false })
					} else {
						onHistoryCallback(bars, { noData: true })
					}
				}).catch(err => {
					onErrorCallback(err)
				})
		}
	},
	// subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
	// 	console.log('=====subscribeBars runnning')
	// },
	// unsubscribeBars: subscriberUID => {
	// 	console.log('=====unsubscribeBars running')
	// },
	// calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
	// 	//optional
	// 	console.log('=====calculateHistoryDepth running')
	// 	// while optional, this makes sure we request 24 hours of minute data at a time
	// 	// CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
	// 	// return resolution < 60 ? {resolutionBack: 'D', intervalBack: '1'} : undefined
	// },
	// getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
	// 	//optional
	// 	console.log('=====getMarks running')
	// },
	// getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
	// 	//optional
	// 	console.log('=====getTimeScaleMarks running')
	// },
	// getServerTime: cb => {
	// 	console.log('=====getServerTime running')
	// }
}
