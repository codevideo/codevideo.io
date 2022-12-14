import * as React from "react";

export interface IHeroProps {}

export function Hero(props: IHeroProps) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="my-2">
        <span className="text-primary">{'/>'} CodeVideo</span>
      </h1>
      <p className="text-center m-0">Convert code snippets to animated video with a single click.</p>
      <p className="text-center m-0">Code in. Video out. That simple.</p>
    </div>
  );
}
