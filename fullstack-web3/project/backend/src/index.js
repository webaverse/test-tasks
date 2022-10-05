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

app.get('/:currency/:fiat', (req, res) => {
    const { currency, fiat } = req.params;
    const cachedList = getCachedList(currency);
    if (cachedList) {
        console.log(`returning markets for ${currency} from cache`);
        res.json({status: 'success', data: {markets: cachedList}});
        return;
    }
    console.log(`fetching markets for ${currency} from coinstats API`);
    axios.get('/markets', {params: {coinId: currency}})
        .then(function (response) {
            setCachedList(currency, response.data);
            res.json({status: 'success', data: {markets: response.data}});
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