import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import { Select } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import SortIcon from "@material-ui/icons/ArrowDownward";
import axios from "axios";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currency, setCurrency] = useState("HKD");
  const [coins, setCoins] = useState([]);
  
  //Set columns for datatable
  const columns = [
    {
      name: "Rank",
      selector: "rank",
      sortable: true,
    },
    {
      name: "Currency",
      selector: "symbol",
      sortable: true,
    },
    {
      name: "Image",
      selector: "icon",
      cell: (row) => <img src={row.icon} className="icon" />,
      width: "50",
    },
    {
      name: "Price",
      selector: "price",
      cell: (row) => row.price.toFixed(2),
    },
    {
      name: "Volume",
      selector: "volume",
      cell: (row) => (row.volume ? row.volume.toFixed(2) : ""),
    },
    {
      name: "URL",
      selector: "websiteUrl",
    },
    {
      name: "Exchange",
      selector: "rank",
    },
  ];

  //function for handling currency 
  const handleCurrency = (e) => {
    setCurrency(e.target.value);
  };

  //Get Coin State
  const getCoinState = (currency) => {
    axios
      .get("https://api.coinstats.app/public/v1/coins?currency=" + currency)
      .then((res) => {
        let data = res.data.coins;
        data.map((item, index) => {
          axios
            .get(
              "http://localhost:4000/exchange?coinId=bitcoin&coinSymbol=BTC&currency=" +
                currency
            )
            .then((res) => {
              let exchange = res.data.exchange;
              item.exchange = exchange;
            });
        });
        setCoins(data);
      });
  };

  //Fetching coin state according to currecy status
  useEffect(() => {
    getCoinState(currency);
  }, [currency]);

  return (
    <div className="App">
      <div>
        <label>Currency:&nbsp;&nbsp;&nbsp; </label>
        <Select
          title="Currency"
          value={currency}
          onChange={(e) => handleCurrency(e)}
        >
          <ListItem value={"HKD"}>HKD</ListItem>
          <ListItem value={"KRW"}>KRW</ListItem>
          <ListItem value={"SGD"}>SGD</ListItem>
          <ListItem value={"USD"}>USD</ListItem>
        </Select>
      </div>
      <hr />
      <Card>
        <DataTable
          title="Coin States"
          columns={columns}
          data={coins}
          defaultSortField="rank"
          sortIcon={<SortIcon />}
          pagination
          selectableRows
        />
      </Card>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
