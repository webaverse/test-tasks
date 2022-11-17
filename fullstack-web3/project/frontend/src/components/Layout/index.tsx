import React from "react";

import HeaderSection from "./Header";
import FooterSection from "./Footer";
import LoadingSection from "./Loading";

const LayoutComponent = ({ children }: any) => {
  return (
    <div>
      {false && <LoadingSection />}

      <HeaderSection />
      <div>{children}</div>
      <FooterSection />
    </div>
  );
};

const withLayout = (Component: any) => (props: any) => {
  return (
    <LayoutComponent>
      <Component {...props} />
    </LayoutComponent>
  );
};

export default withLayout;
