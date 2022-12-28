import { Link } from "gatsby";
import * as React from "react";

export function SignUpSuccess() {
  return (
    <div className="container text-center">
      <div className="row d-flex flex-column justify-content-center align-items-center vh-100">
        <div
          className="col-12 col-md-10 flex-column d-flex justify-content-center align-items-center"
          aria-live="polite"
        >
          <h1 className="header">Thank You!</h1>
          <p>Thanks a lot for signing up for the beta.</p>
          <p>We'll email you as soon as it's out.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
