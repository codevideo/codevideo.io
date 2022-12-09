import * as React from "react";
import { EditorWidget } from "../../shared/EditorWidget";
import { SignUpWidget } from "../../shared/SignUpWidget";
import { Hero } from "./Hero";

export function Home() {
  return (
    <>
      <Hero />
      <div className="container text-center">
        <EditorWidget />
        <SignUpWidget />
      </div>
    </>
  );
}
