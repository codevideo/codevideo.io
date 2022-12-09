import * as React from "react";

export function AlphaWidget() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-4">
            <p className="mt-5">
              <span className="text-primary">*</span>CodeVideo{" "}
              <span className="text-primary">is currently in alpha</span>, built
              over the course of about 5 days. We're building a full studio editor and adding many more
              features in the coming weeks and months.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
