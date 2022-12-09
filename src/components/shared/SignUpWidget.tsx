import * as React from "react";

export interface ISignUpWidgetProps {}

export function SignUpWidget(props: ISignUpWidgetProps) {
  const onClickGetEarlyAccess = () => {
    window.open("https://forms.gle/6Q5Z7Z7Z7Z7Z7Z7Z7", "_blank");
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4">
            <p className="mt-5">
              This is the <span className="text-primary">alpha release</span>. The full product will have many more features including custom styling, landscape mode, and more.
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
