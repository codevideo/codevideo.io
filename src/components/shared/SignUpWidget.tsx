import * as React from "react";
import { toast } from "react-toastify";

export interface ISignUpWidgetProps {}

export function SignUpWidget(props: ISignUpWidgetProps) {
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
          <div className="col-4">
            <p className="mt-5">
              This is the <span className="text-primary">alpha release</span>.
              The full product will have many more features including custom
              styling, landscape mode, and more.
            </p>
            <button className="btn btn-primary" onClick={onClickGetEarlyAccess}>
              Get Early Access
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
