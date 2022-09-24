//node_modules
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

//store
import { RootState } from "../../redux/store.js";

//slice
import { getCoins, ICOIN } from "../../redux/slices/coin.slice";

//style
import { DashboardContainer, IconImg } from "./style";

const DashboardComponent = () => {
  const dispatch = useDispatch();
  const { coins } = useSelector((state: RootState) => state.coin);

  const getAllNFTs = useCallback(async () => {
    dispatch(getCoins({}));
  }, [dispatch]);

  useEffect(() => {
    getAllNFTs();
  }, [getAllNFTs]);

  return (
    <DashboardContainer>
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
