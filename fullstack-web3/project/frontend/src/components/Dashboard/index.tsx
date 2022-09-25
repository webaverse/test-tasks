//node_modules
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

//store
import { RootState } from "../../redux/store.js";

//slice
import {
  getCoins,
  getCoinsByCurrency,
  ICOIN,
} from "../../redux/slices/coin.slice";

//style
import { DashboardContainer, IconImg } from "./style";

const currency = [
  { value: "USD", label: "USD" },
  { value: "HKD", label: "HKD" },
  { value: "KRW", label: "KRW" },
  { value: "SGD", label: "SGD" },
];

const DashboardComponent = () => {
  const dispatch = useDispatch();
  const { coins } = useSelector((state: RootState) => state.coin);

  const getAllNFTs = useCallback(async () => {
    dispatch(getCoins({}));
  }, [dispatch]);

  useEffect(() => {
    getAllNFTs();
  }, [getAllNFTs]);

  const onSelectCurrency = async (e: any) => {
    if (e) {
      console.log(e.value);
      dispatch(getCoinsByCurrency({ currency: e.value }));
    } else {
      dispatch(getCoins({}));
    }
  };

  return (
    <DashboardContainer>
      <Select
        className="basic-single"
        classNamePrefix="select"
        options={currency}
        isClearable={true}
        onChange={onSelectCurrency}
      />
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
          </tr>
        </thead>
        <tbody>
          {coins.map((item: ICOIN, index: number) => (
            <tr key={index}>
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
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </DashboardContainer>
  );
};

export default DashboardComponent;
