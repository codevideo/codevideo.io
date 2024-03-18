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

  // for firefox to work with speech synthesis, need to load the voices 2x
  // see https://caniuse.com/?search=speechsynthesis
  const getVoices = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
    setTimeout(() => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.getVoices();
      }
    }, 3000);
  }

  useEffect(() => {
    // Add a class to the body tag
    document.body.classList.add("dark");

    // Load the voices for speech synthesis
    getVoices();

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
