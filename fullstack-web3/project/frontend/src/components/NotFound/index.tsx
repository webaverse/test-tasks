import React from "react";
import { Link } from "react-router-dom";

import { PATH } from "../../consts";

const NotFoundComponent = () => {
  return (
    <div>
      <div>404</div>
      <div>This page does not exist</div>
      <div>The page you are looking for could not be found.</div>
      <Link to={PATH.DASHBOARD}>Go to HomePage!</Link>
    </div>
  );
};

export default NotFoundComponent;
