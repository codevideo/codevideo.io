import * as React from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <>
      <Nav siteTitle={'CodeVideo'} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
