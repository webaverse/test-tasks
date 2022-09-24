//node_modules
import React from "react";
import { Link } from "react-router-dom";

//consts
import { PATH } from "../../../consts";

//styles
import { HeaderContainer } from "./style";

const HeaderSection = () => {
  return (
    <HeaderContainer>
      <p>Fullstack&Web3 Test</p>
      <Link to={PATH.DASHBOARD}>dashboard</Link>
    </HeaderContainer>
  );
};

export default HeaderSection;
