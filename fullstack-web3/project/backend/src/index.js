const express = require('express');
const app = express();
const axios = require("axios").create({baseURL: 'https://api.coinstats.app/public/v1' });

const port = 4000;

app.get('/', (req, res) => {
    axios.get('/markets', {params: {coinId: 'bitcoin'}})
        .then(function (response) {
            console.log(response.data);
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