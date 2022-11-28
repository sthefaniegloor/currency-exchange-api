const api = require('./api')

const http = require('http'), fs = require('fs')

const server = http.createServer(async (request, response) => {
    if (request.url === "/exchangerate" && request.method === "GET") {
        const res = await api.get();
        const highValue = parseFloat(res.data[0].high);
        const lowValue = parseFloat(res.data[0].low);
        const bid = parseFloat(res.data[0].bid);
        const averageCurrentDay = (parseFloat(res.data[0].high) + parseFloat(res.data[0].low)) / 2 ;
        const averagePreviousDay = (parseFloat(res.data[1].high) + parseFloat(res.data[1].low)) / 2 ;
        const averageLastTwoDays = (parseFloat(averageCurrentDay + averagePreviousDay)) / 2 ;

        return response.end(JSON.stringify({
            nome: `${res.data[0].code}-${res.data[0].codein}`,
            highValue: `R$ ${highValue.toFixed(2)}`,
            lowValue: `R$ ${lowValue.toFixed(2)}`,
            bid: `R$ ${bid.toFixed(2)}`,
            averageCurrentDay: `R$ ${averageCurrentDay.toFixed(2)}`,
            averageLastTwoDays: `R$ ${averageLastTwoDays.toFixed(2)}`
        }));
    };
})

server.listen(8000, () => console.log('Running on: http://localhost:8000/exchangerate'));