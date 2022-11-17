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
import {
  DashboardContainer,
  IconImg,
  Button,
  SettingContainer,
  TableContainer,
  Table,
  Tr,
  Td,
} from "./style";

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
    if (gotCoins === true || gotCoinsByCurrency === true) {
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
      <TableContainer>
        <Table>
          <thead>
            <Tr>
              <Td>RANK</Td>
              <Td>ICON</Td>
              <Td>ID</Td>
              <Td>NAME</Td>
              <Td>SYMBOL</Td>
              <Td>PRICE</Td>
              <Td>TOTALSUPPLY</Td>
              <Td>PRICEBTC</Td>
              <Td>Exchange</Td>
            </Tr>
          </thead>
          <tbody>
            {coins.map((item: ICOIN, index: number) => (
              <Tr key={index} data-testid="coin-row">
                <Td>{item.rank}</Td>
                <Td>
                  <IconImg src={item.icon} alt="Icon" />
                </Td>
                <Td>{item.id?.slice(0, 25)}</Td>
                <Td>{item.name}</Td>
                <Td>{item.symbol}</Td>
                <Td>{item.price}</Td>
                <Td>{item.totalSupply}</Td>
                <Td>{item.priceBtc}</Td>
                <Td>{item.exchange ? item.exchange : ""}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </DashboardContainer>
  );
};

export default DashboardComponent;
