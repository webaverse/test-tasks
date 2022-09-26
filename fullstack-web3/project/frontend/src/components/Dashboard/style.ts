import styled from "styled-components";

export const DashboardContainer = styled.div`
  /* width: 100%; */
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  @media screen and (max-width: 1300px) {
    font-size: 12px;
    padding-left: 20px;
  }
  @media screen and (max-width: 800px) {
    font-size: 8px;
  }
  @media screen and (max-width: 600px) {
    font-size: 6px;
  }
  @media screen and (max-width: 480px) {
    font-size: 4px;
  }
`;

export const IconImg = styled.img`
  width: 45x;
  height: 45px;

  @media screen and (max-width: 800px) {
    width: 30x;
    height: 30px;
  }

  @media screen and (max-width: 800px) {
    width: 24x;
    height: 24px;
  }

  @media screen and (max-width: 800px) {
    width: 20x;
    height: 20px;
  }
`;

export const SettingContainer = styled.div`
  display: flex;
  font-size: 12px;
`;

export const TableContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const Table = styled.table``;

export const Tr = styled.tr``;

export const Td = styled.td``;

export const Button = styled.button`
  font-size: 12px;
  padding: 8px 16px;
  border-radius: 5px;
  margin-left: 20px;
  cursor: pointer;
`;
