import * as React from "react";
import { toast } from "react-toastify";

export function SignUpButton() {
  const onClickGetEarlyAccess = () => {
    toast(
      <div>
        🚀🚀🚀
        <br />
        Sign up coming soon!
      </div>,
      {
        position: "top-center",
      }
    );
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-4">
            <button className="btn btn-primary" onClick={onClickGetEarlyAccess}>
              Get Early Access
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
