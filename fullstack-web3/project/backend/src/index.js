const express = require('express');
const app = express();
const axios = require("axios").create({baseURL: 'https://api.coinstats.app/public/v1' });

const port = 4000;

const getCachedList = (coin) => {
    if (!app.locals[coin]) {
        return null;
    }
    const cacheExpiration = Date.now() - 1000 * 60;
    if (app.locals[coin].updatedAt < cacheExpiration) {
        return null;
    }
    return app.locals[coin].list;
}

const setCachedList = (coin, list) => {
    app.locals[coin] = {
        updatedAt: Date.now(),
        list
    }
}

const getCheapestExchange = (fiat, list) => {
    const filtered = list.filter(
        exchange => {
            const pair = exchange.pair.split('/')
            if (pair.length !== 2) {
                return false;
            }
            return pair[1].toLowerCase() === fiat.toLowerCase()
        }
    );
    if (filtered.length === 0) {
        return null;
    }
    const cheapest = filtered.reduce(
        (acc, exchange) => {
            if (exchange.pairPrice < acc.pairPrice) {
                return exchange;
            }
            return acc;
        },
        filtered[0]
    );
    return cheapest;
}

app.get('/cheapest-exchange/:currency/:fiat', (req, res) => {
    const { currency, fiat } = req.params;
    const cachedList = getCachedList(currency);
    if (cachedList) {
        console.log(`returning markets for ${currency} from cache`);
        const cheapestExchange = getCheapestExchange(fiat, cachedList);
        res.json({status: 'success', data: cheapestExchange});
        return;
    }
    console.log(`fetching markets for ${currency} from coinstats API`);
    axios.get('/markets', {params: {coinId: currency}})
    .then(function (response) {
        setCachedList(currency, response.data);
        const cheapestExchange = getCheapestExchange(fiat, response.data);
        res.json({status: 'success', data: cheapestExchange});
    })
    .catch(function (error) {
        console.log(error);
        res.status(400);
        res.json({status: 'error', message: error});
    })
});


app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});