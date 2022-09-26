//node_modules
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

//store
import { RootState } from "../../redux/store.js";

//slice
import {
  getCoins,
  getCoinsByCurrency,
  sortCoinsByAny,
  ICOIN,
  getExchange,
} from "../../redux/slices/coin.slice";

//style
import { DashboardContainer, IconImg, Button, SettingContainer } from "./style";

const currency = [
  { value: "USD", label: "USD" },
  { value: "HKD", label: "HKD" },
  { value: "KRW", label: "KRW" },
  { value: "SGD", label: "SGD" },
];

const DashboardComponent = () => {
  const dispatch = useDispatch();
  const [filter, SetFilter] = useState<boolean>(false);
  const [currentCurrency, SetCurrentCurrency] = useState<string>("USD");

  const { coins, gotCoins, gotCoinsByCurrency } = useSelector(
    (state: RootState) => state.coin
  );

  const getAllNFTs = useCallback(() => {
    dispatch(getCoins({}));
    dispatch(getCoins({}));
  }, [dispatch]);

  useEffect(() => {
    getAllNFTs();
  }, [getAllNFTs]);

  useEffect(() => {
    if (gotCoins || gotCoinsByCurrency) {
      console.log("OK");
      coins.forEach((coin: ICOIN) => {
        dispatch(getExchange({ coin: coin, currency: currentCurrency }));
      });
    }
  }, [gotCoins, gotCoinsByCurrency, currentCurrency, dispatch]);

  const onSelectCurrency = useCallback(
    (e: any) => {
      if (e) {
        SetCurrentCurrency(e.value);
        dispatch(getCoinsByCurrency({ currency: e.value }));
      } else {
        dispatch(getCoins({}));
      }
    },
    [dispatch, SetCurrentCurrency]
  );

  function SortByName(x: ICOIN, y: ICOIN) {
    if (filter) {
      return x.name.toLocaleUpperCase() === y.name.toLocaleUpperCase()
        ? 0
        : x.name.toLocaleUpperCase() > y.name.toLocaleUpperCase()
        ? 1
        : -1;
    } else {
      return x.name.toLocaleUpperCase() === y.name.toLocaleUpperCase()
        ? 0
        : x.name.toLocaleUpperCase() > y.name.toLocaleUpperCase()
        ? -1
        : 1;
    }
  }

  function SortByRank(x: ICOIN, y: ICOIN) {
    if (filter) {
      return x.rank === y.rank ? 0 : x.rank > y.rank ? 1 : -1;
    } else {
      return x.rank === y.rank ? 0 : x.rank > y.rank ? -1 : 1;
    }
  }

  const filterOption = async (order: string) => {
    console.log("order", order);
    switch (order) {
      case "rank":
        dispatch(sortCoinsByAny({ func: SortByRank }));
        break;
      case "name":
        dispatch(sortCoinsByAny({ func: SortByName }));
        break;
    }
    SetFilter(!filter);
  };

  return (
    <DashboardContainer>
      <SettingContainer>
        <Select
          className="basic-single"
          classNamePrefix="select"
          options={currency}
          isClearable={true}
          onChange={onSelectCurrency}
        />

        <Button onClick={() => filterOption("rank")}>filter by rank</Button>
        <Button onClick={() => filterOption("name")}>filter by name</Button>
      </SettingContainer>

      <table>
        <thead>
          <tr>
            <td>rank</td>
            <td>icon</td>
            <td>id</td>
            <td>name</td>
            <td>symbol</td>
            <td>price</td>
            <td>totalSupply</td>
            <td>priceBtc</td>
            <td>Exchange</td>
          </tr>
        </thead>
        <tbody>
          {coins.map((item: ICOIN, index: number) => (
            <tr key={index} data-testid="coin-row">
              <td>{item.rank}</td>
              <td>
                <IconImg src={item.icon} alt="Icon" />
              </td>
              <td>{item.id?.slice(0, 25)}</td>
              <td>{item.name}</td>
              <td>{item.symbol}</td>
              <td>{item.price}</td>
              <td>{item.totalSupply}</td>
              <td>{item.priceBtc}</td>
              <td>{item.exchange}</td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </DashboardContainer>
  );
};

export default DashboardComponent;
