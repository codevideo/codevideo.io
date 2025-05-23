import * as React from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { PropsWithChildren, useEffect } from "react";
import { Flex, Theme } from "@radix-ui/themes";
import { SVGBackground } from "./SvgBackground";
import { useAppSelector } from "../../hooks/useAppSelector";

export interface ILayoutProps {
  opacity?: string;
}

const Layout = (props: PropsWithChildren<ILayoutProps>) => {
  const { children, opacity } = props;
  const { theme } = useAppSelector((state) => state.editor);

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
    document.body.classList.add(theme);

    // Load the voices for speech synthesis
    getVoices();

    // Cleanup function to remove the class on component unmount
    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]); // Empty dependency array means this effect runs once after the initial render

  return (
    <Theme
      accentColor="mint"
      appearance={theme}
      panelBackground="translucent"
      radius="large"
    >
      <SVGBackground opacity={opacity}/>
      <Flex gap="3" p="3" direction="column" justify="between">
        <Nav/>
        <main style={{marginBottom:'auto'}}>{children}</main>
        <Footer />
      </Flex>
    </Theme>
  );
};

export default Layout;