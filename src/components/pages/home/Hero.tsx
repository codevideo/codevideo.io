import * as React from "react";

export interface IHeroProps {}

export function Hero(props: IHeroProps) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="my-5">
        <span className="text-primary">CodeVideo</span>
      </h1>
      <h2 className="my-3">Convert code snippets to video.</h2>
      <h3 className="my-3">Code in. Video out. That simple.</h3>
    </div>
  );
}
