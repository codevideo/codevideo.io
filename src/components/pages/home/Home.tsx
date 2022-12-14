import * as React from "react";
import { AlphaWidget } from "../../shared/AlphaWidget";
import { EditorWidget } from "../../shared/EditorWidget";
import { HiddenCanvas } from "../../shared/HiddenCanvas";
import { SignUpButton } from "../../shared/SignUpButton";
import { Hero } from "./components/Hero";
import { HowItWorksSection } from "./components/HowItWorksSection";

export function Home() {
  return (
    <>
      <Hero />
      <div className="container text-center mb-5">
        <EditorWidget />
        <AlphaWidget/>
        <SignUpButton />
        <HowItWorksSection/>
        <HiddenCanvas/>
      </div>
    </>
  );
}
