import * as React from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { PropsWithChildren } from "react";
import { ToastContainer } from 'react-toastify';
import { usePageRedirects } from "../../hooks/usePageRedirects";

const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  usePageRedirects();

  return (
    <>
      <Nav siteTitle={'CodeVideo'} />
      <main>{children}</main>
      <ToastContainer bodyClassName={() => "text-center m-3"}/>
      <Footer />
    </>
  );
};

export default Layout;
