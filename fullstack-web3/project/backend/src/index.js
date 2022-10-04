const express = require('express');
const app = express();

const port = 4000;

app.get('/', (req, res) => {
    res.json({status: 'success', data: {markets: []}});
    });


app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});