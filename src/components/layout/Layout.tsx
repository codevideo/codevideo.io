import * as React from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { PropsWithChildren, useEffect } from "react";
import { usePageRedirects } from "../../hooks/usePageRedirects";
import { Flex, Theme } from "@radix-ui/themes";
import { SVGBackground } from "./SvgBackground";

const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  usePageRedirects();

  useEffect(() => {
    // Add a class to the body tag
    document.body.classList.add("dark");

    // Cleanup function to remove the class on component unmount
    return () => {
      document.body.classList.remove("dark");
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <Theme
      accentColor="mint"
      appearance="dark"
      panelBackground="translucent"
      radius="large"
    >
      <SVGBackground />
      <Flex gap="3" p="3" direction="column" justify="between">
        <Nav />
        <main style={{marginBottom:'auto'}}>{children}</main>
        <Footer />
      </Flex>
    </Theme>
  );
};

export default Layout;
