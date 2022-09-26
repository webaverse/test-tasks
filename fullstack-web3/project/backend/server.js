const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

require("dotenv").config();

const port = process.env.PORT || 4000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/exchange", async (req, res) => {
  // We will be coding here

  var parameters = req.query;

  // check the request parameters

  if (parameters.currency) {
    if (parameters.coinId && parameters.coinSymbol) {
      try {
        const resp = await axios.get(
          "https://api.coinstats.app/public/v1/markets?coinId=" +
            parameters.coinId
        );

        cryptoInfos = resp.data;

        if (cryptoInfos.length !== 0) {
          // sort by price
          cryptoInfos = cryptoInfos.sort((a, b) => a.price - b.price);

          // filter by pair
          cryptoInfos = cryptoInfos.filter(function (e) {
            return e.pair === parameters.coinSymbol + "/" + "USD";
          });

          if (cryptoInfos.length !== 0)
            res.status(200).send({ exchange: cryptoInfos[0].exchange });
          else res.status(200).send({ exchange: "" });
        } else {
          res.status(200).send({ exchange: "" });
        }
      } catch (err) {
        // Handle Error Here
        console.error(err);
        res.status(500).send(err);
      }
    } else {
      res.status(500).send("Send The Exact Info");
    }
  } else {
    res.status(500).send("Send The Exact Info");
  }
});

app.listen(port, () => console.log(`Our app listening on port ${port}!`));
